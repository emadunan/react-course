import { Fragment, useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

// const DUMMY_QUOTES = [
//     { id: "q1", author: "Max", text: "Learning React is awesome" },
//     { id: "q2", author: "Emad", text: "Learning Redux is fun" },
//     { id: "q3", author: "Marina", text: "Learning Programming is important" },
// ];

function QuoteDetail() {
    const params = useParams();
    const match = useRouteMatch();

    // debugger;
    const { quoteId } = params;
    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
    //const { sendRequest, status, data: loadedQuotes, error } = useHttp(getAllQuotes, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === "pending") {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <p className="centered focused">{error}</p>
    }

    if (status === "compeleted" && !loadedQuote.text) {
        return <h3>No quote was found!</h3>
    }

    return (
        <Fragment>
            <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>
                        Load Comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    )
}

export default QuoteDetail;