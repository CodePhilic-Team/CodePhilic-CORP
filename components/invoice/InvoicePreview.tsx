'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { InvoiceData } from '@/types/invoice';
import { numberToWords } from '@/utils/numberToWords';
import QrCodeSvg from './QrCodeSvg';
import PaidSeal from './PaidSeal';

interface InvoicePreviewProps {
  invoice: InvoiceData;
  setInvoice?: React.Dispatch<React.SetStateAction<InvoiceData>>;
}

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const { company, client, items, meta, payment } = invoice;

  // Calculate totals
  const subtotal = items.reduce(
    (acc, item) => acc + (Number(item.quantity) || 0) * (Number(item.rate) || 0),
    0
  );
  const discountAmount =
    meta.discountType === 'percentage'
      ? (subtotal * (Number(meta.discountValue) || 0)) / 100
      : Number(meta.discountValue) || 0;
  const taxableBase = Math.max(0, subtotal - discountAmount);
  const taxAmount = (taxableBase * (Number(meta.taxRate) || 0)) / 100;
  const shippingFee = Number(meta.shippingFee) || 0;
  const grandTotal = taxableBase + taxAmount + shippingFee;
  const amountPaid = Number(meta.amountPaid) || 0;
  const balanceDue = Math.max(0, grandTotal - amountPaid);

  const amountInWords = numberToWords(grandTotal, meta.currency);

  const formatCurrency = (amount: number) => {
    return `${meta.currencySymbol}${Number(amount || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusBadge = () => {
    switch (meta.status) {
      case 'PAID':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'OVERDUE':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'PARTIALLY_PAID':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-slate-100/70">
      {/* Subtle Zoom Control Bar */}
      <div className="no-print flex items-center justify-between px-6 py-2 bg-white border-b border-slate-200 text-xs text-slate-500">
        <span className="font-medium text-slate-600">Print Preview (A4)</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
            className="p-1 rounded hover:bg-slate-100 text-slate-600 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] w-9 text-center text-slate-700">
            {zoomLevel}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(120, z + 10))}
            className="p-1 rounded hover:bg-slate-100 text-slate-600 transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(100)}
            className="p-1 rounded hover:bg-slate-100 text-slate-600 transition-colors ml-1"
            title="Reset zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Preview Scrollable Canvas */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start print:!overflow-visible print:!p-0 print:!block">
        <div
          id="invoice-printable-wrapper"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.1s ease-out',
          }}
          className="w-full max-w-[820px] transition-all print:!max-w-none print:!w-full print:!m-0 print:!p-0"
        >
          {/* Authentic, Realistic A4 Invoice Document */}
          <div
            id="invoice-printable-document"
            style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
            className="w-full bg-white rounded-lg border border-slate-200 shadow-sm p-8 sm:p-12 text-slate-800 text-xs font-sans leading-normal print:!border-none print:!shadow-none print:!p-6 print:!rounded-none"
          >
            {/* Header: Brand & Document Meta */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-200">
              {/* Left: CodePhilic Company Header */}
              <div className="space-y-3 max-w-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-md border border-slate-200 p-0.5 flex items-center justify-center">
                    <Image
                      src={company.logoUrl || '/cpLOGO.png'}
                      alt={company.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-base tracking-tight leading-tight">
                      {company.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-normal">
                      {company.tagline || 'We Architect Imagination'}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 space-y-0.5 leading-relaxed">
                  <div className="font-medium text-slate-700">{company.legalName}</div>
                  <div>{company.address}</div>
                  <div>{company.cityCountry}</div>
                  <div className="text-slate-500 pt-0.5">
                    {company.email} • {company.phone}
                  </div>
                  <div className="text-slate-400 text-[10px] font-mono">
                    {company.regNo} {company.vatNo ? `• ${company.vatNo}` : ''}
                  </div>
                </div>
              </div>

              {/* Right: Invoice Label, Number, and Status */}
              <div className="flex flex-col sm:items-end text-left sm:text-right relative">
                <div className="flex items-start sm:justify-end gap-3 mb-1">
                  <div className="flex flex-col sm:items-end">
                    <div className="flex items-center sm:justify-end gap-2.5 mb-1">
                      <span className="text-2xl font-bold tracking-tight text-slate-900">
                        INVOICE
                      </span>
                      {meta.status !== 'PAID' && (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${getStatusBadge()}`}
                        >
                          {meta.status.replace('_', ' ')}
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-sm font-semibold text-slate-900">
                      {meta.invoiceNumber}
                    </div>
                  </div>

                  {meta.status === 'PAID' && (
                    <div className="-rotate-12 transition-transform hover:rotate-0 my-[-6px] sm:ml-2">
                      <PaidSeal
                        status="PAID"
                        companyName={company.name || 'CODEPHILIC'}
                        date={meta.issueDate}
                        variant={meta.paidSealStyle || 'circular'}
                        color={meta.paidSealColor || 'emerald'}
                        size="md"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-3 space-y-1 text-xs">
                  <div className="flex justify-between sm:justify-end gap-4">
                    <span className="text-slate-500">Invoice Date:</span>
                    <span className="font-medium text-slate-800">{meta.issueDate}</span>
                  </div>
                  <div className="flex justify-between sm:justify-end gap-4">
                    <span className="text-slate-500">Payment Due:</span>
                    <span className="font-medium text-slate-800">{meta.dueDate}</span>
                  </div>
                  <div className="flex justify-between sm:justify-end gap-4">
                    <span className="text-slate-500">Terms:</span>
                    <span className="font-medium text-slate-800">{meta.paymentTerms}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Billed To / Client Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-slate-200">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Billed To
                </div>
                <div className="font-semibold text-slate-900 text-sm">
                  {client.companyName || 'Client Name'}
                </div>
                {client.contactPerson && (
                  <div className="text-slate-700 text-xs mt-0.5">
                    Attn: {client.contactPerson}
                  </div>
                )}
                <div className="text-slate-600 text-xs mt-1 space-y-0.5">
                  {client.address && <div>{client.address}</div>}
                  {client.cityCountry && <div>{client.cityCountry}</div>}
                  {client.email && <div>{client.email}</div>}
                  {client.phone && <div>{client.phone}</div>}
                </div>
                {client.taxId && (
                  <div className="text-[11px] font-mono text-slate-500 mt-1.5">
                    Tax / VAT ID: {client.taxId}
                  </div>
                )}
              </div>

              <div className="sm:text-right">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Reference & Details
                </div>
                <div className="space-y-1 text-xs">
                  {client.poNumber && (
                    <div className="flex justify-between sm:justify-end gap-4">
                      <span className="text-slate-500">PO Number:</span>
                      <span className="font-mono font-medium text-slate-800">{client.poNumber}</span>
                    </div>
                  )}
                  <div className="flex justify-between sm:justify-end gap-4">
                    <span className="text-slate-500">Currency:</span>
                    <span className="font-medium text-slate-800">
                      {meta.currency} ({meta.currencySymbol})
                    </span>
                  </div>
                  <div className="flex justify-between sm:justify-end gap-4">
                    <span className="text-slate-500">Website:</span>
                    <span className="text-slate-700">{company.website}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="py-6">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-slate-600 font-semibold text-[11px]">
                    <th className="py-2.5 px-2 w-8 text-center text-slate-400">#</th>
                    <th className="py-2.5 px-2">Description</th>
                    <th className="py-2.5 px-2 text-right w-20">Qty / Hrs</th>
                    <th className="py-2.5 px-2 text-right w-24">Unit Rate</th>
                    <th className="py-2.5 px-2 text-right w-28">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, index) => {
                    const rowTotal =
                      (Number(item.quantity) || 0) * (Number(item.rate) || 0);
                    return (
                      <tr key={item.id || index} className="align-top">
                        <td className="py-3 px-2 text-center text-slate-400 font-mono text-[11px]">
                          {index + 1}
                        </td>
                        <td className="py-3 px-2 pr-4">
                          <div className="font-semibold text-slate-900 text-xs">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed whitespace-pre-line">
                              {item.description}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-slate-700">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-2 text-right font-mono text-slate-700">
                          {formatCurrency(item.rate)}
                        </td>
                        <td className="py-3 px-2 text-right font-mono font-semibold text-slate-900">
                          {formatCurrency(rowTotal)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Financial Summary & Bank Information */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 pt-4 pb-8 border-t border-slate-200 page-break-inside-avoid">
              {/* Left Column: Bank / Cash Remittance Details (7 cols) */}
              <div className="sm:col-span-7 space-y-4">
                {meta.paymentMethodType !== 'none' && (
                  <>
                    {meta.paymentMethodType === 'cash' ? (
                      <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-lg p-4 space-y-2 text-xs">
                        <div className="font-semibold text-emerald-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Cash Payment & Handover Settlement
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Payment Mode:</span>
                            <span className="font-medium text-slate-800">Direct Cash Handover</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Authorized Receiver:</span>
                            <span className="font-medium text-slate-800">{payment.cashReceiver || 'Authorized CodePhilic Representative'}</span>
                          </div>
                          <div className="sm:col-span-2 pt-0.5">
                            <span className="text-slate-500 block text-[10px]">Settlement Terms:</span>
                            <span className="text-slate-600 text-[11px] leading-relaxed">
                              {payment.cashInstructions || 'Payment handed over in cash upon milestone completion / delivery. Official money receipt issued.'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs">
                        <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider">
                          Remittance & Wire Transfer Details
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Bank:</span>
                            <span className="font-medium text-slate-800">{payment.bankName}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Account Name:</span>
                            <span className="font-medium text-slate-800">{payment.accountName}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Account / IBAN:</span>
                            <span className="font-mono font-medium text-slate-800">{payment.accountNumber}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">SWIFT / BIC:</span>
                            <span className="font-mono font-medium text-slate-800">{payment.swiftBic}</span>
                          </div>
                          {payment.routingNumber && (
                            <div>
                              <span className="text-slate-500 block text-[10px]">Routing / Branch:</span>
                              <span className="font-mono text-slate-700">{payment.routingNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Amount in words */}
                <div className="text-[11px] text-slate-600">
                  <span className="text-slate-400 font-medium">Amount in Words: </span>
                  <span className="italic font-serif text-slate-800">&ldquo;{amountInWords}&rdquo;</span>
                </div>
              </div>

              {/* Right Column: Totals (5 cols) */}
              <div className="sm:col-span-5 space-y-2 text-xs">
                <div className="flex justify-between py-1 text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono font-medium text-slate-800">{formatCurrency(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between py-1 text-slate-600">
                    <span>
                      Discount {meta.discountType === 'percentage' ? `(${meta.discountValue}%)` : ''}:
                    </span>
                    <span className="font-mono text-slate-700">-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                {meta.taxRate > 0 && (
                  <div className="flex justify-between py-1 text-slate-600">
                    <span>Tax / VAT ({meta.taxRate}%):</span>
                    <span className="font-mono text-slate-700">{formatCurrency(taxAmount)}</span>
                  </div>
                )}

                {shippingFee > 0 && (
                  <div className="flex justify-between py-1 text-slate-600">
                    <span>Additional Fee:</span>
                    <span className="font-mono text-slate-700">{formatCurrency(shippingFee)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-2 pb-1 border-t-2 border-slate-300 text-sm font-bold text-slate-900">
                  <span>Total Due:</span>
                  <span className="font-mono text-base">{formatCurrency(grandTotal)}</span>
                </div>

                {amountPaid > 0 && (
                  <>
                    <div className="flex justify-between py-1 text-emerald-700">
                      <span>Amount Paid:</span>
                      <span className="font-mono">-{formatCurrency(amountPaid)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-t border-slate-200 font-semibold text-slate-900">
                      <span>Balance Remaining:</span>
                      <span className="font-mono text-rose-600">{formatCurrency(balanceDue)}</span>
                    </div>
                  </>
                )}

                {/* QR Code Scan-to-pay (Optional) */}
                {meta.showQrCode !== false && (
                  <div className="pt-2 flex items-center gap-3">
                    <QrCodeSvg
                      value={`https://codephilic.com/pay?inv=${meta.invoiceNumber}&total=${grandTotal}&cur=${meta.currency}`}
                      size={56}
                      fgColor="#0f172a"
                      bgColor="#ffffff"
                    />
                    <div className="text-[10px] text-slate-500 leading-tight">
                      Scan with banking camera to verify or remit payment online.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Terms & Authorized Signature */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-6 border-t border-slate-200 page-break-inside-avoid">
              <div className="sm:col-span-8 space-y-2 text-[11px] text-slate-500">
                {meta.notes && (
                  <div>
                    <div className="font-semibold text-slate-700 text-[10px] uppercase tracking-wider mb-0.5">
                      Notes
                    </div>
                    <p className="whitespace-pre-line leading-relaxed">{meta.notes}</p>
                  </div>
                )}
                {meta.terms && (
                  <div>
                    <div className="font-semibold text-slate-700 text-[10px] uppercase tracking-wider mb-0.5">
                      Terms & Conditions
                    </div>
                    <p className="whitespace-pre-line leading-relaxed text-[10px] text-slate-400">
                      {meta.terms}
                    </p>
                  </div>
                )}
              </div>

              {/* Signature Block */}
              <div className="sm:col-span-4 flex flex-col justify-end items-start sm:items-end">
                <div className="w-40 border-b border-slate-300 pb-1 mb-1 text-center sm:text-right font-medium text-slate-900 text-xs">
                  {meta.signatoryName || 'Authorized Signatory'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {meta.signatoryRole || 'Managing Director'}
                </div>
                <div className="text-[10px] text-slate-400 font-normal">
                  CodePhilic Limited
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 gap-1 invoice-print-footer">
              <div>
                {company.legalName} • {company.website}
              </div>
              <div>
                Registration No: {company.regNo}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
