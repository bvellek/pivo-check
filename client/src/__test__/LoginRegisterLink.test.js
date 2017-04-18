import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import LoginRegisterLink from '../js/components/Landing/LoginRegisterLink';

describe('<LoginRegisterLink />', () => {
  it('it renders correctly', () => {
    const component = shallow(
      <LoginRegisterLink />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
