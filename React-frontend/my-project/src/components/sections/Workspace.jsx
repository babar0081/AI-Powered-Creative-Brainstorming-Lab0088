// src/components/sections/Workspace.jsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Chat.css'; // Styles for the chat interface remain the same

// Message component remains unchanged
const Message = ({ sender, text, isStreaming }) => {
    const isUser = sender.toLowerCase() === 'user';
    const isError = sender.toLowerCase() === 'system error';
    const avatarChar = sender.charAt(0).toUpperCase();
    let avatarClass = `avatar avatar-${sender.toLowerCase().replace(/\s+/g, '-')}`;
    if (isError) avatarClass = 'avatar avatar-system-error';

    const renderFormattedText = (rawText) => {
        let formattedText = String(rawText || '');
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        const urlRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        return <span dangerouslySetInnerHTML={{ __html: formattedText.replace(urlRegex, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>') }} />;
    };

    return (
        <div className={`message ${isUser ? 'user' : ''} ${isError ? 'error-message' : ''}`}>
            <div className={avatarClass}>{avatarChar}</div>
            <div className="message-content">
                {!isUser && <div className="message-sender">{sender}</div>}
                <div className="message-text">
                    {renderFormattedText(text)}
                    {isStreaming && <span className="cursor"></span>}
                </div>
            </div>
        </div>
    );
};

const Workspace = ({ initialIdea, setSharedIdea }) => {
    const [messages, setMessages] = useState([
        { id: 'initial-1', sender: 'Moderator', text: 'Welcome to the AI Brainstorming Lab! What brilliant idea is on your mind today?', isStreaming: false }
    ]);
    const [inputIdea, setInputIdea] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messageListRef = useRef(null);
    const eventSourceRef = useRef(null);
    const initialIdeaProcessed = useRef(false);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const startDebate = useCallback((ideaText) => {
        if (!ideaText || isLoading) return;

        const userMessage = { id: Date.now(), sender: 'User', text: ideaText, isStreaming: false };
        setMessages(prev => [...prev, userMessage]);
        setInputIdea(''); // Clear input immediately after sending

        // FIX: Add client-side validation for query length
        if (ideaText.split(/\s+/).length < 3) {
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 1, // Ensure unique key
                    sender: 'Moderator',
                    text: 'Your idea is a bit short. Could you please elaborate a little more (at least 3 words) so the agents can have a meaningful debate?',
                    isStreaming: false
                }
            ]);
            return; // Stop before making the API call
        }

        if (eventSourceRef.current) eventSourceRef.current.close();

        setIsLoading(true);

        const source = new EventSource(`http://localhost:8000/brainstorm?idea=${encodeURIComponent(ideaText)}`);
        // const source = new EventSource(`https://ai-powered-creative-brainstorming-lab-production.up.railway.app/brainstorm?idea=${encodeURIComponent(ideaText)}`); eventSourceRef.current = source;
        let currentMessageId = null;

        source.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.event) {
                case 'start':
                    currentMessageId = Date.now() + Math.random();
                    setMessages(prev => [...prev, { id: currentMessageId, sender: data.sender || "AI", text: "", isStreaming: true }]);
                    break;
                case 'chunk':
                    if (data.text && currentMessageId) {
                        setMessages(prev => prev.map(m => m.id === currentMessageId ? { ...m, text: m.text + data.text } : m));
                    }
                    break;
                case 'end':
                    setMessages(prev => prev.map(m => m.id === currentMessageId ? { ...m, isStreaming: false } : m));
                    currentMessageId = null;
                    break;
                case 'final_end':
                    setIsLoading(false);
                    source.close();
                    eventSourceRef.current = null;
                    setMessages(prev => prev.map(m => ({ ...m, isStreaming: false })));
                    break;
                case 'error':
                    setIsLoading(false);
                    source.close();
                    eventSourceRef.current = null;
                    setMessages(prev => [...prev.map(m => ({ ...m, isStreaming: false })), { id: Date.now(), sender: 'System Error', text: data.message, isStreaming: false }]);
                    break;
            }
        };

        source.onerror = (error) => {
            console.error('EventSource failed:', error);
            setIsLoading(false);
            if (eventSourceRef.current) eventSourceRef.current.close();
            setMessages(prev => [...prev.map(m => ({ ...m, isStreaming: false })), { id: Date.now(), sender: 'System Error', text: 'Connection to the AI server failed. Please ensure the backend is running.', isStreaming: false }]);
        };
    }, [isLoading]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        startDebate(inputIdea.trim());
    };

    useEffect(() => {
        if (initialIdea && initialIdea.trim() && !initialIdeaProcessed.current) {
            initialIdeaProcessed.current = true;
            startDebate(initialIdea);
            setSharedIdea('');
        }
    }, [initialIdea, setSharedIdea, startDebate]);

    const downloadChatHistory = () => {
        if (messages.length <= 1) {
            alert("The chat is empty. Please start a conversation to download the history.");
            return;
        }

        const chatToSave = messages.map(({ sender, text }) => ({ sender, text }));
        const jsonString = JSON.stringify(chatToSave, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `brainstorm-chat-${timestamp}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="workspace-view fade-in">
            <div className="chat-container">
                <div className="chat-header">
                    <h3>AI Debate</h3>
                    <button onClick={downloadChatHistory} className="download-btn">
                        Download Chat
                    </button>
                </div>
                <div className="message-list" ref={messageListRef}>
                    {messages.map((msg) => (
                        <Message key={msg.id} sender={msg.sender} text={msg.text} isStreaming={msg.isStreaming} />
                    ))}
                    {isLoading && <div className="loading-indicator">AI team is debating...</div>}
                </div>
                <div className="input-form-container">
                    <form className="input-form" onSubmit={handleSendMessage}>
                        <textarea
                            value={inputIdea}
                            onChange={(e) => setInputIdea(e.target.value)}
                            placeholder="Enter your idea here and hit send..."
                            rows="1"
                            disabled={isLoading}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(e); } }}
                        />
                        <button type="submit" disabled={isLoading}>{isLoading ? 'Debating...' : 'Send'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Workspace;