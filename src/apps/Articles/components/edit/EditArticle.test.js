import React from 'react';
import Enzyme, {shallow} from 'enzyme/build';
import Adapter from "enzyme-adapter-react-16/build";

import EditPage from './EditArticle';

Enzyme.configure({ adapter: new Adapter() });

describe('Edit article page', () => {

  it('should render correctly in "debug" mode', () => {
    const component = shallow(<EditPage debug match={{params: {slug: 'Yes-is-me'}}} />);
    expect(component).toMatchSnapshot();
  });

});
