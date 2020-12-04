import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
  addQueue: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function SchedulerView(props) {
  const { classes } = props;

  const { useState, useEffect } = React;
/*
  partitions.conf 
  PartitionName=compute Nodes=compute-[0001-0040] Default=NO OverSubscribe=YES DefMemPerCPU=10240 MaxTime=INFINITE State=UP
  PartitionName=interactive Nodes=interactive-[0001-0002] Default=NO OverSubscribe=YES DefMemPerCPU=10240 MaxTime=INFINITE State=UP
  PartitionName=viz Nodes=viz-[0001-0002] Default=NO OverSubscribe=YES DefMemPerCPU=10240 MaxTime=INFINITE State=UP
  PartitionName=viz3d Nodes=viz3d-[0001-0002] Default=NO OverSubscribe=YES DefMemPerCPU=10240 MaxTime=INFINITE State=UP
  nodes.conf 
  NodeName=compute-[0001-0040] CPUs=120 Sockets=30 CoresPerSocket=4 ThreadsPerCore=1 RealMemory=458752 MemSpecLimit=5120 Feature=HB120rs_v2 State=CLOUD
  NodeName=interactive-[0001-0002] CPUs=4 Sockets=1 CoresPerSocket=4 ThreadsPerCore=2 RealMemory=31744 MemSpecLimit=1587 Feature=D8s_v3 State=CLOUD
  NodeName=viz-[0001-0002] CPUs=120 Sockets=30 CoresPerSocket=4 ThreadsPerCore=1 RealMemory=458752 MemSpecLimit=5120 Feature=HB120rs_v2 State=CLOUD
  NodeName=viz3d-[0001-0002] CPUs=6 Sockets=1 CoresPerSocket=6 ThreadsPerCore=1 RealMemory=56320 MemSpecLimit=2816 Feature=NV6_Promo State=CLOUD
*/
  const columns = [
    { title: 'Partition ID', field: 'partition_id', type: 'numeric' },
    { title: 'Name', field: 'name' },
    { title: 'SKU', field: 'sku' },
    { title: 'Count', field: 'count' },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchQueues = async () => {
      const resp = await axios.get('/api/scheduler/queues');
      setData(resp.data.queues);
    };
    fetchQueues();
  }, []);

  return (
    <Paper className={classes.paper}>
        <MaterialTable icons={tableIcons}
            title="Queues"
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
                  axios.post('/api/scheduler/queues', newData)
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
                  axios.put('/api/scheduler/queues/'+oldData.queue_id, newData)
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
                    axios.delete('/api/scheduler/queues/'+oldData.queue_id)
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

SchedulerView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SchedulerView);
