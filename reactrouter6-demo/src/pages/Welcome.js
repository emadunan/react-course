import { Link, Outlet } from "react-router-dom";

function Welcome() {

    return (
        <div>
            <h1>Welcome Page</h1>
            <Link to="new-user">New User</Link>
            <Outlet />
        </div>
    );
}

export default Welcome;