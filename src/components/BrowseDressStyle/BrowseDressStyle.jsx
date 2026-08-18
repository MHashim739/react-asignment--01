import "./BrowseDressStyle.css";

const BrowseDressStyle = () => {
  return (
    <section className="browse-dress-style">

      <h2>BROWSE BY DRESS STYLE</h2>

      <div className="dress-style-grid">

        <div className="dress-style-box">
          <h3>Casual</h3>
          <img
            src="/images/man-01.png"
            alt="Casual"
          />
        </div>

        <div className="dress-style-box">
          <h3>Formal</h3>
          <img
            src="/images/man-02.png"
            alt="Formal"
          />
        </div>

        <div className="dress-style-box">
          <h3>Party</h3>
          <img
            src="/images/man-03.png"
            alt="Party"
          />
        </div>

        <div className="dress-style-box">
          <h3>Gym</h3>
          <img
            src="/images/man-04.png"
            alt="Gym"
          />
        </div>

      </div>

    </section>
  );
};

export default BrowseDressStyle;