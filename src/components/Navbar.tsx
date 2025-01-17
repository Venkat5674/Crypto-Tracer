import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, Contact, Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Coins className="h-8 w-8" />
            <span className="font-bold text-xl">CryptoTracker</span>
          </Link>
          
          <div className="flex space-x-6">
            <Link to="/" className="flex items-center space-x-1 hover:text-indigo-200 transition-colors">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-1 hover:text-indigo-200 transition-colors">
              <Contact className="h-5 w-5" />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;