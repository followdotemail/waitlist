import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string; name?: string };

    if (!process.env.NOTION_SECRET || !process.env.NOTION_DB) {
      return NextResponse.json(
        { success: false, error: "Missing Notion credentials" },
        { status: 500 }
      );
    }

    if (!body?.email || !body?.name) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: email, name" },
        { status: 400 }
      );
    }

    const notion = new Client({ auth: process.env.NOTION_SECRET });

    // Get location data from Vercel headers
    const country = request.headers.get("x-vercel-ip-country") || "Unknown";
    const city = request.headers.get("x-vercel-ip-city") || "Unknown";
    const continent = request.headers.get("x-vercel-ip-continent") || "Unknown";
    const locationString = `${city}, ${country}, ${continent}`;

    // Get referrer/platform data
    const referrer = request.headers.get("referer") || "Direct";
    const userAgent = request.headers.get("user-agent") || "";

    // Detect platform from referrer
    let platform = "Direct";
    if (referrer.includes("google.com")) platform = "Google";
    else if (referrer.includes("facebook.com")) platform = "Facebook";
    else if (referrer.includes("twitter.com") || referrer.includes("x.com"))
      platform = "Twitter/X";
    else if (referrer.includes("linkedin.com")) platform = "LinkedIn";
    else if (referrer.includes("peerlist.io")) platform = "Peerlist";
    else if (referrer.includes("instagram.com")) platform = "Instagram";
    else if (referrer.includes("youtube.com")) platform = "YouTube";
    else if (referrer.includes("reddit.com")) platform = "Reddit";
    else if (referrer.includes("github.com")) platform = "GitHub";
    else if (referrer.includes("producthunt.com")) platform = "Product Hunt";
    else if (
      referrer.includes("hackernews") ||
      referrer.includes("ycombinator")
    )
      platform = "Hacker News";
    else if (referrer !== "Direct") platform = "Other Website";

    // Initialize Redis for duplicate prevention
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    // Check if email already exists in Redis
    const emailKey = `notion_email:${body.email}`;
    const emailExists = await redis.get(emailKey);

    if (emailExists) {
      return NextResponse.json(
        { success: false, error: "Email already exists in waitlist" },
        { status: 409 }
      );
    }

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DB,
      },
      properties: {
        Email: {
          type: "email",
          email: body.email,
        },
        Name: {
          type: "title",
          title: [
            {
              type: "text",
              text: {
                content: body.name,
              },
            },
          ],
        },
        Location: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: locationString,
              },
            },
          ],
        },
        Platform: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: platform,
              },
            },
          ],
        },
        Referrer: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: {
                content: referrer,
              },
            },
          ],
        },
        Date: {
          type: "date",
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    if (!response) {
      return NextResponse.json(
        { success: false, error: "Failed to add to Notion" },
        { status: 500 }
      );
    }

    // Mark email as added in Redis (expires in 30 days)
    await redis.setex(emailKey, 2592000, "added");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
