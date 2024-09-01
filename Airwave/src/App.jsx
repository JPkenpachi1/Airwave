import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './features/Dashboard/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from './pages/home';
import Reports from './pages/report';
import Complaints from './pages/complaints';
function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Dashboard/>} >
        
        <Route path="home" element={<Home />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="complaints" element={<Complaints />} />
        </Route>
       
      </Routes>
    </Router>
  );
}

export default App;
