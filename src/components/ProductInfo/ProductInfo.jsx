import { useState } from "react";
import "./Productinfo.css";
import NewArrivals from "../NewArrivals/NewArrivals";
import CustomerReviews from "../CustomerReviews/CustomerReviews";
import FAQ from "../FAQ/FAQ";

const Productinfo = () => {
    const [activeTab, setActiveTab] = useState("details");
  return (
  <section className="product-info">

  <ul className="product-tabs">
    <li onClick={() => setActiveTab("details")}>
      Product Details
    </li>

    <li onClick={() => setActiveTab("reviews")}>
      Rating & Reviews
    </li>

    <li onClick={() => setActiveTab("faq")}>
      FAQ
    </li>
  </ul>

 {activeTab === "details" && (
  <div className="Product-details-content">
    <p>
      This product is designed with high-quality materials and a modern
      style. It provides excellent comfort, durability, and a great
      experience for everyday use.
    </p>
  </div>
)}

  {activeTab === "reviews" && (
    <CustomerReviews/>
  )}

  {activeTab === "faq" && (
    <FAQ/>
  )}
  <>
    <NewArrivals/>
  </>

</section>

  );
};

export default Productinfo;