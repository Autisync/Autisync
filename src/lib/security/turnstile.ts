interface TurnstileVerifyOptions {
  token: string;
  ip?: string;
}

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
}

export async function verifyTurnstile(options: TurnstileVerifyOptions): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[security/turnstile] TURNSTILE_SECRET_KEY is not configured.");
    return false;
  }

  if (!options.token || !options.token.trim()) {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: options.token,
  });

  if (options.ip) {
    body.set("remoteip", options.ip);
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[security/turnstile] verification request failed", res.status);
      return false;
    }

    const data = (await res.json()) as TurnstileVerifyResponse;
    if (!data.success) {
      console.warn("[security/turnstile] verification denied", data["error-codes"] ?? []);
    }

    return Boolean(data.success);
  } catch (error) {
    console.error("[security/turnstile] verification error", error);
    return false;
  }
}
