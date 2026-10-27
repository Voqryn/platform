#!/usr/bin/env bash
# Read-only post-deploy smoke check. Usage: ./scripts/smoke-ip-check.sh https://example.com
set -euo pipefail
base="${1:?Usage: smoke-ip-check.sh https://your-domain}"
base="${base%/}"
case "$base" in https://*) ;; *) echo "HTTPS URL required" >&2; exit 2;; esac
for path in /tools/my-ip/ /healthz /v1/ip/me /v1/ip/me/details; do
  code="$(curl --silent --show-error --location --max-time 15 --output /dev/null --write-out '%{http_code}' "$base$path")"
  if [[ "$code" != 200 ]]; then echo "FAIL $path: HTTP $code" >&2; exit 1; fi
  echo "OK $path"
done
# JSON response fields and IP syntax are verified without additional dependencies.
python3 - "$base" <<'PY'
import ipaddress, json, sys, urllib.request
base = sys.argv[1]
for path in ("/v1/ip/me", "/v1/ip/me/details"):
    req = urllib.request.Request(base + path, headers={"Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=15) as response:
        payload = json.load(response)
    ip = ipaddress.ip_address(payload["ip"])
    assert payload["status"] == "ok"
    assert payload["version"] == f"IPv{ip.version}"
    if path.endswith("details"):
        assert isinstance(payload["intelligence"]["available"], bool)
    print("Valid response", path, payload["version"])
PY
