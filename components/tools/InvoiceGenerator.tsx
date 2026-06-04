"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  calculateInvoice,
  generateInvoicePDF,
  type GSTRate,
  type LineItem,
  type InvoiceData,
} from "@/lib/calculations/invoice";
import { formatINR } from "@/lib/utils/format";

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const GST_RATES: GSTRate[] = [0, 5, 12, 18, 28];

const EMPTY_ITEM: LineItem = {
  description: "",
  hsn: "",
  qty: 1,
  rate: 0,
  gstRate: 18,
};

function getFinancialYear(): string {
  const now = new Date();
  const yr = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  return `${yr}-${String(yr + 1).slice(-2)}`;
}

function getNextInvoiceNumber(): string {
  if (typeof window === "undefined") return "INV-001";
  const key = `invoice_seq_${getFinancialYear()}`;
  const n = parseInt(localStorage.getItem(key) || "0", 10) + 1;
  localStorage.setItem(key, String(n));
  return `INV-${getFinancialYear()}-${String(n).padStart(3, "0")}`;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function dueIn30(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionCard({
  title,
  children,
  accentColor = "border-[#E8500A]",
}: {
  title: string;
  children: React.ReactNode;
  accentColor?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl border border-[#F0E4D4] overflow-hidden`}>
      <div className={`flex items-center gap-3 px-5 pt-5 pb-4 border-b border-[#F0E4D4]`}>
        <div className={`w-1 h-5 rounded-full ${accentColor} bg-current`} />
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#7A6048]">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#7A6048] mb-1.5">
        {label}{required && <span className="text-[#E8500A] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447] placeholder:text-[#C4A882] transition-colors"
      />
    </div>
  );
}

function TextAreaField({
  label, value, onChange, rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#7A6048] mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447] placeholder:text-[#C4A882] transition-colors resize-none"
      />
    </div>
  );
}

// ─── Invoice Preview Panel ────────────────────────────────────────────────────

function InvoicePreview({
  sellerName, sellerGSTIN, sellerAddress, sellerEmail, sellerPhone,
  buyerName, buyerGSTIN, buyerAddress,
  invoiceNumber, invoiceDate, dueDate, placeOfSupply, isInterState,
  items, bankName, accountNumber, ifsc, notes, calc,
}: InvoiceData & { calc: ReturnType<typeof calculateInvoice> }) {
  return (
    <div className="bg-white rounded-2xl border border-[#F0E4D4] overflow-hidden">
      {/* Invoice header bar */}
      <div className="bg-[#0F2447] px-6 py-5 flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A9CC6] mb-1">Tax Invoice</p>
          <p className="text-xl font-bold text-white">{invoiceNumber || "INV-XXXX"}</p>
        </div>
        <div className="text-right">
          <div className="w-10 h-10 rounded-xl bg-[#E8500A] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Dates */}
        <div className="flex gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6048] mb-0.5">Date</p>
            <p className="text-sm font-semibold text-[#0F2447]">{invoiceDate || "—"}</p>
          </div>
          {dueDate && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6048] mb-0.5">Due Date</p>
              <p className="text-sm font-semibold text-[#0F2447]">{dueDate}</p>
            </div>
          )}
          {placeOfSupply && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6048] mb-0.5">Supply</p>
              <p className="text-sm font-semibold text-[#0F2447]">{placeOfSupply}</p>
            </div>
          )}
        </div>

        {/* From / To */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#FFFCF8] rounded-xl border border-[#F0E4D4] p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6048] mb-1.5">From</p>
            <p className="text-sm font-bold text-[#0F2447]">{sellerName || <span className="text-[#C4A882]">Your Name</span>}</p>
            {sellerGSTIN && <p className="text-xs text-[#7A6048] mt-0.5">GSTIN: {sellerGSTIN}</p>}
            {sellerAddress && <p className="text-xs text-[#7A6048] mt-0.5 whitespace-pre-line">{sellerAddress}</p>}
          </div>
          <div className="bg-[#FFFCF8] rounded-xl border border-[#F0E4D4] p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6048] mb-1.5">Bill To</p>
            <p className="text-sm font-bold text-[#0F2447]">{buyerName || <span className="text-[#C4A882]">Client Name</span>}</p>
            {buyerGSTIN && <p className="text-xs text-[#7A6048] mt-0.5">GSTIN: {buyerGSTIN}</p>}
            {buyerAddress && <p className="text-xs text-[#7A6048] mt-0.5 whitespace-pre-line">{buyerAddress}</p>}
          </div>
        </div>

        {/* Items table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#FFFCF8] border border-[#F0E4D4] rounded-xl">
                <th className="text-left px-3 py-2 font-bold uppercase tracking-wider text-[#7A6048] rounded-l-xl">Item</th>
                <th className="text-right px-3 py-2 font-bold uppercase tracking-wider text-[#7A6048]">Qty</th>
                <th className="text-right px-3 py-2 font-bold uppercase tracking-wider text-[#7A6048]">Rate</th>
                <th className="text-right px-3 py-2 font-bold uppercase tracking-wider text-[#7A6048] rounded-r-xl">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b border-[#F0E4D4]">
                  <td className="px-3 py-2.5">
                    <p className="font-medium text-[#0F2447]">{item.description || <span className="text-[#C4A882]">—</span>}</p>
                    {item.hsn && <p className="text-[#7A6048] mt-0.5">HSN: {item.hsn}</p>}
                  </td>
                  <td className="px-3 py-2.5 text-right text-[#0F2447] tabular-nums">{item.qty}</td>
                  <td className="px-3 py-2.5 text-right text-[#0F2447] tabular-nums">
                    {item.rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-3 py-2.5 text-right font-semibold text-[#0F2447] tabular-nums">
                    {(item.qty * item.rate).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-[#7A6048]">
            <span>Subtotal</span>
            <span className="tabular-nums font-medium text-[#0F2447]">{formatINR(calc.subtotal)}</span>
          </div>
          {!isInterState ? (
            <>
              <div className="flex justify-between text-xs text-[#7A6048]">
                <span>CGST</span>
                <span className="tabular-nums">{formatINR(calc.totalCGST)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#7A6048]">
                <span>SGST</span>
                <span className="tabular-nums">{formatINR(calc.totalSGST)}</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between text-xs text-[#7A6048]">
              <span>IGST</span>
              <span className="tabular-nums">{formatINR(calc.totalIGST)}</span>
            </div>
          )}
          <div className="flex justify-between items-center bg-[#0F2447] rounded-xl px-4 py-3">
            <span className="text-sm font-bold text-white">Grand Total</span>
            <span className="text-xl font-bold text-white tabular-nums">{formatINR(calc.grandTotal)}</span>
          </div>
        </div>

        {/* Bank details */}
        {(bankName || accountNumber || ifsc) && (
          <div className="bg-[#FFFCF8] rounded-xl border border-[#F0E4D4] p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6048] mb-2">Payment Details</p>
            <div className="space-y-0.5 text-xs text-[#0F2447]">
              {bankName && <p><span className="text-[#7A6048]">Bank:</span> {bankName}</p>}
              {accountNumber && <p><span className="text-[#7A6048]">Account:</span> {accountNumber}</p>}
              {ifsc && <p><span className="text-[#7A6048]">IFSC:</span> {ifsc}</p>}
            </div>
          </div>
        )}

        {notes && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6048] mb-1">Notes</p>
            <p className="text-xs text-[#7A6048] whitespace-pre-line">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function InvoiceGenerator() {
  const [sellerName, setSellerName] = useState("");
  const [sellerGSTIN, setSellerGSTIN] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");

  const [buyerName, setBuyerName] = useState("");
  const [buyerGSTIN, setBuyerGSTIN] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");

  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [dueDate, setDueDate] = useState(dueIn30);
  const [placeOfSupply, setPlaceOfSupply] = useState("");
  const [isInterState, setIsInterState] = useState(false);

  const [items, setItems] = useState<LineItem[]>([{ ...EMPTY_ITEM }]);

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setInvoiceNumber(getNextInvoiceNumber());
  }, []);

  const [downloading, setDownloading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const invoiceData: InvoiceData = {
    sellerName, sellerGSTIN, sellerAddress, sellerEmail, sellerPhone,
    buyerName, buyerGSTIN, buyerAddress,
    invoiceNumber, invoiceDate, dueDate, placeOfSupply, isInterState,
    items,
    bankName, accountNumber, ifsc, notes,
  };

  const calc = useMemo(
    () => calculateInvoice(invoiceData),
    // invoiceData is rebuilt on every render; items is the real dependency that changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, isInterState],
  );

  function updateItem(idx: number, field: keyof LineItem, value: string | number) {
    setItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value } as LineItem;
      return next;
    });
  }

  function addItem() {
    setItems((prev) => [...prev, { ...EMPTY_ITEM }]);
  }

  function removeItem(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  function validate(): string[] {
    const errs: string[] = [];
    if (!sellerName.trim()) errs.push("Seller name is required.");
    if (!buyerName.trim()) errs.push("Buyer name is required.");
    if (!invoiceNumber.trim()) errs.push("Invoice number is required.");
    if (!invoiceDate) errs.push("Invoice date is required.");
    if (!placeOfSupply) errs.push("Place of supply is required.");
    if (items.length === 0) errs.push("At least one line item is required.");
    items.forEach((item, i) => {
      if (!item.description.trim()) errs.push(`Item ${i + 1}: description missing.`);
      if (item.rate <= 0) errs.push(`Item ${i + 1}: rate must be > 0.`);
      if (item.qty <= 0) errs.push(`Item ${i + 1}: qty must be > 0.`);
    });
    return errs;
  }

  const handleDownload = useCallback(async () => {
    const errs = validate();
    setErrors(errs);
    if (errs.length > 0) return;

    setDownloading(true);
    try {
      generateInvoicePDF(invoiceData, calc);
    } catch (e) {
      console.error(e);
      setErrors(["PDF generation failed. Please try again."]);
    } finally {
      setDownloading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceData, calc]);

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start space-y-6 lg:space-y-0">

      {/* ── LEFT: Form ─────────────────────────────────────────────────────── */}
      <div className="space-y-5">

        {/* Seller */}
        <SectionCard title="Seller / Your Details" accentColor="bg-[#0F2447]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Business / Name" value={sellerName} onChange={setSellerName} placeholder="Acme Pvt Ltd" required />
            <Field label="GSTIN" value={sellerGSTIN} onChange={setSellerGSTIN} placeholder="22AAAAA0000A1Z5" />
            <div className="sm:col-span-2">
              <TextAreaField label="Address" value={sellerAddress} onChange={setSellerAddress} rows={2} />
            </div>
            <Field label="Email" value={sellerEmail} onChange={setSellerEmail} placeholder="you@company.com" type="email" />
            <Field label="Phone" value={sellerPhone} onChange={setSellerPhone} placeholder="+91 98765 43210" />
          </div>
        </SectionCard>

        {/* Buyer */}
        <SectionCard title="Buyer / Client Details" accentColor="bg-blue-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Client Name" value={buyerName} onChange={setBuyerName} placeholder="Client Pvt Ltd" required />
            <Field label="GSTIN (optional)" value={buyerGSTIN} onChange={setBuyerGSTIN} placeholder="22AAAAA0000A1Z5" />
            <div className="sm:col-span-2">
              <TextAreaField label="Address" value={buyerAddress} onChange={setBuyerAddress} rows={2} />
            </div>
          </div>
        </SectionCard>

        {/* Invoice Details */}
        <SectionCard title="Invoice Details" accentColor="bg-amber-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="Invoice Number" value={invoiceNumber} onChange={setInvoiceNumber} placeholder="INV-2025-001" required />
            <Field label="Invoice Date" value={invoiceDate} onChange={setInvoiceDate} type="date" required />
            <Field label="Due Date" value={dueDate} onChange={setDueDate} type="date" />
            <div className="sm:col-span-2 lg:col-span-2">
              <label className="block text-xs font-medium text-[#7A6048] mb-1.5">
                Place of Supply<span className="text-[#E8500A] ml-0.5">*</span>
              </label>
              <select
                value={placeOfSupply}
                onChange={(e) => setPlaceOfSupply(e.target.value)}
                className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447] transition-colors"
              >
                <option value="">Select state…</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#7A6048] mb-1.5">Supply Type</label>
              <div className="flex gap-2 mt-1">
                {[
                  { label: "Intra-State", value: false, sub: "CGST + SGST" },
                  { label: "Inter-State", value: true, sub: "IGST" },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setIsInterState(opt.value)}
                    className={`flex-1 text-left px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                      isInterState === opt.value
                        ? "bg-[#FFF5F0] border-[#E8500A] text-[#E8500A]"
                        : "border-[#F0E4D4] text-[#7A6048] hover:border-[#E8500A]/40 hover:text-[#E8500A]"
                    }`}
                  >
                    <div className="font-semibold">{opt.label}</div>
                    <div className="opacity-60 font-normal">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Line Items */}
        <SectionCard title="Line Items" accentColor="bg-amber-400">
          <div className="overflow-x-auto -mx-1">
            <table className="w-full min-w-[580px] text-sm">
              <thead>
                <tr className="border-b border-[#F0E4D4]">
                  <th className="pb-2.5 text-left pl-1 text-xs font-bold uppercase tracking-widest text-[#7A6048] w-[34%]">Description</th>
                  <th className="pb-2.5 text-left text-xs font-bold uppercase tracking-widest text-[#7A6048] w-[12%]">HSN/SAC</th>
                  <th className="pb-2.5 text-right text-xs font-bold uppercase tracking-widest text-[#7A6048] w-[8%]">Qty</th>
                  <th className="pb-2.5 text-right text-xs font-bold uppercase tracking-widest text-[#7A6048] w-[14%]">Rate (₹)</th>
                  <th className="pb-2.5 text-right text-xs font-bold uppercase tracking-widest text-[#7A6048] w-[11%]">GST%</th>
                  <th className="pb-2.5 text-right text-xs font-bold uppercase tracking-widest text-[#7A6048] w-[14%]">Amount (₹)</th>
                  <th className="pb-2.5 w-[7%]" />
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E4D4]">
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 pr-2 pl-1">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(idx, "description", e.target.value)}
                        placeholder="Service / product"
                        className="w-full text-sm border border-[#F0E4D4] rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white placeholder:text-[#C4A882] transition-colors"
                      />
                    </td>
                    <td className="py-2.5 pr-2">
                      <input
                        type="text"
                        value={item.hsn}
                        onChange={(e) => updateItem(idx, "hsn", e.target.value)}
                        placeholder="9983"
                        className="w-full text-sm border border-[#F0E4D4] rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white placeholder:text-[#C4A882] transition-colors"
                      />
                    </td>
                    <td className="py-2.5 pr-2">
                      <input
                        type="number"
                        min={1}
                        value={item.qty}
                        onChange={(e) => updateItem(idx, "qty", parseFloat(e.target.value) || 1)}
                        className="w-full text-sm border border-[#F0E4D4] rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-right transition-colors"
                      />
                    </td>
                    <td className="py-2.5 pr-2">
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        value={item.rate || ""}
                        onChange={(e) => updateItem(idx, "rate", parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        className="w-full text-sm border border-[#F0E4D4] rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-right placeholder:text-[#C4A882] transition-colors"
                      />
                    </td>
                    <td className="py-2.5 pr-2">
                      <select
                        value={item.gstRate}
                        onChange={(e) => updateItem(idx, "gstRate", parseInt(e.target.value) as GSTRate)}
                        className="w-full text-sm border border-[#F0E4D4] rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white transition-colors"
                      >
                        {GST_RATES.map((r) => (
                          <option key={r} value={r}>{r}%</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2.5 pr-2 text-right font-semibold text-[#0F2447] text-xs tabular-nums">
                      {(item.qty * item.rate).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5">
                      <button
                        onClick={() => removeItem(idx)}
                        disabled={items.length === 1}
                        className="p-1.5 text-[#C4A882] hover:text-[#E8500A] disabled:opacity-30 transition-colors rounded-lg"
                        title="Remove row"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addItem}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#E8500A] hover:text-[#D44A09] transition-colors"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#E8500A] text-white">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            Add Line Item
          </button>
        </SectionCard>

        {/* Bank Details */}
        <SectionCard title="Bank Details (for payment)" accentColor="bg-emerald-500">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Bank Name" value={bankName} onChange={setBankName} placeholder="HDFC Bank" />
            <Field label="Account Number" value={accountNumber} onChange={setAccountNumber} placeholder="XXXX XXXX XXXX" />
            <Field label="IFSC Code" value={ifsc} onChange={setIfsc} placeholder="HDFC0001234" />
          </div>
        </SectionCard>

        {/* Notes */}
        <SectionCard title="Notes (optional)" accentColor="bg-[#7A6048]">
          <TextAreaField
            label="Terms, thank-you note, or any instructions"
            value={notes}
            onChange={setNotes}
            rows={3}
          />
        </SectionCard>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">Fix before downloading:</p>
            <ul className="list-disc list-inside space-y-0.5">
              {errors.map((e) => (
                <li key={e} className="text-xs text-red-600">{e}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Download button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-3.5 bg-[#E8500A] hover:bg-[#D44A09] text-white font-bold rounded-2xl transition-colors disabled:opacity-70 flex items-center justify-center gap-2.5 text-sm shadow-lg shadow-[#E8500A]/20"
        >
          {downloading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating PDF…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF Invoice
            </>
          )}
        </button>
      </div>

      {/* ── RIGHT: Invoice Preview (sticky on desktop) ──────────────────────── */}
      <div className="lg:sticky lg:top-6">
        <p className="text-xs font-bold uppercase tracking-widest text-[#7A6048] mb-3">Live Preview</p>
        <InvoicePreview
          sellerName={sellerName}
          sellerGSTIN={sellerGSTIN}
          sellerAddress={sellerAddress}
          sellerEmail={sellerEmail}
          sellerPhone={sellerPhone}
          buyerName={buyerName}
          buyerGSTIN={buyerGSTIN}
          buyerAddress={buyerAddress}
          invoiceNumber={invoiceNumber}
          invoiceDate={invoiceDate}
          dueDate={dueDate}
          placeOfSupply={placeOfSupply}
          isInterState={isInterState}
          items={items}
          bankName={bankName}
          accountNumber={accountNumber}
          ifsc={ifsc}
          notes={notes}
          calc={calc}
        />
      </div>

    </div>
  );
}
