import React, {useState} from "react";
import '../css/Register.css'
import { Card, Button, FloatingLabel, Form} from 'react-bootstrap'



function Register() {

const [view, setView] = useState("login")

const changeView = () => {
    view === "login" ? setView("register") : setView("login")
}

 return (
        <div className="Register">
            <div className="Logo">
                <h1>Financ•io</h1>
                <p>Start saving money now.</p>
            </div>
            <div className="Card">
                {view === "register" ? (
                    <Card style={{ width: "30rem" }}>
                        <Card.Title as="h2">Sign up</Card.Title>
                        <Card.Text>
                            <Button variant="outline-primary" className="GoogleButton">Continue with Google</Button>
                            <Form style={{padding: "30px"}}>
                                <FloatingLabel label="Email">
                                    <Form.Control type="email" placeholder="Email" />
                                </FloatingLabel>
                                <FloatingLabel label="Password">
                                    <Form.Control type="password" placeholder="Password" style={{margin:"20px 0"}}/>
                                </FloatingLabel>
                                <FloatingLabel label="Repeat password">
                                    <Form.Control type="password" placeholder="Password" />
                                </FloatingLabel>
                                <Button type="submit" style={{marginTop: "15px"}}>Sign up</Button>
                                <p className="Changer">Already a member? <a href="#!" onClick={changeView}>Login</a></p>
                            </Form>
                        </Card.Text>
                    </Card> 
                ) : (
                    <Card style={{ width: "30rem" }}>
                        <Card.Title as="h2">Login</Card.Title>
                        <Card.Text>
                            <Button variant="outline-primary" className="GoogleButton">Continue with Google</Button>
                            <Form style={{padding: "30px"}}>
                                <FloatingLabel label="Email">
                                    <Form.Control type="email" placeholder="Email" />
                                </FloatingLabel>
                                <FloatingLabel label="Password">
                                    <Form.Control type="password" placeholder="Password" style={{margin:"20px 0"}}/>
                                </FloatingLabel>
                                <Button type="submit" style={{marginTop: "15px"}}>Login</Button>
                                <p className="Changer">Need an account? <a href="#!" onClick={changeView}>Sign up</a></p>
                            </Form>
                        </Card.Text>
                    </Card>
                )}
            </div>
        </div>
)}

export default Register