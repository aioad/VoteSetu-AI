import { useState } from 'react';
import {
  Megaphone, UserCheck, Flag, Vote, Calculator, Trophy,
  ChevronDown, ChevronUp, CheckCircle2, Clock
} from 'lucide-react';

interface Stage {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  duration: string;
  color: string;
  bgColor: string;
  borderColor: string;
  details: string[];
  keyPoints: string[];
}

const STAGES: Stage[] = [
  {
    id: 1,
    icon: <Megaphone size={22} />,
    title: 'Election Announcement',
    subtitle: 'Model Code of Conduct begins',
    duration: '4–6 weeks before polling',
    color: 'text-navy-700',
    bgColor: 'bg-navy-50',
    borderColor: 'border-navy-200',
    details: [
      'The Election Commission of India (ECI) announces the election schedule including polling dates.',
      'The Model Code of Conduct (MCC) comes into immediate effect, governing party and government behavior.',
      'Press conferences and announcements are made by the Chief Election Commissioner.',
      'Election machinery is activated at state and district levels.',
      'ECI appoints Central Observers for each constituency.',
    ],
    keyPoints: ['Model Code of Conduct enforced', 'Polling dates announced', 'Election observers appointed'],
  },
  {
    id: 2,
    icon: <UserCheck size={22} />,
    title: 'Candidate Nomination',
    subtitle: 'Filing and scrutiny of nominations',
    duration: '3–4 weeks before polling',
    color: 'text-saffron-700',
    bgColor: 'bg-saffron-50',
    borderColor: 'border-saffron-200',
    details: [
      'Candidates file nomination papers with the Returning Officer (RO) of their constituency.',
      'Nomination papers must include personal details, assets declaration, criminal record, and educational qualifications.',
      'The RO scrutinizes nominations to check eligibility criteria.',
      'Candidates must pay a security deposit (₹25,000 for Lok Sabha; ₹12,500 for Vidhan Sabha).',
      'After scrutiny, candidates can withdraw their candidature within a specified period.',
      'Final list of candidates is published after the withdrawal period ends.',
    ],
    keyPoints: ['Nomination papers filed', 'Eligibility scrutinized', 'Security deposit paid', 'Final candidate list published'],
  },
  {
    id: 3,
    icon: <Flag size={22} />,
    title: 'Campaign Period',
    subtitle: 'Candidates campaign for votes',
    duration: '2–3 weeks before polling',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    details: [
      'Candidates and parties campaign through rallies, road shows, door-to-door visits, and media.',
      'Campaign expenditure is strictly monitored by ECI-appointed expenditure observers.',
      'Electronic media blackout begins 48 hours before polling (silence period).',
      'Campaigns must not incite communal or caste tensions.',
      'Distribution of cash, gifts, or liquor to voters is strictly prohibited.',
      'Campaigns must end 48 hours before the start of polling (Campaign Silence).',
    ],
    keyPoints: ['Rallies and events held', 'Expenditure monitored', '48-hour silence period', 'Paid news regulations apply'],
  },
  {
    id: 4,
    icon: <Vote size={22} />,
    title: 'Voting Day',
    subtitle: 'Citizens cast their votes',
    duration: 'Polling Day (7 AM – 6 PM)',
    color: 'text-forest-700',
    bgColor: 'bg-forest-50',
    borderColor: 'border-forest-200',
    details: [
      'Polling booths open at 7:00 AM and typically close at 6:00 PM (may vary by region).',
      'Voters must carry their EPIC (Voter ID) or one of 12 approved alternate IDs.',
      'Voter identity is verified against the electoral roll.',
      'Voters cast their vote on the Electronic Voting Machine (EVM).',
      'VVPAT prints a paper slip showing the voter\'s choice for 7 seconds.',
      'Indelible ink is applied to the voter\'s left index finger after voting.',
      'Postal ballots for service voters and senior/disabled citizens are counted separately.',
    ],
    keyPoints: ['Booths open 7 AM–6 PM', 'EPIC or alternate ID required', 'EVM + VVPAT system used', 'Indelible ink applied'],
  },
  {
    id: 5,
    icon: <Calculator size={22} />,
    title: 'Vote Counting',
    subtitle: 'EVMs are opened and votes tallied',
    duration: 'Counting Day (post all phases)',
    color: 'text-teal-700',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    details: [
      'Counting begins at 8:00 AM on the announced counting day.',
      'EVMs are brought from secured strong rooms to counting centers.',
      'Counting is done round by round; each round covers a set of EVMs.',
      'Candidates and their counting agents are present throughout.',
      'Random VVPAT paper slip verification is done (5 EVMs per assembly segment).',
      'Round-wise results are displayed on public notice boards.',
      'Any disputes or recounts are handled by the Returning Officer.',
    ],
    keyPoints: ['Round-by-round counting', 'Candidates\' agents present', 'VVPAT verification done', 'Disputes handled by RO'],
  },
  {
    id: 6,
    icon: <Trophy size={22} />,
    title: 'Results Declaration',
    subtitle: 'Winners announced and notified',
    duration: 'Same as counting day',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    details: [
      'The Returning Officer declares the candidate with the highest votes as winner.',
      'Results are uploaded in real-time to the ECI website.',
      'The winning candidate is issued an election certificate.',
      'Losing candidates can challenge results in the High Court within 45 days.',
      'ECI releases the official results compilation for all constituencies.',
      'Government formation begins after the leading party/alliance secures majority.',
      'The President/Governor invites the majority leader to form the government.',
    ],
    keyPoints: ['Highest votes wins (FPTP)', 'Results on eci.gov.in', 'Certificate of election issued', 'Government formation begins'],
  },
];

