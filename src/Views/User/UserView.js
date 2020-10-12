import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PasswordField from 'Components/PasswordField';
import PasswordInput from 'Components/PasswordInput';

import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowDownward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn
};



const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function UserView(props) {
  const { classes } = props;

  const { useState, useEffect } = React;

  const columns = [
    { title: 'User ID', field: 'user_id', type: 'numeric' },
    { title: 'Username', field: 'username' },
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname' },
    { title: 'Password', field: 'password', type: 'string',
      editComponent: props => (
        <PasswordInput
          value={props.value ? props.value : ""}
          onChange={props.onChange}
        />
      ),
      render: rowData => <PasswordField value={rowData.password} />
    },
    { title: 'Admin', field: 'sudo', 'type': 'boolean' },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await axios.get('/api/users');
      setData(resp.data.users);
    };
    fetchUsers();
  }, []);

  return (
    <Paper className={classes.paper}>
        <MaterialTable icons={tableIcons}
            title="Users"
            columns={columns}
            data={data}
            localization={{
                header: {
                    actions: "Actions"
                }
            }}
            editable={{
                onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  axios.post('/api/users', newData)
                    .then(function ({resp}) {
                      setData([...data, newData]);
                      resolve();
                    })
                    .catch(function (error) {
                      console.log(error);
                      reject();
                    });
                }),
                onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  axios.put('/api/users/'+oldData.user_id, newData)
                  .then(function ({resp}) {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);

                    resolve();}
                  )
                  .catch(function (error) {
                    console.log(error);
                    reject();
                  });
                }),
                onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    axios.delete('/api/users/'+oldData.user_id)
                    .then(function ({resp}) {
                      const dataDelete = [...data];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      setData([...dataDelete]);
                      resolve();
                    })
                    .catch(function (error) {
                      console.log(error);
                      reject();
                    });
                }),
            }}
        />
    </Paper>
  );
}

UserView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserView);
