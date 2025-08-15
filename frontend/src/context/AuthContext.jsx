import { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // store user data
    const [token, setToken] = useState(null); // store jwt token
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    //Login
    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });
            localStorage.setItem('token', res.data.token); // store token in local storage
            setUser(res.data.user); // set user data
            navigate('/dashboard'); // redirect to dashboard
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert('Login failed. Please check your credentials.');
        }
    };

    //Register
    const register = async (name, email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/register`, {
                name,
                email,
                password
            });
            localStorage.setItem('token', res.data.token); // store token in local storage
            setUser(res.data.user); // set user data
            // setUser({
            //     id: res.data._id,
            //     name: res.data.name,
            //     email: res.data.email
            // });
            navigate('/dashboard'); // redirect to dashboard
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert('Registration failed. Please check your details.');
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token'); // remove token from local storage
        navigate('/'); // redirect to login page
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}