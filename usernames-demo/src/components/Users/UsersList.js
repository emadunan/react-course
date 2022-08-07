import classes from "./UsersList.module.css";

import UserItem from "./UserItem";
import Card from "../UI/Card";

function UsersList(props) {
    return (
        <Card className={classes.users}>
            <ul>
                {props.users.map(user => <UserItem key={user.id} username={user.username} age={user.age} />)}
            </ul>
        </Card>
    );
}

export default UsersList;