# Voqryn Tools web preview

Lightweight, English-first Vite frontend for free DNS and RDAP single checks.

## Local development (two terminals)

Terminal 1 — Network API:

```sh
git clone https://github.com/Voqryn/network-api.git
cd network-api
python3 -m venv .venv
. .venv/bin/activate
python -m pip install '.[test]'
uvicorn voqryn_network_api.main:app --host 127.0.0.1 --port 8000
```

Terminal 2 — frontend:

```sh
git clone https://github.com/Voqryn/platform.git
cd platform/web
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173). Vite proxies `/v1` and `/healthz` to the locally running API. This avoids cross-origin requests during development. Test API availability with `curl http://127.0.0.1:8000/healthz`.

## Checks

```sh
# From network-api repository:
python -m pytest -q

# From platform/web:
npm run build
```

## Current limitations

- RDAP supports .com and .net only; returned registration records do not prove a domain is purchasable.
- No accounts, billing, monitoring or domain registration workflow exists yet.
- No production deployment, privacy notice, production rate limits or public security review yet.
- Do not publish the API or tools publicly before completing the security and operational gates.
- `VITE_API_BASE_URL` is public browser configuration, not a secret store; leave it unset for local proxy mode.
