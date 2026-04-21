import {
  MessageSquare, Calendar, PlayCircle, ShieldAlert,
  BookOpen, MapPin, Route, ArrowRight, Users, Shield, Zap, ChevronRight
} from 'lucide-react';
import type { Page } from '../components/Navbar';

interface HomeProps {
  onChange: (page: Page) => void;
}

const MODULES = [
  {
    id: 'assistant' as Page,
    icon: <MessageSquare size={22} />,
    title: 'Ask VoteSetu AI',
    description: 'Get instant answers to all your election questions in simple, clear language.',
    color: 'bg-navy-700 text-white',
    accent: 'border-navy-500',
    badge: 'AI Powered',
  },
  {
    id: 'timeline' as Page,
    icon: <Calendar size={22} />,
    title: 'Election Timeline',
    description: 'Explore each stage of the election process with interactive visual cards.',
    color: 'bg-saffron-600 text-white',
    accent: 'border-saffron-400',
    badge: 'Interactive',
  },
  {
    id: 'simulator' as Page,
    icon: <PlayCircle size={22} />,
    title: 'Voting Simulator',
    description: 'Watch the complete journey of your vote — from booth to result declaration.',
    color: 'bg-forest-700 text-white',
    accent: 'border-forest-400',
    badge: 'Animated',
  },
  {
    id: 'misinformation' as Page,
    icon: <ShieldAlert size={22} />,
    title: 'Fact Checker',
    description: 'Paste any election news or viral message and get an instant credibility analysis.',
    color: 'bg-red-700 text-white',
    accent: 'border-red-500',
    badge: 'AI Analysis',
  },
  {
    id: 'first-time' as Page,
    icon: <BookOpen size={22} />,
    title: 'First-Time Voter Guide',
    description: 'A step-by-step guide designed for citizens voting for the very first time.',
    color: 'bg-amber-700 text-white',
    accent: 'border-amber-500',
    badge: 'Beginner Friendly',
  },
  {
    id: 'booth-finder' as Page,
    icon: <MapPin size={22} />,
    title: 'Polling Booth Finder',
    description: 'Find polling booths near your location with addresses and directions.',
    color: 'bg-teal-700 text-white',
    accent: 'border-teal-500',
    badge: 'Location',
  },
  {
    id: 'demo-journey' as Page,
    icon: <Route size={22} />,
    title: 'Demo Voting Journey',
    description: 'Experience the complete election journey from eligibility to result — step by step.',
    color: 'bg-violet-800 text-white',
    accent: 'border-violet-500',
    badge: 'Full Experience',
  },
];

const STATS = [
  { icon: <Users size={20} />, value: '96.8 Cr', label: 'Registered Voters (2024)' },
  { icon: <Shield size={20} />, value: '10.5 Lakh', label: 'Polling Stations' },
  { icon: <Zap size={20} />, value: '543', label: 'Lok Sabha Constituencies' },
];

export default function Home({ onChange }: HomeProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 flex">
            <div className="flex-1 bg-saffron-500" />
            <div className="flex-1 bg-white opacity-30" />
            <div className="flex-1 bg-forest-500" />
          </div>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-saffron-500 opacity-5" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-forest-500 opacity-5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-navy-600 opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-saffron-500 bg-opacity-20 border border-saffron-500 border-opacity-40 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-saffron-400 animate-pulse-soft" />
              <span className="text-saffron-300 text-sm font-medium">Civic Education Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              VoteSetu <span className="text-saffron-400">AI</span>
            </h1>
            <p className="text-xl sm:text-2xl text-navy-300 font-medium mb-4">
              Bridging Citizens and Democracy
            </p>
            <p className="text-navy-400 text-lg leading-relaxed mb-8 max-w-2xl">
              VoteSetu AI empowers every Indian citizen to understand the election process through
              AI-guided learning, interactive simulations, and real-time fact-checking. Know your vote.
              Protect your democracy.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onChange('assistant')}
                className="flex items-center gap-2 bg-saffron-500 hover:bg-saffron-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <MessageSquare size={18} />
                Ask VoteSetu AI
              </button>
              <button
                onClick={() => onChange('demo-journey')}
                className="flex items-center gap-2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white border border-white border-opacity-20 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                <Route size={18} />
                Start Demo Journey
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-xl p-4 flex items-center gap-3">
                <div className="text-saffron-400">{s.icon}</div>
                <div>
                  <div className="text-white font-bold text-lg leading-tight">{s.value}</div>
                  <div className="text-navy-400 text-xs">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-800 mb-2">Explore All Modules</h2>
          <p className="text-slate-500 text-lg">Seven powerful tools to educate, guide, and protect you as a voter.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {MODULES.map((mod, idx) => (
            <button
              key={mod.id}
              onClick={() => onChange(mod.id)}
              style={{ animationDelay: `${idx * 60}ms` }}
              className="group text-left bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 animate-slide-up"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${mod.color}`}>
                {mod.icon}
              </div>
              <div className="mb-1">
                <span className="inline-block text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full mb-2">
                  {mod.badge}
                </span>
                <h3 className="font-semibold text-navy-800 text-base leading-snug">{mod.title}</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{mod.description}</p>
              <div className="flex items-center gap-1 text-navy-600 text-sm font-medium group-hover:gap-2 transition-all">
                <span>Explore</span>
                <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <div className="bg-gradient-to-r from-navy-800 to-navy-700 rounded-2xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-l from-saffron-500 to-transparent" />
          </div>
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
                Is the news you read about elections real?
              </h3>
              <p className="text-navy-300 text-base">
                Use our AI Fact Checker to instantly verify viral election messages and protect democracy.
              </p>
            </div>
            <button
              onClick={() => onChange('misinformation')}
              className="flex items-center gap-2 bg-saffron-500 hover:bg-saffron-400 text-white px-6 py-3 rounded-xl font-semibold whitespace-nowrap shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Check Now <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
