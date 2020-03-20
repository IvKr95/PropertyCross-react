import React from 'react';

const ERRORS_CODES = {
  'Zero properties returned': <span>There were no properties found for the given location.</span>,
  'Location not matched': <span>The location given was not recognised.</span>,
  'Network connection issues / timeout': <span>An error occurred while searching. Please check your network connection and try again.</span>,
  'Location not enabled': <span>The use of location is currently disabled.</span>,
  'Location not found / timeout': <span>Unable to detect current location. Please ensure location is turned on in your phone settings and try again.</span>,
  default: <span>Something very terrible happened. We don&apos;t know the exact error</span>,
};

export default function Error({ error }) {
  return (ERRORS_CODES[error] || ERRORS_CODES.default);
}
