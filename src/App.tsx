import { useState, useEffect } from 'react';
import Navbar, { type Page } from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AIAssistant from './pages/AIAssistant';
import ElectionTimeline from './pages/ElectionTimeline';
import VotingSimulator from './pages/VotingSimulator';
import FirstTimeVoterGuide from './pages/FirstTimeVoterGuide';
import MisinformationChecker from './pages/MisinformationChecker';
import PollingBoothFinder from './pages/PollingBoothFinder';
import DemoJourney from './pages/DemoJourney';

const PAGE_TITLES: Record<Page, string> = {
  home: 'VoteSetu AI — Bridging Citizens and Democracy',
  assistant: 'Ask VoteSetu AI — Election Assistant',
  timeline: 'Election Timeline — VoteSetu AI',
  simulator: 'Voting Simulator — VoteSetu AI',
  misinformation: 'Fact Checker — VoteSetu AI',
  'first-time': 'First-Time Voter Guide — VoteSetu AI',
  'booth-finder': 'Polling Booth Finder — VoteSetu AI',
  'demo-journey': 'Demo Voting Journey — VoteSetu AI',
};

const FOOTERLESS_PAGES: Page[] = ['assistant'];

export default function App() {
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    document.title = PAGE_TITLES[page];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const showFooter = !FOOTERLESS_PAGES.includes(page);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar current={page} onChange={setPage} />
      <div className="h-[68px]" />
      <main className="flex-1 flex flex-col">
        {page === 'home' && <Home onChange={setPage} />}
        {page === 'assistant' && <AIAssistant />}
        {page === 'timeline' && <ElectionTimeline />}
        {page === 'simulator' && <VotingSimulator />}
        {page === 'misinformation' && <MisinformationChecker />}
        {page === 'first-time' && <FirstTimeVoterGuide />}
        {page === 'booth-finder' && <PollingBoothFinder />}
        {page === 'demo-journey' && <DemoJourney />}
      </main>
      {showFooter && <Footer onChange={setPage} />}
    </div>
  );
}
