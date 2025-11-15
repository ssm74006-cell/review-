
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ReviewsPage from './pages/ReviewsPage';
import ChatbotPage from './pages/ChatbotPage';
import Footer from './components/Footer';
import { Category } from './types';

export type Page = 'home' | 'search' | 'reviews' | 'chatbot';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [searchCategory, setSearchCategory] = useState<Category | null>(null);
  const [searchProduct, setSearchProduct] = useState<string>('');

  const handleNavigate = useCallback((newPage: Page) => {
    setPage(newPage);
  }, []);

  const handleSearch = useCallback((category: Category, product: string) => {
    setSearchCategory(category);
    setSearchProduct(product);
    setPage('reviews');
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'search':
        return <SearchPage onSearch={handleSearch} />;
      case 'reviews':
        return <ReviewsPage category={searchCategory} product={searchProduct} onNewSearch={() => setPage('search')} />;
      case 'chatbot':
        return <ChatbotPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header onNavigate={handleNavigate} currentPage={page} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
