import { FunctionalComponent, h } from "preact";
import { Navbar } from "preact-bulma";
import BASE_PATH from "../../baseroute";

const Header: FunctionalComponent = () => {
    return (
        <Navbar.Navbar class="is-dark">
            <Navbar.Brand><span>Karting Tools</span></Navbar.Brand>
            <Navbar.Menu side="end">
                <a href={`${BASE_PATH}/laptimes`} class="navbar-item">Lap Times Parser</a>
                <a href={`${BASE_PATH}/comparer`} class="navbar-item">Lap Comparer</a>
            </Navbar.Menu>
        </Navbar.Navbar>
    );
};

export default Header;
