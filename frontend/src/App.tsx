import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { OrderPage } from './components/OrderPage';
import { useTranslation } from 'react-i18next';
import './App.css';

// Footer Component
const Footer: React.FC = () => {
  const { t } = useTranslation();
  return <footer className="footer">{t('common.footer')}</footer>;
};

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
