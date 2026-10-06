'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  FolderOpen,
  Save,
  Trash2,
  FileText,
  Plus,
  Check,
  ArrowRight,
} from 'lucide-react';
import { InvoiceData } from '@/types/invoice';
import { DEFAULT_INVOICE } from '@/utils/invoiceDefaults';

interface SavedInvoicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentInvoice: InvoiceData;
  onLoadInvoice: (invoice: InvoiceData) => void;
  savedInvoices: InvoiceData[];
  onSaveCurrent: (title?: string) => void;
  onDeleteInvoice: (id: string) => void;
}

export default function SavedInvoicesModal({
  isOpen,
  onClose,
  currentInvoice,
  onLoadInvoice,
  savedInvoices,
  onSaveCurrent,
  onDeleteInvoice,
}: SavedInvoicesModalProps) {
  const [saveTitle, setSaveTitle] = useState('');
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSaveTitle(
        `${currentInvoice.meta.invoiceNumber} - ${currentInvoice.client.companyName || 'Untitled'}`
      );
    }
  }, [isOpen, currentInvoice]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveCurrent(saveTitle);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const calculateTotal = (inv: InvoiceData) => {
    const sub = inv.items.reduce((a, b) => a + (b.quantity || 0) * (b.rate || 0), 0);
    const disc =
      inv.meta.discountType === 'percentage'
        ? (sub * (inv.meta.discountValue || 0)) / 100
        : inv.meta.discountValue || 0;
    const tax = ((sub - disc) * (inv.meta.taxRate || 0)) / 100;
    return sub - disc + tax + (inv.meta.shippingFee || 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center">
              <FolderOpen className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Saved Invoices</h2>
              <p className="text-[11px] text-slate-500">Manage and switch between saved records</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Save Current Invoice Row */}
        <div className="p-4 bg-slate-50/70 border-b border-slate-100">
          <label className="text-[11px] font-medium text-slate-600 block mb-1.5">
            Save Active Invoice
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={saveTitle}
              onChange={(e) => setSaveTitle(e.target.value)}
              placeholder="Invoice description or client"
              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors shrink-0"
            >
              {justSaved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Saved List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
            <span className="font-medium text-slate-700">Stored Records ({savedInvoices.length})</span>
            <button
              onClick={() => {
                if (confirm('Create a new blank invoice? Any unsaved edits will be replaced.')) {
                  onLoadInvoice({ ...DEFAULT_INVOICE, id: 'inv-' + Date.now(), items: [] });
                  onClose();
                }
              }}
              className="text-blue-600 hover:underline flex items-center gap-1 text-[11px]"
            >
              <Plus className="w-3 h-3" />
              New Blank Invoice
            </button>
          </div>

          {savedInvoices.length === 0 ? (
            <div className="py-10 text-center text-slate-400 space-y-1.5">
              <FileText className="w-6 h-6 mx-auto opacity-50" />
              <p className="text-xs">No saved invoices yet.</p>
              <p className="text-[11px] text-slate-400">
                Click &ldquo;Save&rdquo; above to save the current invoice to browser memory.
              </p>
            </div>
          ) : (
            savedInvoices.map((inv) => {
              const total = calculateTotal(inv);
              const isCurrent = currentInvoice.id === inv.id;
              return (
                <div
                  key={inv.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    isCurrent
                      ? 'bg-blue-50/50 border-blue-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-slate-900 truncate">
                        {inv.meta.invoiceNumber || 'No ID'}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
                        {inv.meta.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 truncate">
                      {inv.client.companyName || 'Unknown Client'}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                      <span>{inv.meta.currencySymbol}{total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      <span>•</span>
                      <span>{inv.meta.issueDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => {
                        onLoadInvoice(inv);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
                    >
                      <span>Load</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete invoice ${inv.meta.invoiceNumber}?`)) {
                          onDeleteInvoice(inv.id);
                        }
                      }}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
