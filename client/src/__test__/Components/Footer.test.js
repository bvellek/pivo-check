import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Footer from '../../js/components/Footer';

describe('<Footer />', () => {
  it('renders without crashing', () => {
    shallow(<Footer />);
  });
  it('it renders correctly', () => {
    const component = renderer.create(
      <Footer />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
