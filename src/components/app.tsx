import { FunctionalComponent, h } from "preact";

import NotFoundPage from "../routes/notfound";
import Header from "./header/header";
import LapTimes from "../routes/laptimes";
import Redirect from "./redirect";
import Comparer from "../routes/comparer";
import Router, { Route } from "preact-router";
import { createHashHistory } from "history";

const App: FunctionalComponent = () => {
    const hashHistory = createHashHistory()

    return (
        <div id="app">
            <Header />
            <Router history={hashHistory}>
                <Redirect path="/" to="/comparer" />
                <LapTimes path="/laptimes" />
                <Comparer path="/comparer" />
                <Comparer path="/comparer/:targetId/:opportunityId"/>
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;
