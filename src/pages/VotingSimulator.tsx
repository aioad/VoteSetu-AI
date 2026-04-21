import { useState, useEffect } from 'react';
import {
  UserCheck, Building2, Cpu, Lock, Truck, Calculator, Medal,
  ChevronRight, Play, RotateCcw, CheckCircle2, ArrowDown
} from 'lucide-react';

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
  color: string;
  bg: string;
  border: string;
  duration: number;
}

const STEPS: Step[] = [
  {
    id: 1,
    icon: <UserCheck size={20} />,
    title: 'Voter Registration',
    description: 'Your name appears on the Electoral Roll for your constituency.',
    detail: 'Before you can vote, your name must be registered on the electoral roll. You can verify your registration on the NVSP portal (voters.eci.gov.in) using your EPIC number. Registration requires Form 6 submission with age and address proof.',
    color: 'text-navy-700',
    bg: 'bg-navy-50',
    border: 'border-navy-200',
    duration: 800,
  },
  {
    id: 2,
    icon: <Building2 size={20} />,
    title: 'Polling Booth Verification',
    description: 'Your identity is verified at the polling booth by officials.',
    detail: 'On voting day, visit your designated polling booth. A Polling Officer checks your name in the electoral roll, verifies your ID (EPIC or alternate document), and marks your name. Your left index finger is marked with indelible ink.',
    color: 'text-saffron-700',
    bg: 'bg-saffron-50',
    border: 'border-saffron-200',
    duration: 900,
  },
  {
    id: 3,
    icon: <Cpu size={20} />,
    title: 'Vote Cast on EVM',
    description: 'You press your preferred candidate\'s button on the EVM.',
    detail: 'You enter the voting compartment alone. The Presiding Officer enables the EVM. You press the button next to your chosen candidate. A beep confirms your vote. The VVPAT machine prints a paper slip showing your selection — visible for 7 seconds behind a glass window.',
    color: 'text-forest-700',
    bg: 'bg-forest-50',
    border: 'border-forest-200',
    duration: 1000,
  },
  {
    id: 4,
    icon: <Lock size={20} />,
    title: 'Secure Storage of EVMs',
    description: 'EVMs are sealed and locked in secured strong rooms.',
    detail: 'After polling ends, the EVM ballot units are sealed with wax/signatures of all candidates\' agents. They are placed in a strongroom at the District Collectorate with 3-tier security: CRPF/state police guard, CCTV surveillance, and magistrate oversight. Keys are held by multiple officers.',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    duration: 850,
  },
  {
    id: 5,
    icon: <Truck size={20} />,
    title: 'Transport to Counting Centre',
    description: 'EVMs are transported under heavy security escort.',
    detail: 'On counting day, EVMs are transported from strong rooms to designated Counting Centres in convoy with armed security escorts. All candidates\' agents are permitted to accompany and witness the transport. GPS tracking is used in many states.',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    duration: 950,
  },
  {
    id: 6,
    icon: <Calculator size={20} />,
    title: 'Vote Counting',
    description: 'EVMs are opened round by round and votes are tallied.',
    detail: 'Counting begins at 8 AM. EVMs are opened in rounds. Each round covers one or more polling station results. Candidates and their counting agents watch every step. After each round, totals are displayed publicly. Random VVPAT verification is done for 5 EVMs per assembly segment.',
    color: 'text-rose-700',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    duration: 900,
  },
  {
    id: 7,
    icon: <Medal size={20} />,
    title: 'Official Result Declaration',
    description: 'The Returning Officer announces the winning candidate.',
    detail: 'After all rounds are counted, the Returning Officer totals all votes and announces the winner. The winning candidate receives an official Election Certificate. Results are published on ECI\'s website in real-time. The winning party/alliance then proceeds to form the government.',
    color: 'text-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    duration: 800,
  },
];

