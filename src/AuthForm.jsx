import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    /* Validation */
    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else {
            if (password.length < 6) {
                newErrors.password = 'Password must be at least 6 characters';
            }
            if (!/(?=.*[A-Z])/.test(password)) {
                newErrors.password = (newErrors.password || '') + ' Include at least one uppercase letter';
            }
            if (!/(?=.*\d)/.test(password)) {
                newErrors.password = (newErrors.password || '') + ' Include at least one number';
            }
        }

        // Signup-specific validations
        if (!isLogin) {
            // Name validation
            if (!name.trim()) {
                newErrors.name = 'Name is required';
            } else if (name.trim().length < 2) {
                newErrors.name = 'Name must be at least 2 characters';
            }

            // Confirm password validation
            if (!confirmPassword.trim()) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (password !== confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }

            // Phone, birth date, and address validations
            if (!phone.trim()) {
                newErrors.phone = 'Phone number is required';
            } else if (!/^\d{10}$/.test(phone)) {
                newErrors.phone = 'Invalid phone number (10 digits required)';
            }

            if (!birthDate) {
                newErrors.birthDate = 'Birth date is required';
            }

            if (!address.trim()) {
                newErrors.address = 'Address is required';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /* Form Submission */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (isLogin) {
                // Login with Firebase
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                // Signup with Firebase
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                // Save user data to Firestore
                // Update the setDoc call in handleSubmit
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    name: name.trim(),
                    email: email.toLowerCase(),
                    phone: phone.replace(/\D/g, ''), // Remove non-digit characters
                    birthDate: new Date(birthDate), // Store as timestamp
                    address: address.trim(),
                    createdAt: new Date(),
                    lastLogin: new Date(),
                    preferences: { // Add default preferences
                        theme: 'light',
                        notifications: true
                    }
                });
            }
            navigate('/dashboard');
        } catch (error) {
            console.error('Authentication Error:', error);
            setErrors({
                general: error.code.startsWith('auth/')
                    ? error.message.replace('Firebase: ', '')
                    : 'An error occurred. Please try again.'
            });
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        // Reset form fields when switching modes
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors({});
    };

    return (
        <div className='container'>
            <div className="form-container">
                <div className="form-toggle">
                    <button className={isLogin ? 'active' : ""} onClick={() => setIsLogin(true)}>
                        Login
                    </button>
                    <button className={!isLogin ? 'active' : ""} onClick={switchMode}>
                        SignUp
                    </button>
                </div>

                {isLogin ? (
                    <form className="form" onSubmit={handleSubmit}>
                        <h2>Login Form</h2>
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateForm}
                        />
                        {errors.email && <p className='error'>{errors.email}</p>}

                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={validateForm}
                        />
                        {errors.password && <p className='error'>{errors.password}</p>}

                        <button type="submit">Login</button>
                        <p>Not a Member? <button type="button" onClick={switchMode}>SignUp Now</button></p>
                    </form>
                ) : (
                    <form className="form" onSubmit={handleSubmit}>
                        <h2>Signup Form</h2>
                        <input
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={validateForm}
                        />
                        {errors.name && <p className='error'>{errors.name}</p>}

                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateForm}
                        />
                        {errors.email && <p className='error'>{errors.email}</p>}

                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={validateForm}
                        />
                        {errors.password && (
                            <div className='password-requirements'>
                                <p className='error'>{errors.password}</p>
                                <div className="hint">
                                    Password must contain:
                                    <ul>
                                        <li>At least 6 characters</li>
                                        <li>One uppercase letter</li>
                                        <li>One number</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        <input
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={validateForm}
                        />
                        {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}

                        {/* Add after name input */}
                        <input
                            type='tel'
                            placeholder='Phone Number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && <p className='error'>{errors.phone}</p>}

                        <input
                            type='date'
                            placeholder='Birth Date'
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                        {errors.birthDate && <p className='error'>{errors.birthDate}</p>}

                        <textarea
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.address && <p className='error'>{errors.address}</p>}

                        <button type="submit">SignUp</button>
                    </form>
                )}

                {errors.general && <p className='error general-error'>{errors.general}</p>}
            </div>
        </div>
    );
}