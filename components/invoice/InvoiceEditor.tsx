'use client';

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Copy,
  ChevronDown,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { InvoiceData, InvoiceItem, SUPPORTED_CURRENCIES, InvoiceStatus } from '@/types/invoice';
import { DEFAULT_SIGNATORY_NAMES, DEFAULT_SIGNATORY_TITLES } from '@/utils/invoiceDefaults';

interface InvoiceEditorProps {
  invoice: InvoiceData;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceData>>;
}

export default function InvoiceEditor({ invoice, setInvoice }: InvoiceEditorProps) {
  // Collapsible section toggles
  const [sectionsOpen, setSectionsOpen] = useState({
    details: true,
    client: true,
    items: true,
    financials: true,
    payment: false,
    terms: false,
    company: false,
  });

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const { company, client, items, meta, payment } = invoice;

  const updateMeta = (field: keyof typeof meta, value: any) => {
    setInvoice((prev) => ({
      ...prev,
      meta: { ...prev.meta, [field]: value },
    }));
  };

  const updateClient = (field: keyof typeof client, value: string) => {
    setInvoice((prev) => ({
      ...prev,
      client: { ...prev.client, [field]: value },
    }));
  };

  const updateCompany = (field: keyof typeof company, value: string) => {
    setInvoice((prev) => ({
      ...prev,
      company: { ...prev.company, [field]: value },
    }));
  };

  const updatePayment = (field: keyof typeof payment, value: string) => {
    setInvoice((prev) => ({
      ...prev,
      payment: { ...prev.payment, [field]: value },
    }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    setInvoice((prev) => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const addItem = (preset?: Partial<InvoiceItem>) => {
    const newItem: InvoiceItem = {
      id: 'item-' + Math.random().toString(36).substring(2, 9),
      title: preset?.title || 'Software Engineering Service',
      description: preset?.description || '',
      quantity: preset?.quantity || 1,
      rate: preset?.rate || 1000,
      taxable: preset?.taxable !== undefined ? preset?.taxable : true,
    };
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const duplicateItem = (index: number) => {
    const itemToClone = items[index];
    const cloned: InvoiceItem = {
      ...itemToClone,
      id: 'item-' + Math.random().toString(36).substring(2, 9),
      title: `${itemToClone.title} (Copy)`,
    };
    setInvoice((prev) => {
      const newItems = [...prev.items];
      newItems.splice(index + 1, 0, cloned);
      return { ...prev, items: newItems };
    });
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) {
      alert('Invoice must have at least one line item.');
      return;
    }
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const setQuickDueDate = (days: number) => {
    const issue = new Date(meta.issueDate || new Date());
    issue.setDate(issue.getDate() + days);
    updateMeta('dueDate', issue.toISOString().split('T')[0]);
    updateMeta('paymentTerms', days === 0 ? 'Due upon Receipt' : `Net ${days} Days`);
  };

  const handleCurrencySelect = (currencyCode: string) => {
    const curr = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode);
    if (curr) {
      setInvoice((prev) => ({
        ...prev,
        meta: {
          ...prev.meta,
          currency: curr.code,
          currencySymbol: curr.symbol,
        },
      }));
    }
  };

  const generateNextInvoiceNo = () => {
    const year = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    updateMeta('invoiceNumber', `CP-INV-${year}-${randomSeq}`);
  };

  const quickTechServices = [
    { title: 'Frontend Web App Engineering', desc: 'Component architecture, responsive interface, state integration.', qty: 1, rate: 4500 },
    { title: 'Cloud Infrastructure & DevOps SLA', desc: 'Kubernetes configuration, CI/CD pipeline automation.', qty: 40, rate: 95 },
    { title: 'API Integration & Microservices', desc: 'Backend microservices, webhook orchestration, documentation.', qty: 1, rate: 3200 },
  ];

  return (
    <div className="flex flex-col h-full bg-white text-slate-800 overflow-y-auto">
      <div className="p-5 sm:p-6 space-y-6">
        {/* Section 1: Invoice Details */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
          <div
            onClick={() => toggleSection('details')}
            className="flex items-center justify-between cursor-pointer select-none font-semibold text-slate-900 text-sm pb-1"
          >
            <span>Invoice Details</span>
            <div className="text-slate-400">
              {sectionsOpen.details ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </div>

          {sectionsOpen.details && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-medium text-slate-700">Invoice Number</label>
                  <button
                    onClick={generateNextInvoiceNo}
                    className="text-[11px] text-blue-600 hover:underline"
                  >
                    Auto Generate
                  </button>
                </div>
                <input
                  type="text"
                  value={meta.invoiceNumber}
                  onChange={(e) => updateMeta('invoiceNumber', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Status</label>
                <select
                  value={meta.status}
                  onChange={(e) => updateMeta('status', e.target.value as InvoiceStatus)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PAID">Paid</option>
                  <option value="PENDING">Pending</option>
                  <option value="OVERDUE">Overdue</option>
                  <option value="PARTIALLY_PAID">Partially Paid</option>
                  <option value="DRAFT">Draft</option>
                </select>

                {meta.status === 'PAID' && (
                  <div className="mt-2.5 p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/70 text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-emerald-800 text-[11px] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Paid Seal Stamp Active
                      </span>
                      <span className="text-[10px] text-emerald-600 font-mono">Official Stamp</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-600 block mb-0.5 font-medium">Seal Style</label>
                        <select
                          value={meta.paidSealStyle || 'circular'}
                          onChange={(e) => updateMeta('paidSealStyle', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-slate-300 text-[11px] bg-white text-slate-800"
                        >
                          <option value="circular">Circular Seal</option>
                          <option value="stamp">Rubber Stamp</option>
                          <option value="badge">Minimal Badge</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-600 block mb-0.5 font-medium">Ink Color</label>
                        <select
                          value={meta.paidSealColor || 'emerald'}
                          onChange={(e) => updateMeta('paidSealColor', e.target.value)}
                          className="w-full px-2 py-1 rounded border border-slate-300 text-[11px] bg-white text-slate-800"
                        >
                          <option value="emerald">Emerald Green</option>
                          <option value="red">Crimson Red</option>
                          <option value="blue">Corporate Blue</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Issue Date</label>
                <input
                  type="date"
                  value={meta.issueDate}
                  onChange={(e) => updateMeta('issueDate', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Due Date</label>
                <input
                  type="date"
                  value={meta.dueDate}
                  onChange={(e) => updateMeta('dueDate', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="text-[11px] text-slate-500">Quick Due Date:</span>
                  <button
                    onClick={() => setQuickDueDate(0)}
                    className="px-2 py-0.5 rounded border border-slate-200 text-[11px] hover:bg-slate-50"
                  >
                    On Receipt
                  </button>
                  <button
                    onClick={() => setQuickDueDate(15)}
                    className="px-2 py-0.5 rounded border border-slate-200 text-[11px] hover:bg-slate-50"
                  >
                    Net 15
                  </button>
                  <button
                    onClick={() => setQuickDueDate(30)}
                    className="px-2 py-0.5 rounded border border-slate-200 text-[11px] hover:bg-slate-50"
                  >
                    Net 30
                  </button>
                  <button
                    onClick={() => setQuickDueDate(60)}
                    className="px-2 py-0.5 rounded border border-slate-200 text-[11px] hover:bg-slate-50"
                  >
                    Net 60
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Currency</label>
                <select
                  value={meta.currency}
                  onChange={(e) => handleCurrencySelect(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {SUPPORTED_CURRENCIES.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Payment Terms</label>
                <input
                  type="text"
                  value={meta.paymentTerms}
                  onChange={(e) => updateMeta('paymentTerms', e.target.value)}
                  placeholder="e.g. Net 30 Days"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Client / Billed To */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
          <div
            onClick={() => toggleSection('client')}
            className="flex items-center justify-between cursor-pointer select-none font-semibold text-slate-900 text-sm pb-1"
          >
            <span>Client & Recipient</span>
            <div className="text-slate-400">
              {sectionsOpen.client ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </div>

          {sectionsOpen.client && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-slate-700 block mb-1">Company Name</label>
                <input
                  type="text"
                  value={client.companyName}
                  onChange={(e) => updateClient('companyName', e.target.value)}
                  placeholder="e.g. AeroCloud Systems Inc."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Contact Person</label>
                <input
                  type="text"
                  value={client.contactPerson}
                  onChange={(e) => updateClient('contactPerson', e.target.value)}
                  placeholder="David Richardson"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={client.email}
                  onChange={(e) => updateClient('email', e.target.value)}
                  placeholder="finance@client.com"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-slate-700 block mb-1">Billing Address</label>
                <input
                  type="text"
                  value={client.address}
                  onChange={(e) => updateClient('address', e.target.value)}
                  placeholder="500 Howard Street, Suite 400"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">City, Country</label>
                <input
                  type="text"
                  value={client.cityCountry}
                  onChange={(e) => updateClient('cityCountry', e.target.value)}
                  placeholder="San Francisco, CA 94105, USA"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Tax ID / VAT</label>
                <input
                  type="text"
                  value={client.taxId}
                  onChange={(e) => updateClient('taxId', e.target.value)}
                  placeholder="US-EIN-94-3829102"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">PO / Contract #</label>
                <input
                  type="text"
                  value={client.poNumber}
                  onChange={(e) => updateClient('poNumber', e.target.value)}
                  placeholder="PO-2025-ACS-994"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Phone</label>
                <input
                  type="text"
                  value={client.phone}
                  onChange={(e) => updateClient('phone', e.target.value)}
                  placeholder="+1 (415) 892-4410"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Line Items */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
          <div className="flex items-center justify-between pb-1">
            <div
              onClick={() => toggleSection('items')}
              className="flex items-center gap-2 cursor-pointer select-none font-semibold text-slate-900 text-sm"
            >
              <span>Line Items ({items.length})</span>
              <div className="text-slate-400">
                {sectionsOpen.items ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </div>

            <button
              onClick={() => addItem()}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Item
            </button>
          </div>

          {sectionsOpen.items && (
            <div className="pt-3 space-y-3">
              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 items-center text-xs pb-1">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  Quick add:
                </span>
                {quickTechServices.map((qs, i) => (
                  <button
                    key={i}
                    onClick={() => addItem(qs)}
                    className="text-[11px] px-2 py-0.5 rounded border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    + {qs.title}
                  </button>
                ))}
              </div>

              {items.map((item, index) => {
                const total = (Number(item.quantity) || 0) * (Number(item.rate) || 0);
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold text-slate-400">
                        #{index + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => duplicateItem(index)}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
                          title="Duplicate item"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeItem(index)}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-white transition-colors"
                          title="Delete item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                        placeholder="Service name / title"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        placeholder="Description of deliverables..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 items-center">
                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">Quantity / Hrs</label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-full px-2.5 py-1 rounded-md border border-slate-300 font-mono text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 block mb-0.5">
                          Rate ({meta.currencySymbol})
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                          className="w-full px-2.5 py-1 rounded-md border border-slate-300 font-mono text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block mb-0.5">Total</span>
                        <span className="font-mono text-xs font-semibold text-slate-900">
                          {meta.currencySymbol}{total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Section 4: Taxes, Discounts & Totals */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
          <div
            onClick={() => toggleSection('financials')}
            className="flex items-center justify-between cursor-pointer select-none font-semibold text-slate-900 text-sm pb-1"
          >
            <span>Taxes, Discounts & Adjustments</span>
            <div className="text-slate-400">
              {sectionsOpen.financials ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </div>

          {sectionsOpen.financials && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Discount Type</label>
                <select
                  value={meta.discountType}
                  onChange={(e) => updateMeta('discountType', e.target.value as any)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ({meta.currencySymbol})</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Discount Value</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={meta.discountValue}
                  onChange={(e) => updateMeta('discountValue', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Tax / VAT Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={meta.taxRate}
                  onChange={(e) => updateMeta('taxRate', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Additional Fee ({meta.currencySymbol})</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={meta.shippingFee}
                  onChange={(e) => updateMeta('shippingFee', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-slate-700 block mb-1">Amount Paid / Deposit ({meta.currencySymbol})</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={meta.amountPaid}
                  onChange={(e) => updateMeta('amountPaid', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Section 5: Payment Method & Settlement */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
          <div
            onClick={() => toggleSection('payment')}
            className="flex items-center justify-between cursor-pointer select-none font-semibold text-slate-900 text-sm pb-1"
          >
            <div className="flex items-center gap-2">
              <span>Payment Details & Settlement</span>
              <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {meta.paymentMethodType === 'cash' ? 'Cash' : meta.paymentMethodType === 'none' ? 'Hidden' : 'Bank'}
              </span>
            </div>
            <div className="text-slate-400">
              {sectionsOpen.payment ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </div>

          {sectionsOpen.payment && (
            <div className="space-y-4 pt-3">
              {/* Payment Method Switcher */}
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Payment Method on Invoice
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => updateMeta('paymentMethodType', 'bank')}
                    className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all text-center ${
                      (meta.paymentMethodType === 'bank' || !meta.paymentMethodType)
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ?? Bank / Wire
                  </button>
                  <button
                    type="button"
                    onClick={() => updateMeta('paymentMethodType', 'cash')}
                    className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all text-center ${
                      meta.paymentMethodType === 'cash'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ?? Cash Handover
                  </button>
                  <button
                    type="button"
                    onClick={() => updateMeta('paymentMethodType', 'none')}
                    className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all text-center ${
                      meta.paymentMethodType === 'none'
                        ? 'border-slate-400 bg-slate-100 text-slate-800 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ?? Do Not Show
                  </button>
                </div>
              </div>

              {/* Bank Details Inputs */}
              {(meta.paymentMethodType === 'bank' || !meta.paymentMethodType) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-slate-700 block mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={payment.bankName}
                      onChange={(e) => updatePayment('bankName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Account Name</label>
                    <input
                      type="text"
                      value={payment.accountName}
                      onChange={(e) => updatePayment('accountName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Account / IBAN</label>
                    <input
                      type="text"
                      value={payment.accountNumber}
                      onChange={(e) => updatePayment('accountNumber', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">SWIFT / BIC</label>
                    <input
                      type="text"
                      value={payment.swiftBic}
                      onChange={(e) => updatePayment('swiftBic', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Routing / Branch Code</label>
                    <input
                      type="text"
                      value={payment.routingNumber}
                      onChange={(e) => updatePayment('routingNumber', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Cash Handover Inputs */}
              {meta.paymentMethodType === 'cash' && (
                <div className="space-y-3 p-3 rounded-lg border border-emerald-200 bg-emerald-50/40">
                  <div className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5">
                    <span>??</span>
                    <span>Cash Handover Settings</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-slate-700">Cash Handover Receiver</label>
                      <span className="text-[10px] text-slate-400">Select or Type</span>
                    </div>
                    <select
                      value={
                        DEFAULT_SIGNATORY_NAMES.includes(payment.cashReceiver || '')
                          ? payment.cashReceiver
                          : 'custom'
                      }
                      onChange={(e) => {
                        if (e.target.value !== 'custom') {
                          updatePayment('cashReceiver', e.target.value);
                        }
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1.5"
                    >
                      {DEFAULT_SIGNATORY_NAMES.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                      <option value="Authorized CodePhilic Representative">Authorized CodePhilic Representative</option>
                      <option value="custom">Other / Custom Receiver...</option>
                    </select>
                    {(!DEFAULT_SIGNATORY_NAMES.includes(payment.cashReceiver || '') && payment.cashReceiver !== 'Authorized CodePhilic Representative') && (
                      <input
                        type="text"
                        placeholder="Enter custom receiver name"
                        value={payment.cashReceiver || ''}
                        onChange={(e) => updatePayment('cashReceiver', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">Handover Instructions / Receipt Note</label>
                    <textarea
                      rows={2}
                      value={payment.cashInstructions || ''}
                      onChange={(e) => updatePayment('cashInstructions', e.target.value)}
                      placeholder="e.g. Cash handed over in person upon project handover / milestone delivery."
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* None Notice */}
              {meta.paymentMethodType === 'none' && (
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-600 text-center">
                  Payment remittance details are hidden and will not be displayed on the invoice.
                </div>
              )}

              {/* QR Code Optional Toggle */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-800 block">Verification QR Code</span>
                  <span className="text-[11px] text-slate-500">Show scan-to-verify QR code in document</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={meta.showQrCode !== false}
                    onChange={(e) => updateMeta('showQrCode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Section 6: Notes, Terms & Signatory */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
          <div
            onClick={() => toggleSection('terms')}
            className="flex items-center justify-between cursor-pointer select-none font-semibold text-slate-900 text-sm pb-1"
          >
            <span>Notes & Signatory</span>
            <div className="text-slate-400">
              {sectionsOpen.terms ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </div>

          {sectionsOpen.terms && (
            <div className="space-y-3.5 pt-3">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Client Note</label>
                <textarea
                  rows={2}
                  value={meta.notes}
                  onChange={(e) => updateMeta('notes', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Terms & Conditions</label>
                <textarea
                  rows={3}
                  value={meta.terms}
                  onChange={(e) => updateMeta('terms', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[11px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-700">Signatory Name</label>
                    <span className="text-[10px] text-slate-400">Dropdown</span>
                  </div>
                  <select
                    value={
                      DEFAULT_SIGNATORY_NAMES.includes(meta.signatoryName)
                        ? meta.signatoryName
                        : 'custom'
                    }
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        updateMeta('signatoryName', e.target.value);
                      }
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1.5"
                  >
                    {DEFAULT_SIGNATORY_NAMES.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                    <option value="custom">Other / Custom Name...</option>
                  </select>
                  {(!DEFAULT_SIGNATORY_NAMES.includes(meta.signatoryName) || meta.signatoryName === '') && (
                    <input
                      type="text"
                      placeholder="Enter custom signatory name"
                      value={meta.signatoryName}
                      onChange={(e) => updateMeta('signatoryName', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-700">Signatory Title</label>
                    <span className="text-[10px] text-slate-400">Dropdown</span>
                  </div>
                  <select
                    value={
                      DEFAULT_SIGNATORY_TITLES.includes(meta.signatoryRole)
                        ? meta.signatoryRole
                        : 'custom'
                    }
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        updateMeta('signatoryRole', e.target.value);
                      }
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1.5"
                  >
                    {DEFAULT_SIGNATORY_TITLES.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                    <option value="custom">Other / Custom Title...</option>
                  </select>
                  {(!DEFAULT_SIGNATORY_TITLES.includes(meta.signatoryRole) || meta.signatoryRole === '') && (
                    <input
                      type="text"
                      placeholder="Enter custom title"
                      value={meta.signatoryRole}
                      onChange={(e) => updateMeta('signatoryRole', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 7: Company Details */}
        <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-xs">
          <div
            onClick={() => toggleSection('company')}
            className="flex items-center justify-between cursor-pointer select-none font-semibold text-slate-900 text-sm pb-1"
          >
            <span>CodePhilic Entity Info</span>
            <div className="text-slate-400">
              {sectionsOpen.company ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </div>

          {sectionsOpen.company && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Company Name</label>
                <input
                  type="text"
                  value={company.name}
                  onChange={(e) => updateCompany('name', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Legal Name</label>
                <input
                  type="text"
                  value={company.legalName}
                  onChange={(e) => updateCompany('legalName', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Registration #</label>
                <input
                  type="text"
                  value={company.regNo}
                  onChange={(e) => updateCompany('regNo', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">BIN / VAT #</label>
                <input
                  type="text"
                  value={company.vatNo}
                  onChange={(e) => updateCompany('vatNo', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-slate-700 block mb-1">Address</label>
                <input
                  type="text"
                  value={company.address}
                  onChange={(e) => updateCompany('address', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Email</label>
                <input
                  type="email"
                  value={company.email}
                  onChange={(e) => updateCompany('email', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Website</label>
                <input
                  type="text"
                  value={company.website}
                  onChange={(e) => updateCompany('website', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
