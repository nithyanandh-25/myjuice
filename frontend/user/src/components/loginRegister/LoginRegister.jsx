import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister, postLogin } from '../apis/LoginApis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './LoginRegister.css';

function LoginRegister({ closeModal }) {
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [mobilenumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsRegister(!isRegister);
        setError(null);
        setName('');
        setMobileNumber('');
        setPassword('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { id } = await postRegister(name, mobilenumber, password);
            sessionStorage.setItem('customerId', id);  // Store customerId
            alert('Registration successful! Redirecting to profile.');
            navigate('/Userinter');
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { id } = await postLogin(mobilenumber, password);
            sessionStorage.setItem('customerId', id);  // Store customerId
            alert('Login successful!');
            navigate('/Userinter');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleCancel = () => {
        closeModal();
        navigate('/');
    };

    return (
        <div className="login-register-container">
            <div className='header-log'>
                <h2 className='head-log'>{isRegister ? 'Register' : 'Login'}</h2>
                <div className='cancel-button'>
                    <button type="button" onClick={handleCancel} className="cancel-button">
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
            </div>
            <form onSubmit={isRegister ? handleRegister : handleLogin}>
                {isRegister && (
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        value={mobilenumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className='submit-button'>{isRegister ? 'Register' : 'Login'}</button>
                <p>
                    {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button type="button" onClick={toggleForm} className="toggle-button">
                        {isRegister ? 'Login here' : 'Register here'}
                    </button>
                </p>
            </form>
        </div>
    );
}

export default LoginRegister;
