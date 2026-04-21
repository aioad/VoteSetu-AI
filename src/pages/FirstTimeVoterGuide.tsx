import { useState } from 'react';
import {
  CheckCircle2, Circle, Shield, FileText, ClipboardList,
  MapPin, Sun, ChevronRight, ChevronLeft, Star
} from 'lucide-react';

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  bg: string;
  border: string;
  content: {
    heading: string;
    items: { label: string; sub?: string }[];
  }[];
  tip?: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    icon: <Shield size={22} />,
    title: 'Check Voter Eligibility',
    subtitle: 'Are you eligible to vote?',
    color: 'text-navy-700',
    bg: 'bg-navy-50',
    border: 'border-navy-200',
    content: [
      {
        heading: 'Basic Requirements',
        items: [
          { label: 'Indian Citizen', sub: 'Must be a citizen of India by birth or naturalization' },
          { label: 'Age 18 or Above', sub: 'Must be at least 18 years old on January 1st of the qualifying year' },
          { label: 'Ordinary Resident', sub: 'Must ordinarily reside in the constituency where you register' },
          { label: 'Sound Mind', sub: 'Must not be declared of unsound mind by a competent court' },
          { label: 'No Disqualification', sub: 'Must not be convicted of electoral offenses or under imprisonment of 2+ years' },
        ],
      },
      {
        heading: 'Special Categories',
        items: [
          { label: 'NRI Voters', sub: 'Non-Resident Indians can register in their hometown constituency under Section 20A' },
          { label: 'Service Voters', sub: 'Armed forces & government employees posted abroad have special provisions' },
        ],
      },
    ],
    tip: 'If you turned 18 after January 1st of this year, you can still register for the next year\'s electoral roll.',
  },
  {
    id: 2,
    icon: <FileText size={22} />,
    title: 'Documents Required',
    subtitle: 'Gather your identity documents',
    color: 'text-saffron-700',
    bg: 'bg-saffron-50',
    border: 'border-saffron-200',
    content: [
      {
        heading: 'Proof of Age (Any One)',
        items: [
          { label: 'Aadhaar Card' },
          { label: 'Birth Certificate', sub: 'Issued by Municipal Authority or Gram Panchayat' },
          { label: 'Indian Passport' },
          { label: 'Class 10 Marksheet', sub: 'Showing your date of birth' },
          { label: 'PAN Card' },
          { label: 'Driving License' },
        ],
      },
      {
        heading: 'Proof of Address (Any One)',
        items: [
          { label: 'Aadhaar Card' },
          { label: 'Bank / Post Office Passbook', sub: 'Showing your current address' },
          { label: 'Recent Utility Bill', sub: 'Electricity, Water, or Gas (not older than 3 months)' },
          { label: 'Registered Rent Agreement' },
          { label: 'Indian Passport or Driving License' },
        ],
      },
      {
        heading: 'Photograph',
        items: [
          { label: 'Recent Passport-Size Photo', sub: 'Taken within the last 6 months, white/light background' },
        ],
      },
    ],
    tip: 'Aadhaar card serves as both age and address proof — it alone can satisfy both requirements.',
  },
  {
    id: 3,
    icon: <ClipboardList size={22} />,
    title: 'How to Register',
    subtitle: 'Submit Form 6 to get enrolled',
    color: 'text-forest-700',
    bg: 'bg-forest-50',
    border: 'border-forest-200',
    content: [
      {
        heading: 'Online Registration (Recommended)',
        items: [
          { label: 'Step 1: Visit voters.eci.gov.in or use Voter Helpline App' },
          { label: 'Step 2: Click "Register as New Voter" and select Form 6' },
          { label: 'Step 3: Fill in personal details, address, and upload documents' },
          { label: 'Step 4: Upload your photograph' },
          { label: 'Step 5: Submit and save your reference/acknowledgment number' },
        ],
      },
      {
        heading: 'Offline Registration',
        items: [
          { label: 'Step 1: Get Form 6 from your Booth Level Officer (BLO) or Electoral Registration Office' },
          { label: 'Step 2: Fill in all details carefully' },
          { label: 'Step 3: Attach self-attested copies of documents' },
          { label: 'Step 4: Submit to BLO or Electoral Registration Office' },
        ],
      },
      {
        heading: 'After Submission',
        items: [
          { label: 'BLO may visit your address for verification' },
          { label: 'Track your application using your reference number', sub: 'Visit voters.eci.gov.in or call 1950' },
          { label: 'Process takes approximately 30–45 days' },
          { label: 'Download your e-EPIC from NVSP portal once approved' },
        ],
      },
    ],
    tip: 'You can also use the Voter Helpline App (Android / iOS) to register, check status, and download your e-EPIC.',
  },
  {
    id: 4,
    icon: <MapPin size={22} />,
    title: 'Find Your Polling Booth',
    subtitle: 'Locate where you need to vote',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    content: [
      {
        heading: 'How to Find Your Booth',
        items: [
          { label: 'NVSP Portal', sub: 'Visit voters.eci.gov.in → "Know Your Polling Station" → Enter EPIC number' },
          { label: 'Voter Helpline App', sub: 'Download from Play Store / App Store → Search by EPIC or name' },
          { label: 'SMS Service', sub: 'Send your EPIC number to 1950' },
          { label: 'Voter Helpline', sub: 'Call 1950 (toll-free) and provide your EPIC number' },
        ],
      },
      {
        heading: 'What to Note',
        items: [
          { label: 'Booth Name and Number', sub: 'Note this down before voting day' },
          { label: 'Address and How to Reach', sub: 'Your booth is typically within 2 km of your registered address' },
          { label: 'Timing', sub: 'Polling generally runs from 7:00 AM to 6:00 PM' },
        ],
      },
    ],
    tip: 'Check your polling booth at least a week before election day to plan your route and timing.',
  },
  {
    id: 5,
    icon: <Sun size={22} />,
    title: 'Voting Day Guide',
    subtitle: 'What to do when election day arrives',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    content: [
      {
        heading: 'Before You Go',
        items: [
          { label: 'Carry your EPIC (Voter ID Card)', sub: 'Or one of 12 approved alternate photo ID documents' },
          { label: 'Verify your name in the electoral roll', sub: 'Double-check on NVSP portal if unsure' },
          { label: 'Know your polling booth address and timing' },
          { label: 'Avoid wearing party symbols or colors to the booth' },
        ],
      },
      {
        heading: 'At the Polling Booth',
        items: [
          { label: 'Wait in the queue patiently — first come, first served' },
          { label: 'Present your ID to the Polling Officer at the first table' },
          { label: 'Your name is marked and you receive a voter slip' },
          { label: 'Indelible ink is applied to your left index finger' },
          { label: 'Proceed to the voting compartment' },
          { label: 'Press the button next to your chosen candidate\'s name on the EVM' },
          { label: 'Listen for the beep — your vote is recorded!' },
        ],
      },
      {
        heading: 'Important Rules',
        items: [
          { label: 'Mobile phones are NOT allowed inside the voting booth area' },
          { label: 'You CANNOT take photos of your vote or the EVM' },
          { label: 'No one can accompany you into the voting compartment (except disabled voters)' },
          { label: 'If you make a mistake, ask for a "Tendered Vote" form — you can only cancel once' },
        ],
      },
    ],
    tip: 'If you are in the queue before 6:00 PM, you have the right to cast your vote even if it closes after 6 PM.',
  },
];

