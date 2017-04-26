import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import NoCities from '../../js/components/NoCities';

describe('<NoCities />', () => {
  it('renders without crashing', () => {
    shallow(<NoCities />);
  });
  it('it renders correctly', () => {
    const component = shallow(
      <NoCities />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
