import React, { useEffect, useState } from 'react';
import { useStore } from '../../../../store/store';
import { updateUser } from '../../../../store/actions/userActions';

export const ProfileTab = () => {
  const [{ user }] = useStore();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = async (field: string) => {
    if (user?.id && formData[field as keyof typeof formData] !== user[field as keyof typeof user]) {
      try {
        await updateUser(user.id, {
          [field]: formData[field as keyof typeof formData]
        });
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile__content">
      <div className="profile__form">
        <div className="profile__form-group">
          <label>First Name</label>
          <div className="profile__input-wrapper">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={() => handleBlur('firstName')}
            />
          </div>
        </div>

        <div className="profile__form-group">
          <label>Last Name</label>
          <div className="profile__input-wrapper">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={() => handleBlur('lastName')}
            />
          </div>
        </div>

        <div className="profile__form-group">
          <label>Phone</label>
          <div className="profile__input-wrapper">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={() => handleBlur('phone')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};