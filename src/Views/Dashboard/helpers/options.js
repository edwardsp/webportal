import React from 'react';
import Content from 'Components/Content';
import UserView from 'Views/User/UserView';
import PeopleIcon from '@material-ui/icons/People';

export const dashboardRoutes = [
  {path: '/dashboard', component: Content},

  {path: '/groups', component: UserView},

  {path: '/users', component: UserView},
  {path: '/users/foo', component: UserView},
  {path: '/users/bar', component: UserView},

  {path: '/xyz', component: UserView},

  {path: '', to: '/dashboard', exact: true, redirect: true},
];

export const navigatorLinks = [
  {
    label: 'Accounts',
    children: [
        {path: '/users', label: 'Users', icon: <PeopleIcon/>},
        {path: '/groups', label: 'Groups', icon: <PeopleIcon/>},
    ],
  },
  {
    label: 'Something else...',
    children: [
        {path: '/xyz', label: 'XYZ', icon: <PeopleIcon/>},
    ],
  },
];

export const headerLinks = [
  {
    group: '/dashboard',
    label: 'Dashboard',
    children: []
  },{
    group: '/groups',
    label: 'Groups',
    children: []
  },
  {
    group: '/xyz',
    label: 'XYZ',
    children: []
  },
  {
    group: '/users',
    label: 'Users',
    children: [
      {path: '/users', label: 'Users'},
      {path: '/users/foo', label: 'Foo'},
      {path: '/users/bar', label: 'Bar'},
    ],
  },
];
