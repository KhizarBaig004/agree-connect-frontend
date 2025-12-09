/**
 * Nested layout example for dashboard section
 * This layout will wrap only pages inside /dashboard/*
 * It will still inherit the root layout (Header/Footer)
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-container">
      {/* Dashboard-specific sidebar, navigation, etc. */}
      <aside className="dashboard-sidebar">
        <nav>Dashboard Navigation</nav>
      </aside>
      <div className="dashboard-content">{children}</div>
    </div>
  );
}

