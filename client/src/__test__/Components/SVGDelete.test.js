import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import SVGDelete from '../../js/components/SVGDelete';

describe('<SVGDelete />', () => {
  it('renders without crashing', () => {
    shallow(<SVGDelete />);
  });
  it('it renders correctly', () => {
    const component = shallow(
      <SVGDelete />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
