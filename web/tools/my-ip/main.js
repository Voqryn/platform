const output = document.querySelector('#ip');
const version = document.querySelector('#version');
const copy = document.querySelector('#copy');
const status = document.querySelector('#status');
let currentIP = '';
try {
  const response = await fetch('/v1/ip/me/details', { headers: { Accept: 'application/json' }, cache: 'no-store' });
  if (!response.ok) throw new Error('IP check unavailable');
  const data = await response.json();
  if (data.status !== 'ok' || !data.ip) throw new Error('IP address unavailable');
  currentIP = data.ip;
  output.textContent = currentIP;
  version.textContent = data.version;
  copy.disabled = false;
  const intel = document.querySelector('#intelligence');
  if (data.intelligence?.available) {
    const details = data.intelligence;
    intel.textContent = [details.country && `Country (approximate): ${details.country}`, details.asn != null && `ASN: AS${details.asn}`, details.provider && `Network: ${details.provider}`].filter(Boolean).join(' · ') || 'Additional details unavailable.';
  } else {
    intel.textContent = 'Network details not available yet.';
  }
} catch {
  output.textContent = 'Unable to check your IP right now.';
}
copy.addEventListener('click', async () => {
  if (!currentIP) return;
  try { await navigator.clipboard.writeText(currentIP); status.textContent = 'Copied.'; }
  catch { status.textContent = 'Copy unavailable in this browser.'; }
});
