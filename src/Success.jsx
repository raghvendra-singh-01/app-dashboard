import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center p-4 bg-green-100 rounded-lg shadow-lg">
                <img src="/favicon.ico" alt="Success Icon" className="w-16 h-16 mb-4" />
                <p className="text-green-700 font-semibold text-lg">Success! You are logged in.</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate("/dashboard")}>
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
