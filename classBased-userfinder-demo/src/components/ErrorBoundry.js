import {Component} from "react";

class ErrorBoundry extends Component {
    constructor () {
        super();
        this.state = {
            hasError: false
        }
    }
    componentDidCatch(err) {
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            return <h3>Something went wrong!</h3>
        }

        return this.props.children;
    }
}

export default ErrorBoundry;