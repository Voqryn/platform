import './style.css';

const app = document.querySelector('#app');
const apiBase = import.meta.env.VITE_API_BASE_URL || '';
const endpoint = (path) => new URL(path, apiBase || window.location.origin);

app.innerHTML = `<header><a class="brand" href="/">VOQRYN<span>.</span></a><nav><a href="#tools">Tools</a><a href="#about">About</a></nav></header>
<section class="hero"><span class="eyebrow">NETWORK TOOLS · EARLY PREVIEW</span><h1>Understand your infrastructure.</h1><p>Free, focused checks. Continuous monitoring when you need it.</p></section>
<section id="tools" class="panel"><div class="tabs"><button type="button" data-tool="dns" aria-pressed="true">DNS Lookup</button><button type="button" data-tool="domain" aria-pressed="false">Domain Registration</button></div><form id="lookup"><label for="domain">Domain name</label><div class="controls"><input id="domain" name="domain" placeholder="example.com" autocomplete="off" required maxlength="253" aria-describedby="help"><select id="record" aria-label="DNS record type"><option>A</option><option>AAAA</option><option>MX</option><option>TXT</option><option>NS</option><option>CAA</option><option>CNAME</option><option>SOA</option></select><button id="submit" type="submit">Run check</button></div><p id="help" class="muted">Free single checks; no account required. API must be configured to return results.</p></form><div id="result" role="status" aria-live="polite"></div><div id="cta" hidden><p>Want automatic updates instead of manual checks?</p><a id="monitor-link" href="/monitoring/">Explore monitoring (planned)</a></div></section>
<footer id="about">Voqryn · Developer tools and monitoring · Services in development</footer>`;

let tool = 'dns';
const result = document.querySelector('#result');
const cta = document.querySelector('#cta');
const record = document.querySelector('#record');
const submit = document.querySelector('#submit');
const safeDomain = (value) => /^[a-z0-9](?:[a-z0-9.-]{0,251}[a-z0-9])?$/i.test(value) && value.includes('.') && !value.includes('..');

document.querySelectorAll('[data-tool]').forEach((button) => button.addEventListener('click', () => {
  tool = button.dataset.tool;
  document.querySelectorAll('[data-tool]').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
  record.hidden = tool !== 'dns';
  result.textContent = '';
  cta.hidden = true;
}));

document.querySelector('#lookup').addEventListener('submit', async (event) => {
  event.preventDefault();
  const domain = document.querySelector('#domain').value.trim().toLowerCase().replace(/\\.$/, '');
  if (!safeDomain(domain)) { result.textContent = 'Enter a valid fully qualified domain name.'; return; }
  const path = tool === 'dns' ? '/v1/dns/lookup' : '/v1/rdap/domain';
  const url = endpoint(path);
  url.searchParams.set('domain', domain);
  if (tool === 'dns') url.searchParams.set('record_type', record.value);
  submit.disabled = true;
  result.textContent = 'Checking…';
  cta.hidden = true;
  try {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    const payload = await response.json();
    if (!response.ok) throw new Error(typeof payload.detail === 'string' ? payload.detail : 'Check failed');
    if (tool === 'dns') {
      result.textContent = payload.records?.length ? payload.records.join('\\n') : 'No records returned.';
    } else {
      const name = payload.rdap?.ldhName || domain;
      result.textContent = 'RDAP record found for ' + name + '. This does not indicate current purchase availability.\\n' + JSON.stringify(payload.rdap, null, 2);
    }
    document.querySelector('#monitor-link').href = '/monitoring/?domain=' + encodeURIComponent(domain);
    cta.hidden = false;
  } catch (error) {
    result.textContent = 'Unable to complete check: ' + error.message;
  } finally { submit.disabled = false; }
});
