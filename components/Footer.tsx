
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800/50 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} prodlyx. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
