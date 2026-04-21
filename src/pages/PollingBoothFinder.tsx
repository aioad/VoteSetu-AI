import { useState } from 'react';
import { MapPin, Search, Navigation, Phone, Clock, Users, Map } from 'lucide-react';

interface Booth {
  id: number;
  name: string;
  address: string;
  distance: string;
  timing: string;
  capacity: number;
  ward: string;
}

const MOCK_BOOTHS: Record<string, Booth[]> = {
  default: [
    {
      id: 1,
      name: 'Government Primary School, Sector 12',
      address: 'Near Water Tank, Sector 12, New Delhi - 110001',
      distance: '0.4 km',
      timing: '7:00 AM – 6:00 PM',
      capacity: 1200,
      ward: 'Ward 45 – Rajpur',
    },
    {
      id: 2,
      name: 'Community Hall, Block B',
      address: 'Block B Market Complex, Sector 14, New Delhi - 110001',
      distance: '0.9 km',
      timing: '7:00 AM – 6:00 PM',
      capacity: 800,
      ward: 'Ward 45 – Rajpur',
    },
    {
      id: 3,
      name: 'Municipal Corporation Office',
      address: 'Main Road, Sector 16, New Delhi - 110002',
      distance: '1.5 km',
      timing: '7:00 AM – 6:00 PM',
      capacity: 1500,
      ward: 'Ward 46 – Laxmi Nagar',
    },
    {
      id: 4,
      name: 'Central Library Building',
      address: 'Library Road, Civil Lines, New Delhi - 110054',
      distance: '2.1 km',
      timing: '7:00 AM – 6:00 PM',
      capacity: 950,
      ward: 'Ward 46 – Laxmi Nagar',
    },
  ],
  mumbai: [
    {
      id: 1,
      name: 'Shivaji Municipal School No. 3',
      address: 'Andheri West, Mumbai - 400058',
      distance: '0.3 km',
      timing: '7:00 AM – 6:00 PM',
      capacity: 1100,
      ward: 'Ward K/W – Andheri West',
    },
    {
      id: 2,
      name: 'BMC Office Compound Hall',
      address: 'Lokhandwala Complex, Andheri West, Mumbai - 400053',
      distance: '0.8 km',
      timing: '7:00 AM – 6:00 PM',
      capacity: 1300,
      ward: 'Ward K/W – Andheri West',
    },
    {
      id: 3,
      name: 'Mahatma Gandhi Vidyalaya',
      address: 'D.N. Nagar, Andheri West, Mumbai - 400053',
      distance: '1.4 km',
      timing: '7:00 AM – 6:00 PM',
      capacity: 900,
      ward: 'Ward K/W – Andheri West',
    },
  ],
  bangalore: [
    {
      id: 1,
      name: 'BBMP Primary School, Koramangala',
      address: '5th Block, Koramangala, Bengaluru - 560095',
      distance: '0.5 km',
      timing: '7:00 AM – 6:00 PM',
      capacity: 1050,
      ward: 'Ward 150 – Koramangala',
    },
    {
      id: 2,
      name: 'Rajajinagar Community Centre',
      address: 'RMV Extension, 2nd Stage, Bengaluru - 560094',
      distance: '1.1 km',
      timing: '7:00 AM – 6:00 PM',
      capacity: 700,
      ward: 'Ward 150 – Koramangala',
    },
    {
      id: 3,
      name: 'Kendriya Vidyalaya No. 2',
      address: 'Sadashivanagar, Bengaluru - 560080',
      distance: '1.8 km',
      timing: '7:00 AM – 6:00 PM',
      capacity: 1200,
      ward: 'Ward 151 – Sadashivanagar',
    },
  ],
};

function getBooths(city: string): Booth[] {
  const lower = city.toLowerCase();
  if (lower.includes('mumbai') || lower.includes('bombay')) return MOCK_BOOTHS.mumbai;
  if (lower.includes('bangalore') || lower.includes('bengaluru')) return MOCK_BOOTHS.bangalore;
  return MOCK_BOOTHS.default;
}

export default function PollingBoothFinder() {
  const [query, setQuery] = useState('');
  const [booths, setBooths] = useState<Booth[] | null>(null);
  const [searched, setSearched] = useState('');

  function handleSearch() {
    if (!query.trim()) return;
    setBooths(getBooths(query));
    setSearched(query);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-1.5 mb-4">
            <MapPin size={14} className="text-teal-600" />
            <span className="text-teal-700 text-sm font-medium">Demo Mode — Sample Data</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3">Polling Booth Finder</h1>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Enter your city or area to find nearby polling booths. Try Delhi, Mumbai, or Bangalore.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
          <label className="block text-sm font-semibold text-navy-700 mb-2">Enter your city or area</label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 border border-slate-200 rounded-xl px-4 focus-within:border-navy-400 focus-within:ring-1 focus-within:ring-navy-200 transition-all bg-slate-50">
              <MapPin size={16} className="text-slate-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. Delhi, Mumbai, Bangalore..."
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 py-3 outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!query.trim()}
              className="flex items-center gap-2 bg-navy-700 hover:bg-navy-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-sm transition-all"
            >
              <Search size={15} />
              Find
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {['Delhi', 'Mumbai', 'Bangalore'].map((city) => (
              <button
                key={city}
                onClick={() => { setQuery(city); }}
                className="text-xs bg-slate-100 hover:bg-navy-50 border border-slate-200 hover:border-navy-200 text-slate-600 hover:text-navy-700 px-3 py-1.5 rounded-full transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Real-booth instructions */}
        <div className="bg-navy-50 border border-navy-200 rounded-xl p-4 mb-6 flex gap-3">
          <Map size={16} className="text-navy-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-navy-700 mb-1">Find Your Real Polling Booth</p>
            <p className="text-sm text-navy-600">
              For your actual booth, visit{' '}
              <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                voters.eci.gov.in
              </a>
              {' '}→ "Know Your Polling Station", or call the Voter Helpline at <strong>1950</strong>.
            </p>
          </div>
        </div>

        {/* Results */}
        {booths && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-navy-800">
                {booths.length} polling booths near <span className="text-saffron-600">{searched}</span>
              </h2>
              <span className="text-xs text-slate-400 bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-full">
                Demo data
              </span>
            </div>

            <div className="space-y-4">
              {booths.map((booth, idx) => (
                <div
                  key={booth.id}
                  style={{ animationDelay: `${idx * 80}ms` }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow animate-slide-up"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center flex-shrink-0">
                          <MapPin size={18} className="text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-navy-800 text-base leading-tight">{booth.name}</h3>
                          <p className="text-slate-500 text-sm mt-0.5">{booth.address}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                        {booth.distance}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Clock size={12} className="text-slate-400" />
                        {booth.timing}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Users size={12} className="text-slate-400" />
                        ~{booth.capacity.toLocaleString()} voters
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 col-span-2 sm:col-span-1">
                        <MapPin size={12} className="text-slate-400" />
                        {booth.ward}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(booth.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm bg-navy-700 hover:bg-navy-600 text-white px-4 py-2 rounded-xl transition-colors font-medium"
                      >
                        <Navigation size={13} />
                        Directions
                      </a>
                      <button className="flex items-center gap-1.5 text-sm border border-slate-200 hover:border-navy-300 text-slate-600 hover:text-navy-700 px-4 py-2 rounded-xl transition-colors">
                        <Phone size={13} />
                        Contact BLO
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-slate-400 mt-6">
              This is demo data for illustrative purposes. Please verify your actual booth at voters.eci.gov.in.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
