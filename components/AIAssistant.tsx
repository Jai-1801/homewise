import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  MessageSquare, 
  X, 
  Minimize2, 
  Maximize2,
  Sparkles,
  FileText,
  Calendar,
  Shield,
  Calculator,
  Phone,
  MapPin,
  TrendingUp,
  Send,
  Bot
} from 'lucide-react';
import { UserType, AppState } from '../App';

interface AIAssistantProps {
  userType: UserType | null;
  currentView: AppState['currentView'];
  onViewChange: (view: AppState['currentView']) => void;
  isOpen?: boolean;
  onToggleOpen?: (open: boolean) => void;
}

export function AIAssistant({ userType, currentView, onViewChange, isOpen: externalIsOpen, onToggleOpen }: AIAssistantProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      message: `Hello! I'm your AI assistant. I can help you with property listings, rent calculations, and more. What can I do for you today?`,
      timestamp: new Date()
    }
  ]);

  const contextualActions = () => {
    switch (currentView) {
      case 'landing':
        return [
          { title: 'Start Property Search', action: () => onViewChange('search'), icon: MapPin },
          { title: 'List Your Property', action: () => onViewChange('listing'), icon: FileText }
        ];
      case 'dashboard':
        return [
          { title: 'Generate Rent Agreement', action: () => {}, icon: FileText },
          { title: 'Calculate Property Value', action: () => {}, icon: TrendingUp },
          { title: 'Schedule Property Visit', action: () => {}, icon: Calendar }
        ];
      case 'search':
        return [
          { title: 'Refine Search Criteria', action: () => {}, icon: MapPin },
          { title: 'Calculate EMI', action: () => {}, icon: Calculator },
          { title: 'Compare Properties', action: () => {}, icon: TrendingUp }
        ];
      case 'listing':
        return [
          { title: 'Estimate Property Rent', action: () => {}, icon: TrendingUp },
          { title: 'Verify Documents', action: () => {}, icon: Shield },
          { title: 'Generate Description', action: () => {}, icon: FileText }
        ];
      default:
        return [
          { title: 'Search Properties', action: () => onViewChange('search'), icon: MapPin },
          { title: 'List Property', action: () => onViewChange('listing'), icon: FileText }
        ];
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: chatInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        message: getAIResponse(chatInput),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('rent') || message.includes('price')) {
      return "I can help you estimate rental prices! Based on location, property type, and amenities, I'll provide market rates. Would you like me to analyze a specific property or area?";
    } else if (message.includes('document') || message.includes('agreement')) {
      return "I can help generate rental agreements, verify property documents, and guide you through the documentation process. What specific documents do you need help with?";
    } else if (message.includes('search') || message.includes('find')) {
      return "I can help you find the perfect property! Tell me your preferences - location, budget, BHK type, and amenities. I'll search and filter properties that match your criteria.";
    } else if (message.includes('visit') || message.includes('schedule')) {
      return "I can help you schedule property visits! I'll coordinate with property owners and find suitable time slots. Which property would you like to visit?";
    } else {
      return "I'm here to help with all your real estate needs - property search, pricing, documentation, visits, and more. What specific assistance do you need?";
    }
  };

  const handleToggleOpen = (open: boolean) => {
    if (onToggleOpen) {
      onToggleOpen(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => handleToggleOpen(true)}
        className="fixed bottom-24 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 animate-pulse-glow"
      >
        <Bot className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-24 right-4 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80' : 'w-80 md:w-96'
    }`}>
      <Card className="shadow-premium-lg">
        <CardHeader className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-white text-sm">AI Assistant</CardTitle>
                <p className="text-white/80 text-xs">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={() => handleToggleOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0">
            {/* Quick Actions */}
            <div className="p-4 border-b border-border">
              <h4 className="font-medium mb-3 text-sm">Quick Actions</h4>
              <div className="space-y-2">
                {contextualActions().map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={action.action}
                    className="w-full justify-start"
                  >
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.title}
                  </Button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <Button size="sm" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}