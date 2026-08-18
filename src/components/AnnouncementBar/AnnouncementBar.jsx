import './AnnouncementBar.css';

const AnnouncementBar = () => {
  return (
    <div className="announcement-bar">
      <p>
        Sign up and get 20% off to your first order.{' '}
        <a href="#">Sign Up Now</a>
      </p>

      <button className="announcement-close" aria-label="Close">
        ×
      </button>
    </div>
  );
};

export default AnnouncementBar;