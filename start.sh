#!/bin/bash

echo "Starting AI Content Assistant..."

# Start backend
osascript -e 'tell application "Terminal"
do script "cd ~/Desktop/internship/backend && source ../.venv/bin/activate && node server.js"
end tell'

sleep 2

# Start frontend
osascript -e 'tell application "Terminal"
do script "cd ~/Desktop/internship/frontend && npm run dev"
end tell'

echo "Project started!"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:3000"
