import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { register } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData.name, formData.email, formData.password);
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='name'
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type='email'
                    name='email'
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br />
                <input
                    type='password'
                    name='password'
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <br />
                <button type='submit'>Register</button>
            </form>
        </div>
    );
}