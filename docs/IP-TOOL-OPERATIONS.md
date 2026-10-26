# What Is My IP? — deployment and privacy checks

Status: code committed, build and tests not independently verified, not deployed.

## API/proxy correctness

The endpoint uses the ASGI request peer, not untrusted `X-Forwarded-For` or `Forwarded` headers. Behind a reverse proxy, this may show the proxy's address rather than the visitor's. Do **not** enable broad forwarded-header trust. Configure the ASGI server to trust only the specific ingress proxy addresses, validate behavior with direct and proxied requests, and document the chain before release.

## Privacy

- No third-party IP lookup request is made by the tool.
- The server necessarily receives the requester's IP; check access logs, retention and privacy notice.
- Do not persist IP checks in analytics or attach them to affiliate conversion tracking without appropriate disclosure/consent.
- Proton VPN link is a non-affiliate educational link pending separate partnership approval.
- Never claim that a VPN guarantees anonymity.

## Release gates

1. Confirm `npm run build` emits `dist/tools/my-ip/index.html`.
2. Run Network API tests, including spoofed forwarding-header test.
3. Verify actual IPv4 and IPv6 ingress and trusted proxy configuration.
4. Add rate limiting, privacy notice, logs policy and basic monitoring before public launch.
