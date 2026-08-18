import { useState } from "react";
import { FaStar, FaCheckCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./CustomerReviews.css";
const reviews = [
  {
    name: "Sarah M.",
    text: "The quality is amazing and the clothes look exactly like the pictures. I am very happy with my purchase."
  },
  {
    name: "Alex K.",
    text: "I really love the style and quality. The delivery was quick and everything arrived perfectly."
  },
  {
    name: "James L.",
    text: "Great products and excellent quality. The fit was perfect and I will definitely shop here again."
  },
  {
    name: "Emily R.",
    text: "I am impressed with the quality and design. Everything feels comfortable and looks great."
  },
  {
    name: "Daniel W.",
    text: "SHOP.CO has become one of my favorite places to shop. The products are stylish and affordable."
  },
  {
    name: "Olivia P.",
    text: "Amazing shopping experience. The clothes are comfortable, stylish and the quality is excellent."
  }
];

const CustomerReviews = () => {
  const [current, setCurrent] = useState(0);

  const nextReview = () => {
    setCurrent((prev) =>
      prev === reviews.length - 1 ? 0 : prev + 1
    );
  };

  const previousReview = () => {
    setCurrent((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  };

  return (
    <section className="customer-reviews">

      <div className="reviews-header">
        <h2>OUR HAPPY CUSTOMERS</h2>

        <div className="review-arrows">
          <button onClick={previousReview}>
            <FaArrowLeft />
          </button>

          <button onClick={nextReview}>
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div
  className="reviews-slider"
  style={{
    transform: `translateX(-${current * 33.333}%)`
  }}
>
        {reviews.map((review, index) => (
          <div
            className={`review-card ${
              index === current ? "active-review" : ""
            }`}
            key={index}
          >

            <div className="review-stars">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>

            <div className="review-name">
              <h3>{review.name}</h3>
              <FaCheckCircle />
            </div>

            <p>{review.text}</p>

          </div>
        ))}
      </div>

    </section>
  );
};

export default CustomerReviews;