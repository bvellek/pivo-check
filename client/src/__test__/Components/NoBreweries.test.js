import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import NoBreweries from '../../js/components/NoBreweries';

describe('<NoBreweries />', () => {
  it('renders without crashing', () => {
    shallow(<NoBreweries />);
  });
  it('it renders correctly', () => {
    const component = shallow(
      <NoBreweries />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
