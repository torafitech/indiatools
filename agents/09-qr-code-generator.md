# Agent: QR Code Generator

## Context

**Tool:** QR Code Generator  
**Route:** `/qr-code-generator`  
**Category:** Developer  
**Purpose:** Generate QR codes for URLs, plain text, phone numbers, WhatsApp links, email, and WiFi credentials. Download as PNG.

## Key Files

```
app/qr-code-generator/page.tsx           ← SEO page (server component)
components/tools/QRCodeGenerator.tsx     ← Main UI (client)
```

## Dependencies

Uses a lightweight QR generation library (check `package.json` for which one: likely `qrcode` or `react-qr-code`).

## Current State (as of 2026-06-04)

- QR generation for: URL, Text, Phone, WhatsApp, Email, WiFi ✓
- Download as PNG ✓
- QR size selection ✓
- FAQ section ✓

## QR Input Types

```
URL:       https://example.com
Text:      Any plain text
Phone:     tel:+919876543210
WhatsApp:  https://wa.me/919876543210?text=Hello
Email:     mailto:user@example.com?subject=Hi
WiFi:      WIFI:T:WPA;S:NetworkName;P:Password;;
```

## Skills to Load

```
/frontend-design    ← improve QR preview + download UI
/code-review        ← verify WiFi QR format, WhatsApp URL encoding
/run                ← verify QR actually scans correctly
```

## Known Issues

- WiFi QR: special characters in SSID/password may break the format
- No color customization for QR (foreground/background)
- No QR with embedded logo
- PNG download quality may be low at small canvas size

## Next Improvements

- [ ] Add color picker for QR (foreground color)
- [ ] Add background color option
- [ ] Add logo embed in center of QR
- [ ] Add SVG download option (scalable)
- [ ] Add batch QR generation (multiple URLs at once)
- [ ] Add UPI payment QR generator (vpa, name, amount)
- [ ] Scan history saved in localStorage (last 5 generated)

## Agent Prompt (copy this)

```
I'm working on the IndiaTools project at /Users/rafi/Projects/indiatools.
This is a Next.js 14 + Tailwind site with tools for Indian users.

Tool focus: QR Code Generator
Key files:
- app/qr-code-generator/page.tsx (SEO page)
- components/tools/QRCodeGenerator.tsx (UI)

Design system: Plus Jakarta Sans font, #FFFCF8 bg, #E8500A saffron accent, #0F2447 navy.

First: read CLAUDE.md and agents/09-qr-code-generator.md for context.
Then: [describe your specific task here]
```
