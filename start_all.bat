@echo off
echo Starting Student-Connect Backend...
start cmd /k "cd backend && .\mvnw.cmd spring-boot:run"

echo Starting Student-Connect Frontend...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting in separate windows.
