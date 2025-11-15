
import React, { useState } from 'react';
import { Page } from '../App';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const Logo: React.FC = () => (
    <div className="text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        prodlyx
    </div>
);

const NavLink: React.FC<{ page: Page; currentPage: Page; onNavigate: (page: Page) => void; children: React.ReactNode }> = ({ page, currentPage, onNavigate, children }) => (
    <button
        onClick={() => onNavigate(page)}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
            currentPage === page
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:bg-slate-700 hover:text-white'
        }`}
    >
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-slate-800/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
                        <Logo />
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLink page="home" currentPage={currentPage} onNavigate={onNavigate}>Home</NavLink>
                            <NavLink page="search" currentPage={currentPage} onNavigate={onNavigate}>Search</NavLink>
                            <NavLink page="reviews" currentPage={currentPage} onNavigate={onNavigate}>Reviews</NavLink>
                            <NavLink page="chatbot" currentPage={currentPage} onNavigate={onNavigate}>Chatbot</NavLink>
                        </div>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink page="home" currentPage={currentPage} onNavigate={onNavigate}>Home</NavLink>
                        <NavLink page="search" currentPage={currentPage} onNavigate={onNavigate}>Search</NavLink>
                        <NavLink page="reviews" currentPage={currentPage} onNavigate={onNavigate}>Reviews</NavLink>
                        <NavLink page="chatbot" currentPage={currentPage} onNavigate={onNavigate}>Chatbot</NavLink>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
