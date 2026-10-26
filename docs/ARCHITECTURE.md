# Platform architecture — M0

## Purpose
A multi-tenant, API-first control plane shared by Voqryn products.

## Components
- **Identity**: users, sessions, MFA-ready authentication.
- **Organizations**: tenant membership and role-based authorization.
- **Catalog**: products, plans, entitlements and feature flags.
- **API credentials**: hashed API keys, scopes, rotation and revocation.
- **Metering**: idempotent usage events, quotas and billing reconciliation.
- **Audit**: append-only security and administrative events.
- **Portal**: self-service dashboard consuming versioned APIs.

## Data boundaries
PostgreSQL is the system of record. Every tenant-owned row has an organization ID; enforce tenant authorization on every server-side query. Never rely on client-supplied tenant IDs alone. Secrets are stored outside source control.

## Billing lifecycle
Trial -> active -> past_due -> suspended -> canceled. Payment provider webhooks must be verified, idempotent and replay-safe. No live payments until explicitly approved.

## M0 acceptance criteria
- Versioned API contract and tenant authorization tests
- Documented schema/migrations and local development environment
- Health/readiness checks and structured logging
- Security review for authentication and API keys
