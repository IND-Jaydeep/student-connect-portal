import { useAuth } from '../../hooks/useAuth';
import { DEFAULT_PROFILES } from '../../config/navigation';

export default function Sidebar() {
  const { user, getProfileField } = useAuth();
  const role = user?.role || 'student';
  const profile = DEFAULT_PROFILES[role] || DEFAULT_PROFILES.student;

  const displayName = user?.name || profile.name;
  const email = getProfileField('email', profile.email);
  const contact = getProfileField('phone', profile.contact);

  return (
    <aside>
      <div className="profile">
        <div className="top">
          <div className="profile-photo">
            <img src={profile.photo} alt="Profile Picture" />
          </div>
          <div className="info">
            <p>Hey, <b>{displayName}</b></p>
            <small className="text-muted">{profile.id}</small>
          </div>
        </div>
        <div className="about">
          <h5>Course</h5>
          <p>{profile.course}</p>
          {profile.dob && (
            <>
              <h5>DOB</h5>
              <p>{profile.dob}</p>
            </>
          )}
          <h5>Contact</h5>
          <p>{contact}</p>
          <h5>Email</h5>
          <p>{email}</p>
          <h5>Address</h5>
          <p>{profile.address}</p>
        </div>
      </div>
    </aside>
  );
}
