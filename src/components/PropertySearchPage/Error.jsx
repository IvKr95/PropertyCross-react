import React from 'react';

export default function Error({ error }) {
  switch (error) {
    case 'Zero properties returned':
      return <span>There were no properties found for the given location.</span>;
    case 'Location not matched':
      return <span>The location given was not recognised.</span>;
    case 'Network connection issues / timeout':
      return (
        <span>
        An error occurred while searching. Please check your network connection and try again.
        </span>
      );
    case 'Location not enabled':
      return <span>The use of location is currently disabled.</span>;
    case 'Location not found / timeout':
      return (
        <span>
        Unable to detect current location.
        Please ensure location is turned on in your phone settings and try again.
        </span>
      );
    default:
      return <span>Something very terrible happened. We don\'t know the exact error</span>;
  }
}
