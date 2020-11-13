import { FunctionalComponent, h } from "preact";

import NotFoundPage from "../routes/notfound";
import Header from "./header";
import LapTimes from "../routes/laptimes";
import Redirect from "./redirect";
import Comparer from "../routes/comparer";
import Router, { Route, RouterOnChangeArgs } from "preact-router";
import { createHashHistory } from "history";

const App: FunctionalComponent = () => {
    let currentUrl: string;
    const handleRoute = (e: RouterOnChangeArgs) => {
        currentUrl = e.url;
    };

    return (
        <div id="app">
            <Header />
            <Router onChange={handleRoute} history={createHashHistory()}>
                <Redirect path="/" to="/laptimes" />
                <Route path="/laptimes" component={LapTimes} />
                <Route path="/comparer" component={Comparer} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;
