import classes from "./UserItem.module.css";

function UserItem(props) {
    return (
        <li>
            {props.username} ({props.age} years old!)
        </li>
    );
}

export default UserItem;