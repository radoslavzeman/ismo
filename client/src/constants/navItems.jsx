import React from 'react';
import { FontIcon } from 'react-md';

// export default [{
//   key: '/',
//   primaryText: 'Dashboard',
// 	leftIcon: <FontIcon>home</FontIcon>,
// },{
//   key: 'profile',
//   primaryText: 'Profile',
// 	leftIcon: <FontIcon>face</FontIcon>,
// },{
//   key: 'persons',
//   primaryText: 'Persons',
//   leftIcon: <FontIcon>people_outlined</FontIcon>,
// }, {
//   key: 'units',
//   primaryText: 'Units',
//   leftIcon: <FontIcon>group</FontIcon>,
// }, {
// //   key: 'login',
// //   primaryText: 'Login',
// //   leftIcon: <FontIcon>input</FontIcon>,
// // }, {
//   key: 'logout',
//   primaryText: 'Logout',
//   leftIcon: <FontIcon>exit_to_app</FontIcon>,
// }];

export default [{
  exact: true,
  label: 'Home',
  to: '/',
  icon: 'home',
}, {
  label: 'Profile',
  to: '/profile',
  icon: 'face',
}, {
  label: 'Persons',
  to: '/persons',
  icon: 'people_outlined',
}, {
  label: 'Units',
  to: '/units',
  icon: 'group',
}, {
  label: 'Logout',
  to: '/logout',
  icon: 'exit_to_app',
}];
