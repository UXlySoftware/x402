import { FacilitatorConfig } from "x402/types";
import { CreateHeaders } from "x402/verify";

const ONESHOT_FACILITATOR_BASE_URL = "https://api.1shotapi.com/v0";
const ONESHOT_FACILITATOR_V1_ROUTE = "/x402";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export function create1ShotAPIAuthHeaders(apiKey?: string, apiSecret?: string): CreateHeaders {

  apiKey = apiKey ?? process.env.ONESHOT_KEY;
  apiSecret = apiSecret ?? process.env.ONESHOT_SECRET;

  let authToken: TokenResponse | null = null;
  let tokenExpiry: Date | null = null;

  return async () => {

    if (!authToken || !tokenExpiry || tokenExpiry <= new Date()) {
      // 🔄 Token is missing or expired → trigger refresh logic
      const response = await fetch(`${ONESHOT_FACILITATOR_BASE_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: apiKey,
          client_secret: apiSecret,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`);
      }

      authToken = await response.json() as TokenResponse;
      tokenExpiry = new Date(Date.now() + authToken!.expires_in * 1000);
    }

    const headers = {
      verify: {} as Record<string, string>,
      settle: {} as Record<string, string>,
      supported: {} as Record<string, string>
    };

    if (apiKey && apiSecret) {
      headers.verify.Authorization = `Bearer ${authToken.access_token}`;
      headers.settle.Authorization = `Bearer ${authToken.access_token}`;
      headers.supported.Authorization = `Bearer ${authToken.access_token}`;
    }

    return headers;
  };
}

/**
 * Creates a facilitator config for the 1Shot API X402 facilitator
 *
 * @param apiKeyId - The 1Shot API key ID
 * @param apiKeySecret - The 1Shot API secret
 * @returns A facilitator config
 */
export function createFacilitatorConfig(
  apiKeyId?: string,
  apiKeySecret?: string,
): FacilitatorConfig {
  return {
    url: `${ONESHOT_FACILITATOR_BASE_URL}${ONESHOT_FACILITATOR_V1_ROUTE}`,
    createAuthHeaders: create1ShotAPIAuthHeaders(apiKeyId, apiKeySecret),
  };
}

export const facilitator = createFacilitatorConfig();