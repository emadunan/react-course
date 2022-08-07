import ReactDOM from "react-dom";

import classes from "./ErrorModal.module.css";

import Card from "../UI/Card";
import Button from "../UI/Button";
import Wrapper from "../helpers/Wrapper";

function ErrModal(props) {
    return (
        <Wrapper>
            <div className={classes.backdrop} onClick={props.onRemoveError} />
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={classes.content}>
                    <p>{props.message}</p>
                </div>
                <footer className={classes.actions}>
                    <Button onClick={props.onRemoveError}>Okay</Button>
                </footer>
            </Card>
        </Wrapper>
    );
}

function ErrorModal(props) {
    return (
        <>
            {ReactDOM.createPortal(<ErrModal onRemoveError={props.onRemoveError} title={props.title} message={props.message}/>, document.getElementById("modal"))}
        </>
    );
}

export default ErrorModal;