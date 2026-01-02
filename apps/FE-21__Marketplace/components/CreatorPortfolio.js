// FE-21__Marketplace - components/CreatorPortfolio.js

export default function CreatorPortfolio({ portfolio }) {
  if (!portfolio) return null;

  return (
    <div className="creator-portfolio">
      <h3>Portfolio</h3>
      <div className="portfolio-grid">
        {portfolio.map((item, i) => (
          <div key={i} className="portfolio-item">
            <strong>{item.title}</strong>
            <div>{item.type}</div>
            <div>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
