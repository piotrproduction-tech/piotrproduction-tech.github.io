// FE-21__Marketplace - components/CreatorProfile.js

export default function CreatorProfile({ creator }) {
  if (!creator) return null;

  return (
    <div className="creator-profile">
      <h2>{creator.name}</h2>
      <div className="creator-meta">
        <div>Level: {creator.level}</div>
        <div>Reputation: {creator.reputation}</div>
        <div>Creations: {creator.creations}</div>
      </div>
    </div>
  );
}
