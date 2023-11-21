import React from "react";
import '../css/Register.css'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'



function Register() {
 return (
        <div className="Register">
            <Stack direction="horizontal" className="Stack">
            <div className="Logo">
                <h1>Financ•io</h1>
                <p>Start saving money now.</p>
            </div>
            <div className="Form" >
            <Tabs fill defaultActiveKey="SignUp">
                <Tab title="Sign up" eventKey="SignUp" className="Tab">
                <Button>Continue with Google</Button>
                    <h4>or</h4>
                    <Form>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Control type="password" placeholder="Password" />
                        <Form.Control type="password" placeholder="Password" />
                        <Button type="submit">Sign up</Button>
                    </Form>
                </Tab>

                <Tab title="Login" eventKey="SignIn" className="Tab">
                    <div>
                    <Button >Continue with Google</Button>
                    <h4>or</h4>
                    <Form >
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Control type="password" placeholder="Password" />
                        <Button type="submit">Sign up</Button>
                    </Form>
                    </div>
                </Tab>
            </Tabs>
            </div>
            </Stack>
        </div>
 )
}

export default Register