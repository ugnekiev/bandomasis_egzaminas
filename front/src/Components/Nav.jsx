import { NavLink } from "react-router-dom";

function Nav({status}) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <span className="navbar-brand">GoFund</span>
                            <div className="collapse navbar-collapse">
                                <div className="navbar-nav">
                                    {status === 4 || status===1 ? <NavLink to="/" end className='nav-link active'>Home</NavLink> : null}
                                    {status === 4 || status ===1 ? <NavLink to="/stories" className='nav-link active'>Create Story</NavLink> : null}
                                    {status === 4 || status===1 ? <NavLink to="/donate" className='nav-link active'>Donate</NavLink> : null}
                                    {status === 3 ? <NavLink to="/admin" className={ ({ isActive }) => isActive ? 'nav-link' : 'nav-link active'}>Confirm</NavLink> : null}
                                    {status === 1 ? <NavLink to="/login" className="nav-link">Login</NavLink> : null}
                                    {status !== 1 ? <NavLink to="/logout" className='nav-link active'>Logout</NavLink> : null}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Nav;