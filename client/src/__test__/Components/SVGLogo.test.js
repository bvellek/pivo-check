import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import SVGLogo from '../../js/components/SVGLogo';

describe('<SVGLogo />', () => {
  it('renders without crashing', () => {
    shallow(<SVGLogo />);
  });
  it('it renders correctly', () => {
    const component = renderer.create(
      <SVGLogo />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
