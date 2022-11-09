import './App.scss';
import { BrowserRouter, Route, Routes} from "react-router-dom";
// import { useState} from "react";
import MainI from './Components/Ideas/Main';
// import MainP from './components/paslaugos/Main';
import Home from './Components/Home/Main';
import Nav from './Components/Nav';
import Main from './Components/Donations/Main';

// import axios from "axios"


function App() {

  // const [roleChange, setRoleChange] = useState(Date.now());


  return (
    <BrowserRouter>
    <Nav />
  
    {/* <ShowNav roleChange={roleChange}/> */}
    <Routes>
    <Route path="/" element={<RequireAuth role="user"><Home /></RequireAuth>}></Route>
    {/* <Route path="/login" element={<LoginPage setRoleChange={setRoleChange} />} /> */}
    {/* <Route path="/logout" element={<LogoutPage setRoleChange={setRoleChange} />} /> */}
    <Route path="/stories" element={<RequireAuth role="admin"><MainI /></RequireAuth>}></Route>
    <Route path="/donate" element={<RequireAuth role="admin"><Main /></RequireAuth>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

// function ShowNav({roleChange}) {
//   const [status, setStatus] = useState(1);
//   useEffect(() => {
//     axios.get('http://localhost:3003/login-check?role=admin', authConfig())
//       .then(res => {
//         setStatus(res.data.status);
//       })
//   }, [roleChange]);
//   return <Nav status={status} />
// }

function RequireAuth({ children, role }) {
  // const [view, setView] = useState(<h2>Please wait...</h2>);

  // useEffect(() => {
  //   axios.get('http://localhost:3003/login-check?role=' + role, authConfig())
  //     .then(res => {
  //       if ('ok' === res.data.msg) {
  //         setView(children);
  //       }
  //       else if (res.data.status === 2) {
  //         setView(<h2>Unauthorize...</h2>)
  //       }
  //       else {
  //         setView(<Navigate to="/login" replace />);
  //       }
  //     })

  // }, [children, role]);

  return children;
}

export default App;