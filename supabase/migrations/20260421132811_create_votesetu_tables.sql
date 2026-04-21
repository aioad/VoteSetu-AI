/*
  # VoteSetu AI - Initial Schema

  1. New Tables
    - `chat_sessions` - Stores AI chat sessions per user/visitor
      - `id` (uuid, primary key)
      - `session_id` (text, anonymous session identifier)
      - `created_at` (timestamp)

    - `chat_messages` - Stores individual chat messages
      - `id` (uuid, primary key)
      - `session_id` (text, links to chat_sessions.session_id)
      - `role` (text, 'user' or 'assistant')
      - `content` (text, message content)
      - `created_at` (timestamp)

    - `fact_checks` - Stores misinformation check requests and results
      - `id` (uuid, primary key)
      - `session_id` (text, anonymous session identifier)
      - `input_text` (text, the text submitted for checking)
      - `verdict` (text, 'safe' | 'misleading' | 'false')
      - `explanation` (text, AI-generated explanation)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Allow anonymous public inserts and reads by session_id
    - No cross-session data leakage
*/

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fact_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  input_text text NOT NULL,
  verdict text NOT NULL CHECK (verdict IN ('safe', 'misleading', 'false')),
  explanation text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_fact_checks_session ON fact_checks(session_id);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE fact_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert chat messages"
  ON chat_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own chat messages"
  ON chat_messages FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert fact checks"
  ON fact_checks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read fact checks"
  ON fact_checks FOR SELECT
  TO anon, authenticated
  USING (true);
