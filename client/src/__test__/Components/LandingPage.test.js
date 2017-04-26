import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LandingPage from '../../js/components/LandingPage';

describe('<LandingPage />', () => {
  it('renders without crashing', () => {
    shallow(<LandingPage />);
  });
  it('it renders correctly', () => {
    const component = shallow(
      <LandingPage />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
