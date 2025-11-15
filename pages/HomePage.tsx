
import React from 'react';
import { Page } from '../App';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center py-16 md:py-24">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-0 left-0 -z-10 h-1/2 w-full bg-gradient-to-br from-purple-900/50 via-transparent to-transparent"></div>

      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
        Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">prodlyx</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
        Your ultimate destination for honest and comprehensive product reviews. Find the perfect product with confidence.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onNavigate('search')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/50"
        >
          Find Reviews
        </button>
        <button
          onClick={() => onNavigate('chatbot')}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105"
        >
          Ask our AI
        </button>
      </div>
    </div>
  );
};

export default HomePage;
