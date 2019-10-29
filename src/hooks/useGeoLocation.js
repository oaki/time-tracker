import {useEffect, useState} from "react"

export const useGeolocation = ({enableHighAccuracy, maximumAge, timeout} = {}, callback) => {

  const [state, setState] = useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null
  });

  const [watchId, setWatchId] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (navigator.geolocation && !watchId) {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        setError(null);
        setState({
          accuracy: coords.accuracy,
          altitude: coords.altitude,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          latitude: coords.latitude,
          longitude: coords.longitude,
          speed: coords.speed
        });
      }, (err) => {
        setError(err);
      });
      const newWatchId = navigator.geolocation.watchPosition(({coords}) => {
          setError(null);
          setState({
            accuracy: coords.accuracy,
            altitude: coords.altitude,
            altitudeAccuracy: coords.altitudeAccuracy,
            heading: coords.heading,
            latitude: coords.latitude,
            longitude: coords.longitude,
            speed: coords.speed
          });
        },
        (err) => {
          setError(null);
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

  return [state, error];
};

