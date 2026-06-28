import { useAuth } from '../../hooks/useAuth';
import { DEFAULT_PROFILES } from '../../config/navigation';

export default function Sidebar() {
  const { user, getProfileField } = useAuth();
  const role = user?.role || 'student';
  const profile = DEFAULT_PROFILES[role] || DEFAULT_PROFILES.student;

  const userProfile = user?.profile || {};
  const displayName = userProfile.name || user?.name || profile.name;
  const email = userProfile.email || getProfileField('email', profile.email);
  const contact = userProfile.phone || getProfileField('phone', profile.contact);
  const course = userProfile.course || profile.course;
  const address = userProfile.address || profile.address;
  const dob = userProfile.dob || profile.dob;
  const id = userProfile.studentId || userProfile.id || profile.id;
  const photo = userProfile.photoUrl || profile.photo;

  return (
    <aside>
      <div className="profile">
        <div className="top">
          <div className="profile-photo">
            <img src={photo} alt="Profile Picture" />
          </div>
          <div className="info">
            <p>Hey, <b>{displayName}</b></p>
            <small className="text-muted">{id}</small>
          </div>
        </div>
        <div className="about">
          <h5>Course</h5>
          <p>{course}</p>
          {dob && (
            <>
              <h5>DOB</h5>
              <p>{dob}</p>
            </>
          )}
          <h5>Contact</h5>
          <p>{contact}</p>
          <h5>Email</h5>
          <p>{email}</p>
          <h5>Address</h5>
          <p>{address}</p>
        </div>
      </div>
    </aside>
  );
}
