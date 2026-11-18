const { spawn } = require('child_process');
const path = require('path');

console.log('\x1b[36m====================================================\x1b[0m');
console.log('\x1b[1m\x1b[32m       🚀 TeamSync AI Platform Launching...       \x1b[0m');
console.log('\x1b[36m====================================================\x1b[0m');
console.log('\x1b[90m- Backend API:  http://127.0.0.1:8000 (Docs: /docs)\x1b[0m');
console.log('\x1b[90m- Frontend App: http://localhost:5173\x1b[0m');
console.log('\x1b[36m----------------------------------------------------\x1b[0m\n');

// Start backend via Node
const backend = spawn(process.execPath, [path.join(__dirname, 'scripts', 'run-backend.js')], {
  stdio: 'inherit'
});

// Start frontend via Node
const frontend = spawn(process.execPath, [path.join(__dirname, 'scripts', 'run-frontend.js')], {
  stdio: 'inherit'
});

function handleExit() {
  console.log('\n\x1b[33m[Shutdown] Stopping TeamSync processes...\x1b[0m');
  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', backend.pid, '/f', '/t'], { shell: true });
      spawn('taskkill', ['/pid', frontend.pid, '/f', '/t'], { shell: true });
    } else {
      backend.kill('SIGTERM');
      frontend.kill('SIGTERM');
    }
  } catch (err) {}
  process.exit();
}

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
