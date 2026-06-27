export function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--update') result.update = true;
    else if (arg === '--automatic') result.automatic = true;
    else if (arg === '--dry-run') result.dryRun = true;
    else if (arg === '--help') result.help = true;
    else if (arg === '--missing-date') result.missingDate = true;
    else if (arg.startsWith('--status=')) result.status = arg.split('=')[1];
    else if (arg === '--status' && i + 1 < args.length) result.status = args[++i];
    else if (arg.startsWith('--id=')) result.id = arg.split('=')[1];
    else if (arg === '--id' && i + 1 < args.length) result.id = args[++i];
    else if (arg.startsWith('--limit=')) result.limit = parseInt(arg.split('=')[1], 10);
    else if (arg === '--limit' && i + 1 < args.length) result.limit = parseInt(args[++i], 10);
    else if (arg.startsWith('--url=')) result.url = arg.split('=')[1];
    else if (arg === '--url' && i + 1 < args.length) result.url = args[++i];
    else if (!arg.startsWith('--') && !result.id) result.id = arg;
  }

  return result;
}
