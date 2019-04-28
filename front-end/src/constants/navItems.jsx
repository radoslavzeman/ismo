import React from 'react';
import { FontIcon } from 'react-md';

export default [{
  key: 'profile',
  primaryText: 'Profile',
	leftIcon: <FontIcon>face</FontIcon>,
  active: true,
},{
  key: 'persons',
  primaryText: 'Persons',
  leftIcon: <FontIcon>people_outlined</FontIcon>,
}, {
  key: 'units',
  primaryText: 'Units',
  leftIcon: <FontIcon>group</FontIcon>,
}, {
  key: 'login',
  primaryText: 'Login',
  leftIcon: <FontIcon>input</FontIcon>,
}];
