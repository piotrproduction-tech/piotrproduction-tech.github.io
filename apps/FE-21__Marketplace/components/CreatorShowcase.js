// FE-21__Marketplace - components/CreatorShowcase.js

export default function CreatorShowcase({ showcase }) {
  if (!showcase) return null;

  return (
    <div className="creator-showcase">
      <h3>Showcase</h3>
      <div className="showcase-grid">
        {showcase.map((item, i) => (
          <div key={i} className="showcase-item">
            <img src={item.thumbnail} alt={item.title} className="showcase-thumb" />
            <div className="showcase-title">{item.title}</div>
            <div className="showcase-type">{item.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
