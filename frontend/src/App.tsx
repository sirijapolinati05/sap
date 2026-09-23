import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Members from './pages/Members';
import Visitor from './pages/Visitor';
import Sales from './pages/Sales';
import Purchase from './pages/Purchase';
import Inventory from './pages/Inventory';
import CashBook from './pages/CashBook';
import Reports from './pages/Reports';
import SystemSetup from './pages/SystemSetup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/visitor" element={<Visitor />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/cash-book" element={<CashBook />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/setup" element={<SystemSetup />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
