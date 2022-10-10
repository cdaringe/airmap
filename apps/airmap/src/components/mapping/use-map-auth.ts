import React from "react";

export type MapAuth = {
  accessToken: string;
};

const STORAGE_KEY = "map-auth";

export type MapAuthContext = {
  value: MapAuth;
  update: (ds: MapAuth) => void;
};

const DEFAULT_VALUE = {
  accessToken:
    "pk.eyJ1IjoicGR4Y2xlYW5haXIiLCJhIjoiY2tweDFuZmxpMjFmbzJ3bXVkajd4dDQ4dSJ9.LYiRB4TgOAckcqZGi-cUXg",
};
export const ctx = React.createContext<MapAuthContext>({
  value: DEFAULT_VALUE,
  update: () => {},
});
export const MapAuthProvider = ctx.Provider;
ctx.displayName = "MapAuth";

export const useMapAuth = () => React.useContext(ctx);

export const persist = (v: MapAuth) =>
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
export const read = (): MapAuth => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_VALUE;
    return JSON.parse(stored);
  } catch (err) {
    return DEFAULT_VALUE;
  }
};
