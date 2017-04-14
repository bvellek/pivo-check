import React from 'react';
import Footer from './Footer';

const LandingPage = () => (
  <div className="landing-page">
    <section className="landing-callout">
      <div className="callout-text">
        <p>Drink<span className="teal-text">*</span> your way through town. Check off the breweries as you&nbsp;go!</p>
        <p><span className="teal-text">*</span>Please do it responsibly… and use <nobr>PIVO-CHECK</nobr> to keep track of all the breweries you&nbsp;visit.</p>
      </div>
      <img className="callout-img" src="./img/map.svg" alt="Cartoon map of breweries" />
    </section>

    <main role="main">
      <section className="landing-description">
        <h2>How to get started...</h2>
        <p>To start your journey register and simply add a city to your list. You will get a list of all the breweries ‘Open to the Public’ in the city. Visit a brewery and check it off your&nbsp;list.</p>
      </section>

      <section className="landing-cta">
        <h2>
          <a href="#">Login/Register</a>
        </h2>
      </section>
    </main>

    <Footer />
  </div>
);

export default LandingPage;
