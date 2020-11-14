import { FunctionalComponent, h } from "preact";
import { Navbar } from "preact-bulma";
import { getUrlWithoutParams } from "../../util/history_util";
const Header: FunctionalComponent = () => {
    return (
        <Navbar.Navbar class="is-dark">
            <Navbar.Brand>
                <span>Karting Tools</span>
            </Navbar.Brand>
            <Navbar.Menu side="end">
                <a href="/laptimes" class="navbar-item">
                    Lap Times Parser
                </a>
                <a href="/comparer" class="navbar-item">
                    Lap Comparer
                </a>
            </Navbar.Menu>
        </Navbar.Navbar>
    );
};

export default Header;
