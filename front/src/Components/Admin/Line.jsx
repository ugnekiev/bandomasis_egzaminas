import axios from "axios";
import { authConfig } from "../../Functions/auth";

function Line({ row, setLastUpdate }) {

    const goal = row[1][0].donation_sum
    // console.log(row)
  
    const confirm = () => {

        //axios.put url ir paduoti id
        console.log(row[1][0].id)
        axios.put('http://localhost:3003/server/ideas/confirmed/' + row[1][0].id, row[1][0].id, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
            })
    };

    //neleidzia istrinti nes surista su foreighn key
    const del = () => {

        axios.delete('http://localhost:3003/server/ideas/confirmed/' + row[1][0].id, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
            })
    };

    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">
                    <div className="home__content__name">
                        {row[0]}
                        <h5>GOAL: {goal}</h5>
                    </div>
                    <div className="home__content__comment">{row[1][0].story}</div>
                    <div className="home__buttons">
                        <button onClick={confirm} type="button" className="btn btn-outline-dark" disabled={row[1][0].confirmed}>Confirm</button>
                        <button onClick={del} type="button" className="btn btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </li>
    );

}


export default Line;