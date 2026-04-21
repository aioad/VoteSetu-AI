import { useState } from 'react';
import {
  ShieldAlert, ShieldCheck, ShieldX, Loader2, Search, RotateCcw,
  ExternalLink, AlertTriangle, Info
} from 'lucide-react';
import { factCheckText, getSessionId } from '../lib/api';
import { supabase } from '../lib/supabase';

type Verdict = 'safe' | 'misleading' | 'false';

interface Result {
  verdict: Verdict;
  explanation: string;
  confidence: number;
}

const EXAMPLES = [
  'You need Aadhaar card to vote — without it your vote will not be counted',
  'EVMs can be hacked using Bluetooth and the votes were changed in the last election',
  'The Election Commission has postponed voting in some constituencies due to low turnout',
  'Visit voters.eci.gov.in to check your name on the electoral roll before election day',
];

const VERDICT_CONFIG = {
  safe: {
    icon: <ShieldCheck size={28} />,
    label: 'Safe',
    sublabel: 'This content appears accurate',
    color: 'text-forest-700',
    bg: 'bg-forest-50',
    border: 'border-forest-300',
    badge: 'bg-forest-100 text-forest-700 border-forest-200',
    bar: 'bg-forest-500',
  },
  misleading: {
    icon: <ShieldAlert size={28} />,
    label: 'Possibly Misleading',
    sublabel: 'Contains inaccuracies or unverified claims',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    bar: 'bg-amber-500',
  },
  false: {
    icon: <ShieldX size={28} />,
    label: 'Likely False',
    sublabel: 'Contains factually incorrect claims',
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-300',
    badge: 'bg-red-100 text-red-700 border-red-200',
    bar: 'bg-red-500',
  },
};

function renderExplanation(text: string): React.ReactNode {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-bold text-slate-800 mt-3 mb-1">{line.slice(2, -2)}</p>;
    }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const content = line.slice(2).replace(/\*\*([^*]+)\*\*/g, (_, m) => m);
      return <li key={i} className="ml-4 text-slate-700 text-sm leading-relaxed">{content}</li>;
    }
    if (/^\d+\.\s/.test(line)) {
      const content = line.replace(/^\d+\.\s/, '').replace(/\*\*([^*]+)\*\*/g, (_, m) => m);
      return <li key={i} className="ml-4 text-slate-700 text-sm leading-relaxed list-decimal">{content}</li>;
    }
    if (line.trim() === '') return <div key={i} className="h-1.5" />;
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, pi) =>
      p.startsWith('**') ? <strong key={pi} className="font-semibold text-slate-800">{p.slice(2, -2)}</strong> : p
    );
    return <p key={i} className="text-slate-700 text-sm leading-relaxed">{parts}</p>;
  });
}

export default function MisinformationChecker() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [checkedText, setCheckedText] = useState('');
  const sessionId = getSessionId();

  async function handleCheck() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setResult(null);

    try {
      const data = await factCheckText(text.trim());
      setResult(data);
      setCheckedText(text.trim());

      // Persist to Supabase
      supabase.from('fact_checks').insert({
        session_id: sessionId,
        input_text: text.trim(),
        verdict: data.verdict,
        explanation: data.explanation,
      });
    } catch {
      setResult({
        verdict: 'misleading',
        explanation: 'Unable to analyze at this time. Please try again.',
        confidence: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setText('');
    setResult(null);
    setCheckedText('');
  }

  const vc = result ? VERDICT_CONFIG[result.verdict] : null;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5 mb-4">
            <ShieldAlert size={14} className="text-red-600" />
            <span className="text-red-700 text-sm font-medium">AI-Powered Fact Checking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3">Election Misinformation Checker</h1>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Paste any election news, social media post, or viral message to get an instant credibility analysis.
          </p>
        </div>

        {/* Info banner */}
        <div className="flex gap-3 bg-navy-50 border border-navy-200 rounded-xl p-4 mb-6">
          <Info size={16} className="text-navy-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-navy-700">
            This tool analyzes election-related content for common misinformation patterns. For legal disputes,
            file a complaint at <strong>eci.gov.in</strong> or call the Election Commission helpline <strong>1950</strong>.
          </p>
        </div>

        {/* Input card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-5">
          <label className="block text-sm font-semibold text-navy-700 mb-2">
            Paste election message or headline
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: EVMs were hacked and votes were changed in the 2024 election..."
            rows={5}
            className="w-full text-sm text-slate-700 placeholder-slate-400 border border-slate-200 rounded-xl p-4 resize-none outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-200 transition-all leading-relaxed"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-slate-400">{text.length} characters</span>
            <div className="flex gap-2">
              {result && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <RotateCcw size={13} />
                  Clear
                </button>
              )}
              <button
                onClick={handleCheck}
                disabled={!text.trim() || loading}
                className="flex items-center gap-2 bg-navy-700 hover:bg-navy-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search size={14} />
                    Fact Check
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Example prompts */}
        {!result && (
          <div className="mb-6">
            <p className="text-xs text-slate-400 mb-2 font-medium">Try with these examples:</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setText(ex)}
                  className="text-xs bg-white border border-slate-200 text-slate-600 hover:text-navy-700 hover:border-navy-300 px-3 py-1.5 rounded-xl transition-colors shadow-sm text-left"
                >
                  {ex.slice(0, 55)}…
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {result && vc && (
          <div className={`rounded-2xl border-2 ${vc.border} ${vc.bg} overflow-hidden animate-slide-up`}>
            {/* Verdict header */}
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-sm flex-shrink-0 ${vc.color}`}>
                  {vc.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className={`text-xl font-bold ${vc.color}`}>{vc.label}</h2>
                    <span className={`text-xs font-semibold border px-2.5 py-1 rounded-full ${vc.badge}`}>
                      {result.confidence}% confidence
                    </span>
                  </div>
                  <p className={`text-sm mt-0.5 ${vc.color} opacity-80`}>{vc.sublabel}</p>

                  {/* Confidence bar */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-white rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${vc.bar}`}
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Checked text snippet */}
              <div className="mt-4 bg-white bg-opacity-60 rounded-xl p-3 border border-white">
                <p className="text-xs font-semibold text-slate-400 mb-1">CHECKED CONTENT:</p>
                <p className="text-sm text-slate-600 italic leading-relaxed">
                  "{checkedText.length > 200 ? checkedText.slice(0, 200) + '…' : checkedText}"
                </p>
              </div>
            </div>

            {/* Explanation */}
            <div className="border-t border-white border-opacity-60 bg-white bg-opacity-50 p-5 sm:p-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Analysis</h3>
              <div className="space-y-0.5">{renderExplanation(result.explanation)}</div>
            </div>

            {/* Trusted sources */}
            <div className="border-t border-white border-opacity-60 p-5 sm:p-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Verify With Trusted Sources</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  ['https://eci.gov.in', 'ECI Official'],
                  ['https://voters.eci.gov.in', 'NVSP Portal'],
                  ['https://factchecker.in', 'Factchecker.in'],
                  ['https://www.boomlive.in', 'Boom Live'],
                  ['https://www.altnews.in', 'Alt News'],
                ].map(([url, label]) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs bg-white border border-slate-200 text-slate-600 hover:text-navy-700 hover:border-navy-300 px-3 py-1.5 rounded-full transition-colors shadow-sm"
                  >
                    <ExternalLink size={10} />
                    {label}
                  </a>
                ))}
              </div>

              <div className="mt-4 flex gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  This analysis is AI-generated for educational purposes. For official election complaints, contact the Election Commission at <strong>1950</strong> or visit <strong>eci.gov.in</strong>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
