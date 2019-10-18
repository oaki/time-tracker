import {useEffect, useState} from "react"

export const useGeolocation = ({enableHighAccuracy, maximumAge, timeout} = {}, callback) => {

  const [state, setState] = useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null
  });
  const [watchId, setWatchId] = useState(0);
  useEffect(() => {

    if (navigator.geolocation && !watchId) {
      navigator.geolocation.getCurrentPosition(({coords}) => setState(coords), (err) => {
        setState({...state, error: err});
      });
      const newWatchId = navigator.geolocation.watchPosition(
        ({coords}) => setState(coords),
        (err) => {
          setState({...state, error: err});
        },
        {enableHighAccuracy, maximumAge, timeout}
      );

      setWatchId(newWatchId);
    } else {
      console.error("there is no geo location allowed");
    }
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    }
  }, []);

  return state;
};

