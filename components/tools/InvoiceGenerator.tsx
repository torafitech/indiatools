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

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">{title}</h3>
      {children}
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
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-colors"
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
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-colors resize-none"
      />
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
    <div className="space-y-5">
      {/* ── Seller ─────────────────────────────────────────────────────────── */}
      <SectionCard title="Seller / Your Details">
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

      {/* ── Buyer ──────────────────────────────────────────────────────────── */}
      <SectionCard title="Buyer / Client Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Client Name" value={buyerName} onChange={setBuyerName} placeholder="Client Pvt Ltd" required />
          <Field label="GSTIN (optional)" value={buyerGSTIN} onChange={setBuyerGSTIN} placeholder="22AAAAA0000A1Z5" />
          <div className="sm:col-span-2">
            <TextAreaField label="Address" value={buyerAddress} onChange={setBuyerAddress} rows={2} />
          </div>
        </div>
      </SectionCard>

      {/* ── Invoice details ────────────────────────────────────────────────── */}
      <SectionCard title="Invoice Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Invoice Number" value={invoiceNumber} onChange={setInvoiceNumber} placeholder="INV-2025-001" required />
          <Field label="Invoice Date" value={invoiceDate} onChange={setInvoiceDate} type="date" required />
          <Field label="Due Date" value={dueDate} onChange={setDueDate} type="date" />
          <div className="sm:col-span-2 lg:col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Place of Supply<span className="text-red-400 ml-0.5">*</span>
            </label>
            <select
              value={placeOfSupply}
              onChange={(e) => setPlaceOfSupply(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-colors bg-white"
            >
              <option value="">Select state…</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Supply Type</label>
            <div className="flex gap-2 mt-1">
              {[
                { label: "Intra-State", value: false, sub: "CGST + SGST" },
                { label: "Inter-State", value: true, sub: "IGST" },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setIsInterState(opt.value)}
                  className={`flex-1 text-left px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                    isInterState === opt.value
                      ? "bg-blue-50 border-blue-400 text-blue-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <div className="font-semibold">{opt.label}</div>
                  <div className="text-gray-400 font-normal">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ── Line Items ─────────────────────────────────────────────────────── */}
      <SectionCard title="Line Items">
        <div className="overflow-x-auto -mx-1">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-xs text-gray-400 font-medium border-b border-gray-100">
                <th className="pb-2 text-left pl-1 w-[35%]">Description</th>
                <th className="pb-2 text-left w-[12%]">HSN/SAC</th>
                <th className="pb-2 text-right w-[8%]">Qty</th>
                <th className="pb-2 text-right w-[14%]">Rate (₹)</th>
                <th className="pb-2 text-right w-[11%]">GST%</th>
                <th className="pb-2 text-right w-[14%]">Amount (₹)</th>
                <th className="pb-2 w-[6%]" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2 pr-2 pl-1">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(idx, "description", e.target.value)}
                      placeholder="Service / product name"
                      className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="text"
                      value={item.hsn}
                      onChange={(e) => updateItem(idx, "hsn", e.target.value)}
                      placeholder="9983"
                      className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={(e) => updateItem(idx, "qty", parseFloat(e.target.value) || 1)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 transition-colors text-right"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      min={0}
                      step="0.01"
                      value={item.rate || ""}
                      onChange={(e) => updateItem(idx, "rate", parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 transition-colors text-right"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <select
                      value={item.gstRate}
                      onChange={(e) => updateItem(idx, "gstRate", parseInt(e.target.value) as GSTRate)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500 transition-colors bg-white"
                    >
                      {GST_RATES.map((r) => (
                        <option key={r} value={r}>{r}%</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-2 text-right font-medium text-gray-900 text-xs tabular-nums">
                    {(item.qty * item.rate).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => removeItem(idx)}
                      disabled={items.length === 1}
                      className="p-1.5 text-gray-300 hover:text-red-400 disabled:opacity-30 transition-colors rounded"
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
          className="mt-3 flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Line Item
        </button>
      </SectionCard>

      {/* ── Bank Details ───────────────────────────────────────────────────── */}
      <SectionCard title="Bank Details (for payment)">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Bank Name" value={bankName} onChange={setBankName} placeholder="HDFC Bank" />
          <Field label="Account Number" value={accountNumber} onChange={setAccountNumber} placeholder="XXXX XXXX XXXX" />
          <Field label="IFSC Code" value={ifsc} onChange={setIfsc} placeholder="HDFC0001234" />
        </div>
      </SectionCard>

      {/* ── Notes ──────────────────────────────────────────────────────────── */}
      <SectionCard title="Notes (optional)">
        <TextAreaField
          label="Terms, thank-you note, or any instructions"
          value={notes}
          onChange={setNotes}
          rows={3}
        />
      </SectionCard>

      {/* ── Live Preview ───────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white">
        <h3 className="text-sm font-semibold text-blue-200 mb-4">Invoice Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-blue-200">Subtotal</span>
            <span className="font-medium">{formatINR(calc.subtotal)}</span>
          </div>
          {!isInterState ? (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-blue-200">CGST</span>
                <span>{formatINR(calc.totalCGST)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-200">SGST</span>
                <span>{formatINR(calc.totalSGST)}</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between text-sm">
              <span className="text-blue-200">IGST</span>
              <span>{formatINR(calc.totalIGST)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-blue-200">Total GST</span>
            <span>{formatINR(calc.totalGST)}</span>
          </div>
          <div className="border-t border-blue-500/50 pt-2 flex justify-between">
            <span className="font-bold">Grand Total</span>
            <span className="text-2xl font-bold">{formatINR(calc.grandTotal)}</span>
          </div>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mt-4 bg-red-500/20 border border-red-400/30 rounded-lg p-3">
            <p className="text-xs font-semibold text-red-200 mb-1">Please fix before downloading:</p>
            <ul className="list-disc list-inside space-y-0.5">
              {errors.map((e) => (
                <li key={e} className="text-xs text-red-200">{e}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="mt-4 w-full py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 text-sm"
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
    </div>
  );
}
