// FE-21__Marketplace - components/StreetGallery.js

export default function StreetGallery({ creator }) {
  if (!creator) return null;

  return (
    <div className="street-gallery">
      <h3>{creator.name}'s Gallery</h3>
      <div className="gallery-items">
        {creator.portfolio?.map((item, i) => (
          <div key={i} className="gallery-item">
            <strong>{item.title}</strong>
            <div>{item.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
