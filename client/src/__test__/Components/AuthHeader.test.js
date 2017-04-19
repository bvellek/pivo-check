import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import AuthHeader from '../../js/components/AuthHeader';

describe('<AuthHeader />', () => {
  it('it renders correctly', () => {
    const component = shallow(
      <AuthHeader />
    );
    expect(shallowToJson(component)).toMatchSnapshot();
  });
});
