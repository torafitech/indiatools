# Agent: GST Invoice Generator

## Context

**Tool:** GST Invoice Generator  
**Route:** `/invoice-generator`  
**Category:** Business  
**Purpose:** Create professional GST-compliant invoices. Download as PDF. No server, no saving — all client-side.

## Key Files

```
app/invoice-generator/page.tsx           ← SEO page (server component)
components/tools/InvoiceGenerator.tsx    ← Main UI (client) — form + preview
```

## Current State (as of 2026-06-04)

- Invoice form: seller details, buyer details, line items ✓
- GST breakdown (CGST/SGST for same-state, IGST for inter-state) ✓
- PDF download via jsPDF ✓
- FAQ section ✓

## PDF Generation

Uses `jsPDF` (already installed). The PDF is generated entirely client-side.

```ts
import jsPDF from "jspdf";
const doc = new jsPDF();
doc.text("Invoice", 20, 20);
doc.save("invoice.pdf");
```

## GST Rules

- Same state: CGST = 9% + SGST = 9% (for 18% GST rate)
- Different state: IGST = 18%
- GSTIN format: 15 characters (2-digit state + 10-digit PAN + 1 + Z + checksum)
- Invoice must show: Invoice No., Date, Seller GSTIN, Buyer GSTIN (if registered), HSN/SAC code

## Skills to Load

```
/frontend-design    ← improve invoice template design + PDF layout
/code-review        ← verify GST calculations, GSTIN validation
/run                ← verify PDF download works in browser
```

## Known Issues

- PDF layout is basic — needs better formatting (logo, colored header, table borders)
- No invoice number auto-increment (user types manually)
- No HSN/SAC code lookup
- No template selection (professional / simple / modern)

## Next Improvements

- [ ] Multiple invoice templates (Modern, Classic, Minimal)
- [ ] Logo upload (render in PDF header)
- [ ] Auto-increment invoice number (persisted in localStorage)
- [ ] HSN code lookup for common services
- [ ] Print-to-PDF option (browser print dialog) as fallback
- [ ] QR code in PDF linking to payment UPI ID
- [ ] Affiliate link: Zoho Books / ClearTax / Vyapar for registered users

## Agent Prompt (copy this)

```
I'm working on the IndiaTools project at /Users/rafi/Projects/indiatools.
This is a Next.js 14 + Tailwind site with tools for Indian users.

Tool focus: GST Invoice Generator
Key files:
- app/invoice-generator/page.tsx (SEO page)
- components/tools/InvoiceGenerator.tsx (UI + PDF generation)

Design system: Plus Jakarta Sans font, #FFFCF8 bg, #E8500A saffron accent, #0F2447 navy.
PDF lib: jsPDF (already installed).

First: read CLAUDE.md and agents/05-invoice-generator.md for context.
Then: [describe your specific task here]
```
