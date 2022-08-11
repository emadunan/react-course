import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes";
import NotFound from "./pages/NotFound";

import LoadingSpinner from "./components/UI/LoadingSpinner";

// LAZY-LOADING************************************************** */
// import QuoteDetail from "./pages/QuoteDetail";
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));

// import NewQuote from "./pages/NewQuote";
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
//*************************************************************** */

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
