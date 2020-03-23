import React from 'react';
import { useDispatch } from 'react-redux';
import { setError } from '../redux/actions/actionCreators';
import { searchLocation } from '../redux/actions/asyncActionCreators';

const withLocation = (Component) => (props) => {
  const dispatch = useDispatch();

  const getCoordsAsNums = (coords) => {
    const latitude = Number(coords.latitude).toFixed(6);
    const longitude = Number(coords.longitude).toFixed(6);

    return { latitude, longitude };
  };

  const getCentrePointAsString = (position) => {
    const { latitude, longitude } = getCoordsAsNums(position.coords);

    return `${latitude},${longitude}`;
  };

  const onSuccess = (position) => {
    const centrePoint = getCentrePointAsString(position);
    const action = searchLocation({ centre_point: centrePoint });
    dispatch(action);
  };

  const onError = (err) => {
    if (err.code === 1) {
      dispatch(setError('Location not enabled'));
      return;
    }
    dispatch(setError('Location not found / timeout'));
  };

  const searchByLocation = () => {
    if (!navigator.geolocation) {
      console.error('Your browser does not support geolocation');
      return;
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  return (
    <Component
      searchByLocation={searchByLocation}
      {...props}
    />
  );
};

export default withLocation;
