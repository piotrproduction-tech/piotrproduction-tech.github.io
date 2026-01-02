// FE-21__Marketplace - views/NarrationView.js

import NarrationPanel from "../components/NarrationPanel";

export default function NarrationView({ life }) {
  return (
    <div className="narration-view">
      <NarrationPanel life={life} />
    </div>
  );
}
