import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LandingContent from '../../js/components/Landing/LandingContent';

describe('<LandingContent />', () => {
  it('renders without crashing', () => {
    shallow(<LandingContent />);
  });
  it('it renders correctly', () => {
    const component = shallow(
      <LandingContent />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
