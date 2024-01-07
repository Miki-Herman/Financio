import React, { useState, useEffect } from "react";
import '../css/Register.css';
import { Card, Button, FloatingLabel, Form } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

function Register() {
    const [view, setView] = useState("login");
    const [error, setError] = useState(null);
    const [isGoogleSignIn, setIsGoogleSignIn] = useState(false); // State to track if Google Sign-In is used
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const handleCredentialResponse = async (response) => {
            const tokenResponse = response.credential;
            console.log("Encoded JWT ID token: " + tokenResponse);
            const decoded = jwtDecode(tokenResponse);
            const userEmail = decoded.email;

            try {
                const res = await axios.post('http://localhost:4000/auth/google-login', {
                    token: tokenResponse,
                    email: userEmail
                });

                console.log(res.data);
                // Handle post-login logic here
            } catch (error) {
                console.error('Error sending token to backend:', error);
                setError('Failed to authenticate with Google.');
            }
        };

        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse
            });

            window.google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "filled_blue", size: "medium" }
            );

            window.google.accounts.id.prompt(); // also display the One Tap dialog
        } else {
            console.error('Google Identity Services script not loaded');
        }
    }, []);

    const changeView = () => {
        setView(view === "login" ? "register" : "login");
        setIsGoogleSignIn(false); // Reset Google Sign-In state when switching views
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const endpoint = view === "login" ? "login" : "register";
        try {
            const response = await axios.post(`http://localhost:4000/auth/${endpoint}`, {
                email,
                password
            });
            if (response.status === 201) {
                alert("Successfully registered");
                setView("login");
            } else {
                console.log(response.data);
                // Save token to local storage
                localStorage.setItem('token', response.data.token);
                // navigation to other website after login here etc...
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert(error.response.data.message);
            setError('Failed to authenticate. ' + error.response.data.message);
        }
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
                        <Card.Title as="h2">Sign Up</Card.Title>
                        {error && <Card.Text className="error-message">{error}</Card.Text>}
                        <div id="buttonDiv"></div> {/* Google Sign-In button */}
                        {!isGoogleSignIn && (
                            <Form onSubmit={handleFormSubmit} style={{ padding: "30px" }}>
                                <FloatingLabel label="Email">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </FloatingLabel>
                                <FloatingLabel label="Password">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        style={{ margin: "20px 0" }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FloatingLabel>
                                <FloatingLabel label="Confirm Password">
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        style={{ margin: "20px 0" }}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </FloatingLabel>
                                <Button type="submit" style={{ marginTop: "15px" }}>
                                    {view === "login" ? "Log In" : "Sign Up"}
                                </Button>
                            </Form>
                        )}
                        <p className="Changer">Already a member? <a href="#!" onClick={changeView}>Login</a></p>
                    </Card>

                ) : (
                    <Card style={{ width: "30rem" }}>
                        <Card.Title as="h2">Login</Card.Title>
                        <Card.Text>
                            {error && <div className="error-message">{error}</div>}
                            <div id="buttonDiv"></div> {/* Google Sign-In button */}
                            {!isGoogleSignIn && (
                                <Form onSubmit={handleFormSubmit} style={{ padding: "30px" }}>
                                    <FloatingLabel label="Email">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </FloatingLabel>
                                    <FloatingLabel label="Password">
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            style={{ margin: "20px 0" }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </FloatingLabel>
                                    <Button type="submit" style={{ marginTop: "15px" }}>
                                        {view === "login" ? "Log In" : "Sign Up"}
                                    </Button>
                                </Form>
                            )}
                        </Card.Text>
                        <p className="Changer">Need an account? <a href="#!" onClick={changeView}>Sign up</a></p>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default Register;
