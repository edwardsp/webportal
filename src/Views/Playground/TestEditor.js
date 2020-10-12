import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Editor from "@monaco-editor/react";

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

function TestEditor(props) {
  const { classes } = props;

  const editorRef = useRef();

  function handleEditorDidMount(_, editor) {
    editorRef.current = editor;
    // Now you can use the instance of monaco editor
    // in this component whenever you want
  }

  return (
    <Box className={classes.paper}>
      <Editor
        height="70vh"
        editorDidMount={handleEditorDidMount}
        language="javascript"
      />
    </Box>
  );
}

TestEditor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TestEditor);
