// FE-21__Marketplace - components/DashboardTransactionHistory.js

export default function DashboardTransactionHistory({ transactions }) {
  if (!transactions) return null;

  return (
    <div className="dashboard-transaction-history">
      <h3>Transaction History</h3>
      <ul>
        {transactions.map((t, i) => (
          <li key={i}>
            <strong>{t.title}</strong> — {t.amount} tokens ({t.date})
          </li>
        ))}
      </ul>
    </div>
  );
}
