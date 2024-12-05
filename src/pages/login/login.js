import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { setIsSignedIn, setUser, user } = useAuth();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/loginCoinbase`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to get Coinbase login URL");
            }

            const data = await response.json();
            const coinbaseUrl = data.url;

            window.location.href = coinbaseUrl;


        } catch (error) {
            console.error("Error:", error);
        }
    }


    return (
        <div className="login-container">
            <h2>Login Page</h2>
            <button className="login-button" onClick={handleLogin}>Log In</button>
        </div>
    );
};
export default Login;