const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: '10mb' }));
const cors = require("cors");
app.use(cors());
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
    database: "fundrise",

});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

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
        SET title = ?, story = ?, donation_sum = ?,
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
    `;
 
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//create home list
app.post("/server/home", (req, res) => {
    const sql = `
    INSERT INTO donors (name, surname, donation, idea_id)
    VALUES (?, ?, ?, ?)
    `;
    con.query(sql, [req.body.name, req.body.surname, req.body.donation, req.body.idea_id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// app.get("/server/home", (req, res) => {
//     const sql = `
//     SELECT id, name, surname, donation
//     FROM donors
//     ORDER BY id DESC
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });
