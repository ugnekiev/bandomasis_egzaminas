import { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";
import { authConfig } from "../../Functions/auth";
import { ShowNav } from "../../App";

function Main({ roleChange }) {

    const [rows, setRows] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(Date.now);
    const reList = data => {
        const d = new Map();
        data.forEach(line => {
            if (d.has(line.title)) {
                d.set(line.title, [...d.get(line.title), line]);
            } else {
                d.set(line.title, [line]);
            }
        });
        return [...d];
    }
    //READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/server/admin', authConfig())
            .then(res => {
                console.log(reList(res.data));
                setRows(reList(res.data));
            })
    }, [lastUpdate]);

    return (<>
        <ShowNav roleChange={roleChange} />
        <List rows={rows}  setLastUpdate={setLastUpdate}/>
    </>
    );

}

export default Main;