import React, { useEffect, useState } from "react";

export function WalletPanel({ userId = "user-1" }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    fetch(`/api/tokens/wallet/${userId}`)
      .then((res) => res.json())
      .then((data) => setWallet(data));
  }, [userId]);

  if (!wallet) return <div>Ładowanie portfela...</div>;

  return (
    <div>
      <h2>Portfel użytkownika</h2>
      <p>Saldo: <strong>{wallet.balance} GATE</strong></p>
      <h3>Historia</h3>
      <ul>
        {wallet.history.map((h, i) => (
          <li key={i}>
            {h.type} — {h.amount} GATE — {h.reason}
          </li>
        ))}
      </ul>
    </div>
  );
}
