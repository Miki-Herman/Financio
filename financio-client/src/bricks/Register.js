import React, { useState, useEffect } from "react";
import '../css/Register.css';
import { Card, Button, FloatingLabel, Form } from 'react-bootstrap';

function Register() {
    const [view, setView] = useState("login");
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadGoogleApi = () => {
            if (!window.gapi) {
                console.error('Google API not loaded');
                setError('Failed to load Google API.');
                return;
            }
            // Used for debugging
            //console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({


                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                }).then(() => {
                    console.log("Google Auth API successfully initialized");
                }, error => {
                    console.error("Error initializing Google Auth API", error);
                    setError('Error initializing Google authentication.');
                });
            });
        };

        loadGoogleApi();
    }, []);

    const handleGoogleLogin = () => {
        if (!window.gapi || !window.gapi.auth2) {
            console.error("Google API or Auth2 not loaded");
            setError("Google login is currently unavailable.");
            return;
        }

        const auth2 = window.gapi.auth2.getAuthInstance();
        if (!auth2) {
            console.error("Google Auth2 instance not available");
            setError("Google login is currently unavailable.");
            return;
        }

        auth2.signIn().then(googleUser => {
            const id_token = googleUser.getAuthResponse().id_token;
            console.log("ID Token: " + id_token);
            // Ssend the id_token to backend here for verification and to create a user session
        }, error => {
            if (error.error === "popup_closed_by_user") {
                console.log("Sign-in was closed by the user.");
                // Optionally set a state to show a message or handle this case specifically
            } else {
                console.error("Error during Google sign-in", error);
                setError("An error occurred during sign-in. Please try again.");
            }
        });
    }

    const changeView = () => {
        view === "login" ? setView("register") : setView("login");
    };

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
                            {error && <div className="error-message">{error}</div>}
                            <Button variant="outline-primary" className="GoogleButton" onClick={handleGoogleLogin}>
                                Continue with Google
                            </Button>
                            <Form style={{ padding: "30px" }}>
                                <FloatingLabel label="Email">
                                    <Form.Control type="email" placeholder="Email" />
                                </FloatingLabel>
                                <FloatingLabel label="Password">
                                    <Form.Control type="password" placeholder="Password" style={{ margin: "20px 0" }} />
                                </FloatingLabel>
                                <FloatingLabel label="Repeat password">
                                    <Form.Control type="password" placeholder="Password" />
                                </FloatingLabel>
                                <Button type="submit" style={{ marginTop: "15px" }}>Sign up</Button>
                                <p className="Changer">Already a member? <a href="#!" onClick={changeView}>Login</a></p>
                            </Form>
                        </Card.Text>
                    </Card>
                ) : (
                    <Card style={{ width: "30rem" }}>
                        <Card.Title as="h2">Login</Card.Title>
                        <Card.Text>
                            {error && <div className="error-message">{error}</div>}
                            <Button variant="outline-primary" className="GoogleButton" onClick={handleGoogleLogin}>
                                Continue with Google
                            </Button>
                            <Form style={{ padding: "30px" }}>
                                <FloatingLabel label="Email">
                                    <Form.Control type="email" placeholder="Email" />
                                </FloatingLabel>
                                <FloatingLabel label="Password">
                                    <Form.Control type="password" placeholder="Password" style={{ margin: "20px 0" }} />
                                </FloatingLabel>
                                <Button type="submit" style={{ marginTop: "15px" }}>Login</Button>
                                <p className="Changer">Need an account? <a href="#!" onClick={changeView}>Sign up</a></p>
                            </Form>
                        </Card.Text>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default Register