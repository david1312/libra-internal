export function getLocalStorage(key: string): Object | undefined{
  const val = window.localStorage.getItem(key);
  if (val){
    return JSON.parse(val);
  }
  return undefined;
}

export function setLocalStorage(key:string, val: Object | string) {
  const newVal = typeof val === "string" ? val : JSON.stringify(val);
  window.localStorage.setItem(key, newVal);
}
