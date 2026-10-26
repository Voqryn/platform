# Voqryn Tools — free-to-paid acquisition strategy

Status: proposed product strategy; tools are not yet deployed.

## Principle
Provide genuinely useful, free, no-login single checks. Offer optional account-based continuous monitoring, history, notifications and APIs as natural next steps. Never hide results behind signup or make misleading availability claims.

| Free tool | Useful result | Relevant paid follow-up |
| --- | --- | --- |
| Domain availability check | RDAP registration indication with confidence/limitations | Domain watch, expiry alerts, DNS monitoring |
| TLS certificate checker | Chain, hostname and expiry diagnostics | TLS monitoring and alerts |
| DNS lookup | A/AAAA/MX/TXT/CAA/NS records | DNS change monitoring and API |
| DNS propagation comparison | Results from selected independent resolvers | DNS monitoring and history |
| Website status check | Bounded HTTP status and latency | Uptime monitoring |
| HTTP headers/redirect checker | Security headers and redirect chain | Site monitoring and technical reports |
| SPF/DMARC checker | Public email-authentication records | DNS monitoring and reports |
| IP/RDAP lookup | Public network and registration metadata | Network API subscription |

## Suggested IA
- voqryn.com/tools — tool directory
- voqryn.com/tools/domain-check — first landing page
- voqryn.com/tools/tls-check
- voqryn.com/tools/dns-lookup
- voqryn.com/tools/website-status
- api.voqryn.com/v1 — authenticated API, when launched
- app.voqryn.com — customer dashboard, when launched

## Domain availability caveat
RDAP absence is **not** proof that a domain is purchasable. Registry policies, reserved names, premium inventory, registrar-specific restrictions and RDAP coverage may differ. Label output as 'registered', 'possibly available' or 'unknown', with source and timestamp. A registrar search or registration attempt is needed for definitive purchase availability.

## Conversion UX
- Show useful results before any signup prompt.
- Offer a relevant optional CTA such as 'Monitor this domain' prefilled with the checked domain.
- No dark patterns, fake scarcity or unsolicited email.
- Clearly distinguish free checks from paid continuous services.
- Publish retention/privacy policy and avoid leaking user-entered targets to analytics.

## Abuse controls
- Rate limit by IP and account; use CAPTCHA or proof-of-work only if necessary.
- Strict input validation and SSRF-safe HTTP/TLS checks.
- Bound DNS/RDAP timeouts, result sizes and request volume.
- Cache safe public results briefly; do not cache private customer data in shared caches.
- Do not expose arbitrary fetch/proxy capabilities.

## MVP delivery sequence
1. DNS lookup page backed by the existing Network API (after security and CI checks).
2. RDAP-based domain registration indication for supported TLDs, clearly labeled.
3. TLS checker and corresponding continuous monitoring signup.
4. Website status checker and uptime monitoring signup.
5. Usage analytics using privacy-conscious aggregate conversion events.

## Success measures
Tool usage, valid-result rate, signup conversion, monitoring activation, free-to-paid conversion, support burden, API cost and abuse incidents.