export default function VotingSimulator() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    if (!running) return;
    if (activeStep >= STEPS.length) {
      setRunning(false);
      return;
    }

    const step = STEPS[activeStep];
    const timer = setTimeout(() => {
      setCompleted((prev) => [...prev, step.id]);
      setActiveStep((prev) => prev + 1);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [running, activeStep]);

  function startSimulation() {
    setCompleted([]);
    setActiveStep(0);
    setRunning(true);
  }

  function reset() {
    setRunning(false);
    setActiveStep(0);
    setCompleted([]);
  }

  const currentStep = STEPS[activeStep] ?? null;
  const isFinished = completed.length === STEPS.length;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-800 mb-3">Voting Process Simulator</h1>
          <p className="text-slate-500 text-lg max-w-lg mx-auto">
            Watch how your vote travels through the entire election system — from booth to result.
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            {!running && !isFinished && (
              <button
                onClick={startSimulation}
                className="flex items-center gap-2 bg-navy-700 hover:bg-navy-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <Play size={16} />
                Start Simulation
              </button>
            )}
            {(running || isFinished) && (
              <button
                onClick={reset}
                className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            )}
            {running && (
              <div className="flex items-center gap-2 text-navy-600 text-sm">
                <div className="w-2 h-2 rounded-full bg-saffron-500 animate-pulse" />
                Simulation running...
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">Journey Progress</span>
            <span className="text-sm font-bold text-navy-700">{completed.length}/{STEPS.length} steps</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-navy-600 via-saffron-500 to-forest-500 rounded-full transition-all duration-700"
              style={{ width: `${(completed.length / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Desktop: Flow diagram */}
        <div className="hidden md:block">
          <div className="grid grid-cols-7 gap-2 items-start">
            {STEPS.map((step, idx) => {
              const isDone = completed.includes(step.id);
              const isActive = running && activeStep === idx;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-full rounded-xl border-2 p-3 text-center transition-all duration-500 cursor-pointer ${
                      isDone
                        ? `${step.bg} ${step.border} shadow-md scale-105`
                        : isActive
                        ? `${step.bg} ${step.border} shadow-md animate-pulse-soft`
                        : 'bg-white border-slate-200 opacity-50'
                    }`}
                    onClick={() => setActiveStep(idx)}
                  >
                    <div className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center mb-2 ${
                      isDone ? `${step.color.replace('text', 'bg')} bg-opacity-20` : 'bg-slate-100'
                    }`}>
                      <span className={isDone ? step.color : 'text-slate-400'}>{step.icon}</span>
                    </div>
                    <p className={`text-xs font-semibold leading-tight ${isDone ? step.color : 'text-slate-400'}`}>
                      {step.title}
                    </p>
                    {isDone && <CheckCircle2 size={12} className={`mx-auto mt-1 ${step.color}`} />}
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className="flex items-center justify-center w-full mt-1">
                      <ChevronRight size={14} className={isDone ? 'text-saffron-500' : 'text-slate-300'} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical flow */}
        <div className="md:hidden space-y-3">
          {STEPS.map((step, idx) => {
            const isDone = completed.includes(step.id);
            const isActive = running && activeStep === idx;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-full rounded-xl border-2 p-4 transition-all duration-500 cursor-pointer ${
                    isDone
                      ? `${step.bg} ${step.border} shadow-md`
                      : isActive
                      ? `${step.bg} ${step.border} animate-pulse-soft`
                      : 'bg-white border-slate-200 opacity-60'
                  }`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDone ? `${step.color.replace('text', 'bg')} bg-opacity-20` : 'bg-slate-100'
                    }`}>
                      <span className={isDone ? step.color : 'text-slate-400'}>{step.icon}</span>
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${isDone ? step.color : 'text-slate-500'}`}>{step.title}</p>
                      <p className="text-slate-500 text-xs">{step.description}</p>
                    </div>
                    {isDone && <CheckCircle2 size={16} className={`ml-auto ${step.color}`} />}
                  </div>
                </div>
                {idx < STEPS.length - 1 && (
                  <ArrowDown size={16} className={`my-0.5 ${isDone ? 'text-saffron-500' : 'text-slate-300'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {(activeStep < STEPS.length || isFinished) && (
          <div className="mt-6">
            {isFinished ? (
              <div className="bg-forest-50 border border-forest-200 rounded-2xl p-6 text-center animate-slide-up">
                <Medal size={36} className="text-forest-600 mx-auto mb-3" />
                <h3 className="text-forest-800 font-bold text-xl mb-2">Simulation Complete!</h3>
                <p className="text-forest-700 text-sm max-w-md mx-auto">
                  You've witnessed the complete journey of a vote — from the polling booth to the official result declaration.
                  This entire process is designed to be transparent, secure, and tamper-proof.
                </p>
                <button
                  onClick={reset}
                  className="mt-4 flex items-center gap-2 bg-forest-600 hover:bg-forest-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold mx-auto transition-colors"
                >
                  <RotateCcw size={14} />
                  Run Again
                </button>
              </div>
            ) : (
              <div
                className={`rounded-2xl border-2 p-5 animate-slide-up ${
                  currentStep ? `${currentStep.bg} ${currentStep.border}` : 'bg-white border-slate-200'
                }`}
              >
                {currentStep ? (
                  <>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${currentStep.color.replace('text', 'bg')} bg-opacity-20`}>
                        <span className={currentStep.color}>{currentStep.icon}</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step {currentStep.id} of {STEPS.length}</div>
                        <h3 className={`font-bold text-base ${currentStep.color}`}>{currentStep.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{currentStep.detail}</p>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-slate-500">Click a step or press Start Simulation to explore the vote journey.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
