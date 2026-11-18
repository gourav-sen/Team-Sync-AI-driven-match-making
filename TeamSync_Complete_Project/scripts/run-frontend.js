const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Resolve frontend directory (supports running from root or inner folder)
let frontendDir = path.resolve(__dirname, '..', 'TeamSync_Complete_Project', 'frontend');
if (!fs.existsSync(frontendDir)) {
  frontendDir = path.resolve(__dirname, '..', 'frontend');
}
if (!fs.existsSync(frontendDir)) {
  frontendDir = path.resolve(process.cwd(), 'TeamSync_Complete_Project', 'frontend');
}

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

console.log('\x1b[35m[Frontend]\x1b[0m Starting Vite dev server from:', frontendDir);

const child = spawn(npmCmd, ['run', 'dev'], {
  cwd: frontendDir,
  stdio: 'inherit',
  shell: true
});

child.on('error', (err) => {
  console.error('\x1b[31m[Frontend Error]\x1b[0m', err);
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
