# Agent: AI Social Media Content Calendar

## Context
**Route:** `/social-media-calendar` | **Category:** Marketing | **Tier:** 2
**Purpose:** Generate 30 days of platform-specific social posts (Instagram, LinkedIn, Twitter, Facebook) with captions, hashtags, posting times.

## Key Files
```
app/social-media-calendar/page.tsx
components/tools/SocialMediaCalendar.tsx
app/api/social-calendar/route.ts
```

## API Returns
JSON array: [{day, platform, caption, hashtags: string[], postingTime, contentType}]

## Skills to Load
```
/frontend-design  /claude-api
```
