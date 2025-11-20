import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import UserDatabase from './components/UserDatabase';
import CreateUserForm from './components/CreateUserForm'; 
import UpdateUserForm from './components/UpdateUserForm'; 

import './App.css';

function App() {
    const linkBaseClasses = "block px-4 py-2 rounded-full transition-all duration-300";
    const linkInactiveClasses = "text-gray-300 hover:bg-indigo-600 hover:text-white";
    
    const AppContent = () => {
        const location = useLocation();

        const getLinkClasses = (path) => 
            `${linkBaseClasses} ${location.pathname === path || location.pathname.startsWith(path + '/')
                ? 'bg-indigo-600 text-white shadow-md' 
                : linkInactiveClasses}`;

        return (
            <>
                <header className="fixed top-0 left-0 w-full bg-gray-900 shadow-2xl z-50">
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ul className="flex items-center justify-start space-x-6 h-16">
                            <li>
                                <Link to="/" className={getLinkClasses('/')}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/users" className={getLinkClasses('/users')}>
                                    Users
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                
                <main className="pt-16 min-h-screen bg-gray-50">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<UserDatabase />} />
                        <Route path="/create" element={<CreateUserForm />} />
                        <Route path="/update/:id" element={<UpdateUserForm />} />
                    </Routes>
                </main>
            </>
        );
    };

    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;