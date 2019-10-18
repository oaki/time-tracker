import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import {LockOpen} from "@material-ui/icons";
import React, {useRef} from "react";
import {getToken} from "../api";


const CssTextField = withStyles({
  root: {
    "& .MuiFormLabel-root": {
      color: "white",
    },
    "& .MuiFilledInput-input": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
  },
})(TextField);

export function LoginPage(props) {

  const inputEl = useRef(null);
  const onButtonClick = async () => {
    // `current` points to the mounted text input element
    const password = inputEl.current.value;
    const res = await getToken({password});
    if (!res.error && res.token) {
      props.appDispatch({type: "setToken", payload: res.token});
      props.appDispatch({type: "error", payload: null});
    } else {
      props.appDispatch({type: "error", payload: "Heslo nie je spravne"});
    }
  };
  return (
    <div>

      <CssTextField
        fullWidth={true}
        inputRef={inputEl}
        required
        id="standard-required"
        label="Zadaj heslo"
        margin="normal"
        variant="filled"
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onButtonClick}
      >
        <LockOpen/>
        Prihlásiť
      </Button>

    </div>


  )
}