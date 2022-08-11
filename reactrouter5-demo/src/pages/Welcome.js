import { Route } from "react-router-dom";

function Welcome() {
    return (
        <div>
            <h1>Welcome Page</h1>
            <Route path="/welcome/new-user">
                <p>New user, you are welcome!</p>
            </Route>
        </div>
    );
}

export default Welcome;