import React, { useState, useEffect } from 'react';
import "../styles/HomePage.css";
import axios from 'axios';
import CarouselComponent from '../components/Carousel';
import AboutUs from '../assets/About_us.jfif';
import CardGrid from '../components/CardGrid';

const fetchAndStorePlans = async () => {
  try {
    const response = await axios.get('http://localhost:8082/plan/getAllPlans', { withCredentials: true });
    const plans = response.data;

    // Add an id property to each plan, starting from 1
    const plansWithIds = plans.map((plan, index) => ({
      id: index + 1,
      ...plan
    }));

    return plansWithIds;
  } catch (error) {
    console.error('Error fetching plans:', error);
    return [];
  }
};

const HomePage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const fetchedPlans = await fetchAndStorePlans();
        setPlans(fetchedPlans);
      } catch (error) {
        setError('Failed to load plans');
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, []);

  const fetchPlanById = (id) => {
    return plans.find(p => p.id === id) || null;
  };

  const plan_carousel1 = fetchPlanById(15);
  const plan_carousel2 = fetchPlanById(16);
  const plan_card1 = fetchPlanById(23);
  const plan_card2 = fetchPlanById(10);
  const plan_card3 = fetchPlanById(9);

  return (
    <div className="homepage-container">
      <header className="header">
        <h1>What's hot?</h1>
        <CarouselComponent
          plan_carousel1={plan_carousel1}
          plan_carousel2={plan_carousel2}
        />
      </header>

      <section className="top-offers">
        <h2>Top Offers</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <CardGrid
            plan_card1={plan_card1}
            plan_card2={plan_card2}
            plan_card3={plan_card3}
          />
        )}
      </section>

      <section className="why-us">
        <div className="why-us-container">
          <h2>Why Choose Us?</h2>
          <p className="why-us-text">
            At TelConnect, we go beyond being just a telecom provider—we are the heartbeat of global communication. With over 100 million happy customers in more than 200 countries, our network bridges borders, cultures, and time zones effortlessly.
            <br /><br />
            From the hustle and bustle of city life to the tranquility of remote areas, TelConnect ensures you stay connected with your loved ones, business associates, and the world. Our state-of-the-art infrastructure, powered by cutting-edge technology, guarantees 99.9% uptime, so you’re never out of touch, no matter where your journey takes you.
            <br /><br />
            Our dedication to innovation and customer satisfaction has positioned us as a leader in the telecom industry. Every day, we enable over a billion interactions—whether it’s a quick chat with a friend, a vital business call, or a heartfelt video message. We are the trusted choice for millions who seek reliability, clarity, and seamless connectivity.
            <br /><br />
            Join the TelConnect family today and experience a network that genuinely cares about your connection to the world. We don’t just connect calls—we connect lives.
          </p>
        </div>
      </section>

      <section className="about-us">
        <h2>About Us</h2>
        <div className="about-us-container">
          <img
            src={AboutUs}
            alt="About Us"
            className="aboutus-image"
          />
          <p className="about-text">
            Welcome to TelConnect! We’re not just another telecom company; We’re your digital lifestyle partner. At TelConnect, we believe in keeping you connected with what matters most. Whether it’s unlimited calls to your besties, streaming your favorite shows, or staying on top of your social game with high-speed data, we’ve got you covered. Our plans are designed to fit your dynamic lifestyle, offering flexibility, affordability, and reliability. Join the TelConnect family and experience a seamless, fun, and friendly connection that keeps you in the loop, always. Let’s stay connected, together!
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <p>&copy; 2024 TelConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
