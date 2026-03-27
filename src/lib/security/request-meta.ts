import { NextRequest } from "next/server";

function firstHeaderValue(value: string | null): string {
  if (!value) return "";
  return value.split(",")[0]?.trim() ?? "";
}

export function getClientIp(req: NextRequest): string {
  const candidates = [
    firstHeaderValue(req.headers.get("cf-connecting-ip")),
    firstHeaderValue(req.headers.get("x-real-ip")),
    firstHeaderValue(req.headers.get("x-forwarded-for")),
    firstHeaderValue(req.headers.get("x-client-ip")),
    firstHeaderValue(req.headers.get("true-client-ip")),
  ];

  return candidates.find(Boolean) ?? "unknown";
}

export function getUserAgent(req: NextRequest): string {
  return req.headers.get("user-agent")?.trim() || "unknown";
}

export function getRequestMeta(req: NextRequest): { ip: string; userAgent: string } {
  return {
    ip: getClientIp(req),
    userAgent: getUserAgent(req),
  };
}
