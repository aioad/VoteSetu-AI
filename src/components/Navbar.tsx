import { useState } from 'react';
import {
  Home, MessageSquare, Calendar, PlayCircle, ShieldAlert,
  BookOpen, MapPin, Route, Menu, X, Vote
} from 'lucide-react';

export type Page =
  | 'home'
  | 'assistant'
  | 'timeline'
  | 'simulator'
  | 'misinformation'
  | 'first-time'
  | 'booth-finder'
  | 'demo-journey';

interface NavbarProps {
  current: Page;
  onChange: (page: Page) => void;
}

const NAV_ITEMS: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home size={16} /> },
  { id: 'assistant', label: 'Ask VoteSetu AI', icon: <MessageSquare size={16} /> },
  { id: 'timeline', label: 'Election Timeline', icon: <Calendar size={16} /> },
  { id: 'simulator', label: 'Voting Simulator', icon: <PlayCircle size={16} /> },
  { id: 'misinformation', label: 'Fact Checker', icon: <ShieldAlert size={16} /> },
  { id: 'first-time', label: "First-Time Voter", icon: <BookOpen size={16} /> },
  { id: 'booth-finder', label: 'Booth Finder', icon: <MapPin size={16} /> },
  { id: 'demo-journey', label: 'Demo Journey', icon: <Route size={16} /> },
];

export default function Navbar({ current, onChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-800 shadow-lg">
      {/* Top strip — Indian tricolor accent */}
      <div className="flex h-1">
        <div className="flex-1 bg-saffron-500" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-forest-600" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onChange('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-saffron-500 flex items-center justify-center shadow-md group-hover:bg-saffron-400 transition-colors">
              <Vote size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg leading-none">VoteSetu</span>
              <span className="text-saffron-400 font-medium text-lg leading-none"> AI</span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  current === item.id
                    ? 'bg-saffron-500 text-white shadow-md'
                    : 'text-navy-200 hover:text-white hover:bg-navy-700'
                }`}
              >
                {item.icon}
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-navy-200 hover:text-white hover:bg-navy-700 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-900 border-t border-navy-700 animate-fade-in">
          <div className="px-4 py-3 grid grid-cols-2 gap-1.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { onChange(item.id); setMobileOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  current === item.id
                    ? 'bg-saffron-500 text-white'
                    : 'text-navy-300 hover:text-white hover:bg-navy-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
