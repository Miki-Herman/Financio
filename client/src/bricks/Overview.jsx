import React from "react";
import "../css/Overview.css"
import { Tab, Tabs } from "react-bootstrap"

function Overview () {
    return(
        <div className="Overview">
            <h1>Overview</h1>
                <Tabs defaultActiveKey="monthly" className="Tab" fill>
                <Tab eventKey="monthly" title="Monthly">
                    <ul className="list">
                        <li>January 2023</li> 
                        <li>March 2023</li>
                        <li>April 2023</li>
                        <li>July 2023</li>
                        <li>August 2023</li>
                        <li>September 2023</li>
                    </ul>
                </Tab>
                <Tab eventKey="yearly" title="Yearly">
                    <ul className="list">
                        <li>2020</li>
                        <li>2021</li>
                        <li>2022</li>
                        <li>2023</li>
                    </ul>
                </Tab>
                </Tabs>
        </div>
    )
}

export default Overview