import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-content">
        <h1>
          FIND CLOTHES
          <br />
          THAT MATCH
          <br />
          YOUR STYLE
        </h1>

        <p>
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of style.
        </p>

        <button className="hero-btn">
          Shop Now
        </button>

        <div className="hero-stats">
          <div>
            <h3>200+</h3>
            <p>International Brands</p>
          </div>

          <div>
            <h3>2,000+</h3>
            <p>High-Quality Products</p>
          </div>

          <div>
            <h3>30,000+</h3>
            <p>Happy Customers</p>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="/images/hero-img-01.png"
          alt="Fashion models"
        />
      </div>

    </section>
  );
};

export default Hero;