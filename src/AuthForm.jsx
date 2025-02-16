import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {
    const [isLogin, setisLogin] = useState(true);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

                /* Validation */
    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) { 
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin && password !== confirmPassword) {
            newErrors.confirmPassword = 'Password does not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

               /* Form Submission */
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted'); // Debugging
        if (validateForm()) {
            console.log('Form is valid'); // Debugging
            try {
                if (isLogin) {
                    // Login with Firebase
                    console.log('Attempting to log in...'); // Debugging
                    await signInWithEmailAndPassword(auth, email, password);
                    console.log('Login Successful');
                } else {
                    // Signup with Firebase
                    console.log('Attempting to sign up...'); // Debugging
                    await createUserWithEmailAndPassword(auth, email, password);
                    console.log('SignUp Successful');
                }
                navigate('/dashboard');
            } catch (error) {
                console.error('Authentication Error:', error.message); // Debugging
                setErrors({ general: error.message }); // Display Firebase error
            }
        } else {
            console.log('Form has errors:', errors); // Debugging
        }
    };

    return (
        <div className='container'>
            <div className="form-container">
                <div className="form-toggle">
                    <button className={isLogin ? 'active' : ""} onClick={() => setisLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ""} onClick={() => setisLogin(false)}>SignUp</button>
                </div>
                {
                    isLogin ? (
                        <form className="form" onSubmit={handleSubmit}>
                            <h2> Login Form </h2>
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                            {errors.email && <p className='error'>{errors.email}</p>}
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                            {errors.password && <p className='error'>{errors.password}</p>}
                            <a href='#'>Forgot Password?</a>
                            <button type="submit">Login</button>
                            <p>Not a Member ? <a href='#' onClick={() => setisLogin(false)}>SignUp Now</a></p>
                        </form>
                    ) : (
                        <form className="form" onSubmit={handleSubmit}>
                            <h2> Signup Form </h2>
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                            {errors.email && <p className='error'>{errors.email}</p>}
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                            {errors.password && <p className='error'>{errors.password}</p>}
                            <input
                                type='password'
                                placeholder='Confirm-Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
                            <button type="submit">SignUp</button>
                        </form>
                    )
                }
                {errors.general && <p className='error'>{errors.general}</p>} {/* Display Firebase errors */}
            </div>
        </div>
    );
}