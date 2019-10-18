import {useEffect, useState} from "react"

const TOKEN_NAME = "jwt-inteles-token";

export function useUserToken() {
  const [state, setState] = useState({
    isLoading: false,
    token: undefined,
    error: undefined
  });

  useEffect(() => {
    let token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      setState({...state, token});
    } else {
      setState({...state, isLoading: true});
    }

  }, []);

  return state;
}