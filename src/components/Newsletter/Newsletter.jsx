import "./Newsletter.css";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <h2>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>

      <div className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email address"
        />

        <button>Subscribe</button>
      </div>
    </section>
  );
};

export default Newsletter;