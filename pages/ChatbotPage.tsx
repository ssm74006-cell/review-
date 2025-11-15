
import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { ChatMessage } from '../types';
import { createChatSession, sendMessageToChat } from '../services/geminiService';

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-3 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg ${isUser ? 'bg-purple-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
        </div>
    );
};

const ChatbotPage: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [history, setHistory] = useState<ChatMessage[]>([
        { sender: 'bot', text: "Hello! I'm the prodlyx AI assistant. How can I help you find the perfect product today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chatSession = createChatSession();
        setChat(chatSession);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !chat || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setHistory(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const botResponse = await sendMessageToChat(chat, input);
            const botMessage: ChatMessage = { sender: 'bot', text: botResponse };
            setHistory(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' };
            setHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-12rem)] max-w-3xl mx-auto bg-slate-800 rounded-xl shadow-2xl shadow-slate-950/50">
            <div className="p-4 border-b border-slate-700">
                <h1 className="text-xl font-bold text-center">AI Product Assistant</h1>
            </div>
            <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto">
                {history.map((msg, index) => (
                    <ChatBubble key={index} message={msg} />
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                         <div className="px-4 py-3 rounded-2xl bg-slate-700 text-slate-200 rounded-bl-none">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-700">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about a product..."
                        className="flex-1 w-full bg-slate-700 border border-slate-600 rounded-full py-2 px-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-purple-600 text-white rounded-full p-2.5 transition-colors duration-300 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatbotPage;
