import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';

function PasswordInput(props) {
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
    <FormControl>
      <Input
        type={state.showPassword ? 'text' : 'password'}
        value={props.value ? props.value : ''}
        onChange={e => props.onChange(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
            >
                {state.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
};

export default PasswordInput;
