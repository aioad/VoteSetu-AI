# VoteSetu AI

**Bridging Citizens and Democracy**

An AI-powered civic education platform that empowers Indian citizens to understand the election process, register to vote, simulate voting journeys, and detect election misinformation.

![VoteSetu AI](https://img.shields.io/badge/VoteSetu-AI-saffron?style=for-the-badge&logo=vote)
![Status](https://img.shields.io/badge/status-production--ready-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

---

## 🎯 Overview

VoteSetu AI is a hackathon-ready civic technology platform designed to:

- **Educate** — Explain the Indian election process in simple, clear language
- **Guide** — Walk first-time voters through registration and voting steps
- **Simulate** — Show the complete journey of a vote from booth to result
- **Verify** — Use AI to detect and explain election misinformation
- **Empower** — Build voter confidence and strengthen democratic participation

---

## ✨ Key Features

### 1. **Ask VoteSetu AI** 🤖
Conversational AI assistant powered by Supabase Edge Functions. Ask questions about:
- Voter registration and eligibility
- Required documents
- EVMs and voting technology
- Booth locations and voting day procedures
- Common election myths

Real-time responses with markdown-formatted, step-by-step guidance. Chat history saved to Supabase.

### 2. **Election Timeline** 📅
Interactive 6-stage timeline covering the complete election process:
1. Election Announcement
2. Candidate Nomination
3. Campaign Period
4. Voting Day
5. Vote Counting
6. Results Declaration

Click each stage to explore details, key points, and procedural information. Track your progress as you learn.

### 3. **Voting Simulator** 🎬
Animated 7-step flow demonstrating the complete vote journey:
- Voter Registration
- Polling Booth Verification
- Vote Cast on EVM
- Secure Storage of EVMs
- Transport to Counting Centre
- Vote Counting
- Official Result Declaration

Auto-play simulation or step through manually. Click any step to explore details.

### 4. **First-Time Voter Guide** 📖
Comprehensive 5-step onboarding wizard:
1. **Check Eligibility** — Understand voter requirements
2. **Required Documents** — Know what to bring
3. **How to Register** — Online and offline methods
4. **Find Your Booth** — Locate your polling station
5. **Voting Day Guide** — What to expect and do

Step indicators, expandable details, and completion tracking.

### 5. **Election Misinformation Checker** 🛡️
Fact-check viral election claims with AI analysis:
- Paste any election message, headline, or social media post
- Get instant credibility verdict: **Safe** / **Possibly Misleading** / **Likely False**
- View confidence score and detailed explanation
- Links to trusted fact-checking sources (ECI, Factchecker.in, Boom Live, Alt News)

Results saved to Supabase for historical analysis.

### 6. **Polling Booth Finder** 🗺️
Location-based booth search (demo mode with sample data):
- Enter city/area (try Delhi, Mumbai, Bangalore)
- View nearby polling booths with:
  - Full address and directions
  - Voter capacity
  - Operating hours
  - Ward information
- One-click navigation to Google Maps

### 7. **Demo Voting Journey** 🎮
Interactive guided experience through the entire voting process:
- 5 phases: Eligibility → Registration → Find Booth → Cast Vote → Results
- Embedded quizzes for each phase
- Instant feedback on answers
- Visual flow diagrams
- Key information panels
- Completion tracking

---

## 🏗️ Tech Stack

### Frontend
- **React 18** — UI framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling and responsive design
- **Vite** — Build tool and dev server
- **Lucide React** — Icons

### Backend
- **Supabase** — Database and authentication
- **Edge Functions** — Serverless AI logic
- **PostgreSQL** — Data persistence

### Database
- Chat messages and sessions
- Fact-check history
- User interactions (anonymous session-based)

### Deployment
- Production-ready Vite build
- Supabase hosted database
- Edge Functions deployed to Supabase

---

## 📋 Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation with tricolor accent
│   │   └── Footer.tsx          # Footer with resources & quick links
│   ├── pages/
│   │   ├── Home.tsx            # Hero & module grid
│   │   ├── AIAssistant.tsx      # Chat interface
│   │   ├── ElectionTimeline.tsx # Interactive timeline
│   │   ├── VotingSimulator.tsx   # Vote journey simulator
│   │   ├── FirstTimeVoterGuide.tsx # Step-by-step wizard
│   │   ├── MisinformationChecker.tsx # Fact-checking
│   │   ├── PollingBoothFinder.tsx # Booth locator
│   │   └── DemoJourney.tsx      # Interactive demo experience
│   ├── lib/
│   │   ├── api.ts              # API calls to Edge Functions
│   │   └── supabase.ts          # Supabase client setup
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── supabase/
│   ├── functions/
│   │   └── votesetu-ai/        # Edge Function for AI logic
│   └── migrations/             # Database schema
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite configuration
└── package.json                # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (or use provided environment)

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup** (already configured in `.env`):
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🎨 Design System

### Color Palette
- **Navy** (`#0F2C68`) — Primary, trust, authority
- **Saffron** (`#F07010`) — Accent, action, energy
- **Forest Green** (`#075E40`) — Secondary, success, growth
- **Slate/Gray** — Neutral backgrounds and text

### Typography
- **Font:** Inter (Google Fonts)
- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Spacing:** 150% line-height for body, 120% for headings

### Responsive Breakpoints
- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`

### Animations
- Fade-in: `0.5s`
- Slide-up: `0.45s`
- Pulse-soft: `2s` (repeating)
- Flow-down: `0.6s`

---

## 🔌 API Integration

### VoteSetu AI Edge Function

**Endpoints:**

#### POST `/votesetu-ai/chat`
Get AI responses to election questions.

**Request:**
```json
{
  "message": "How do I register to vote?"
}
```

**Response:**
```json
{
  "response": "**How to Register as a Voter in India:**\n\n**Step 1 – Check Eligibility**\n- You must be an Indian citizen\n- You must be at least 18 years old..."
}
```

#### POST `/votesetu-ai/fact-check`
Analyze election claims for credibility.

**Request:**
```json
{
  "text": "EVMs can be hacked using Bluetooth"
}
```

**Response:**
```json
{
  "verdict": "false",
  "explanation": "This content contains claims that are factually incorrect...",
  "confidence": 85
}
```

---

## 🗄️ Database Schema

### `chat_messages`
Stores AI chat conversations.
- `id` — UUID primary key
- `session_id` — Anonymous session identifier
- `role` — 'user' or 'assistant'
- `content` — Message text
- `created_at` — Timestamp

### `fact_checks`
Stores misinformation analysis results.
- `id` — UUID primary key
- `session_id` — Anonymous session identifier
- `input_text` — Original text checked
- `verdict` — 'safe' | 'misleading' | 'false'
- `explanation` — AI-generated analysis
- `created_at` — Timestamp

**Security:** All tables use RLS (Row Level Security) for anonymous public access with session-based isolation.

---

## 📱 Features Breakdown

| Feature | Status | Type | AI Powered |
|---------|--------|------|-----------|
| Election Timeline | ✅ Complete | Interactive | ❌ |
| AI Assistant | ✅ Complete | Chat | ✅ |
| Voting Simulator | ✅ Complete | Animated | ❌ |
| First-Time Guide | ✅ Complete | Wizard | ❌ |
| Fact Checker | ✅ Complete | Analysis | ✅ |
| Booth Finder | ✅ Complete (Demo) | Search | ❌ |
| Demo Journey | ✅ Complete | Interactive | ❌ |

---

## 🎓 Educational Content

The platform covers:

✅ Voter registration process  
✅ Eligibility criteria  
✅ Required documents  
✅ Electoral roll verification  
✅ Polling booth procedures  
✅ EVM (Electronic Voting Machine) technology  
✅ VVPAT (Voter Verifiable Paper Audit Trail)  
✅ Vote counting process  
✅ Result declaration  
✅ Common election myths  
✅ Official sources (ECI, NVSP portal)  

---

## 🔒 Security & Privacy

- **No user authentication required** — Fully anonymous, session-based
- **RLS protection** — Database access controlled via Supabase RLS policies
- **No API keys exposed** — Uses Supabase anon key (public, safe)
- **No personal data collection** — Only anonymous session IDs
- **HTTPS only** — Secure connection to Supabase
- **Static site** — No server-side authentication needed

---

## 📞 Official Resources

For accurate election information, users are directed to:

- **Election Commission of India** — https://eci.gov.in
- **National Voter Service Portal** — https://voters.eci.gov.in
- **Voter Helpline** — 1950 (toll-free)
- **Fact-Checking Sites:**
  - https://factchecker.in
  - https://boomlive.in
  - https://altnews.in

---

## 🎯 Use Cases

### For First-Time Voters
- Understand eligibility and registration
- Find required documents
- Locate polling booth
- Learn voting day procedures

### For Educators
- Use as classroom material
- Reference for civic education
- Teaching election processes
- Combating misinformation

### For Parents/Guardians
- Guide young voters
- Teach about democratic process
- Verify election claims
- Build voter confidence

### For Election Workers
- Training material
- FAQ reference
- Procedural information
- Common questions answered

---

## 🚀 Performance

- **Build Size:** 32.74 KB CSS | 375.07 KB JS (gzipped: 6.04 KB + 106.09 KB)
- **Page Load Time:** < 1 second (Vite optimized)
- **Responsiveness:** 60 FPS animations
- **Mobile First:** Fully responsive design
- **Accessibility:** WCAG compliant color contrast, semantic HTML

---

## 📄 License

MIT License — See LICENSE file for details

---

## 👥 Contributing

This is a hackathon project. For improvements, features, or bug fixes:

1. Test thoroughly before submission
2. Follow the existing code style
3. Keep components focused and reusable
4. Document complex logic
5. Ensure mobile responsiveness

---

## 🎉 Made With ❤️ for Democracy

VoteSetu AI is built with the mission of strengthening democratic participation by making election information accessible, understandable, and trustworthy.

**"An informed citizen is the foundation of a strong democracy."**

---

## 📞 Support

For questions or issues:
- Check the official ECI website: https://eci.gov.in
- Call Voter Helpline: **1950** (toll-free)
- Visit NVSP Portal: https://voters.eci.gov.in

---

**Version:** 1.0.0  
**Last Updated:** April 2024  
**Status:** Production Ready ✅
