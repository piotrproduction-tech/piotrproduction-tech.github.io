// FE-21__Marketplace - views/GlobalWrapper.js

import GlobalEventOverlay from "../components/GlobalEventOverlay";

export default function GlobalWrapper({ children }) {
  return (
    <div className="global-wrapper">
      <GlobalEventOverlay />
      {children}
    </div>
  );
}
