// FE-21__Marketplace - components/LiveCreatorSignal.js

export default function LiveCreatorSignal({ creator }) {
  if (!creator) return null;

  return (
    <div className="live-creator-signal">
      <h4>{creator.name} is active</h4>
      <div>Level: {creator.level}</div>
      <div>Creations: {creator.creations}</div>
    </div>
  );
}
