import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignup } from "../../store/actions/authActions";

export const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSignupDone, setIsSignupDone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Convert name to required fields format
    const signupData = {
      email: `${formData.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      password: formData.password,
      firstName: formData.name.split(' ')[0],
      lastName: formData.name.split(' ')[1] || '',
    };
    await handleSignup(signupData, setError, setIsSignupDone);
  };

  if (isSignupDone) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h1>Registration Successful!</h1>
          <p className="subtitle">You can now log in to your account</p>
          <button
            onClick={() => navigate('/login')}
            className="auth-button"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Sign up</h1>
        <p className="subtitle">Enter your details below to continue</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <div className="password-input">
              <input
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button type="button" className="eye-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5ZM12 17.5C9.24 17.5 7 15.26 7 12.5C7 9.74 9.24 7.5 12 7.5C14.76 7.5 17 9.74 17 12.5C17 15.26 14.76 17.5 12 17.5ZM12 9.5C10.34 9.5 9 10.84 9 12.5C9 14.16 10.34 15.5 12 15.5C13.66 15.5 15 14.16 15 12.5C15 10.84 13.66 9.5 12 9.5Z" fill="#A1A1AA"/>
                </svg>
              </button>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="auth-button">
            Sign up
          </button>

          <div className="auth-prompt">
            <span>Already have an account?</span>
            <br/>
            <button type="button" onClick={() => navigate('/login')}>
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
