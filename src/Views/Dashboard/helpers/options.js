import React from 'react';
import Content from 'Components/Content';
import UserView from 'Views/User/UserView';
import SchedulerView from 'Views/SchedulerView';
import LogView from 'Views/LogView';
import TestEditor from 'Views/Playground/TestEditor';
import EditableTable from 'Views/Playground/EditableTable';
import PeopleIcon from '@material-ui/icons/People';
import QueueIcon from '@material-ui/icons/AddToQueue';
import EditIcon from '@material-ui/icons/Edit';
import TableIcon from '@material-ui/icons/TableChart';
import LogIcon from '@material-ui/icons/LibraryBooks';
import StorageIcon from '@material-ui/icons/Storage';

export const dashboardRoutes = [
  {path: '/dashboard', component: Content},

  {path: '/admin/users', component: UserView},
  {path: '/admin/storage', component: SchedulerView},
  {path: '/admin/queues', component: SchedulerView},

  {path: '/monitoring/logs', component: LogView},

  {path: '/playground/editor', component: TestEditor},
  {path: '/playground/editabletable', component: EditableTable},

  {path: '', to: '/dashboard', exact: true, redirect: true},
];

export const navigatorLinks = [
  {
    label: 'Admin',
    children: [
      {path: '/admin/users', label: 'Users', icon: <PeopleIcon/>},
      {path: '/admin/storage', label: 'Storage', icon: <StorageIcon/>},
      {path: '/admin/queues', label: 'Queues', icon: <QueueIcon/>},
    ],
  },
  {
    label: 'Monitoring',
    children: [
        {path: '/monitoring/logs', label: 'Logs', icon: <LogIcon/>},
    ],
  },
  {
    label: 'Playground',
    children: [
      {path: '/playground/editor', label: 'Text Editor', icon: <EditIcon/>},
      {path: '/playground/editabletable', label: 'Editable Table', icon: <TableIcon/>},
    ],
  },
];

export const headerLinks = [
  {
    group: '/dashboard',
    label: 'Dashboard',
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
    group: '/admin',
    label: 'Admin',
    children: [
      {path: '/admin/users', label: 'Users'},
      {path: '/admin/storage', label: 'Storage'},
      {path: '/admin/queues', label: 'Queues'},
    ],
  },
  {
    group: '/monitoring',
    label: 'Monitoring',
    children: [
      {path: '/monitoring/logs', label: 'Logs'},
    ],
  },
];
