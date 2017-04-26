import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Loader from '../../js/components/Loader';

describe('<Loader />', () => {
  it('renders without crashing', () => {
    shallow(<Loader />);
  });
  it('it renders correctly', () => {
    const component = shallow(
      <Loader />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
