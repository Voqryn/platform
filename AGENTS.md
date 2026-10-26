# Voqryn Platform — Agent Instructions

Build an API-first, self-service commercial platform. Prioritize security, tests, accessibility and clear documentation.

## Boundaries
- Never commit credentials, API keys, personal data, or production configuration.
- Do not enable real billing, outbound emails, or customer provisioning without explicit approval.
- Use versioned migrations and tests for database changes.
- Keep authentication, tenant authorization and billing entitlements server-side.
- Default to minimal dependencies and deterministic CI.

## M0 scope
Architecture and interfaces first: tenant model, users, API keys, subscription entitlements, metering, audit log and admin workflows.
