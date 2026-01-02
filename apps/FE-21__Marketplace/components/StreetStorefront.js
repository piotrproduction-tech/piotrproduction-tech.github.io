// FE-21__Marketplace - components/StreetStorefront.js

export default function StreetStorefront({ seller }) {
  if (!seller) return null;

  return (
    <div className="street-storefront">
      <h3>{seller.name}'s Storefront</h3>
      <div className="storefront-stats">
        <div>Sales: {seller.sales}</div>
        <div>Reputation: {seller.reputation}</div>
      </div>
      <div className="storefront-items">
        {seller.items?.map((item, i) => (
          <div key={i} className="storefront-item">
            <strong>{item.title}</strong>
            <div>{item.price} tokens</div>
          </div>
        ))}
      </div>
    </div>
  );
}
