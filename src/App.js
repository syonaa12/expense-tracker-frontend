import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';

import GetStarted from './GetStarted';
import Login from './Login';
import Expenses from './expenses'; // Correctly named 'Expenses' component
import Budget from './Budget'; // Correct relative path

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <h1>Expense Tracker</h1>
          <nav>
            <NavLink exact to="/" activeClassName="active">Home</NavLink> | 
            <NavLink to="/getstarted" activeClassName="active">Get Started</NavLink> | 
            <NavLink to="/login" activeClassName="active">Login</NavLink>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/"
            element={
              <div>
                <h2>Welcome to Expense Tracker</h2>
                <img 
                  src="https://www.mindinventory.com/blog/wp-content/uploads/2021/06/expense-tracking-app.webp" 
                  alt="Welcome to Expense Tracker"
                  style={{ width: '50%', height: 'auto', marginTop: '20px' }}
                />
      </div>
    } 
    />

            <Route path="/getstarted" element={<GetStarted />} />
            <Route path="/login" element={<Login />} />
            <Route path="/expenses" element={<Expenses />} /> {/* Updated the component import name */}
            <Route path="/budget" element={<Budget />} />



            {/* 404 Fallback Route */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
