import { isTruthyEnvValue } from "../infra/env.js";

export const GATEWAY_PRIVATE_INGRESS_NO_AUTH_ENV = "OPENCLAW_GATEWAY_PRIVATE_INGRESS_NO_AUTH";

export function allowsGatewayPrivateIngressNoAuth(env: NodeJS.ProcessEnv = process.env): boolean {
  return isTruthyEnvValue(env[GATEWAY_PRIVATE_INGRESS_NO_AUTH_ENV]);
}
