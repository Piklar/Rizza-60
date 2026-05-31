import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InvitationPage from './pages/InvitationPage';
import AdminDashboard from './pages/AdminDashboard';

/**
 * App — root router component.
 * Route "/" renders the public invitation page (US1 + US2).
 * Route "/admin-dashboard" renders the protected admin view (US3).
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InvitationPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
