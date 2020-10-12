import React from 'react';
import Content from 'Components/Content';
import UserView from 'Views/User/UserView';
import TestEditor from 'Views/Playground/TestEditor';
import EditableTable from 'Views/Playground/EditableTable';
import PeopleIcon from '@material-ui/icons/People';
import EditIcon from '@material-ui/icons/Edit';
import TableIcon from '@material-ui/icons/TableChart';

export const dashboardRoutes = [
  {path: '/dashboard', component: Content},

  {path: '/groups', component: UserView},

  {path: '/users', component: UserView},
  {path: '/users/foo', component: UserView},
  {path: '/users/bar', component: UserView},

  {path: '/playground/editor', component: TestEditor},
  {path: '/playground/editabletable', component: EditableTable},

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
    label: 'Playground',
    children: [
      {path: '/playground/editor', label: 'Editor', icon: <EditIcon/>},
      {path: '/playground/editabletable', label: 'Editable Table', icon: <TableIcon/>},
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
    group: '/playground',
    label: 'Playground',
    children: [
      {path: '/playground/editor', label: 'Test Editor'},
      {path: '/playground/editabletable', label: 'Editable Table'},
    ]
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
