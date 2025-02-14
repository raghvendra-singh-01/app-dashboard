import React, { useState } from 'react';

export default function AuthForm() {
    const [isLogin, setisLogin] = useState(true);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 3) {
            newErrors.password = 'Password must be more than 3 characters';
        }

        if (!isLogin && password !== ConfirmPassword) {
            newErrors.ConfirmPassword = 'Password does not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted'); // Debugging
        if (validateForm()) {
            console.log('Form is valid'); // Debugging
            if (isLogin) {
                console.log('Login Successful');
            } else {
                console.log('SignUp Successful');
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
                        <form className="form" onSubmit={handleSubmit}> {/* Added onSubmit */}
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
                        <form className="form" onSubmit={handleSubmit}> {/* Added onSubmit */}
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
                                value={ConfirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.ConfirmPassword && <p className='error'>{errors.ConfirmPassword}</p>}
                            <button type="submit">SignUp</button>
                        </form>
                    )
                }
            </div>
        </div>
    );
}