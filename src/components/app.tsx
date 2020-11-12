import { FunctionalComponent, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import NotFoundPage from "../routes/notfound";
import Header from "./header";
import LapTimes from "../routes/laptimes";
import Redirect from "./redirect";
import Comparer from "../routes/comparer";
import BASE_PATH from "../baseroute";

const App: FunctionalComponent = () => {
    let currentUrl: string;
    const handleRoute = (e: RouterOnChangeArgs) => {
        currentUrl = e.url;
    };

    return (
        <div id="app">
            <Header />
            <Router onChange={handleRoute}>
                <Redirect path={`${BASE_PATH}/`} to="/laptimes" />
                <Route path={`${BASE_PATH}/laptimes`} component={LapTimes} />
                <Route path={`${BASE_PATH}/comparer`} component={Comparer} />
                <NotFoundPage default />
            </Router>
        </div>
    );
};

export default App;
