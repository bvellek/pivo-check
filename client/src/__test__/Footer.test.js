import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../js/components/Footer';

describe('<Footer />', () => {
  it('it renders correctly', () => {
    const component = renderer.create(
      <Footer />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
