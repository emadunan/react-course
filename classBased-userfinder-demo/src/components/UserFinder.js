import { Fragment, Component } from 'react';
import UsersContext from '../context/users-context';
import ErrorBoundry from './ErrorBoundry';

import classes from "./UserFinder.module.css";
import Users from './Users';

class UserFinder extends Component {
    constructor() {
        super();
        this.state = {
            filteredUsers: [],
            searchTerm: ""
        }
    }

    static contextType = UsersContext;

    componentDidMount() {
        this.setState({ filteredUsers: this.context.users })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) {
            this.setState({
                filteredUsers: this.context.users.filter((user) => user.name.includes(this.state.searchTerm))
            })
        }
    }

    searchChangeHandler(event) {
        this.setState({ searchTerm: event.target.value });
    };

    render() {
        return (
            <Fragment>
                <div className={classes.finder}>
                    <input type='search' onChange={this.searchChangeHandler.bind(this)} />
                </div>
                <ErrorBoundry>
                    <Users users={this.state.filteredUsers} />
                </ErrorBoundry>
            </Fragment>
        );
    }
}

// const UserFinder = () => {
//     const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         setFilteredUsers(
//             DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//         );
//     }, [searchTerm]);

//     const searchChangeHandler = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     return (
//         <Fragment>
//             <div className={classes.finder}>
//                 <input type='search' onChange={searchChangeHandler} />
//             </div>
//             <Users users={filteredUsers} />
//         </Fragment>
//     );
// };

export default UserFinder;