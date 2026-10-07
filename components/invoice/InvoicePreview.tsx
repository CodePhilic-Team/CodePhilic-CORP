'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { InvoiceData, InvoiceItem } from '@/types/invoice';
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

  // Helper to calculate total for an item (supports direct whole amount or quantity * rate)
  const getItemTotal = (item: InvoiceItem): number => {
    if (item.amount !== undefined && item.amount !== null && !isNaN(item.amount) && item.amount > 0) {
      return Number(item.amount);
    }
    return (Number(item.quantity) || 0) * (Number(item.rate) || 0);
  };

  // Calculate totals
  const subtotal = items.reduce(
    (acc, item) => acc + getItemTotal(item),
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

  const isReceipt = meta.documentType === 'PAYMENT_RECEIPT';

  return (
    <div className="flex-1 flex flex-col bg-slate-100 overflow-hidden relative">
      {/* Action Toolbar above Document */}
      <div className="no-print h-10 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-800">
            Preview
          </span>
          <span className="text-[11px] text-blue-700 bg-blue-50 border border-blue-200 font-semibold px-2 py-0.5 rounded">
            A4 (210 × 297 mm)
          </span>
          <span className="text-[11px] text-slate-500 font-medium px-2 py-0.5 rounded bg-slate-100">
            {isReceipt ? 'Payment Receipt' : 'Invoice'}
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setZoomLevel((prev) => Math.max(60, prev - 10))}
            className="p-1 rounded hover:bg-slate-100 text-slate-600 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] w-9 text-center text-slate-700">
            {zoomLevel}%
          </span>
          <button
            onClick={() => setZoomLevel((prev) => Math.min(140, prev + 10))}
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

      {/* Preview Scrollable Canvas with A4 Centered Sheet */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 lg:p-10 flex justify-center items-start print:!overflow-visible print:!p-0 print:!block">
        <div
          id="invoice-printable-wrapper"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.1s ease-out',
          }}
          className="w-[210mm] max-w-full my-2 sm:my-4 transition-all print:!max-w-none print:!w-[210mm] print:!m-0 print:!p-0"
        >
          {/* Strictly A4 Friendly Document (210mm x 297mm) */}
          <div
            id="invoice-printable-document"
            style={{
              backgroundColor: '#ffffff',
              color: '#0f172a',
              width: '210mm',
              minHeight: '297mm',
              boxSizing: 'border-box',
            }}
            className="w-[210mm] max-w-full min-h-[297mm] bg-white rounded-lg sm:rounded-xl border border-slate-200/90 shadow-md p-[16mm_14mm_14mm_14mm] text-slate-800 text-xs font-sans leading-normal flex flex-col justify-between print:!w-[210mm] print:!min-h-[297mm] print:!max-w-[210mm] print:!border-none print:!shadow-none print:!p-[16mm_14mm_14mm_14mm] print:!rounded-none"
          >
            {/* Top / Main Content Area */}
            <div className="flex-1 flex flex-col justify-start">
              {/* Header: Brand & Document Meta */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-5 pb-5 border-b border-slate-200">
                {/* Left: CodePhilic Company Header (Enlarged Title & Logo) */}
                <div className="space-y-1.5 max-w-md">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl border border-slate-200/90 bg-white p-1 flex items-center justify-center shrink-0 shadow-xs">
                      <Image
                        src={company.logoUrl || '/cpLOGO.png'}
                        alt={company.name}
                        width={44}
                        height={44}
                        priority
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-950 text-2xl tracking-tight leading-none">
                        {company.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 leading-normal pt-0.5">
                    <span>{company.address || 'Arif Nagar, Santosh, Tangail.'}</span>
                    {company.cityCountry && <span>, {company.cityCountry}</span>}
                    <br />
                    <span>{company.email} &bull; {company.phone}</span>
                  </div>
                </div>

                {/* Right: Document Label, Number, and Dates */}
                <div className="flex flex-col sm:items-end text-left sm:text-right space-y-1">
                  {/* 1st Line: Document Title Only */}
                  <div className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-950 uppercase leading-tight">
                    {isReceipt ? 'PAYMENT RECEIPT' : 'INVOICE'}
                  </div>

                  {/* 2nd Line: ID / Number and Status Badge (Clean & Separate, No Overlap) */}
                  <div className="flex items-center sm:justify-end gap-2 pt-0.5">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      #{meta.invoiceNumber}
                    </span>
                    {meta.status !== 'PAID' && (
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${getStatusBadge()}`}
                      >
                        {meta.status.replace('_', ' ')}
                      </span>
                    )}
                  </div>

                  {/* 3rd Line: Dates */}
                  <div className="flex flex-wrap sm:justify-end gap-x-3.5 gap-y-1 text-[11px] text-slate-500 pt-1">
                    <div>
                      <span className="text-slate-400">{isReceipt ? 'Receipt Date: ' : 'Date: '}</span>
                      <span className="font-medium text-slate-700">{meta.issueDate}</span>
                    </div>
                    {!isReceipt && (
                      <div>
                        <span className="text-slate-400">Due: </span>
                        <span className="font-medium text-slate-700">{meta.dueDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Billed To / Client Section */}
              <div className="py-4 border-b border-slate-200">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  {isReceipt ? 'Received From' : 'Billed To'}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                  <div>
                    <span className="font-semibold text-slate-900 text-sm">{client.companyName || 'Client Name'}</span>
                    {client.contactPerson && <span className="text-slate-600 ml-2">{client.contactPerson}</span>}
                  </div>
                  {client.taxId && (
                    <div className="text-[11px] font-mono text-slate-500">
                      Tax / VAT ID: {client.taxId}
                    </div>
                  )}
                </div>
                {(client.address || client.cityCountry || client.email || client.phone) && (
                  <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    {client.address && <span>{client.address}</span>}
                    {client.cityCountry && <span>, {client.cityCountry}</span>}
                    {client.email && <span>&bull; {client.email}</span>}
                    {client.phone && <span>&bull; {client.phone}</span>}
                  </div>
                )}
              </div>

              {/* Line Items Table */}
              <div className="py-4">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b-2 border-slate-300 text-slate-600 font-bold text-[11px]">
                      <th className="py-2.5 px-2.5 w-8 text-center text-slate-400">#</th>
                      <th className="py-2.5 px-2.5">Description</th>
                      <th className="py-2.5 px-2.5 text-center w-16">Unit</th>
                      <th className="py-2.5 px-2.5 text-right w-16">Qty</th>
                      <th className="py-2.5 px-2.5 text-right w-24">Unit Rate</th>
                      <th className="py-2.5 px-2.5 text-right w-28">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((item, index) => {
                      const rowTotal = getItemTotal(item);
                      const itemUnit = item.unit || (meta.unitType?.includes('Hrs') ? 'Hrs' : meta.unitType?.includes('Months') ? 'Months' : 'Qty');
                      return (
                        <tr key={item.id || index} className="align-top hover:bg-slate-50/40 transition-colors">
                          <td className="py-2.5 px-2.5 text-center text-slate-400 font-mono text-[11px]">
                            {index + 1}
                          </td>
                          <td className="py-2.5 px-2.5 pr-4">
                            <div className="font-semibold text-slate-900 text-xs">
                              {item.title}
                            </div>
                            {item.description && (
                              <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed whitespace-pre-line">
                                {item.description}
                              </div>
                            )}
                          </td>
                          <td className="py-2.5 px-2.5 text-center font-medium text-slate-600 text-[11px]">
                            {itemUnit}
                          </td>
                          <td className="py-2.5 px-2.5 text-right font-mono text-slate-700">
                            {item.quantity}
                          </td>
                          <td className="py-2.5 px-2.5 text-right font-mono text-slate-700">
                            {item.rate !== undefined && item.rate !== null && item.rate > 0
                              ? formatCurrency(item.rate)
                              : '—'}
                          </td>
                          <td className="py-2.5 px-2.5 text-right font-mono font-semibold text-slate-900">
                            {formatCurrency(rowTotal)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Financial Summary & Bank Information */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-4 pb-4 border-t border-slate-200 page-break-inside-avoid">
                {/* Left Column: Minimal Bank / Cash Method & Dedicated Blank Space for Paid Seal (7 cols) */}
                <div className="sm:col-span-7 flex flex-col justify-between space-y-3">
                  <div className="space-y-2.5">
                    {meta.paymentMethodType !== 'none' && (
                      <>
                        {meta.paymentMethodType === 'cash' ? (
                          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-lg p-2.5 text-xs">
                            <div className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Method: Cash
                            </div>
                          </div>
                        ) : (
                          <div className="bg-slate-50/80 border border-slate-200/80 rounded-lg p-2.5 text-xs space-y-1">
                            <div className="font-semibold text-slate-800 text-[10px] uppercase tracking-wider">
                              Bank Information
                            </div>
                            <div className="space-y-0.5 text-[11px] text-slate-700">
                              <div>
                                <span className="text-slate-400">Bank: </span>
                                <span className="font-medium text-slate-800">{payment.bankName}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Account Name: </span>
                                <span className="font-medium text-slate-800">{payment.accountName}</span>
                              </div>
                              <div>
                                <span className="text-slate-400">Account Number: </span>
                                <span className="font-mono font-medium text-slate-800">{payment.accountNumber}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Dedicated Blank Free Space for Paid Seal (NO OVERLAP!) */}
                    {meta.status === 'PAID' && (
                      <div className="pt-1.5 pb-0.5 flex items-center gap-3">
                        <PaidSeal
                          status="PAID"
                          companyName={company.name || 'CODEPHILIC'}
                          date={meta.issueDate}
                          variant={meta.paidSealStyle || 'circular'}
                          color={meta.paidSealColor || 'emerald'}
                          size="md"
                        />
                        <div className="text-[11px] text-emerald-700 leading-tight">
                          <div className="font-bold tracking-wider uppercase text-[10px]">Payment Confirmed</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{meta.issueDate}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Amount in words */}
                  <div className="text-[11px] text-slate-600 pt-1">
                    <span className="text-slate-400 font-medium">Amount in Words: </span>
                    <span className="italic font-serif text-slate-800">&ldquo;{amountInWords}&rdquo;</span>
                  </div>
                </div>

                {/* Right Column: Totals Calculations (Unobstructed, Clean) (5 cols) */}
                <div className="sm:col-span-5 space-y-1 text-xs">
                  <div className="flex justify-between py-0.5 text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-mono font-medium text-slate-800">{formatCurrency(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between py-0.5 text-slate-600">
                      <span>
                        Discount {meta.discountType === 'percentage' ? `(${meta.discountValue}%)` : ''}:
                      </span>
                      <span className="font-mono text-slate-700">-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}

                  {meta.taxRate > 0 && (
                    <div className="flex justify-between py-0.5 text-slate-600">
                      <span>Tax / VAT ({meta.taxRate}%):</span>
                      <span className="font-mono text-slate-700">{formatCurrency(taxAmount)}</span>
                    </div>
                  )}

                  {shippingFee > 0 && (
                    <div className="flex justify-between py-0.5 text-slate-600">
                      <span>Additional Fee:</span>
                      <span className="font-mono text-slate-700">{formatCurrency(shippingFee)}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-1.5 pb-1 border-t-2 border-slate-300 text-sm font-bold text-slate-900">
                    <span>Grand Total:</span>
                    <span className="font-mono text-base">{formatCurrency(grandTotal)}</span>
                  </div>

                  {amountPaid > 0 && (
                    <>
                      <div className="flex justify-between py-0.5 text-emerald-700">
                        <span>Amount Paid:</span>
                        <span className="font-mono">-{formatCurrency(amountPaid)}</span>
                      </div>
                      <div className="flex justify-between py-0.5 border-t border-slate-200 font-semibold text-slate-900">
                        <span>Balance Remaining:</span>
                        <span className="font-mono text-rose-600">{formatCurrency(balanceDue)}</span>
                      </div>
                    </>
                  )}

                  {/* QR Code Scan-to-pay (Optional) */}
                  {meta.showQrCode !== false && (
                    <div className="pt-2 flex items-center gap-2.5">
                      <QrCodeSvg
                        value={`https://codephilic.com/pay?inv=${meta.invoiceNumber}&total=${grandTotal}&cur=${meta.currency}`}
                        size={48}
                        fgColor="#0f172a"
                        bgColor="#ffffff"
                      />
                      <div className="text-[10px] text-slate-500 leading-tight">
                        Scan to verify or remit payment online.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Locked Footer: Notes & Authorized Signature (Anchored cleanly at A4 bottom) */}
            <div className="pt-4 mt-auto border-t border-slate-200 page-break-inside-avoid shrink-0">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-end">
                <div className="sm:col-span-8 text-[11px] text-slate-500">
                  {meta.generationMode !== 'manual' ? (
                    <div>
                      <div className="font-semibold text-slate-700 text-[10px] uppercase tracking-wider mb-0.5">
                        Note
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        This is a computer-generated document. No signature is required.
                      </p>
                    </div>
                  ) : meta.notes ? (
                    <div>
                      <div className="font-semibold text-slate-700 text-[10px] uppercase tracking-wider mb-0.5">
                        Note
                      </div>
                      <p className="whitespace-pre-line leading-relaxed">{meta.notes}</p>
                    </div>
                  ) : null}
                </div>

                {/* Signature Block */}
                <div className="sm:col-span-4 flex flex-col justify-end items-start sm:items-end">
                  {meta.generationMode === 'manual' ? (
                    <div className="flex flex-col items-center sm:items-end">
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-1 text-center sm:text-right w-full">
                        Authorized by
                      </div>
                      <div className="h-10 w-44" />
                      <div className="w-44 border-b border-slate-400 pb-1 mb-1 text-center sm:text-right font-medium text-slate-700 text-[11px]">
                        Signature &amp; Seal
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        CodePhilic Limited
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-0.5">
                        Authorized by
                      </div>
                      <div className="w-48 border-b border-slate-300 pb-1 mb-1 font-semibold text-slate-900 text-xs">
                        {meta.signatoryName || 'Authorized Signatory'}
                      </div>
                      {meta.signatoryRole && (
                        <div className="text-[10px] text-slate-600 font-medium">
                          {meta.signatoryRole}
                        </div>
                      )}
                      <div className="text-[10px] text-slate-500 font-normal">
                        CodePhilic Limited
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}