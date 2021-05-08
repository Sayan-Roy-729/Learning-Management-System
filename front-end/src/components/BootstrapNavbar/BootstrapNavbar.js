import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userSignOut } from '../../actions/authAction';
import { clearCourseState } from '../../actions/courseAction';

const BootstrapNavbar = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const signOutHandler = () => {
        dispatch(clearCourseState());
        dispatch(userSignOut());

        history.replace('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: 'darkgreen', position: 'sticky', top: '0px', zIndex: 1}}>
            <Link className="navbar-brand" to="/">
                CampusX
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                            Placement Program
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                            Mock Interview
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/dashboard">
                            Dashboard
                        </Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link className="nav-link"  onClick = {signOutHandler}>Sign Out</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default BootstrapNavbar;
