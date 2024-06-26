-- Ask for confirmation before deleting and recreating the pomodoro and jobly_test databases
\echo 'Delete and recreate pomodoro db?'
\prompt 'Return for yes or control-C to cancel > ' foo
-- Clear database, create schema, and seed data
DROP DATABASE pomodoro;
CREATE DATABASE pomodoro;
\connect pomodoro

\i pomodoro-schema.sql
\i pomodoro-seed.sql

\echo 'Delete and recreate pomodoro_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE pomodoro_test;
CREATE DATABASE pomodoro_test;
\connect pomodoro_test

\i pomodoro-schema.sql