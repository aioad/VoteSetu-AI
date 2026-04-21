import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ELECTION_KNOWLEDGE_BASE: Record<string, string> = {
  register: `**How to Register as a Voter in India:**

**Step 1 – Check Eligibility**
- You must be an Indian citizen
- You must be at least 18 years old on the qualifying date (January 1st of the registration year)
- You must be a resident of the constituency where you want to register

**Step 2 – Gather Documents**
- Proof of age (Aadhaar card, birth certificate, passport, school certificate)
- Proof of address (Aadhaar card, utility bill, bank passbook, rental agreement)
- Recent passport-size photograph

**Step 3 – Submit Form 6**
- Visit the National Voter Service Portal (NVSP) at voters.eci.gov.in
- Fill out Form 6 online or visit your local Electoral Registration Office
- Submit your application along with supporting documents

**Step 4 – Verification**
- A Booth Level Officer (BLO) may visit your address to verify details
- You will receive an acknowledgment number to track your application

**Step 5 – Receive Voter ID**
- Upon approval, your name is added to the electoral roll
- You can download your e-EPIC (Electronic Electoral Photo Identity Card) from the NVSP portal

The process typically takes 30-45 days. You can check your status online using your reference number.`,

  documents: `**Documents Required for Voter Registration:**

**Proof of Age (any one):**
- Aadhaar Card
- Birth Certificate issued by Municipal Authority
- Indian Passport
- High School Marksheet (showing date of birth)
- PAN Card
- Driving License

**Proof of Address (any one):**
- Aadhaar Card
- Latest Electricity/Water/Gas Bill (not older than 3 months)
- Bank/Post Office Passbook
- Registered Rental/Lease Agreement
- Indian Passport
- Driving License

**Photograph:**
- Recent passport-size photograph (taken in the last 6 months)

**Important Notes:**
- Aadhaar card serves as both age and address proof
- Documents must be self-attested
- Original documents may be required for verification
- All documents should be clear and legible`,

  process: `**The Indian Election Process – Step by Step:**

**1. Election Announcement**
The Election Commission of India (ECI) announces election dates. The Model Code of Conduct comes into effect immediately.

**2. Nomination Phase**
Candidates file nomination papers with the Returning Officer. Nominations are scrutinized for eligibility.

**3. Withdrawal of Candidature**
Candidates can withdraw their nomination within a specified period after scrutiny.

**4. Election Campaign**
Candidates and parties campaign to gain voter support. Campaigns must follow ECI guidelines.

**5. Voting Day (Poll Day)**
Voters cast their votes at designated polling booths using Electronic Voting Machines (EVMs). Voting takes place from 7 AM to 6 PM.

**6. Vote Counting**
On counting day, EVMs are opened under strict supervision. All candidates and their agents are present.

**7. Result Declaration**
Results are declared constituency-wise. The winning candidate is officially notified.

**8. Government Formation**
The party/alliance with majority forms the government. The President/Governor invites the leader to form the government.

The entire process is supervised by the independent Election Commission of India to ensure free and fair elections.`,

  counting: `**How Vote Counting Works in India:**

**Before Counting:**
- EVMs are stored in strong rooms under security
- Counting is done on a pre-announced date, usually 2-3 weeks after polling
- Counting agents from each candidate are present
- Randomization of EVMs is done by software

**The Counting Process:**
1. **Strong Room Opening** – EVMs are brought out in the presence of candidates and observers
2. **Randomization** – EVMs are randomly assigned to counting tables
3. **Round-by-Round Counting** – Each round counts votes from specific EVMs
4. **Verification** – VVPAT (Voter Verifiable Paper Audit Trail) slips are verified
5. **Compilation** – Results from all EVMs are compiled
6. **Announcement** – Round-wise results are announced on public display boards

**Safeguards:**
- Multiple layers of security at strong rooms
- 24/7 CCTV surveillance
- Presence of all candidates' representatives
- Independent observers from ECI
- Random VVPAT verification (5 per assembly segment)

The entire process is transparent and candidates can raise objections at any stage.`,

  evm: `**What is an EVM (Electronic Voting Machine)?**

An EVM is a simple electronic device used to record votes during elections in India.

**Components:**
- **Ballot Unit** – Has buttons for each candidate with their name, party, and symbol
- **Control Unit** – Operated by the polling officer to enable voting
- **VVPAT** – Voter Verifiable Paper Audit Trail – prints a paper slip showing your vote

**How It Works:**
1. Voter enters the polling booth
2. Polling officer enables the EVM
3. Voter presses the button next to their preferred candidate
4. A beep confirms the vote is recorded
5. VVPAT shows a paper slip with candidate name and symbol for 7 seconds

**Security Features:**
- EVMs are standalone devices (not connected to internet)
- Tamper-proof hardware
- One-time programmable chips
- Sequential vote recording to prevent manipulation
- Stored in secure strong rooms after polling

EVMs have been used in Indian elections since 1999 and have made elections more efficient and cost-effective.`,

  booth: `**How to Find Your Polling Booth:**

**Method 1 – NVSP Portal**
- Visit voters.eci.gov.in
- Click on "Know Your Polling Station"
- Enter your EPIC number (Voter ID number)
- Your polling booth details will be displayed

**Method 2 – Voter Helpline App**
- Download the "Voter Helpline" app from Play Store or App Store
- Search by EPIC number or name
- View your polling booth on a map

**Method 3 – SMS Service**
- Send your EPIC number to 1950
- You will receive your booth details via SMS

**Method 4 – National Voter Helpline**
- Call 1950 (toll-free)
- Provide your voter ID details
- Get booth information

**On Voting Day:**
- Carry your Voter ID card (EPIC) or any approved alternate photo ID
- Check for your name on the displayed electoral roll at the booth
- Follow the queue and wait for your turn

Your polling booth is usually within 2 km of your registered address.`,

  aftervote: `**What Happens After You Cast Your Vote:**

**Immediately After Voting:**
- The EVM records your vote securely
- The VVPAT prints a slip showing your selection (visible for 7 seconds)
- Your finger is marked with indelible ink to prevent double voting
- You receive a voter slip as acknowledgment

**After Polling Ends:**
- EVMs are sealed in the presence of polling agents
- Machines are transported to secure strong rooms
- Strong rooms are sealed and guarded 24/7

**On Counting Day:**
- EVMs are brought to counting centers
- Counting happens round by round
- Results are announced publicly
- Total votes are tallied across all booths

**Result Declaration:**
- The candidate with most votes wins (First Past The Post system)
- Returning Officer officially declares the winner
- Results are published on ECI website

**Government Formation:**
- The party/alliance with majority of seats forms the government
- President/Governor invites the leader to take oath as Prime Minister/Chief Minister

Your single vote contributes to choosing the government that will govern for the next 5 years!`,

  eligibility: `**Voter Eligibility Criteria in India:**

**Basic Requirements:**
1. **Citizenship** – Must be a citizen of India
2. **Age** – Must be 18 years or older on January 1st of the qualifying year
3. **Residency** – Must be an ordinary resident of the constituency
4. **Mental Health** – Must not have been declared of unsound mind by a court
5. **Criminal Record** – Must not be disqualified under any law relating to elections

**Who CANNOT Vote:**
- Non-Indian citizens
- Persons under 18 years of age
- Persons declared of unsound mind
- Persons convicted of electoral offenses
- Those serving imprisonment of 2+ years

**Special Provisions:**
- NRIs (Non-Resident Indians) can register in their constituency of origin
- Overseas Electors can apply under Section 20A of Representation of People Act
- Service voters (armed forces, government employees posted outside) have special provisions

**Checking Your Registration:**
Visit voters.eci.gov.in or call 1950 to check if your name is on the electoral roll.`,

  misinformation: `**Common Election Misinformation in India:**

**Type 1 – Fake Voting Rules**
*Example: "You need Aadhaar to vote"*
- FACT: Multiple documents can be used. Aadhaar is just one option. 12 alternate photo IDs are accepted.

**Type 2 – False EVM Tampering Claims**
*Example: "EVMs can be hacked via Bluetooth"*
- FACT: EVMs are standalone devices with no wireless connectivity. They have multiple security certifications.

**Type 3 – Voter Roll Manipulation Claims**
*Example: "Names removed from voter list by ruling party"*
- FACT: Deletion requires formal process with notice. You can check online and object to deletions.

**Type 4 – Exit Poll Misinformation**
*Example: Sharing early exit polls to influence voters still in queue*
- FACT: Exit poll results cannot be published until the last phase of voting ends.

**How to Verify:**
1. Check official ECI website: eci.gov.in
2. Call National Voter Helpline: 1950
3. Use fact-checking sites: Factchecker.in, Boomlive.in, AltNews.in
4. File complaint via cVIGIL app for election violations

Always verify from official sources before sharing election-related information.`,
};

