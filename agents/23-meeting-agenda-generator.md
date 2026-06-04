# Agent: AI Meeting Agenda Generator

## Context
**Route:** `/meeting-agenda-generator` | **Category:** Productivity | **Tier:** 3
**Purpose:** Generate structured meeting agendas with time blocks from a list of topics. AI handles allocation.

## Key Files
```
app/meeting-agenda-generator/page.tsx
components/tools/MeetingAgendaGenerator.tsx
app/api/meeting-agenda/route.ts
```

## Inputs
- Meeting title
- Duration (30 / 45 / 60 / 90 / 120 minutes)
- Number of attendees
- Meeting type (Sprint Review / Brainstorm / Status Update / 1:1 / Planning / All-Hands)
- Topics list (add multiple, each with brief note)

## Claude API Returns
```json
{
  "agenda": [
    { "item": "Welcome & Objectives", "duration": 5, "owner": "Facilitator", "notes": "..." },
    ...
  ],
  "parkingLot": "...",
  "actionItemTemplate": "..."
}
```

## Display
Formatted agenda table + copy as markdown button.

## Skills to Load
```
/frontend-design  /claude-api
```
