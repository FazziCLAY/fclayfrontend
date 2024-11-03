const ENABLED = true;

export function ilog(m) {
  if (!ENABLED) return;
  console.log(`ILOG: ${m}`);
}

export default ilog;
