import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import InAppHeader from '../../js/components/InAppHeader';

describe('<InAppHeader />', () => {
  it('renders without crashing', () => {
    shallow(<InAppHeader />);
  });
  it('it renders correctly', () => {
    const component = shallow(
      <InAppHeader />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
