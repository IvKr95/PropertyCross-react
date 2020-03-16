import React from 'react';

const withLocalStorage = (key, Component) => (props) => {
  const getEntry = () => {
    if (!localStorage.getItem(key)) {
      return;
    }
    return JSON.parse(localStorage.getItem(key));
  };

  const setEntry = (item) => {
    if (!getEntry()) {
      const entry = [item];
      localStorage.setItem(key, JSON.stringify(entry));
    } else {
      const entry = getEntry();
      const filtered = entry.filter((rs) => rs.lister_url !== item.lister_url);
      filtered.unshift(item);
      localStorage.setItem(key, JSON.stringify(filtered));
    }
  };

  const removeEntry = (url) => {
    const entry = getEntry();
    const filtered = entry.filter((rs) => rs.lister_url !== url);
    localStorage.setItem(key, JSON.stringify(filtered));
  };

  return (
    <Component
      setEntry={setEntry}
      getEntry={getEntry}
      removeEntry={removeEntry}
      {...props}
    />
  );
};

export default withLocalStorage;
