const {spawn} = require('child_process');

const proc = spawn('npm', ['-d', ...process.argv.slice(2)], {shell: true});
proc.stdout.pipe(process.stdout);
// Because npm logs to stderr instead of stdout
// See https://github.com/eirslett/frontend-maven-plugin/issues/411
// and https://github.com/npm/npmlog
proc.stderr.pipe(process.stdout);
proc.on('error', console.error);
proc.on('close', exitCode => process.exit(exitCode));
