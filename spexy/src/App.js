// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/LoginForm';
import Main from './components/Main/MainPage';
import Search from './components/Search/SearchPage';
import Admin from './components/Admin/AdminPage';

import Reset from './components/Reset/ForgotPassword';
import Signup from './components/Signup/SignupForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/store" element={<Main />} />
                <Route path="/" element={<Search />} />
                <Route path="/admin" element={<Admin />} />

                {/* for signup and forgot password */}
                <Route path="/signup" element={<Signup />}/>
                <Route path="/reset" element={<Reset />}/>
            </Routes>
        </Router>
    );
}

export default App;
