import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { LoginPage } from '../../js/components/LoginPage';

describe('<LoginPage />', () => {
  const callback = jest.fn();
  const user = {
    email: 'johnDoe@hotmail.com',
    password: 'passwordYO',
  };
  const testComponent = (<LoginPage
    onSubmit={callback}
    onChange={callback}
    demoSubmit={callback}
    user={user}
    registrationSuccessMessage={{}}
    errors={{}}
    loadingStatus={false}
  />);


  it('renders without crashing', () => {
    shallow(testComponent);
  });
  it('it renders correctly', () => {
    const component = shallow(testComponent);
    expect(shallowToJson(component)).toMatchSnapshot();
  });
  it('should call demoSubmit when demo submit is clicked', () => {
    const wrapper = shallow(testComponent);
    const btn = wrapper.find('.demo-btn');
    btn.simulate('click', {
      preventDefault() {},
    });
    expect(callback).toHaveBeenCalled();
  });
  it('should call onChange when input typed', () => {
    const wrapper = shallow(testComponent);
    const input = wrapper.find('#user-password');
    input.simulate('keyDown', { keyCode: 40 });
    expect(callback).toHaveBeenCalled();
  });
  it('should call onChange when input typed', () => {
    const wrapper = shallow(testComponent);
    const input = wrapper.find('#user-email');
    input.simulate('keyDown', { keyCode: 40 });
    expect(callback).toHaveBeenCalled();
  });
  it('should call onSubmit form submitted', () => {
    const wrapper = shallow(testComponent);
    const form = wrapper.find('.login-form');
    form.simulate('submit', {
      preventDefault: () => {},
    });
    expect(callback).toHaveBeenCalled();
  });
  // it('should render Loader when loadingStatus is true', () => {
  //   const wrapper = shallow(<LoginPage
  //     onSubmit={callback}
  //     onChange={callback}
  //     demoSubmit={callback}
  //     user={user}
  //     registrationSuccessMessage={{}}
  //     errors={{}}
  //     loadingStatus='true'
  //   />);
  //   // console.log(wrapper);
  //   // const form = wrapper.find('.login-form');
  //   // form.simulate('submit', {
  //   //   preventDefault: () => {},
  //   // });
  //   // expect(callback).toHaveBeenCalled();
  // });
});
