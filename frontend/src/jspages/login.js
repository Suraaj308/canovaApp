import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../jsstyles/login.css';

function Login() {
    const [mode, setMode] = useState('login'); // login, signup, forgot, otp, reset
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const resetFormFields = () => {
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setOtp('');
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setError('');
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                navigate('/home');
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: username, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setError('');
                resetFormFields();
                setMode('login');
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/auth/forgotpassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                setError('');
                setMode('otp');
            } else {
                setError(data.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/auth/verifyotp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otpvalue: otp })
            });
            const data = await response.json();
            if (response.ok) {
                setError('');
                setMode('reset');
            } else {
                setError(data.message || 'Invalid OTP');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_LINK}/auth/resetpassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otpvalue: otp, newpassword: password })
            });
            const data = await response.json();
            if (response.ok) {
                setError('');
                resetFormFields();
                setMode('login');
            } else {
                setError(data.message || 'Password reset failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    const renderForm = () => {
        switch (mode) {
            case 'login':
                return (
                    <>
                        <h2 className="heading">Welcome CANOVA 👋</h2>
                        <p>Today is a new day. It's your day. You shape it. <br />
                            Sign in to start managing your projects.</p>
                        <div onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <p className="link" onClick={() => setMode('forgot')}>Forgot Password?</p>
                            {error && <p className="error">{error}</p>}
                            <button onClick={handleLogin}>Login</button>
                            <p>Don't have an account? <span className="link" onClick={() => { resetFormFields(); setMode('signup'); }}>Sign Up</span></p>
                        </div>
                    </>
                );
            case 'signup':
                return (
                    <>
                        <h2 className="heading">Sign Up for CANOVA</h2>
                        <p>Create your account to start managing your projects.</p>
                        <div onSubmit={handleSignup}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="error">{error}</p>}
                            <button onClick={handleSignup}>Sign Up</button>
                            <p>Already have an account? <span className="link" onClick={() => { resetFormFields(); setMode('login'); }}>Login</span></p>
                        </div>
                    </>
                );
            case 'forgot':
                return (
                    <>
                        <h2 className="heading">Forgot Password</h2>
                        <p>Enter your email to receive an OTP.</p>
                        <div onSubmit={handleForgotPassword}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="error">{error}</p>}
                            <button onClick={handleForgotPassword}>Send OTP</button>
                            <p>Back to <span className="link" onClick={() => { resetFormFields(); setMode('login'); }}>Login</span></p>
                        </div>
                    </>
                );
            case 'otp':
                return (
                    <>
                        <h2 className="heading">Enter OTP</h2>
                        <p>Check your email for the OTP.</p>
                        <div onSubmit={handleOtpSubmit}>
                            <div className="form-group">
                                <label htmlFor="otp">OTP:</label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="error">{error}</p>}
                            <button onClick={handleOtpSubmit}>Verify OTP</button>
                            <p>Back to <span className="link" onClick={() => { resetFormFields(); setMode('login'); }}>Login</span></p>
                        </div>
                    </>
                );
            case 'reset':
                return (
                    <>
                        <h2 className="heading">Reset Password</h2>
                        <p>Enter your new password.</p>
                        <div onSubmit={handleResetPassword}>
                            <div className="form-group">
                                <label htmlFor="password">New Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="error">{error}</p>}
                            <button onClick={handleResetPassword}>Reset Password</button>
                            <p>Back to <span className="link" onClick={() => { resetFormFields(); setMode('login'); }}>Login</span></p>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="login-container">
            <div className="main-card">
                {renderForm()}
            </div>
        </div>
    );
}

export default Login;