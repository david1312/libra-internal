import { atom } from "recoil";

export interface AuthState {
  isAuth: boolean;
  userData: null | {
    nik: string;
    name: string;
  };
  scope: string[];
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: AuthState, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const authState = atom({
  key: "authState",
  default: {
    isAuth: false,
    userData: null,
    scope: [],
  } as AuthState,
  effects: [localStorageEffect("authState")],
});