export default function FirstTimeVoterGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [read, setRead] = useState<number[]>([]);

  const step = STEPS[currentStep];

  function markRead(id: number) {
    if (!read.includes(id)) setRead((prev) => [...prev, id]);
  }

  function goNext() {
    markRead(step.id);
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  }

  function goPrev() {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }

  const allDone = read.length === STEPS.length;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-2">First-Time Voter Guide</h1>
          <p className="text-slate-500 text-lg">Everything you need to know before you cast your very first vote.</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between mb-6 overflow-x-auto pb-2">
          {STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(idx)}
              className="flex flex-col items-center gap-1 flex-shrink-0 px-2"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  idx === currentStep
                    ? `${s.bg} ${s.border} ${s.color} shadow-md scale-110`
                    : read.includes(s.id)
                    ? 'bg-forest-100 border-forest-300 text-forest-600'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {read.includes(s.id) ? <CheckCircle2 size={18} /> : <span className="text-sm font-bold">{s.id}</span>}
              </div>
              <span className={`text-xs font-medium hidden sm:block transition-colors ${
                idx === currentStep ? s.color : 'text-slate-400'
              }`}>
                Step {s.id}
              </span>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-saffron-500 to-forest-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Main card */}
        <div
          key={step.id}
          className={`rounded-2xl border-2 ${step.border} ${step.bg} shadow-sm overflow-hidden animate-slide-up`}
        >
          {/* Card header */}
          <div className="p-5 sm:p-6 border-b border-opacity-50" style={{ borderColor: 'inherit' }}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.color.replace('text', 'bg')} bg-opacity-20 flex-shrink-0`}>
                <span className={step.color}>{step.icon}</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Step {step.id} of {STEPS.length}</div>
                <h2 className={`text-xl font-bold ${step.color}`}>{step.title}</h2>
                <p className="text-slate-500 text-sm mt-0.5">{step.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Card body */}
          <div className="p-5 sm:p-6 space-y-5">
            {step.content.map((section, si) => (
              <div key={si}>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{section.heading}</h3>
                <div className="space-y-2">
                  {section.items.map((item, ii) => (
                    <div key={ii} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-white shadow-sm">
                      <div className={`mt-0.5 flex-shrink-0 ${step.color}`}>
                        <Circle size={6} className="fill-current" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-800">{item.label}</p>
                        {item.sub && <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {step.tip && (
              <div className="flex gap-2 bg-white border border-amber-200 rounded-xl p-3">
                <Star size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">{step.tip}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-navy-700 hover:border-navy-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <span className="text-sm text-slate-500">{currentStep + 1} / {STEPS.length}</span>

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={goNext}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold shadow-sm text-sm transition-all hover:-translate-y-0.5 ${
                step.color.replace('text', 'bg').replace('700', '600')
              } hover:opacity-90`}
            >
              Next Step
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => markRead(step.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-500 text-white font-semibold shadow-sm text-sm transition-all"
            >
              <CheckCircle2 size={16} />
              Complete
            </button>
          )}
        </div>

        {/* Completion */}
        {allDone && (
          <div className="mt-6 bg-forest-50 border border-forest-200 rounded-2xl p-6 text-center animate-slide-up">
            <CheckCircle2 size={36} className="text-forest-600 mx-auto mb-3" />
            <h3 className="text-forest-800 font-bold text-xl mb-2">You're Ready to Vote!</h3>
            <p className="text-forest-700 text-sm">
              You've completed the First-Time Voter Guide. You now know everything needed to register, find your booth, and cast your vote confidently.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
