import React from 'react';
import renderer from 'react-test-renderer';

import SVGLogo from '../js/components/SVGLogo';

describe('<SVGLogo />', () => {
  it('it renders correctly', () => {
    const component = renderer.create(
      <SVGLogo />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
