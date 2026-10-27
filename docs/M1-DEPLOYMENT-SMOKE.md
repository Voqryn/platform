# M1.0 — deployment smoke test

This is a **manual**, read-only verification helper. It does not deploy anything or claim that the service is live.

After configuring the HTTPS ingress and loopback-only API, run:

```sh
bash scripts/smoke-ip-check.sh https://YOUR-VOQRYN-HOST
```

The script checks the static IP tool page, health endpoint, both API endpoints, JSON shape and IPv4/IPv6 syntax. It intentionally does not validate which external client IP the reverse proxy reports. That requires tests from known IPv4-only and IPv6-capable clients and a spoofed-forwarding-header test through the full proxy chain, as described in `docs/IP-TOOL-PROXY-TEST.md`.

**Release blockers:** confirmed CI pass, real ingress tests, rate limits, privacy/log retention review, and licensed enrichment data before enabling network details. A successful smoke script alone is not a release approval.