function getElectionResponse(query: string): string {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes("register") || lowerQuery.includes("registration") || lowerQuery.includes("enroll")) {
    return ELECTION_KNOWLEDGE_BASE.register;
  }
  if (lowerQuery.includes("document") || lowerQuery.includes("id proof") || lowerQuery.includes("proof")) {
    return ELECTION_KNOWLEDGE_BASE.documents;
  }
  if (lowerQuery.includes("process") || lowerQuery.includes("how election") || lowerQuery.includes("election work")) {
    return ELECTION_KNOWLEDGE_BASE.process;
  }
  if (lowerQuery.includes("count") || lowerQuery.includes("counting")) {
    return ELECTION_KNOWLEDGE_BASE.counting;
  }
  if (lowerQuery.includes("evm") || lowerQuery.includes("electronic voting") || lowerQuery.includes("machine")) {
    return ELECTION_KNOWLEDGE_BASE.evm;
  }
  if (lowerQuery.includes("booth") || lowerQuery.includes("polling station") || lowerQuery.includes("where to vote") || lowerQuery.includes("find")) {
    return ELECTION_KNOWLEDGE_BASE.booth;
  }
  if (lowerQuery.includes("after") || lowerQuery.includes("what happen") || lowerQuery.includes("cast")) {
    return ELECTION_KNOWLEDGE_BASE.aftervote;
  }
  if (lowerQuery.includes("eligib") || lowerQuery.includes("qualify") || lowerQuery.includes("who can vote") || lowerQuery.includes("age")) {
    return ELECTION_KNOWLEDGE_BASE.eligibility;
  }
  if (lowerQuery.includes("misinform") || lowerQuery.includes("fake") || lowerQuery.includes("false") || lowerQuery.includes("rumor")) {
    return ELECTION_KNOWLEDGE_BASE.misinformation;
  }

  return `I'm VoteSetu AI, your civic education assistant! I can help you with:

- **Voter Registration** – How to register as a voter
- **Required Documents** – What you need to register
- **Election Process** – How Indian elections work
- **Vote Counting** – How votes are counted
- **EVM Information** – How electronic voting machines work
- **Finding Your Booth** – How to locate your polling station
- **After Voting** – What happens after you cast your vote
- **Voter Eligibility** – Who can vote in India
- **Misinformation** – Common election myths debunked

Please ask me any of these questions and I'll provide clear, step-by-step guidance!

*Example: "How do I register to vote?" or "What documents do I need?"*`;
}

