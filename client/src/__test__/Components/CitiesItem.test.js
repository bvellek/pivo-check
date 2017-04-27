import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { CitiesItem } from '../../js/components/CitiesItem';

describe('<CitiesItem />', () => {
  const callback = jest.fn();
  const city = {
    _id: '83jdi3dTEST',
    cityName: 'Test, TEST',
    brewTotal: 10,
  };
  const testComponent = (<CitiesItem
    deleteDialogChange={callback}
    deleteDialogClose={callback}
    confirmDelete={callback}
    cityInfo={city}
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
});
