# Voqryn Tools web preview

A lightweight, English-first Vite frontend for free DNS and RDAP single checks.

## Local development

```sh
cd web
npm install
npm run dev
```

Start the Network API separately on port 8000. For development, configure a same-origin reverse proxy or explicitly restricted CORS on the API. `VITE_API_BASE_URL` is public browser configuration, never a place for secrets. Without an API connection, the UI displays a network error.

## Current limitations
- Domain tool shows RDAP records for supported TLDs; it does **not** prove that a domain is available for registration.
- No account, paid monitoring or registration workflow exists yet.
- Do not deploy publicly until abuse controls, CORS, security review and privacy notice are in place.
