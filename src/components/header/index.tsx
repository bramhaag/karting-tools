import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

const Header: FunctionalComponent = () => {
    return (
        <header class={style.header}>
            <h1>Preact App</h1>
            <nav>
                <Link activeClassName={style.active} href="/laptimes">
                    Lap Times Parser
                </Link>
                <Link activeClassName={style.active} href="/comparer">
                    Lap Comparer
                </Link>
            </nav>
        </header>
    );
};

export default Header;
