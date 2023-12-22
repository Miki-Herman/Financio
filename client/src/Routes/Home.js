import React from "react"
import Transactions from "../bricks/Transactions"
import Cashflow from "../bricks/Cashflow"
import SavingGoal from "../bricks/SavingGoal"
import Overview from "../bricks/Overview"
import UpcomingPayments from "../bricks/UpcomingPayments"
import Button from "react-bootstrap/Button"
import { Container, Row, Col } from "react-bootstrap"

function Home() {

    return( 
        <div>
            <Button variant="primary">Logout</Button>
            <Transactions/>
            <SavingGoal/>
            <Container fluid>
                <Row>
                    <Col sm lg={2}><Cashflow/></Col>
                    <Col sm lg={3}><Overview/></Col>
                    <Col sm={12} lg={7}><UpcomingPayments/></Col>
                </Row>
            </Container>
        </div>
        
    )
}

export default Home