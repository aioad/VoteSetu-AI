import { Vote, ExternalLink } from 'lucide-react';
import type { Page } from './Navbar';

interface FooterProps {
  onChange: (page: Page) => void;
}

export default function Footer({ onChange }: FooterProps) {
  return (
    <footer className="bg-navy-900 text-navy-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-saffron-500 flex items-center justify-center">
                <Vote size={16} className="text-white" />
              </div>
              <span className="text-white font-bold text-lg">VoteSetu <span className="text-saffron-400">AI</span></span>
            </div>
            <p className="text-sm leading-relaxed text-navy-400">
              Bridging Citizens and Democracy. An AI-powered civic education platform helping voters understand
              the election process through interactive learning.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {([
                ['assistant', 'Ask VoteSetu AI'],
                ['timeline', 'Election Timeline'],
                ['simulator', 'Voting Simulator'],
                ['first-time', 'First-Time Voter Guide'],
                ['demo-journey', 'Demo Journey'],
              ] as [Page, string][]).map(([page, label]) => (
                <li key={page}>
                  <button
                    onClick={() => onChange(page)}
                    className="text-sm text-navy-400 hover:text-saffron-400 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Official resources */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Official Resources</h4>
            <ul className="space-y-2">
              {[
                ['https://eci.gov.in', 'Election Commission of India'],
                ['https://voters.eci.gov.in', 'National Voter Service Portal'],
                ['https://factchecker.in', 'Factchecker.in'],
                ['https://www.boomlive.in', 'Boom Live Fact Check'],
                ['https://www.altnews.in', 'Alt News'],
              ].map(([url, label]) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-navy-400 hover:text-saffron-400 transition-colors flex items-center gap-1"
                  >
                    <ExternalLink size={11} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-500">
            © 2024 VoteSetu AI — Built for Civic Education. Not affiliated with the Election Commission of India.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-saffron-500" />
            <div className="w-3 h-3 rounded-full bg-white opacity-50" />
            <div className="w-3 h-3 rounded-full bg-forest-500" />
            <span className="text-xs text-navy-500 ml-1">Jai Hind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
