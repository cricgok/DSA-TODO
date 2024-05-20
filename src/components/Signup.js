// Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    });

    const navigate = useNavigate();

    const { username, email, password, phone } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/signup', formData);
            console.log('Signup successful:', res.data);
            navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            console.error('Error signing up:', error.response?.data?.message || error.message || 'Unknown error');
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        placeholder="Enter your phone number"
                        name="phone"
                        value={phone}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p className="login-link">Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default Signup;
