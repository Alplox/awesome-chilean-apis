import readline from 'node:readline';

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

export function isAutomatic() {
  return process.argv.includes('--automatic');
}

export async function promptUser(question, defaultValue = '') {
  const rl = createInterface();
  return new Promise((resolve) => {
    const defaultStr = defaultValue ? ` (${defaultValue})` : '';
    rl.question(`${question}${defaultStr}: `, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue);
    });
  });
}

export async function promptStatus(url, currentStatus) {
  if (isAutomatic()) return currentStatus;

  const rl = createInterface();
  return new Promise((resolve) => {
    console.log(`\nEndpoint: ${url}`);
    console.log(`Current status: ${currentStatus}`);
    console.log('Options: active | stale | broken | offline | no_endpoint');
    rl.question('New status (Enter to keep): ', (answer) => {
      rl.close();
      const valid = ['active', 'stale', 'broken', 'offline', 'no_endpoint'];
      if (valid.includes(answer.trim())) resolve(answer.trim());
      else resolve(currentStatus);
    });
  });
}

export async function promptUrl(url, question) {
  if (isAutomatic()) return null;

  const rl = createInterface();
  return new Promise((resolve) => {
    rl.question(`${question} (Enter to skip): `, (answer) => {
      rl.close();
      resolve(answer.trim() || null);
    });
  });
}
