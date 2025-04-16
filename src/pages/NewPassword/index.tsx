import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LogoutIco } from "../../utils/constants/images";
import { mockAuthService } from "../../store/actions/authActions.ts";

export const NewPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const oobCode = searchParams.get('oobCode');
      if (!oobCode) {
        throw new Error('Invalid password reset code');
      }
      
      await mockAuthService.confirmPasswordReset(oobCode, password);
      setIsPasswordChanged(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (isPasswordChanged) {
    return (
      <div className='new-password'>
        <div className='new-password__content'>
          <div className='new-password__header'>
            {LogoutIco}
            <h1>Password Changed!</h1>
            <p>Your password has been successfully changed</p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className='new-password__submit-button'
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='new-password'>
      <div className='new-password__content'>
        <div className='new-password__header'>
          {LogoutIco}
          <h1>Create New Password</h1>
          <p>Please enter your new password</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='new-password__form'>
            <div className='new-password__form-item'>
              <label>New Password</label>
              <input
                type='password'
                placeholder='Enter your new password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='new-password__form-item'>
              <label>Confirm New Password</label>
              <input
                type='password'
                placeholder='Confirm your new password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className='validation-error'>{error}</p>}
            <button
              type='submit'
              className='new-password__submit-button'
            >
              Change Password
            </button>
            <button
              type='button'
              onClick={() => navigate('/login')}
              className='new-password__back-button'
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};