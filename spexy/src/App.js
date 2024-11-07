import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/LoginForm';
import Main from './components/Main/MainPage';
import Search from './components/Search/SearchPage';
import Admin from './components/Admin/AdminPage';

import Reset from './components/Reset/ForgotPassword';
import Signup from './components/Signup/SignupForm';

//  App component to handle routing
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
