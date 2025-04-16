import "./index.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import { mockAuthService } from "../../store/actions/authActions.ts";

export const Login = () => {
  const navigate = useNavigate();
  const [, setState] = useStore();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setIsLoading(true);
      const user = await mockAuthService.signIn(formData.email);
      setState(prev => ({
        ...prev,
        user
      }));
      navigate("/devices");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Log in</h1>
        <p className="subtitle">Enter your details below to continue</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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

          <div className="forgot-password">
            <button type="button" onClick={() => navigate('/change-password')}>
              Forgot password?
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>

          <div className="auth-prompt">
            <span>Don't have an account?</span>
            <br/>
            <button type="button" onClick={() => navigate('/signup')}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
