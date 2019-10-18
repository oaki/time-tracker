import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {green} from "@material-ui/core/colors";
import {makeStyles} from "@material-ui/core/styles";
import PlayArrow from "@material-ui/icons/PlayArrow";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Stop from "@material-ui/icons/Stop";
import React, {useReducer} from "react";
import {save} from "../api";
import {getUserToken} from "../App";
import {useGeolocation} from "../hooks/useGeoLocation";
import {reducer} from "../reducer";


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(45deg, #6c757d 30%, #7f8890 90%)",
    color: "white",
    padding: "3rem",
    width: "100%"
  },
  buttonSuccess: {
    width: "100%",
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const initialState = {
  isLoading: false,
  showSuccess: false
};


async function handleStart(type, dispatch, geolocation) {
  dispatch({payload: "", type: "error"});
  dispatch({payload: true, type: "isLoading"});
  const userToken = getUserToken();
  try {
    const res = await save({lat: geolocation.latitude, lng: geolocation.longitude, token: userToken, type});
    if (!res) {
      dispatch({payload: "Nepodarilo sa zapisat. Skúste ešte raz alebo neskôr.", type: "error"});
    } else {
      dispatch({payload: true, type: "showSuccess"});
    }
  } catch (err) {
    dispatch({payload: "Nepodarilo sa spojiť so serverom. Skúste ešte raz alebo neskôr.", type: "error"});
  }

  dispatch({isLoading: false, type: "isLoading"});
}

export const BtnContainer = styled.div`
  position:relative;
  margin:1rem;
`;

let timer;

export function MainPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15,
    timeout: 12
  });

  if (state.showSuccess && !timer) {
    timer = setTimeout(() => {
      dispatch({type: "showSuccess", payload: false});
      clearInterval(timer);
      timer = undefined;
    }, 4000);
  }

  if (geolocation.error && geolocation.error.message) {
    return (
      <div style={{color: "red"}}>{geolocation.error.message}</div>
    )
  }

  return (
    <>
      {state.showSuccess && (<div style={{color: "#1dc100"}}><SaveAlt/> Uložené</div>)}

      <BtnContainer>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.root}
          disabled={state.isLoading || state.showSuccess}
          onClick={() => handleStart("arrival", dispatch, geolocation)}
        >
          <PlayArrow/>
          Príchod
        </Button>
        {state.isLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
      </BtnContainer>

      <BtnContainer>
        <Button
          className={classes.root}
          disabled={state.isLoading || state.showSuccess}
          onClick={() => handleStart("leave", dispatch, geolocation)}
        >
          <Stop/>
          Odchod
        </Button>
        {state.isLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
      </BtnContainer>
    </>
  )
}