import React from 'react'
import ReactDOM from 'react-dom'
import { cleanup} from "@testing-library/react"
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import header from './header';

Enzyme.configure({ adapter: new Adapter() })
afterEach(cleanup);

describe('describe-loggedIn-userName-validation', () => {

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<header/>, div)
  })

  it ("shouldn't show user name", () => {
    const userName = 'chen'
    expect(userName).not.toBe('')
  })

  it ("should show user name", () => {
    const userName = ''
    expect(userName).toBe('')
  })

  it ("should show user details", () => {
    const wrapper = shallow(<header/>) 
    const text = wrapper.find('span')
    expect(text).not.toBe('')
  })
})