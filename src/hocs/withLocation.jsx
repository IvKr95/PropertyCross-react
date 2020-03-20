import React from 'react';
import { useDispatch } from 'react-redux';
import {
  searchLocation, setError,
} from '../redux/actions/actionCreators';

const withLocation = (Component) => (props) => {
  const dispatch = useDispatch();

  const searchByLocation = () => {
    if (!navigator.geolocation) {
      console.error('Your browser does not support geolocation');
      return;
    }

    const success = (position) => {
      const latitude = Number(position.coords.latitude).toFixed(6);
      const longitude = Number(position.coords.longitude).toFixed(6);

      const centrePoint = `${latitude},${longitude}`;

      dispatch(searchLocation('/api', {
        pretty: 1,
        action: 'search_listings',
        encoding: 'json',
        centre_point: centrePoint,
      }));
    };

    const error = (err) => {
      if (err.code === 1) {
        dispatch(setError('Location not enabled'));
        return;
      }
      dispatch(setError('Location not found / timeout'));
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return <Component searchByLocation={searchByLocation} {...props} />;
};

export default withLocation;
