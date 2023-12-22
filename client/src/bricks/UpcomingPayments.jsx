import React from "react";
import "../css/UpcomingPayments.css"
import { Table, Button } from "react-bootstrap"

function UpcomingPayments() {
    return(
        <div className="Payments">
            <h1>Upcoming payments</h1>
            <Table hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>30. 11. 2023</td>
                        <td>500 Kč</td>
                        <td>Spotify premium</td>
                        <td><Button variant="primary">G-Calendar button</Button></td>
                    </tr>
                    <tr>
                        <td>7. 12. 2023</td>
                        <td>1500 Kč</td>
                        <td>Electricity</td>
                        <td><Button variant="primary">G-Calendar button</Button></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default UpcomingPayments