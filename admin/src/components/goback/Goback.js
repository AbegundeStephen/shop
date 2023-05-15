import React from "react";
import './goback.css'
import { Link } from "react-router-dom";

const Goback = () => {
    return (
        <div className="goback">
         <Link to="/" className="link">Go Home</Link>
        </div>
    )
} 

export default Goback;
