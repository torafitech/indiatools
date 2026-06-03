import jsPDF from "jspdf";

export type GSTRate = 0 | 5 | 12 | 18 | 28;

export interface LineItem {
  description: string;
  hsn: string;
  qty: number;
  rate: number;
  gstRate: GSTRate;
}

export interface InvoiceData {
  sellerName: string;
  sellerGSTIN: string;
  sellerAddress: string;
  sellerEmail: string;
  sellerPhone: string;
  buyerName: string;
  buyerGSTIN: string;
  buyerAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  placeOfSupply: string;
  isInterState: boolean;
  items: LineItem[];
  bankName: string;
  accountNumber: string;
  ifsc: string;
  notes: string;
}

export interface ItemWithTax extends LineItem {
  amount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  lineTotal: number;
}

export interface InvoiceCalculation {
  subtotal: number;
  totalCGST: number;
  totalSGST: number;
  totalIGST: number;
  totalGST: number;
  grandTotal: number;
  itemsWithTax: ItemWithTax[];
}

/**
 * Calculate GST invoice totals.
 * For intra-state: split GST equally into CGST + SGST.
 * For inter-state: full GST as IGST.
 */
export function calculateInvoice(data: InvoiceData): InvoiceCalculation {
  let subtotal = 0;
  let totalCGST = 0;
  let totalSGST = 0;
  let totalIGST = 0;

  const itemsWithTax: ItemWithTax[] = data.items.map((item) => {
    const amount = item.qty * item.rate;
    const gstAmount = (amount * item.gstRate) / 100;
    const cgst = data.isInterState ? 0 : gstAmount / 2;
    const sgst = data.isInterState ? 0 : gstAmount / 2;
    const igst = data.isInterState ? gstAmount : 0;
    const totalTax = cgst + sgst + igst;
    const lineTotal = amount + totalTax;

    subtotal += amount;
    totalCGST += cgst;
    totalSGST += sgst;
    totalIGST += igst;

    return { ...item, amount, cgst, sgst, igst, totalTax, lineTotal };
  });

  const totalGST = totalCGST + totalSGST + totalIGST;
  const grandTotal = subtotal + totalGST;

  return { subtotal, totalCGST, totalSGST, totalIGST, totalGST, grandTotal, itemsWithTax };
}

