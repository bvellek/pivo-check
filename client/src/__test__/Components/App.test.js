import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { App } from '../../js/components/App';

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
  it('it renders correctly', () => {
    const component = shallow(
      <App />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
