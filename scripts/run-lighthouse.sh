#!/bin/bash
set -e

URLS=(
  "https://www.utilspot.app/"
  "https://www.utilspot.app/emi-calculator"
  "https://www.utilspot.app/income-tax-calculator"
  "https://www.utilspot.app/sip-calculator"
  "https://www.utilspot.app/salary-calculator"
  "https://www.utilspot.app/construction-cost-calculator"
  "https://www.utilspot.app/equity-calculator"
  "https://www.utilspot.app/invoice-generator"
  "https://www.utilspot.app/tdee-calculator"
  "https://www.utilspot.app/nutrition-label-calculator"
  "https://www.utilspot.app/word-counter"
  "https://www.utilspot.app/qr-code-generator"
  "https://www.utilspot.app/seo-analyzer"
  "https://www.utilspot.app/accessibility-checker"
  "https://www.utilspot.app/cron-builder"
  "https://www.utilspot.app/freelance-rate-calculator"
  "https://www.utilspot.app/password-generator"
  "https://www.utilspot.app/new-labour-code-calculator"
  "https://www.utilspot.app/gratuity-calculator"
  "https://www.utilspot.app/pf-calculator"
  "https://www.utilspot.app/full-final-settlement-calculator"
)

OUT="/tmp/lighthouse-results.json"
echo "[]" > "$OUT"

for URL in "${URLS[@]}"; do
  echo "Auditing $URL ..."
  RESULT=$(npx --yes lighthouse "$URL" \
    --output=json \
    --output-path=stdout \
    --only-categories=performance \
    --emulated-form-factor=mobile \
    --throttling-method=simulate \
    --quiet \
    --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
    2>/dev/null | node -e "
      const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
      const a=d.audits;
      const r={
        url: d.finalUrl,
        perf: Math.round(d.categories.performance.score*100),
        lcp: Math.round(a['largest-contentful-paint'].numericValue),
        tbt: Math.round(a['total-blocking-time'].numericValue),
        cls: parseFloat(a['cumulative-layout-shift'].numericValue.toFixed(3))
      };
      console.log(JSON.stringify(r));
    " 2>/dev/null)
  if [ -n "$RESULT" ]; then
    node -e "
      const arr = JSON.parse(require('fs').readFileSync('$OUT','utf8'));
      arr.push($RESULT);
      require('fs').writeFileSync('$OUT', JSON.stringify(arr,null,2));
    "
    echo "  done: $RESULT"
  else
    echo "  FAILED: $URL"
  fi
done

echo ""
echo "=== LIGHTHOUSE RESULTS ==="
node -e "
  const data = JSON.parse(require('fs').readFileSync('$OUT','utf8'));
  const pad = (s,n) => String(s).padEnd(n);
  const rpad = (s,n) => String(s).padStart(n);
  console.log(pad('URL',55) + rpad('PERF',6) + rpad('LCP(ms)',10) + rpad('TBT(ms)',9) + rpad('CLS',7));
  console.log('-'.repeat(87));
  data.forEach(r => {
    const perfFlag = r.perf < 90 ? ' !' : '';
    const lcpFlag  = r.lcp > 2500 ? ' !' : '';
    const tbtFlag  = r.tbt > 200  ? ' !' : '';
    const clsFlag  = r.cls > 0.1  ? ' !' : '';
    console.log(pad(r.url,55) + rpad(r.perf+perfFlag,6) + rpad(r.lcp+lcpFlag,10) + rpad(r.tbt+tbtFlag,9) + rpad(r.cls+clsFlag,7));
  });
  console.log('');
  console.log('! = needs attention');
" 2>/dev/null
