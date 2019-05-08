// /**
//  * @format
//  * @lint-ignore-every XPLATJSCOPYRIGHT1
//  */
// Run with : yarn test --env=jsdom --browser
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Login from '../src/screens/Login';
const { loginHandler } = require('../src/screens/Login');

state = { email: 'restaurant2@gmail.com', password: '123123', errorMessage: null }
jest.mock('react-native-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    polyfill: () => {},
  }
});

// test('should check login authentication', () => {
  // const log = loginHandler();
  // console.log(Login.state)
  // expect(loginHandler.email).toBe('restaurant2@gmail.com');
  // expect(loginHandler.password).toBe('123123');
  // const tree = loginHandler.toJSON();
  // expect(loginHandler).toMatchSnapshot();
// });

test('Login', () => {
  const tree = renderer.create( <Login / > ).toJSON()
  expect(tree).toMatchSnapshot()
})