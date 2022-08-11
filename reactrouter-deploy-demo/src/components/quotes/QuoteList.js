import { Fragment } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

// React QuoteList Functional Component
const QuoteList = (props) => {
  const history = useHistory();

  //const searchParams = history.location.search;
  const location = useLocation();
  const searchParams = location.search;

  console.log(location);

  const qparams = new URLSearchParams(searchParams);

  const sortAsc = qparams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, sortAsc);

  const changeSortingHandler = () => {
    // history.push({
    //   pathname: location.pathname,
    //   search: `?sort=${sortAsc ? "desc" : "asc"}`
    // });
    history.push(`${location.pathname}?sort=${sortAsc ? "desc" : "asc"}`);
  }

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>{`Sort ${sortAsc ? "Decending" : "Ascending"}`}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
