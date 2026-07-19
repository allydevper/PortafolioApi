-- Run once on Railway/Postgres for todos + journal
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  done BOOLEAN NOT NULL DEFAULT FALSE,
  project_id INT NULL REFERENCES projects(id) ON DELETE SET NULL,
  create_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  update_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journal_entries (
  id SERIAL PRIMARY KEY,
  title TEXT,
  body TEXT NOT NULL,
  entry_month DATE NOT NULL,
  project_id INT NULL REFERENCES projects(id) ON DELETE SET NULL,
  create_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_todos_project ON todos(project_id);
CREATE INDEX IF NOT EXISTS idx_todos_done ON todos(done);
CREATE INDEX IF NOT EXISTS idx_journal_month ON journal_entries(entry_month);
