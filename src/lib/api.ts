const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const headers = {
  'Authorization': `Bearer ${ANON_KEY}`,
  'Content-Type': 'application/json',
};

export async function askElectionAI(message: string): Promise<string> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/votesetu-ai/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error('Failed to get AI response');
  const data = await res.json();
  return data.response as string;
}

export async function factCheckText(text: string): Promise<{
  verdict: 'safe' | 'misleading' | 'false';
  explanation: string;
  confidence: number;
}> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/votesetu-ai/fact-check`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Failed to fact-check');
  return res.json();
}

export function getSessionId(): string {
  let id = sessionStorage.getItem('votesetu_session');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('votesetu_session', id);
  }
  return id;
}