function fmt(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

/**
 * Generate and download a GST-compliant invoice PDF using jsPDF.
 * Layout: seller top-left, invoice details top-right, items table middle,
 * tax summary bottom-right, bank details bottom-left.
 */
export function generateInvoicePDF(data: InvoiceData, calc: InvoiceCalculation): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const margin = 14;
  const col2 = 110;

  let y = margin;

  // ─── Header ───────────────────────────────────────────────────────────────
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, W, 14, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text("TAX INVOICE", W / 2, 9, { align: "center" });

  y = 20;
  doc.setTextColor(30, 30, 30);

  // ─── Seller info (left) ───────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(truncate(data.sellerName, 40), margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  y += 5;
  doc.text(`GSTIN: ${data.sellerGSTIN || "—"}`, margin, y);
  y += 4.5;

  const addrLines = doc.splitTextToSize(data.sellerAddress, 80);
  addrLines.slice(0, 3).forEach((line: string) => {
    doc.text(line, margin, y);
    y += 4.5;
  });
  if (data.sellerEmail) { doc.text(`Email: ${data.sellerEmail}`, margin, y); y += 4.5; }
  if (data.sellerPhone) { doc.text(`Phone: ${data.sellerPhone}`, margin, y); y += 4.5; }

  // ─── Invoice details (right) ──────────────────────────────────────────────
  let ry = 20;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("Invoice No:", col2, ry);
  doc.setFont("helvetica", "normal");
  doc.text(data.invoiceNumber, col2 + 28, ry);
  ry += 5;

  doc.setFont("helvetica", "bold");
  doc.text("Invoice Date:", col2, ry);
  doc.setFont("helvetica", "normal");
  doc.text(data.invoiceDate, col2 + 28, ry);
  ry += 5;

  if (data.dueDate) {
    doc.setFont("helvetica", "bold");
    doc.text("Due Date:", col2, ry);
    doc.setFont("helvetica", "normal");
    doc.text(data.dueDate, col2 + 28, ry);
    ry += 5;
  }

  doc.setFont("helvetica", "bold");
  doc.text("Place of Supply:", col2, ry);
  doc.setFont("helvetica", "normal");
  doc.text(truncate(data.placeOfSupply, 25), col2 + 38, ry);
  ry += 5;

  doc.setFont("helvetica", "bold");
  doc.text("Supply Type:", col2, ry);
  doc.setFont("helvetica", "normal");
  doc.text(data.isInterState ? "Inter-State (IGST)" : "Intra-State (CGST+SGST)", col2 + 30, ry);

  // ─── Divider ──────────────────────────────────────────────────────────────
  y = Math.max(y, ry) + 4;
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, y, W - margin, y);
  y += 5;

  // ─── Buyer info ───────────────────────────────────────────────────────────
  doc.setFillColor(245, 247, 250);
  doc.rect(margin, y - 2, W - margin * 2, 22, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("BILL TO", margin + 2, y + 2);

  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(truncate(data.buyerName, 50), margin + 2, y + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  if (data.buyerGSTIN) {
    doc.text(`GSTIN: ${data.buyerGSTIN}`, margin + 2, y + 12);
  }
  const buyerAddrLines = doc.splitTextToSize(data.buyerAddress, 150);
  buyerAddrLines.slice(0, 1).forEach((line: string) => {
    doc.text(line, data.buyerGSTIN ? col2 : margin + 2, y + 12);
  });

  y += 26;

  // ─── Items table ──────────────────────────────────────────────────────────
  const tableTop = y;
  const colWidths = data.isInterState
    ? [62, 18, 12, 20, 12, 20, 24] // desc, hsn, qty, rate, gst%, igst, total
    : [55, 18, 12, 20, 12, 16, 16, 24]; // desc, hsn, qty, rate, gst%, cgst, sgst, total

  const headers = data.isInterState
    ? ["Description", "HSN/SAC", "Qty", "Rate (₹)", "GST%", "IGST (₹)", "Total (₹)"]
    : ["Description", "HSN/SAC", "Qty", "Rate (₹)", "GST%", "CGST (₹)", "SGST (₹)", "Total (₹)"];

  // Header row
  doc.setFillColor(37, 99, 235);
  doc.rect(margin, y, W - margin * 2, 7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);

  let cx = margin;
  headers.forEach((h, i) => {
    const align = i > 1 ? "right" : "left";
    const tx = align === "right" ? cx + colWidths[i] - 1 : cx + 1;
    doc.text(h, tx, y + 4.8, { align });
    cx += colWidths[i];
  });
  y += 7;

  // Data rows
  doc.setTextColor(30, 30, 30);
  calc.itemsWithTax.forEach((item, idx) => {
    const rowH = 7;
    if (idx % 2 === 1) {
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, y, W - margin * 2, rowH, "F");
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);

    const cells = data.isInterState
      ? [
          truncate(item.description, 35),
          item.hsn,
          String(item.qty),
          fmt(item.rate),
          `${item.gstRate}%`,
          fmt(item.igst),
          fmt(item.lineTotal),
        ]
      : [
          truncate(item.description, 32),
          item.hsn,
          String(item.qty),
          fmt(item.rate),
          `${item.gstRate}%`,
          fmt(item.cgst),
          fmt(item.sgst),
          fmt(item.lineTotal),
        ];

    cx = margin;
    cells.forEach((cell, i) => {
      const align = i > 1 ? "right" : "left";
      const tx = align === "right" ? cx + colWidths[i] - 1 : cx + 1;
      doc.text(cell, tx, y + 4.8, { align });
      cx += colWidths[i];
    });

    y += rowH;
  });

  // Table border
  doc.setDrawColor(200, 200, 200);
  doc.rect(margin, tableTop, W - margin * 2, y - tableTop, "S");
  y += 5;

  // ─── Totals (right-aligned) ───────────────────────────────────────────────
  const totalsX = col2;
  const totalsW = W - margin - totalsX;

  function addTotalRow(label: string, value: string, bold = false) {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(bold ? 30 : 80, bold ? 30 : 80, bold ? 30 : 80);
    doc.text(label, totalsX, y);
    doc.text(value, totalsX + totalsW - 1, y, { align: "right" });
    y += 5;
  }

  addTotalRow("Subtotal:", `₹ ${fmt(calc.subtotal)}`);
  if (!data.isInterState) {
    addTotalRow(`CGST:`, `₹ ${fmt(calc.totalCGST)}`);
    addTotalRow(`SGST:`, `₹ ${fmt(calc.totalSGST)}`);
  } else {
    addTotalRow(`IGST:`, `₹ ${fmt(calc.totalIGST)}`);
  }
  doc.setDrawColor(37, 99, 235);
  doc.line(totalsX, y - 1, totalsX + totalsW, y - 1);
  y += 1;
  addTotalRow("Grand Total:", `₹ ${fmt(calc.grandTotal)}`, true);

  // ─── Bank details (left) ──────────────────────────────────────────────────
  const bankY = y - 20;
  if (data.bankName || data.accountNumber || data.ifsc) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("BANK DETAILS", margin, bankY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(30, 30, 30);
    let by = bankY + 5;
    if (data.bankName) { doc.text(`Bank: ${data.bankName}`, margin, by); by += 4.5; }
    if (data.accountNumber) { doc.text(`Account: ${data.accountNumber}`, margin, by); by += 4.5; }
    if (data.ifsc) { doc.text(`IFSC: ${data.ifsc}`, margin, by); }
  }

  y += 4;

  // ─── Notes ────────────────────────────────────────────────────────────────
  if (data.notes) {
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, W - margin, y);
    y += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("NOTES", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    y += 4.5;
    const noteLines = doc.splitTextToSize(data.notes, W - margin * 2);
    noteLines.slice(0, 3).forEach((line: string) => {
      doc.text(line, margin, y);
      y += 4.5;
    });
  }

  // ─── Footer ───────────────────────────────────────────────────────────────
  doc.setFillColor(245, 247, 250);
  doc.rect(0, 285, W, 12, "F");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text("Generated by IndiaTools.in — Free GST Invoice Generator", W / 2, 292, { align: "center" });

  const dateStr = data.invoiceDate.replace(/\//g, "-");
  doc.save(`Invoice-${data.invoiceNumber}-${dateStr}.pdf`);
}
