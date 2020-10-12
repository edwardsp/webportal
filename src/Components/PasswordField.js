import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';

function PasswordField(props) {
  const [state, setState] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setState({ showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
        <React.Fragment>
            {state.showPassword ? props.value : ""}
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
            >
                {state.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </React.Fragment>

  );
}

PasswordField.propTypes = {
  value: PropTypes.string.isRequired,
};

export default PasswordField;
