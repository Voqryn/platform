# IP Check M0.4 — single-host Caddy + Uvicorn example

**Not deployed.** This configuration assumes Caddy and Uvicorn run on the **same machine** and Caddy is the **only public ingress**. Do not reuse unchanged behind a CDN or additional reverse proxy.

## API process

Bind Uvicorn to loopback only:

```sh
uvicorn voqryn_network_api.main:app --host 127.0.0.1 --port 8000 --proxy-headers --forwarded-allow-ips 127.0.0.1
```

Uvicorn then accepts forwarding headers **only from the local Caddy proxy**. Do not use `--forwarded-allow-ips '*'` on an exposed service.

The example Caddyfile serves `/srv/voqryn/web/dist` and routes `/v1/*` and `/healthz` to the local API. It overwrites incoming `X-Forwarded-For` and removes incoming RFC 7239 `Forwarded`. Review Caddy's proxy behavior and firewall policy before production.

## Verification

1. Confirm the API is unreachable from the internet on port 8000.
2. Verify `curl -s https://voqryn.com/v1/ip/me` from an IPv4-only client returns its public IPv4 address.
3. Repeat from a real IPv6-capable client, ideally explicitly selecting IPv6 with `curl -6`.
4. Spoof headers with `curl -H 'X-Forwarded-For: 203.0.113.88' -H 'Forwarded: for=203.0.113.88' https://voqryn.com/v1/ip/me`; result must **not** become `203.0.113.88`.
5. Confirm `https://voqryn.com/tools/my-ip/` loads and can copy the returned address.
6. Check response headers, access logs, privacy policy, request limits and whether IP addresses are retained.

## Limitations

- A browser using a dual-stack network may connect over IPv4 or IPv6; this tool reports the family used for that particular request, not both addresses simultaneously.
- CDN/proxy layers need an explicitly documented trust chain; the sample cannot infer the actual visitor through an arbitrary CDN.
- No geolocation or VPN detection is implied by the endpoint.
- Do not enable public access before rate limiting, operational review and privacy notice are ready.
