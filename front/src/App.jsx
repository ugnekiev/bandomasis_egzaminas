import './App.scss';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MainI from './Components/Ideas/Main';
import Home from './Components/Home/Main';
import Nav from './Components/Nav';
import Main from './Components/Donations/Main';
import MainAd from './Components/Admin/Main';
import { login, logout, authConfig } from './Functions/auth';
import axios from "axios"

function App() {

  const [roleChange, setRoleChange] = useState(Date.now());

  return (
    <BrowserRouter>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home roleChange={roleChange} />}></Route>
        <Route path="/login" element={<LoginPage roleChange={roleChange} setRoleChange={setRoleChange} />} />
        <Route path="/logout" element={<LogoutPage setRoleChange={setRoleChange} />} />
        <Route path="/stories" element={<MainI roleChange={roleChange} />}></Route>
        <Route path="/donate" element={<Main roleChange={roleChange} />}></Route>
        <Route path="/admin" element={<RequireAuth role="admin"><MainAd roleChange={roleChange} /></RequireAuth>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export function ShowNav({ roleChange }) {
  const [status, setStatus] = useState(1);
  useEffect(() => {
    axios.get('http://localhost:3003/login-check?role=admin', authConfig())
      .then(res => {
        setStatus(res.data.status);
      })
  }, [roleChange]);
  return <Nav status={status} />
}

function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios.get('http://localhost:3003/login-check?role=' + role, authConfig())
      .then(res => {
        if ('ok' === res.data.msg) {
          setView(children);
        }
        else if (res.data.status === 2) {
          setView(<h2>Unauthorize...</h2>)
        }
        else {
          setView(<Navigate to="/login" replace />);
        }
      })

  }, [children, role]);

  //anksciau buvo children
  return view;
}

function LoginPage({ roleChange }) {
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const doLogin = () => {
    axios.post('http://localhost:3003/login', { user, pass })
      .then(res => {
        console.log(res.data);
        if ('ok' === res.data.msg) {
          login(res.data.key);
          navigate('/', { replace: true });
        }
      })
  }
  return (<>
    <ShowNav roleChange={roleChange} />
    <div className="container">
      <div className="row justify-content-center">
        <div className="col col-lg-4 col-md-12">
          <div className="card m-4">
            <h5 className="card-header">Login</h5>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">name</label>
                <input type="text" className="form-control" value={user} onChange={e => setUser(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">password</label>
                <input type="password" className="form-control" value={pass} onChange={e => setPass(e.target.value)} />
              </div>
              <button onClick={doLogin} type="button" className="btn btn-outline-success">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

function LogoutPage() {
  useEffect(() => logout(), []);
  return (
    <Navigate to="/login" replace />
  )
}

export default App;