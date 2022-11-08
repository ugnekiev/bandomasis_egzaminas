import { useState, useEffect } from "react";
import Create from "./Create";
import axios from 'axios';
import List from "./List";
import Ideas from "../../Contexts/Ideas";
import Edit from "./Edit";

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now);
    const [createData, setCreateData] = useState(null);
    const [ideas, setIdeas] = useState(null);
    const [deleteData, setDeleteData] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [editData, setEditData] = useState(null);



  useEffect(() => {
  axios.get('http://localhost:3003/server/ideas')
  .then(res => {
    setIdeas(res.data);
  })
  }, [lastUpdate]);

//CREATE
  useEffect(() => {
  if(null === createData) {
    return;
  }
  axios.post('http://localhost:3003/server/ideas', createData)
        .then(res => {
          setLastUpdate(Date.now());
    }
    );
},[createData])

//DELETE
useEffect(() => {
  if(null === deleteData) {
    return;
  }
  axios.delete('http://localhost:3003/server/ideas/'+ deleteData.id)
        .then(res => {
          setLastUpdate(Date.now());
    }
    );
},[deleteData])

//EDIT
useEffect(() => {
  if(null === editData) {
    return;
  }
  axios.put('http://localhost:3003/server/ideas/'+ editData.id, editData)
        .then(res => {
          setLastUpdate(Date.now());
    }
    );
},[editData])


  return (
    <Ideas.Provider value={{
        setCreateData,
        ideas,
        setDeleteData,
        modalData, 
        editData,
        setEditData,
        setModalData

    }}>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Create />
          </div>
          <div className="col-8">
            <List />
          </div>
        </div>
      </div>
      <Edit />
    </Ideas.Provider>
  );
}
export default Main;
