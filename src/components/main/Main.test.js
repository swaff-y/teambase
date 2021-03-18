import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react'
import Main from './Main';

// set up enzyme's react adapter
Enzyme.configure({ adapter: new Adapter});

const setup = (props={}) => {
    return shallow(<Main {...props} />)
};

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("renders without error", ()=>{
  const wrapper = setup();
  const component = findByTestAttr(wrapper,"component-main");
  expect(component.length).toBe(1);
});
