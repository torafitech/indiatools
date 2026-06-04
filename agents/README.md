# IndiaTools — Agent Playbook

Each file in this folder is a **ready-to-paste agent prompt** for working on one specific tool.
Copy the prompt from the relevant file and paste it at the start of a new Claude Code session.

## Why per-tool agents?

- Each agent loads only the context it needs — no noise
- Consistent skill loading (frontend-design, etc.)
- Repeatable: hand to any agent, get predictable output
- Future-proof: update the agent file as the tool evolves

## Agent files

| File | Tool | Status |
|------|------|--------|
| `01-emi-calculator.md` | EMI Calculator | live |
| `02-income-tax-calculator.md` | Income Tax Calculator | live |
| `03-sip-calculator.md` | SIP Calculator | live |
| `04-salary-calculator.md` | Salary / CTC Calculator | live |
| `05-invoice-generator.md` | GST Invoice Generator | live |
| `06-construction-cost-calculator.md` | Construction Cost Estimator | live |
| `07-tdee-calculator.md` | TDEE Calculator | live |
| `08-word-counter.md` | Word Counter | live |
| `09-qr-code-generator.md` | QR Code Generator | live |
| `10-business-name-generator.md` | AI Business Name Generator | live |

## How to use an agent file

1. Open a new Claude Code session in `/Users/rafi/Projects/indiatools`
2. Copy the **Agent Prompt** section from the relevant `.md` file
3. Paste as your first message
4. The agent will load skills, read files, and proceed

## Skill references

| Skill | Purpose |
|-------|---------|
| `frontend-design` | Distinctive, production-grade UI design |
| `code-review` | Audit calculation logic, catch edge cases |
| `run` | Launch dev server, verify tool works in browser |
| `verify` | Check a specific fix or feature works correctly |

## When to update agent files

- After adding a major feature to a tool → update "Current State"
- After changing the design system → update "Design Context"
- After adding programmatic SEO pages → update "SEO pages"
- After fixing a known bug → add to "Known Issues" with resolution
