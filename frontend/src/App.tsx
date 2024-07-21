import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BrandLayout from './components/layouts/BrandLayout';
import BrandsLayout from './components/layouts/BrandsLayout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<BrandsLayout />} />
            <Route path="/brand/:brandId" element={<BrandLayout />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
