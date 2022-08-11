import { NavLink } from "react-router-dom";

import classes from "./MainHeader.module.css";

function MainHeader() {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink
                            className={navData => navData.isActive ? classes.isActive : ""}
                            to="/welcome">
                                Welcome
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={navData => navData.isActive ? classes.isActive : ""}
                            to="/products">
                                Products
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainHeader;