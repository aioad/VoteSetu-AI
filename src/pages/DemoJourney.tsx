import { useState } from 'react';
import {
  Shield, FileText, MapPin, Cpu, Calculator, Trophy,
  ChevronRight, ChevronLeft, CheckCircle2, Play, RotateCcw, Star
} from 'lucide-react';

interface JourneyStep {
  id: number;
  icon: React.ReactNode;
  phase: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  choices?: { label: string; correct: boolean; feedback: string }[];
  info: { label: string; value: string }[];
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    icon: <Shield size={22} />,
    phase: 'Phase 1',
    title: 'Check Your Eligibility',
    description: 'Before anything else, confirm you meet the requirements to vote in India.',
    color: 'text-navy-700',
    bg: 'bg-navy-50',
    border: 'border-navy-200',
    choices: [
      { label: 'I am 18+ years old and an Indian citizen', correct: true, feedback: 'You\'re eligible! You can register to vote.' },
      { label: 'I am 16 years old', correct: false, feedback: 'You need to be at least 18 years old on January 1st of the qualifying year.' },
      { label: 'I am an OCI (Overseas Citizen of India) cardholder', correct: false, feedback: 'OCI cardholders are not citizens and cannot vote. Only Indian citizens can register.' },
    ],
    info: [
      { label: 'Minimum Age', value: '18 years (on Jan 1st of qualifying year)' },
      { label: 'Citizenship', value: 'Must be Indian citizen' },
      { label: 'Residence', value: 'Must be ordinary resident of constituency' },
    ],
    visual: (
      <div className="flex items-center justify-center gap-4 py-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-navy-100 border-2 border-navy-200 flex items-center justify-center mx-auto mb-2">
            <Shield size={28} className="text-navy-700" />
          </div>
          <span className="text-xs text-navy-600 font-medium">Citizen</span>
        </div>
        <ChevronRight size={20} className="text-navy-400" />
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-saffron-100 border-2 border-saffron-200 flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl font-bold text-saffron-700">18+</span>
          </div>
          <span className="text-xs text-saffron-600 font-medium">Age</span>
        </div>
        <ChevronRight size={20} className="text-navy-400" />
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-forest-100 border-2 border-forest-200 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 size={28} className="text-forest-700" />
          </div>
          <span className="text-xs text-forest-600 font-medium">Eligible!</span>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    icon: <FileText size={22} />,
    phase: 'Phase 2',
    title: 'Voter Registration',
    description: 'Register yourself on the electoral roll using Form 6.',
    color: 'text-saffron-700',
    bg: 'bg-saffron-50',
    border: 'border-saffron-200',
    choices: [
      { label: 'Submit Form 6 at voters.eci.gov.in with my Aadhaar and photo', correct: true, feedback: 'Correct! This is the standard way to register online.' },
      { label: 'Go to any government office and request to be added', correct: false, feedback: 'Registration must be done through the Electoral Registration Office or NVSP portal — not any government office.' },
      { label: 'I don\'t need to register — my name is automatically added', correct: false, feedback: 'Voter registration is NOT automatic. You must actively submit Form 6 and get verified.' },
    ],
    info: [
      { label: 'Form Required', value: 'Form 6 (New Voter Registration)' },
      { label: 'Portal', value: 'voters.eci.gov.in' },
      { label: 'Processing Time', value: '30–45 days' },
      { label: 'Helpline', value: '1950 (toll-free)' },
    ],
    visual: (
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="flex items-center gap-3">
          {['Form 6', 'Documents', 'Photo', 'Submit'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-saffron-100 border-2 border-saffron-200 flex items-center justify-center mx-auto mb-1">
                  <span className="text-xs font-bold text-saffron-700">{i + 1}</span>
                </div>
                <span className="text-xs text-saffron-600">{step}</span>
              </div>
              {i < 3 && <ChevronRight size={14} className="text-saffron-400 mb-4" />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-forest-700 bg-forest-50 border border-forest-200 rounded-lg px-3 py-2">
          <CheckCircle2 size={13} />
          Receive e-EPIC (Digital Voter ID) on approval
        </div>
      </div>
    ),
  },
  {
    id: 3,
    icon: <MapPin size={22} />,
    phase: 'Phase 3',
    title: 'Find Your Polling Booth',
    description: 'Locate the exact polling station where you need to cast your vote.',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    choices: [
      { label: 'Use my EPIC number on voters.eci.gov.in to find my booth', correct: true, feedback: 'Perfect! The NVSP portal gives you exact booth details including address and map.' },
      { label: 'Vote at any polling booth in my city', correct: false, feedback: 'You can ONLY vote at the booth assigned to your registered address. You cannot vote at any random booth.' },
      { label: 'Ask my neighbor which booth to go to', correct: false, feedback: 'Your booth depends on your registered address. Check it officially on the NVSP portal or by calling 1950.' },
    ],
    info: [
      { label: 'NVSP Portal', value: 'voters.eci.gov.in → Know Your Booth' },
      { label: 'SMS', value: 'Send EPIC number to 1950' },
      { label: 'Helpline', value: 'Call 1950' },
      { label: 'Distance', value: 'Usually within 2 km of your address' },
    ],
    visual: (
      <div className="flex items-center justify-center gap-3 py-4 flex-wrap">
        <div className="bg-teal-100 border-2 border-teal-200 rounded-xl p-3 text-center min-w-24">
          <MapPin size={20} className="text-teal-700 mx-auto mb-1" />
          <span className="text-xs font-semibold text-teal-700">Your Home</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 border-t-2 border-dashed border-teal-400" />
          <span className="text-xs text-teal-600">≤ 2 km</span>
        </div>
        <div className="bg-navy-100 border-2 border-navy-200 rounded-xl p-3 text-center min-w-24">
          <MapPin size={20} className="text-navy-700 mx-auto mb-1" />
          <span className="text-xs font-semibold text-navy-700">Your Booth</span>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    icon: <Cpu size={22} />,
    phase: 'Phase 4',
    title: 'Cast Your Vote',
    description: 'On election day, arrive at your polling booth and cast your vote securely.',
    color: 'text-forest-700',
    bg: 'bg-forest-50',
    border: 'border-forest-200',
    choices: [
      { label: 'Show my EPIC, get my name verified, enter booth alone, press EVM button', correct: true, feedback: 'Exactly right! That\'s the proper voting process. One press = one vote recorded.' },
      { label: 'Take a photo inside the booth to prove I voted', correct: false, feedback: 'Photography inside voting compartments is strictly prohibited. Your vote is secret.' },
      { label: 'Tell the officer who I am voting for before pressing the button', correct: false, feedback: 'Voting is secret! You should never reveal your choice. Press the button privately in the compartment.' },
    ],
    info: [
      { label: 'Carry', value: 'EPIC or approved alternate ID' },
      { label: 'Timing', value: 'Arrive before 6:00 PM' },
      { label: 'Machine', value: 'EVM + VVPAT' },
      { label: 'After voting', value: 'Indelible ink on left finger' },
    ],
    visual: (
      <div className="flex items-center gap-2 justify-center py-4 flex-wrap">
        {[
          { label: 'Verify ID', icon: '🪪' },
          { label: 'Get Slip', icon: '📋' },
          { label: 'Ink Finger', icon: '☝️' },
          { label: 'Press EVM', icon: '🗳️' },
          { label: 'Done!', icon: '✅' },
        ].map((item, i) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className="text-center">
              <div className="w-11 h-11 rounded-xl bg-forest-100 border-2 border-forest-200 flex items-center justify-center mx-auto mb-1">
                <span className="text-lg">{item.icon}</span>
              </div>
              <span className="text-xs text-forest-700 font-medium">{item.label}</span>
            </div>
            {i < 4 && <ChevronRight size={12} className="text-forest-400 mb-4 flex-shrink-0" />}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 5,
    icon: <Calculator size={22} />,
    phase: 'Phase 5',
    title: 'Vote Counting & Results',
    description: 'After polling ends, your vote is securely stored and counted on counting day.',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    choices: [
      { label: 'My vote is stored securely in the EVM and counted on the official counting day', correct: true, feedback: 'Correct! EVMs are sealed and stored in strongrooms. Counting happens on a separate announced date.' },
      { label: 'Votes are counted the same night after polling ends', correct: false, feedback: 'Not in India. Counting happens on a separate counting day, usually 2-3 weeks after polling (in multi-phase elections).' },
      { label: 'My vote can be traced back to me', correct: false, feedback: 'Votes are completely anonymous. No one can link your vote to you — this is the secret ballot principle.' },
    ],
    info: [
      { label: 'Storage', value: '24/7 guarded strongrooms' },
      { label: 'Counting', value: 'Separate counting day, from 8:00 AM' },
      { label: 'Verification', value: 'VVPAT slips checked (5 per segment)' },
      { label: 'Result', value: 'Declared after all rounds' },
    ],
    visual: (
      <div className="flex items-center justify-center gap-3 py-4 flex-wrap">
        <div className="bg-amber-100 border-2 border-amber-200 rounded-xl p-3 text-center">
          <Cpu size={20} className="text-amber-700 mx-auto mb-1" />
          <span className="text-xs font-semibold text-amber-700">EVM Sealed</span>
        </div>
        <ChevronRight size={16} className="text-amber-500" />
        <div className="bg-navy-100 border-2 border-navy-200 rounded-xl p-3 text-center">
          <Shield size={20} className="text-navy-700 mx-auto mb-1" />
          <span className="text-xs font-semibold text-navy-700">Strongroom</span>
        </div>
        <ChevronRight size={16} className="text-amber-500" />
        <div className="bg-forest-100 border-2 border-forest-200 rounded-xl p-3 text-center">
          <Calculator size={20} className="text-forest-700 mx-auto mb-1" />
          <span className="text-xs font-semibold text-forest-700">Counting</span>
        </div>
        <ChevronRight size={16} className="text-amber-500" />
        <div className="bg-saffron-100 border-2 border-saffron-200 rounded-xl p-3 text-center">
          <Trophy size={20} className="text-saffron-700 mx-auto mb-1" />
          <span className="text-xs font-semibold text-saffron-700">Result</span>
        </div>
      </div>
    ),
  },
];

export default function DemoJourney() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);

  const step = JOURNEY_STEPS[currentStep];
  const isFinished = currentStep >= JOURNEY_STEPS.length;

  function handleChoiceSelect(idx: number) {
    if (showFeedback) return;
    setSelectedChoice(idx);
    setShowFeedback(true);
  }

  function handleNext() {
    if (!completed.includes(step.id)) {
      setCompleted((prev) => [...prev, step.id]);
    }
    if (currentStep < JOURNEY_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      setCurrentStep(JOURNEY_STEPS.length);
    }
  }

  function handlePrev() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    }
  }

  function reset() {
    setCurrentStep(0);
    setSelectedChoice(null);
    setShowFeedback(false);
    setCompleted([]);
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-xl mx-auto text-center animate-slide-up">
          <div className="w-20 h-20 rounded-full bg-saffron-100 border-4 border-saffron-300 flex items-center justify-center mx-auto mb-6">
            <Trophy size={36} className="text-saffron-600" />
          </div>
          <h1 className="text-3xl font-bold text-navy-800 mb-3">Journey Complete!</h1>
          <p className="text-slate-500 text-lg mb-6">
            You've experienced the complete voting journey — from eligibility check to result declaration.
            You are now a well-informed voter!
          </p>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {JOURNEY_STEPS.map((s) => (
                <div key={s.id} className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${s.bg} ${s.border} ${s.color}`}>
                  <CheckCircle2 size={12} />
                  {s.phase}: {s.title}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6">
            <Star size={16} className="text-amber-500" />
            <p className="text-sm text-amber-700 font-medium">Share this knowledge — a well-informed voter strengthens democracy!</p>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-navy-700 hover:bg-navy-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md mx-auto transition-all"
          >
            <RotateCcw size={16} />
            Restart Journey
          </button>
        </div>
      </div>
    );
  }

  const choice = selectedChoice !== null && step.choices ? step.choices[selectedChoice] : null;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-saffron-50 border border-saffron-200 rounded-full px-4 py-1.5 mb-4">
            <Play size={14} className="text-saffron-600" />
            <span className="text-saffron-700 text-sm font-medium">Interactive Demo Experience</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-2">Demo Voting Journey</h1>
          <p className="text-slate-500">Experience the complete election journey, step by step.</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {JOURNEY_STEPS.map((s, idx) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                  idx < currentStep
                    ? 'bg-forest-500 border-forest-500 text-white'
                    : idx === currentStep
                    ? `${s.bg} ${s.border} ${s.color} scale-110 shadow-md`
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {idx < currentStep ? <CheckCircle2 size={14} /> : idx + 1}
              </div>
              {idx < JOURNEY_STEPS.length - 1 && (
                <div className={`w-6 h-0.5 transition-colors ${idx < currentStep ? 'bg-forest-400' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Main card */}
        <div key={step.id} className={`rounded-2xl border-2 ${step.border} overflow-hidden shadow-sm animate-slide-up`}>
          {/* Header */}
          <div className={`${step.bg} p-5 sm:p-6`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center ${step.color}`}>
                {step.icon}
              </div>
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider opacity-60 ${step.color}`}>{step.phase}</span>
                <h2 className={`text-xl font-bold ${step.color}`}>{step.title}</h2>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>

            {/* Visual */}
            <div className={`mt-3 rounded-xl bg-white bg-opacity-60 border ${step.border}`}>
              {step.visual}
            </div>
          </div>

          {/* Info grid */}
          <div className="bg-white p-5 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Information</h3>
            <div className="grid grid-cols-2 gap-2">
              {step.info.map((item) => (
                <div key={item.label} className={`rounded-xl p-3 border ${step.border} ${step.bg}`}>
                  <p className="text-xs font-semibold text-slate-500 mb-0.5">{item.label}</p>
                  <p className={`text-sm font-medium ${step.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz */}
          {step.choices && (
            <div className="bg-white p-5 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Check — What would you do?</h3>
              <div className="space-y-2">
                {step.choices.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChoiceSelect(idx)}
                    disabled={showFeedback}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                      showFeedback && selectedChoice === idx
                        ? c.correct
                          ? 'bg-forest-50 border-forest-400 text-forest-700'
                          : 'bg-red-50 border-red-400 text-red-700'
                        : showFeedback
                        ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-navy-300 hover:bg-navy-50 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`mt-0.5 text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                        showFeedback && selectedChoice === idx
                          ? c.correct ? 'bg-forest-200 text-forest-800' : 'bg-red-200 text-red-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {c.label}
                    </div>
                  </button>
                ))}
              </div>

              {showFeedback && choice && (
                <div className={`mt-3 rounded-xl p-3 border animate-fade-in ${
                  choice.correct ? 'bg-forest-50 border-forest-200 text-forest-700' : 'bg-amber-50 border-amber-200 text-amber-700'
                }`}>
                  <div className="flex gap-2">
                    {choice.correct
                      ? <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" />
                      : <Star size={15} className="flex-shrink-0 mt-0.5" />
                    }
                    <p className="text-sm">{choice.feedback}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-navy-700 hover:border-navy-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <span className="text-sm text-slate-400">{currentStep + 1} / {JOURNEY_STEPS.length}</span>

          <button
            onClick={handleNext}
            disabled={step.choices ? !showFeedback : false}
            className="flex items-center gap-2 bg-navy-700 hover:bg-navy-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm text-sm transition-all hover:-translate-y-0.5 disabled:translate-y-0"
          >
            {currentStep === JOURNEY_STEPS.length - 1 ? 'Finish' : 'Continue'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
