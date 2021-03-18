import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react'
import Content from './Content';

// set up enzyme's react adapter
Enzyme.configure({ adapter: new Adapter});

const setup = (props={}) => {
    return shallow(<Content {...props} />)
};

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("renders without error", ()=>{
  const wrapper = setup();
  const contentComponent = findByTestAttr(wrapper,"component-content");
  expect(contentComponent.length).toBe(1);
});
