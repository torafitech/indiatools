const KEY = 'utilspot2026indexnow';
const HOST = 'www.utilspot.app';

const urlList = [
  'https://www.utilspot.app',
  'https://www.utilspot.app/emi-calculator',
  'https://www.utilspot.app/income-tax-calculator',
  'https://www.utilspot.app/sip-calculator',
  'https://www.utilspot.app/salary-calculator',
  'https://www.utilspot.app/construction-cost-calculator',
  'https://www.utilspot.app/equity-calculator',
  'https://www.utilspot.app/invoice-generator',
  'https://www.utilspot.app/tdee-calculator',
  'https://www.utilspot.app/nutrition-label-calculator',
  'https://www.utilspot.app/word-counter',
  'https://www.utilspot.app/qr-code-generator',
  'https://www.utilspot.app/seo-analyzer',
  'https://www.utilspot.app/accessibility-checker',
  'https://www.utilspot.app/cron-builder',
  'https://www.utilspot.app/freelance-rate-calculator',
  'https://www.utilspot.app/password-generator',
  'https://www.utilspot.app/new-labour-code-calculator',
  'https://www.utilspot.app/gratuity-calculator',
  'https://www.utilspot.app/pf-calculator',
  'https://www.utilspot.app/full-final-settlement-calculator',
  'https://www.utilspot.app/about',
  'https://www.utilspot.app/contact',
];

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList,
};

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

console.log('IndexNow status:', res.status);
console.log('Response:', await res.text());
