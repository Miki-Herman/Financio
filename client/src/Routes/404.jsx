import React from "react"
import Button from "react-bootstrap/Button"
import { Link } from 'react-router-dom';

function NotFound() {

    return(
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
            <div>
                <div className="Logo"><h1>Financ•io</h1></div>
                <h2>404 - Not Found</h2>
                <Link to="/" style={{ marginTop: "20px" }}>
                <Button variant="primary" style={{marginTop: "20px"}}>Back to main page</Button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound