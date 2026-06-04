# Agent: Cron Expression Builder

## Context
**Route:** `/cron-builder` | **Category:** Developer | **Tier:** 3
**Purpose:** Visual cron job builder. Click-to-select minutes/hours/days → see cron expression + plain English + next 5 run times.

## Key Files
```
app/cron-builder/page.tsx
components/tools/CronBuilder.tsx
```

## Pure frontend — no backend

## UI Sections
1. **Quick patterns**: Every minute, Every 5 min, Every hour, Daily 9am, Weekdays 9am, Weekly Monday, Monthly 1st, Custom
2. **Visual builder**: 5 fields (min, hour, day-of-month, month, day-of-week) each with dropdown/multi-select
3. **Output**: Cron expression (copy button), Plain English description, Next 5 run times (calculate from current time)

## Cron String → English
- `* * * * *` → "Every minute"
- `*/5 * * * *` → "Every 5 minutes"
- `0 9 * * 1-5` → "Every weekday at 9:00 AM"
- `0 0 1 * *` → "On the 1st of every month at midnight"

## Next Run Calculation
Implement a simple next-run calculator in pure JS (no date-fns/moment).

## Skills to Load
```
/frontend-design
```
