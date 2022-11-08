import Home from "../../Contexts/Home";
import List from "./List";
import { useEffect, useState } from "react";
import axios from "axios";

function Main() {


    const [rows, setRows] = useState(null);
    const [createData, setCreateData] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(Date.now);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [donation, setDonation] = useState(0);
    const [story, setStory] = useState(null);
    const [idea, setIdea] = useState (0);

    //READ for list
    useEffect(() => {
        axios.get('http://localhost:3003/server/home')
            .then(res => {
                console.log(res.data);
                setRows(res.data);
            })
    }, [lastUpdate]);
    useEffect(() => {
        axios.get('http://localhost:3003/server/ideas')
            .then(res => {
                console.log(res.data);
                setStory(res.data);
            })
    }, [rows]);

    //CREATE
    useEffect(() => {
        if (null === createData) {
            return;
        }
        axios.post('http://localhost:3003/server/home', createData)
            .then(res => {
                setLastUpdate(Date.now());
            }
            );
    }, [createData]);

    const add = () => {
        console.log('aaadd')
        setCreateData({
            idea_id: parseInt(idea),
            name,
            surname,
            donation

        });
        setName('');
        setSurname('');
        setDonation(0);
        setStory(null);

    }

    return (
        <Home.Provider value={{
            rows,
            setCreateData,
           

        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="home__content__comment">
                            <div className="mb-3">
                                <label className="form-label">Select Story</label>
                                <select className="form-select" value={idea} onChange={e => setIdea(e.target.value)}>
                                    <option value={0} disabled>Choose from list</option>
                                    {
                                        story?.map(s => <option key={s.id} value={s.id}>{s.title}</option>)
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Your Name</label>
                                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Your Surname</label>
                                <input type="text" className="form-control" value={surname} onChange={e => setSurname(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Enter Your Donation</label>
                                <input type="text" className="form-control" value={donation} onChange={e => setDonation(e.target.value)} />
                            </div>
                            <button onClick={add} type="button" className="btn btn-outline-dark">Donate</button>
                        </div>
                        <List />
                    </div>
                </div>
            </div>
        </Home.Provider>
    );
}


export default Main;