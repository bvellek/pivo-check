import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LandingHeader from '../../js/components/Landing/LandingHeader';

describe('<LandingHeader />', () => {
  it('renders without crashing', () => {
    shallow(<LandingHeader />);
  });
  it('it renders correctly', () => {
    const component = shallow(
      <LandingHeader />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
