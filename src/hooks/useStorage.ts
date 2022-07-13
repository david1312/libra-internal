import React from "react";
import _get from "lodash/get";
import _set from "lodash/set";

function getSession(KEY: string) {
  return JSON.parse(window.localStorage.getItem(KEY) || "{}");
}

export default function useStorage(dbKey = "semesta-storage") {
  const [master, setMaster] = React.useState({});

  React.useEffect(() => {
    setMaster({ ...getSession(dbKey) });
  }, [dbKey]);

  function get(key: string, defaultValue?: any) {
    return _get({ ...getSession(dbKey) }, key, defaultValue || "");
  }
  function set(key: string, value: any) {
    const newState = _set(getSession(dbKey), key, value);
    window.localStorage.setItem(dbKey, JSON.stringify(newState));
    setMaster({ ...newState });
  }
  return {
    get,
    set,
    master,
  };
}
