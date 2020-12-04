import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  paper: {
    margin: 'auto',
    overflow: 'hidden',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  label: {
    marginRight: theme.spacing(2),
  },
  spacer: {
      flexGrow: 1,
  },
});

function LogView(props) {
  const { classes } = props;
  
  const { useState, useEffect } = React;
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get('/api/logs/autoscale');
      setData(resp.data.log);
    };
    fetchData();
  }, []);

  const editorRef = useRef();
  
  function handleEditorDidMount(_, editor) {
    editorRef.current = editor;
    // Now you can use the instance of monaco editor
    // in this component whenever you want
  }

  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
        <Typography variant="body1" className={classes.label}>
            Log file:
        </Typography>
        <FormControl className={classes.formControl}>
        <Select native defaultValue="autoscale">
            <option value="autoscale">Autoscale</option>
            <option value="slurm">Slurm</option>
        </Select>
        </FormControl>
        <Box component="span" className={classes.spacer} />
        <FormControl className={classes.formControl}>
        <Select native defaultValue={500}>
            <option value={100}>Last 100 lines</option>
            <option value={500}>Last 500 lines</option>
            <option value={1000}>Last 1000 lines</option>
            <option value={-1}>Entire file</option>
        </Select>
        </FormControl>
        <Tooltip title="Reload">
            <IconButton>
                <RefreshIcon className={classes.block} color="inherit" />
            </IconButton>
        </Tooltip>
        </Toolbar>
      </AppBar>
      <Editor 
        className={classes.editor}
        width="98%"
        height="70vh"
        value={data}
        editorDidMount={handleEditorDidMount}/>
    </Paper>
  );
}

LogView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogView);
