import React from 'react';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import SalesChart from './components/myChart';
import AddSaleForm from './components/add';
import Register from './components/inscription';
import Navigation from './components/navigation';
const App = () => {
  return (
    <div>
    <Router>
    <Navigation />
    
      <Routes>
        <Route path="/" element={<SalesChart />} />
        <Route path="/login" element={<AddSaleForm/>} />
        <Route path="/register" element={<Register/>} />
        </Routes>
    </Router>
    </div>
  );
};

export default App;