export default function ElectionTimeline() {
  const [expanded, setExpanded] = useState<number | null>(1);
  const [completed, setCompleted] = useState<number[]>([]);

  function toggleExpand(id: number) {
    setExpanded(expanded === id ? null : id);
  }

  function markComplete(id: number, e: React.MouseEvent) {
    e.stopPropagation();
    setCompleted((prev) => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-navy-50 border border-navy-200 rounded-full px-4 py-1.5 mb-4">
            <Clock size={14} className="text-navy-600" />
            <span className="text-navy-700 text-sm font-medium">6 Stages of Indian Elections</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3">Election Timeline</h1>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Click each stage to explore the complete election process from announcement to results.
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">Your exploration progress</span>
            <span className="text-sm font-bold text-navy-700">{completed.length}/{STAGES.length} stages</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-saffron-500 to-forest-500 rounded-full transition-all duration-500"
              style={{ width: `${(completed.length / STAGES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200" />

          <div className="space-y-4">
            {STAGES.map((stage, idx) => {
              const isExpanded = expanded === stage.id;
              const isDone = completed.includes(stage.id);

              return (
                <div
                  key={stage.id}
                  style={{ animationDelay: `${idx * 80}ms` }}
                  className="animate-slide-up relative pl-14"
                >
                  {/* Circle marker */}
                  <div
                    className={`absolute left-2 top-4 w-9 h-9 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300 ${
                      isDone
                        ? 'bg-forest-500 border-forest-500 text-white'
                        : isExpanded
                        ? `${stage.bgColor} ${stage.borderColor} ${stage.color}`
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}
                  >
                    {isDone ? <CheckCircle2 size={18} /> : stage.icon}
                  </div>

                  {/* Card */}
                  <div
                    className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 cursor-pointer ${
                      isExpanded ? `border-l-4 ${stage.borderColor} border-slate-200` : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => toggleExpand(stage.id)}
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Stage {stage.id}
                            </span>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                              {stage.duration}
                            </span>
                          </div>
                          <h3 className={`font-bold text-base mt-0.5 ${isExpanded ? stage.color : 'text-navy-800'}`}>
                            {stage.title}
                          </h3>
                          <p className="text-slate-500 text-sm">{stage.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => markComplete(stage.id, e)}
                          className={`hidden sm:flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors ${
                            isDone
                              ? 'bg-forest-50 border-forest-300 text-forest-700'
                              : 'border-slate-200 text-slate-400 hover:border-forest-300 hover:text-forest-600'
                          }`}
                        >
                          <CheckCircle2 size={11} />
                          {isDone ? 'Done' : 'Mark read'}
                        </button>
                        {isExpanded ? (
                          <ChevronUp size={18} className="text-slate-400" />
                        ) : (
                          <ChevronDown size={18} className="text-slate-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className={`border-t ${stage.borderColor} px-4 py-4 ${stage.bgColor} animate-flow-down`}>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">What Happens</h4>
                            <ul className="space-y-2">
                              {stage.details.map((d, i) => (
                                <li key={i} className="flex gap-2 text-sm text-slate-700 leading-relaxed">
                                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${stage.color.replace('text', 'bg')}`} />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Points</h4>
                            <div className="space-y-2">
                              {stage.keyPoints.map((kp, i) => (
                                <div key={i} className={`flex items-center gap-2 bg-white rounded-lg px-3 py-2 border ${stage.borderColor} shadow-sm`}>
                                  <CheckCircle2 size={14} className={stage.color} />
                                  <span className="text-sm text-slate-700 font-medium">{kp}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => markComplete(stage.id, e)}
                          className={`mt-4 sm:hidden flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                            isDone
                              ? 'bg-forest-50 border-forest-300 text-forest-700'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-forest-300'
                          }`}
                        >
                          <CheckCircle2 size={12} />
                          {isDone ? 'Marked as read' : 'Mark as read'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {completed.length === STAGES.length && (
          <div className="mt-8 bg-forest-50 border border-forest-200 rounded-2xl p-6 text-center animate-slide-up">
            <Trophy size={32} className="text-forest-600 mx-auto mb-3" />
            <h3 className="text-forest-800 font-bold text-xl mb-1">You've explored all stages!</h3>
            <p className="text-forest-700 text-sm">You now understand the complete Indian election process. Share this knowledge to strengthen democracy!</p>
          </div>
        )}
      </div>
    </div>
  );
}
