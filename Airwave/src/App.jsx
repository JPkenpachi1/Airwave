import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import Dashboard from './features/Dashboard/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from './pages/home';
import Reports from './pages/report';
import Complaints from './pages/complaints';
import EnquiryForm from './pages/enquiry';
import Login from './pages/login';
import Users from './pages/Users';
import TechnicianForm from './pages/tech';
function App() {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Check if user is authenticated
  return (
    <Router>
      
      <Routes>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} >
        
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users/>}/>
                    <Route path="reports" element={<Reports />} />
                    <Route path="complaints" element={<Complaints />} />
                    <Route path='enquiry' element={<EnquiryForm/>} />
                    <Route path='tech' element={<TechnicianForm/>}/>
        </Route>
       
      </Routes>
    </Router>
  );
}

export default App;
