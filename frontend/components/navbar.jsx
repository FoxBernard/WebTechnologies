import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {

    return (

        <div className="navbar">
            <h2> INVITY Logo</h2>
            {/* This links to the login page*/}
            <Link to="/login"><button>Sign in</button></Link>
        </div>

    );
    
}