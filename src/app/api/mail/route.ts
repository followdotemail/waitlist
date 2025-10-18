import { render } from "@react-email/render";

import WelcomeTemplate from "../../../emails";

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "1 m"),
});

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "127.0.0.1";

  const result = await ratelimit.limit(ip);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Too many requests!!",
      },
      {
        status: 429,
      }
    );
  }

  const { email, firstname } = await request.json();

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  // Validate firstname
  if (!firstname || firstname.trim().length < 2) {
    return NextResponse.json(
      { error: "First name must be at least 2 characters" },
      { status: 400 }
    );
  }

  const emailKey = `email_sent:${email}`;
  const emailAlreadySent = await redis.get(emailKey);

  if (emailAlreadySent) {
    return NextResponse.json(
      { error: "Email already sent to this address" },
      { status: 409 }
    );
  }

  const { data, error } = await resend.emails.send({
    from: "FollowEmail <no-reply@updates.follow.email>",
    to: [email],
    subject: "You’re on the FollowEmail waitlist 🚀",
    replyTo: "",
    html: await render(WelcomeTemplate({ userFirstname: firstname })),
  });

  if (error) {
    return NextResponse.json(error);
  }

  if (!data) {
    return NextResponse.json({ message: "Failed to send email" });
  }

  await redis.setex(emailKey, 86400, "sent");

  return NextResponse.json({ message: "Email sent successfully" });
}
