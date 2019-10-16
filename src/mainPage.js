/** @jsx jsx */
import styled from "@emotion/styled";
import Button from "@material-ui/core/Button";
import {green} from "@material-ui/core/colors";
import React, {useReducer} from "react";
import {reducer} from "./reducer";

const initialState = {
  isLoading: false
}


async function handleStart(type, dispatch) {
  console.log("handleStart");
  dispatch({payload: "", type: "error"});
  dispatch({payload: true, type: "isLoading"});
  const userToken = await getUserToken();
  const position = await getPosition();
  const time = await getTimeFromServer();
  const res = await save({position, time, userToken, type});

  dispatch({isLoading: false, type: "isLoading"});
  if (!res) {
    dispatch({payload: "Nepodarilo sa zapisat. Skuste este raz alebo neskor.", type: "error"});
  }

}

async function getUserToken() {
  return "8989217";
}

async function getPosition() {
  return {
    lat: 30.3232,
    lng: 21.2234234
  }
}

async function getTimeFromServer() {
  return new Date().toISOString();
}

async function save(data) {
  console.log(data);
  const p = new Promise((resolve => {
    setTimeout(() => {
      resolve(true);
    }, 3000)
  }))
  return p;
}

const BtnContainer = styled.div`
position:relateve;
margin:1rem;
`;

// const btnStyle = styled.css()
export function MainPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <BtnContainer>
        <Button
          variant="contained"
          color="primary"
          css={{
            backgroundColor: green[500],
            "&:hover": {
              backgroundColor: green[700],
            },
          }}
          disabled={state.isLoading}
          onClick={handleButtonClick}
        >
          Accept terms
        </Button>
        {loading && <CircularProgress size={24} css={{
          color: green[500],
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: -12,
          marginLeft: -12,
        }}/>}
      </BtnContainer>

      {state.isLoading && "loading..."}
      <button className={"btn"} type={"button"} onClick={() => {
        handleStart("arrival", dispatch);
      }}>
        Príchod
      </button>
      <button className={"btn"} type={"button"}>Odchod</button>
    </>
  )
}