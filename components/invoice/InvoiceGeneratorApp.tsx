'use client';

import React, { useState, useEffect } from 'react';
import { InvoiceData } from '@/types/invoice';
import { DEFAULT_INVOICE } from '@/utils/invoiceDefaults';
import InvoiceNavbar from '@/components/invoice/InvoiceNavbar';
import InvoiceEditor from '@/components/invoice/InvoiceEditor';
import InvoicePreview from '@/components/invoice/InvoicePreview';
import SavedInvoicesModal from '@/components/invoice/SavedInvoicesModal';

export default function InvoiceGeneratorApp() {
  const [invoice, setInvoice] = useState<InvoiceData>(DEFAULT_INVOICE);
  const [savedInvoices, setSavedInvoices] = useState<InvoiceData[]>([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'editor' | 'preview'>('editor');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const activeStored = localStorage.getItem('codephilic_active_invoice');
      if (activeStored) {
        const parsed = JSON.parse(activeStored);
        if (parsed && parsed.company && parsed.items) {
          if (parsed.company.address?.includes('Silicon Bay') || parsed.company.regNo?.includes('CP-2024')) {
            parsed.company.address = 'Arif Nagar, Santosh, Tangail.';
            parsed.company.cityCountry = 'Bangladesh';
            parsed.company.regNo = 'RJSC Reg: C-213655/2026';
          }
          if (parsed.meta?.signatoryName === 'Tanvir Hossain') {
            parsed.meta.signatoryName = 'Md. Rakibul Islam';
            parsed.meta.signatoryRole = 'CEO';
          }
          setInvoice(parsed);
        }
      }
      const historyStored = localStorage.getItem('codephilic_saved_invoices_history');
      if (historyStored) {
        const parsedHistory = JSON.parse(historyStored);
        if (Array.isArray(parsedHistory)) {
          setSavedInvoices(parsedHistory);
        }
      }
    } catch (e) {
      console.warn('LocalStorage load failed:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync active invoice to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('codephilic_active_invoice', JSON.stringify(invoice));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [invoice, isLoaded]);

  const handleSaveCurrent = (title?: string) => {
    const updatedInvoice: InvoiceData = {
      ...invoice,
      id: invoice.id || 'inv-' + Date.now(),
      updatedAt: new Date().toISOString(),
    };
    setSavedInvoices((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === updatedInvoice.id);
      let updatedList: InvoiceData[];
      if (existingIdx >= 0) {
        updatedList = [...prev];
        updatedList[existingIdx] = updatedInvoice;
      } else {
        updatedList = [updatedInvoice, ...prev];
      }
      try {
        localStorage.setItem('codephilic_saved_invoices_history', JSON.stringify(updatedList));
      } catch (e) {
        console.warn('History save failed:', e);
      }
      return updatedList;
    });
  };

  const handleDeleteInvoice = (id: string) => {
    setSavedInvoices((prev) => {
      const updatedList = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('codephilic_saved_invoices_history', JSON.stringify(updatedList));
      } catch (e) {
        console.warn('History save failed:', e);
      }
      return updatedList;
    });
  };

  return (
    // Force light theme context for the invoice tool regardless of site theme
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans invoice-font-scope" data-theme="light">
      <InvoiceNavbar
        invoice={invoice}
        setInvoice={setInvoice}
        activeMobileTab={activeMobileTab}
        setActiveMobileTab={setActiveMobileTab}
        openSavedModal={() => setIsSavedModalOpen(true)}
        savedCount={savedInvoices.length}
      />

            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative print:!overflow-visible print:!h-auto print:!block">
        {/* Left Side: Invoice Editor */}
        <section
          className={`no-print w-full lg:w-[480px] xl:w-[520px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200 h-auto lg:h-[calc(100vh-56px)] flex flex-col bg-white ${
            activeMobileTab === 'editor' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <InvoiceEditor invoice={invoice} setInvoice={setInvoice} />
        </section>

        {/* Right Side: Live Document Preview */}
        <section
          className={`invoice-preview-section w-full flex-1 h-[calc(100vh-56px)] overflow-hidden flex flex-col ${
            activeMobileTab === 'preview' ? 'block' : 'hidden lg:flex'
          } print:!flex print:!w-full print:!h-auto print:!overflow-visible print:!bg-white`}
        >
          <InvoicePreview invoice={invoice} setInvoice={setInvoice} />
        </section>
      </main>

      <SavedInvoicesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        currentInvoice={invoice}
        onLoadInvoice={(loaded) => setInvoice(loaded)}
        savedInvoices={savedInvoices}
        onSaveCurrent={handleSaveCurrent}
        onDeleteInvoice={handleDeleteInvoice}
      />
    </div>
  );
}
