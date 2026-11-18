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

console.log('\x1b[36m[Backend]\x1b[0m Starting FastAPI from:', backendDir);
console.log('\x1b[36m[Backend]\x1b[0m Using Python:', pythonExe);

const child = spawn(pythonExe, ['-m', 'uvicorn', 'main:app', '--host', '127.0.0.1', '--port', '8000', '--reload'], {
  cwd: backendDir,
  stdio: 'inherit'
});

child.on('error', (err) => {
  console.error('\x1b[31m[Backend Error]\x1b[0m', err);
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
