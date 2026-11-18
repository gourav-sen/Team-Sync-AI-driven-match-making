const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

let backendDir = path.resolve(__dirname, '..', 'TeamSync_Complete_Project', 'backend');
if (!fs.existsSync(backendDir)) {
  backendDir = path.resolve(__dirname, '..', 'backend');
}
if (!fs.existsSync(backendDir)) {
  backendDir = path.resolve(process.cwd(), 'TeamSync_Complete_Project', 'backend');
}

const isWin = process.platform === 'win32';
const venvPython = isWin
  ? path.join(backendDir, '.venv', 'Scripts', 'python.exe')
  : path.join(backendDir, '.venv', 'bin', 'python');

const pythonExe = fs.existsSync(venvPython) ? venvPython : 'python';

console.log('\x1b[36m[Database Seeder]\x1b[0m Running add_users.py from:', backendDir);

const child = spawn(pythonExe, ['add_users.py'], {
  cwd: backendDir,
  stdio: 'inherit'
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
