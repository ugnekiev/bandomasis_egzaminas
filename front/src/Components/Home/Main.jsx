import { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";

function Main() {


    const [rows, setRows] = useState(null);

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
        axios.get('http://localhost:3003/server/home')
            .then(res => {
                console.log(reList(res.data));
                setRows(reList(res.data));
            })
    }, []);


    return (
       <List rows={rows}/>
    );
}


export default Main;