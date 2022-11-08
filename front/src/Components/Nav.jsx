import { NavLink } from "react-router-dom";


function Nav() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <span className="navbar-brand">GoFund</span>
                            <div className="collapse navbar-collapse">
                                <div className="navbar-nav">
                                    <NavLink to="/" end className='nav-link active'>Home</NavLink>
                                    <NavLink to="/stories" className='nav-link active'>Create Story</NavLink>
                                    <NavLink to="/donate" className='nav-link active'>Donate</NavLink>
                                    <NavLink to="/logout" className='nav-link active'>Logout</NavLink>
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