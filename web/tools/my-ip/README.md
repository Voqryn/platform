# What Is My IP?

Free, no-login diagnostic at `/tools/my-ip/`.

- Fetches the same-origin `GET /v1/ip/me` API endpoint.
- Displays the address seen by the API (IPv4 or IPv6).
- Offers copy-to-clipboard, without an external IP lookup provider.
- Includes a discreet **non-affiliate** Proton VPN educational link. Voqryn's commercial arrangements are separate from HackShack's.

## Release checklist

- Confirm the web CI build includes this HTML page.
- Verify direct IPv4 and IPv6 access and correct trusted proxy handling.
- Set up same-origin API routing in production; Vite's `/v1` proxy only applies in development.
- Review logging, privacy notice and rate limits before public deployment.
