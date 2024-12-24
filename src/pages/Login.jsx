import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Login = () => {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, validateLogin } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userName && password){
            if(validateLogin(userName,password)){
                login(userName);
                navigate('/tasks');
            }else{
                setError('Invalid username or password.')
            }
        }else{
            setError('Please enter both username and password.')
        }
    }
    return(
       <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>.
      </p>
       </div>
    )
}
export default Login;