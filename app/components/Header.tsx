import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";




export default function Header() {
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <nav>
                <Link to="/">Home</Link>
                <br></br>
                <Link to="/newsurvey">Create New Survey</Link>
                <br></br>
                <Link to="/allsurveys">All Surveys</Link>
            </nav>


        </div>
    );
}
