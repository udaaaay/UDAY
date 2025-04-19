import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function Delete() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const payload = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        try {
            const response = await fetch('http://localhost:8080/delete/', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('User deleted successfully.');
                navigate('/');
            } else {
                const { error } = await response.json();
                setError(error || 'Failed to delete user. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="background">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="Enter your username"
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Enter your password"
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}