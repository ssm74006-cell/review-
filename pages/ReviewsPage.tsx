
import React, { useState, useEffect, useCallback } from 'react';
import { Category, Review } from '../types';
import { fetchReviews } from '../services/geminiService';
import StarRating from '../components/StarRating';

interface ReviewsPageProps {
  category: Category | null;
  product: string;
  onNewSearch: () => void;
}

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700/50 transition-transform duration-300 hover:scale-[1.02] hover:border-purple-500">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="text-lg font-semibold text-white">{review.productName}</h3>
                <p className="text-sm text-slate-400">by {review.reviewer}</p>
            </div>
            <div className="flex-shrink-0 ml-4">
                <StarRating rating={review.rating} />
            </div>
        </div>
        <p className="text-slate-300 leading-relaxed">{review.comment}</p>
    </div>
);

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-slate-800 p-6 rounded-xl shadow-lg animate-pulse">
                <div className="flex justify-between items-center mb-4">
                    <div className="w-2/3 h-6 bg-slate-700 rounded"></div>
                    <div className="w-1/4 h-5 bg-slate-700 rounded"></div>
                </div>
                <div className="space-y-2">
                    <div className="w-full h-4 bg-slate-700 rounded"></div>
                    <div className="w-full h-4 bg-slate-700 rounded"></div>
                    <div className="w-3/4 h-4 bg-slate-700 rounded"></div>
                </div>
            </div>
        ))}
    </div>
);

const ReviewsPage: React.FC<ReviewsPageProps> = ({ category, product, onNewSearch }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getReviews = useCallback(async () => {
        if (!category || !product) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const fetchedReviews = await fetchReviews(category, product);
            setReviews(fetchedReviews);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, product]);

    useEffect(() => {
        getReviews();
    }, [getReviews]);

    if (!category || !product) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold mb-4">No search query provided.</h2>
                <p className="text-slate-400 mb-6">Please start a new search to see reviews.</p>
                <button
                    onClick={onNewSearch}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                    Start New Search
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Showing reviews for <span className="text-purple-400">{product}</span>
                </h1>
                <p className="text-slate-400">Category: {category}</p>
            </div>
            
            {isLoading && <LoadingSkeleton />}
            
            {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
                    <p className="font-bold">Oops! Something went wrong.</p>
                    <p>{error}</p>
                </div>
            )}
            
            {!isLoading && !error && reviews.length === 0 && (
                <div className="text-center py-10">
                    <h2 className="text-2xl font-bold mb-4">No reviews found.</h2>
                    <p className="text-slate-400">Try searching for a different product.</p>
                </div>
            )}

            {!isLoading && !error && reviews.length > 0 && (
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {reviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            )}

            <div className="mt-12 text-center">
                <button
                    onClick={onNewSearch}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                    Start New Search
                </button>
            </div>
        </div>
    );
};

export default ReviewsPage;
