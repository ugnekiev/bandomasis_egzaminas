import { useState, useEffect } from "react";
import axios from "axios";
import Donate from "../../Contexts/Donate";


function Main() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [donation, setDonation] = useState(0);
    const [story, setStory] = useState(null);
    const [idea, setIdea] = useState(0);
    const [createData, setCreateData] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(Date.now);
    const [donors, setDonors] = useState('');


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

    // //READ for list
    // useEffect(() => {
    //     axios.get('http://localhost:3003/server/home')
    //         .then(res => {
    //             console.log(reList(res.data));
    //             setRows(reList(res.data));
    //         })
    // }, [lastUpdate]);

    useEffect(() => {
        axios.get('http://localhost:3003/server/ideas')
            .then(res => {
                console.log(res.data);
                setStory(res.data);
            })
    }, [donors]);



    useEffect(() => {
        axios.get('http://localhost:3003/server/home')
            .then(res => {
                setDonors(res.data);
            })
    }, [lastUpdate]);


    //CREATE
    useEffect(() => {
        if (null === createData) {
            return;
        }
        axios.post('http://localhost:3003/server/donate', createData)
            .then(res => {
                setLastUpdate(Date.now());
            }
            );
    }, [createData]);


    return (

        <Donate.Provider value={{
            donors,
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 m-4">
                        <div className="card">
                        <h5 className="card-header">Select Story</h5>
                        <div className="card-body">
                            <div className="home__content__comment">
                                <div className="mb-3">
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
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                </Donate.Provider>
                )

}
                export default Main;