# @1shotapi/x402-facilitator

The official 1Shot API facilitator package for the x402 Payment Protocol. This package enables you to integrate x402 payments into your server via 1Shot API's managed facilitator service, enabling seamless payment verification and settlement.

## Installation

```bash
npm install @1shotapi/x402-facilitator
```

## Environment Variables

This package uses API keys from the [1Shot API](https://1shotapi.com) service for authenticated operations:

- `ONESHOT_KEY`: Your 1Shot API key
- `ONESHOT_SECRET`: Your 1Shot API secret

### Endpoint Authentication Requirements

| Endpoint    | Authentication Required | Purpose                                             |
| ----------- | ----------------------- | --------------------------------------------------- |
| `list`      | ❌ No                   | Discover available bazaar items and payment options |
| `verify`    | ✅ Yes                  | Verify payment transactions                         |
| `settle`    | ✅ Yes                  | Settle completed payments                           |
| `supported` | ✅ Yes                  | List active chains in your 1Shot API organization   |

**Note:** an API key/secret is required to use `supported`, `verify` and `settle` endpoints. 1Shot API does not currently support `list`.

## Quick Start

```typescript
// Option 1: Import the default facilitator config
// Works for list endpoint without credentials, or with CDP_API_KEY_ID and CDP_API_KEY_SECRET environment variables for verify/settle
import { facilitator } from "@1shotapi/x402-facilitator";

// Option 2: Create a facilitator config, passing in credentials directly
import { createFacilitatorConfig } from "@1shotapi/x402-facilitator";

const facilitator = createFacilitatorConfig("your-1shot-api-key-id", "your-1shot-api-secret"); // Pass in directly from preferred secret management

// Use the facilitator config in your x402 integration
```

## Integration Examples

### With Express Middleware

```typescript
import express from "express";
import { paymentMiddleware } from "x402-express";
import { facilitator } from "@1shotapi/x402-facilitator";

const app = express();

// Requires CDP_API_KEY_ID and CDP_API_KEY_SECRET environment variables
// for payment verification and settlement
app.use(
  paymentMiddleware(
    "0xYourAddress",
    {
      "/protected": {
        price: "$0.10",
        network: "base-sepolia",
      },
    },
    facilitator, // Use 1Shot API facilitator
  ),
);
```
