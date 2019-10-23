import {useCallback, useState} from "react";

export function useRefCallback() {
  const [node, setNode] = useState(null);
  const setRef = useCallback((element) => {
    setNode(element);
  }, []);

  return [node, setRef];
}
