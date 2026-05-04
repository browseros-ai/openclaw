import { isNodeRoleMethod } from "./method-scopes.js";
import { allowsGatewayPrivateIngressNoAuth } from "./private-ingress-auth.js";

const GATEWAY_ROLES = ["operator", "node"] as const;

export type GatewayRole = (typeof GATEWAY_ROLES)[number];

export function parseGatewayRole(roleRaw: unknown): GatewayRole | null {
  if (roleRaw === "operator" || roleRaw === "node") {
    return roleRaw;
  }
  return null;
}

export function roleCanSkipDeviceIdentity(
  role: GatewayRole,
  sharedAuthOk: boolean,
  isLocalClient = false,
): boolean {
  if (role !== "operator") {
    return false;
  }
  if (sharedAuthOk) {
    return true;
  }
  // BrowserOS private-ingress no-auth: trust loopback operator clients when
  // the env flag is set. Mirrors the missing-device bypass in connect-policy
  // and the bind-time bypass in server-runtime-config.
  return isLocalClient && allowsGatewayPrivateIngressNoAuth();
}

export function isRoleAuthorizedForMethod(role: GatewayRole, method: string): boolean {
  if (isNodeRoleMethod(method)) {
    return role === "node";
  }
  return role === "operator";
}
