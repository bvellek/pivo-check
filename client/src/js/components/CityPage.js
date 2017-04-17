import React, { Component } from 'react';
import InAppHeader from './InAppHeader';
import Footer from './Footer';

class CityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <InAppHeader />
        <div className="city-page">
          <main role="main">
            <header>
              <h1>Seattle, WA</h1>
              <label htmlFor="brewery-filter"><h2>Brewery&nbsp;Filter: </h2></label> {' '}
              <select id="brewery-filter" name="brewery-filter">
                <option defaultValue value="">All Seattle Breweries</option>
                <optgroup label="Completed">
                  <option value="">Visited</option>
                  <option value="">Not Visited</option>
                </optgroup>
                <optgroup label="Brewery Type">
                  <option value="">Production Facility</option>
                  <option value="">Micro Brewery</option>
                  <option value="">Nano Brewery</option>
                  <option value="">Restaurant/Ale House</option>
                  <option value="">Brewpub</option>
                  <option value="">Cidery</option>
                  <option value="">Tasting Room</option>
                  <option value="">Office</option>
                </optgroup>
              </select>
            </header>
            <section className="breweries-list">
              <ul>
                <li>
                  <form className="checkoff-form" action="index.html" method="post">
                    <label htmlFor="check-KX35c" className="visually-hidden">Checkoff Bainbride Island Brewing Company</label>
                    <div className='brew-check'>
                      <input id="check-KX35c" type='checkbox' name="Brewery1" />
                        <div>&#10003;</div>
                        <div>&#10003;</div>
                        <div>&#10003;</div>
                    </div>
                  </form>
                  <div className="brewery-info-container">
                    <header>
                      <h3><a href="http://www.bainbridgebeer.com/" target="_KX35c">Bainbridge Island Brewing Company</a></h3>
                      <img className="brewery-logo" src="https://s3.amazonaws.com/brewerydbapi/brewery/1KX35c/upload_yn8mQV-squareMedium.png" alt="Bainbridge Island Brewing Company Logo" />
                    </header>

                    <form className="brewery-rating-form" action="index.html" method="post">
                      <label htmlFor="rating-KX35c">Rating: <span className="visually-hidden">for Bainbridge Island Brewing Company</span></label>
                      <select id="rating-KX35c" className="brew-rating-select" name="">
                        <option selected="true" disabled value="" />
                        <option value="1">🍺</option>
                        <option value="2">🍺🍺</option>
                        <option value="3">🍺🍺🍺</option>
                      </select>
                    </form>

                      <div className="adr"><span>Address:</span>
                        <a className="brewery-adr-link" href="https://www.google.com/maps/place/9415+Coppertop+Lane,+Suite+103-104,+Bainbridge+Island,+WA+98110" target="_map-KX35c">
                        <div className="street-address">94115 Coppertop Lane</div>
                        <div className="extended-address">Suite 103-104</div>
                        <span className="locality">Bainbridge Island</span>
                        <span className="comma-one">, </span>
                        <span className="region">WA</span>{' '}
                        <span className="postal-code">98110</span>
                        </a>
                      </div>

                    <div className="brewery-phone">
                      <span>Phone: </span>
                      <a href="tel:(206) 451.4646" className="tel">(206) 451.4646</a>
                    </div>
                    <details>
                      <summary>Details <span className="visually-hidden">for Bainbridge Island Brewing Company</span></summary>
                      <p><span>Type: </span>Micro Brewery</p>
                      <p className="brewery-description">Making a great beer requires a combination of art and science.  Science, in knowing what the gear and the ingredients can do.  Art, in imagining what beer can be.  Whether it's excellent versions of classic styles, or boundary pushing experimental brews, we strive to blend the art and science of beer. But beer is also a social beverage.  The pub is part of our culture, and here in the Northwest that means locally brewed craft beer.  The local brewery is part of the fabric of the community, giving it character, individuality, and indeed, an air of hometown pride.  Bainbridge Island is certainly a great place to live, but it's been lacking one thing: our own craft microbrewery.  Well, no longer!  Bainbridge Island Brewing is the island's brewery, and the island is as much a part of us as we are of it.</p>
                    </details>
                  </div>
                </li>

                <li>
                  <form className="checkoff-form" action="index.html" method="post">
                    <label htmlFor="check-qlT9u4" className="visually-hidden">Checkoff Holy Mountain Brewing Company</label>
                    <div className='brew-check'>
                      <input id="check-qlT9u4" type='checkbox' name="Brewery2" />
                        <div>&#10003;</div>
                        <div>&#10003;</div>
                        <div>&#10003;</div>
                    </div>
                  </form>
                  <div className="brewery-info-container">
                    <header>
                      <h3><a href="http://blog.holymountainbrewing.com/" target="_qlT9u4">Holy Mountain Brewing Company</a></h3>
                      <img className="brewery-logo" src="https://s3.amazonaws.com/brewerydbapi/brewery/qlT9u4/upload_9yn1gT-squareMedium.png" alt="Bainbridge Island Brewing Company Logo" />
                    </header>

                    <form className="brewery-rating-form" action="index.html" method="post">
                      <label htmlFor="rating-qlT9u4">Rating: <span className="visually-hidden">for Holy Mountain Brewing Company</span></label>
                      <select id="rating-qlT9u4" className="brew-rating-select" name="">
                        <option selected="true" disabled value="" />
                        <option value="1">🍺</option>
                        <option value="2">🍺🍺</option>
                        <option value="3">🍺🍺🍺</option>
                      </select>
                    </form>

                      <div className="adr"><span>Address:</span>
                        <a className="brewery-adr-link" href="https://www.google.com/maps/place/1421+Elliott+Ave+W,+Seattle,+Washington+98119" target="_map-qlT9u4">
                          <div className="street-address">1421 Elliott Ave W</div>
                          <div className="extended-address" />
                          <span className="locality">Seattle</span>
                          <span className="comma-one">, </span>
                          <span className="region">WA</span>{' '}
                          <span className="postal-code">98119</span>
                        </a>
                      </div>

                    <details>
                      <summary>Details <span className="visually-hidden">for Holy Mountain Brewing Company</span></summary>
                      <p><span>Type: </span>Micro Brewery</p>
                      <p className="brewery-description">Barrels, Brett, hops. Brewery and Taproom in Seattle, Washington.</p>
                    </details>
                  </div>
                </li>
              </ul>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default CityPage;
