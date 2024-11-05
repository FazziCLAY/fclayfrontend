const ENABLED_ILOG = false;
const ENABLED_FLOG = false;

export function ilog(m) {
  if (!ENABLED_ILOG) return;
  console.log(`ILOG: ${m}`);
}

export function flog(m) {
  if (!ENABLED_FLOG) return;
  console.log(`FLOG: ${m}`);
}
