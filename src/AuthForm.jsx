import React, { useState } from 'react'

export default function () {
    const [isLogin, setisLogin] = useState(true);
    return (
        <div className='container'>
            <div className="form-container">
                <div className="form-toggle">
                    <button className={isLogin ? 'active' : ""} onClick={() => setisLogin(true)}>Login</button>
                    <button className={!isLogin ? 'active' : ""} onClick={() => setisLogin(false)}>SignUp</button>
                </div>
                {
                    isLogin ? <div className="form">
                        <h2> Login Form </h2>
                        <input type='email' placeholder='Email' />
                        <input type='password' placeholder='Password' />
                        <a href='#'>Forgot Password?</a>
                        <button>Login</button>
                        <p>Not a Member ? <a href='#' onClick={() => setisLogin(false)}>SignUp Now</a></p>
                    </div>
                        :
                        <div className="form">
                            <h2> Signup Form </h2>
                            <input type='email' placeholder='Email' />
                            <input type='password' placeholder='Password' />
                            <input type='password' placeholder='Confirm-Password' />
                            <button>SignUp</button>
                        </div>

                }
            </div>

        </div>
    )
}
