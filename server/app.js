const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: '10mb' }));
const cors = require("cors");
app.use(cors());
const md5 = require('js-md5');
const uuid = require('uuid');
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fundrise2",

});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


//////////////////LOGIN START/////////////////////////

const doAuth = function(req, res, next) {
    if (0 === req.url.indexOf('/admin')) { // admin
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length || results[0].role !== 10) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    } else if (0 === req.url.indexOf('/login-check') 
    || 0 === req.url.indexOf('/login')
    || 0 === req.url.indexOf('/')
    || 0 === req.url.indexOf('/stories')
    || 0 === req.url.indexOf('/donate')) {
        next();
    } else { // fron
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    }
}
app.use(doAuth)

// AUTH
app.get("/login-check", (req, res) => {
    const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
    con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error', status: 1 }); // user not logged
        } else {
            if ('admin' === req.query.role) {
                if (result[0].role !== 10) {
                    res.send({ msg: 'error', status: 2 }); // not an admin
                } else {
                    res.send({ msg: 'ok', status: 3 }); // is admin
                }
            } else {
                res.send({ msg: 'ok', status: 4 }); // is user
            }
        }
    });
});

app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.send({ msg: 'error', key: '' });
        } else {
            res.send({ msg: 'ok', key, text: 'Good to see you ' + req.body.user + ' again.', type: 'info' });
        }
    });
});

app.post("/register", (req, res) => {
    const key = uuid.v4();
    const sql = `
    INSERT INTO users (name, psw, session)
    VALUES (?, ?, ?)
  `;
    con.query(sql, [req.body.name, md5(req.body.pass), key], (err, result) => {
        if (err) throw err;
        res.send({ msg: 'ok', key, text: 'Welcome!', type: 'info' });
    });
});
//////////////////LOGIN END///////////////////////////

app.listen(port, () => {
    console.log(`fundrise in ${port} port!`)
});

//create
app.post("/server/ideas", (req, res) => {
    const sql = `
    INSERT INTO ideas (title, story, donation_sum, image)
    VALUES (?, ?, ?, ?)
    `;
    con.query(sql, [req.body.title, req.body.story, req.body.donation_sum, req.body.image], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/server/ideas", (req, res) => {
    const sql = `
    SELECT id, title, story, donation_sum, image
    FROM ideas
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//edit idea su photo
app.put("/server/ideas/:id", (req, res) => {
    let sql;
    let r;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE ideas
        SET title = ?, story = ?, donation_sum = ?, image = null
        WHERE id = ?
        `;
        r = [req.body.title, req.body.story, req.body.donation_sum, req.params.id];
    } else if (req.body.image) {
        sql = `
        UPDATE ideas
        SET title = ?, story = ?, donation_sum = ?, image = ?
        WHERE id = ?
        `;
        r = [req.body.title, req.body.story, req.body.donation_sum, req.body.image, req.params.id];
    } else {
        sql = `
        UPDATE ideas
        SET title = ?, story = ?, donation_sum = ?
        WHERE id = ?
        `;
        r = [req.body.title, req.body.story, req.body.donation_sum, req.params.id]
    }
    con.query(sql, r, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//delete
app.delete("/server/ideas/:id", (req, res) => {
    const sql = `
    DELETE from ideas
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//jungiu lenteles
app.get("/server/home", (req, res) => {
    const sql = `
    SELECT i.*, d.id AS did, name, surname, donation
    FROM ideas AS i
    INNER JOIN donors AS d
    ON d.idea_id = i.id
    WHERE confirmed = 1
    `;
 
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// create donate
app.get("/server/donate", (req, res) => {
    const sql = `
    SELECT id, name, surname, donation
    FROM donors
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


//create donate 
app.post("/server/donate", (req, res) => {
    const sql = `
    INSERT INTO donors (name, surname, donation, idea_id)
    VALUES (?, ?, ?, ?)
    `;
    con.query(sql, [req.body.name, req.body.surname, req.body.donation, req.body.idea_id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get("/server/admin", (req, res) => {
    const sql = `
    SELECT *
    FROM ideas
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/server/ideas/confirmed/:id", (req, res) => {
   let  sql = `
        UPDATE ideas
        SET confirmed = 1
        WHERE id = ?
        `;
    
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//delete
app.delete("/server/ideas/confirmed/:id", (req, res) => {
    const sql = `
    DELETE from ideas
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});