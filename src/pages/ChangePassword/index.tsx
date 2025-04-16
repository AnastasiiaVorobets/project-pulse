import "../Login/index.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockAuthService } from "../../store/actions/authActions.ts";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      await mockAuthService.resetPassword(email);
      setIsEmailSent(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h1>Check your email</h1>
          <p className="subtitle">We have sent a password reset link to your email</p>
          <button
            onClick={() => navigate('/login')}
            className="auth-button"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Forgot Password?</h1>
        <p className="subtitle">Enter your email to reset your password</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Reset Password'}
          </button>

          <div className="auth-prompt">
            <span>Remember your password?</span>
            <br/>
            <button
              type="button"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};