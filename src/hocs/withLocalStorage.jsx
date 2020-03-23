import React, { useCallback } from 'react';

const withLocalStorage = (key) => (Component) => (props) => {
  const getEntry = useCallback(() => {
    if (!localStorage.getItem(key)) {
      return [];
    }
    return JSON.parse(localStorage.getItem(key));
  }, [key]);

  const setEntry = (item, byKey) => {
    if (!getEntry()) {
      const entry = [item];
      localStorage.setItem(key, JSON.stringify(entry));
      return;
    }
    const entry = getEntry();
    const filtered = entry.filter((rs) => rs[byKey] !== item.byKey);
    filtered.unshift(item);
    localStorage.setItem(key, JSON.stringify(filtered));
  };

  const removeEntry = (url) => {
    const entry = getEntry();
    const filtered = entry.filter((o) => o.lister_url !== url);
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
