import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import CSS file for styling

const Login = () => {
    // eslint-disable-next-line
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = async () => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/api/login', {
                email,
                password
            });
            setLoading(false);
            console.log(response);
            navigate('/h');
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 401) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await handleLogin();
    };

    return (
        <div className="login-container">
            <h2 color='black'>Login</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="6"
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p className="signup-link">New user? <Link to="/signup">Sign up here</Link></p>
        </div>
    );
};

export default Login;