function checkMisinformation(text: string): { verdict: string; explanation: string; confidence: number } {
  const lowerText = text.toLowerCase();

  const falseIndicators = [
    "evm hacked", "evm tampered", "bluetooth evm", "wifi evm", "rigged evm",
    "votes stolen", "election fraud proven", "eci corrupt", "votes changed",
    "ruling party deleted", "opposition names removed", "100% bogus"
  ];

  const misleadingIndicators = [
    "only aadhaar", "must have aadhaar", "aadhaar mandatory for voting",
    "no id needed", "any id works", "vote without id",
    "election postponed", "voting extended", "new voting rules",
    "secret ballot exposed", "your vote tracked"
  ];

  const safeIndicators = [
    "election commission", "eci announcement", "official notification",
    "form 6", "nvsp", "voter helpline 1950", "eci.gov.in",
    "check your name", "electoral roll", "epic card"
  ];

  let falsScore = falseIndicators.filter(ind => lowerText.includes(ind)).length;
  let misleadScore = misleadingIndicators.filter(ind => lowerText.includes(ind)).length;
  let safeScore = safeIndicators.filter(ind => lowerText.includes(ind)).length;

  if (falsScore > 0) {
    return {
      verdict: "false",
      explanation: `This content contains claims that are factually incorrect based on election commission guidelines. **Key issues identified:**\n\n1. Electronic Voting Machines (EVMs) are standalone devices with no internet or wireless connectivity — they cannot be remotely accessed or hacked.\n2. The Election Commission of India operates with multiple independent observers and security layers.\n3. Any electoral complaints should be filed officially through the ECI portal or cVIGIL app.\n\n**Trusted Sources:** eci.gov.in | Factchecker.in | Boomlive.in | AltNews.in\n\n*Always verify election information from official ECI sources before sharing.*`,
      confidence: 85
    };
  }

  if (misleadScore > 0) {
    return {
      verdict: "misleading",
      explanation: `This content contains partially inaccurate or misleading information about election procedures. **What's incorrect:**\n\n1. Aadhaar is NOT the only valid ID for voting — 12 alternate photo identity documents are accepted at polling booths.\n2. Voting rules are set by the Election Commission and published officially.\n3. No unofficial sources can change or announce election rules.\n\n**Correct Information:** Visit voters.eci.gov.in or call 1950 for accurate voter information.\n\n**Trusted Sources:** eci.gov.in | Voter Helpline 1950 | Factchecker.in\n\n*Check official sources before acting on any election-related claims.*`,
      confidence: 72
    };
  }

  if (safeScore > 0 || lowerText.length < 100) {
    return {
      verdict: "safe",
      explanation: `This content appears to be factually accurate and consistent with official election commission guidelines. **Why it's safe:**\n\n1. References official sources and correct procedures.\n2. Does not contain any known false claims about elections.\n3. Aligns with Election Commission of India's published guidelines.\n\n**Remember:** Always verify important election information from eci.gov.in or by calling 1950.\n\n*Spreading accurate information helps strengthen democracy!*`,
      confidence: 78
    };
  }

  return {
    verdict: "misleading",
    explanation: `This content requires careful verification. **Analysis:**\n\n1. Some claims in this content could not be verified against official election commission sources.\n2. It may contain opinions presented as facts, or outdated information.\n3. Electoral rules and procedures may vary by state and election type.\n\n**Recommendation:** Cross-check this information with official sources before sharing.\n\n**Trusted Sources:** eci.gov.in | Voter Helpline 1950 | Factchecker.in | Boomlive.in | AltNews.in\n\n*When in doubt, don't share. Verify first.*`,
    confidence: 55
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.replace("/votesetu-ai", "");

    if (path === "/chat" && req.method === "POST") {
      const { message } = await req.json();

      if (!message || typeof message !== "string") {
        return new Response(JSON.stringify({ error: "Message is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const response = getElectionResponse(message);

      return new Response(JSON.stringify({ response }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (path === "/fact-check" && req.method === "POST") {
      const { text } = await req.json();

      if (!text || typeof text !== "string") {
        return new Response(JSON.stringify({ error: "Text is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const result = checkMisinformation(text);

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error", details: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
