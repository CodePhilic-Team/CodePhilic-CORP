'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Printer,
  Download,
  Share2,
  FileCode,
  FolderOpen,
  ChevronDown,
  FileText,
  Table,
  Upload,
  Check,
  RotateCcw,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { InvoiceData } from '@/types/invoice';
import { INVOICE_PRESETS, DEFAULT_INVOICE } from '@/utils/invoiceDefaults';
import {
  printInvoice,
  downloadPdf,
  downloadPng,
  downloadJson,
  exportCsv,
  copyShareText,
} from '@/utils/exportInvoice';

interface NavbarProps {
  invoice: InvoiceData;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceData>>;
  activeMobileTab: 'editor' | 'preview';
  setActiveMobileTab: (tab: 'editor' | 'preview') => void;
  openSavedModal: () => void;
  savedCount: number;
}

export default function Navbar({
  invoice,
  setInvoice,
  activeMobileTab,
  setActiveMobileTab,
  openSavedModal,
  savedCount,
}: NavbarProps) {
  const [exportOpen, setExportOpen] = useState(false);
  const [presetsOpen, setPresetsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const exportRef = useRef<HTMLDivElement>(null);
  const presetsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
      if (presetsRef.current && !presetsRef.current.contains(e.target as Node)) {
        setPresetsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePrint = () => {
    if (activeMobileTab !== 'preview') {
      setActiveMobileTab('preview');
    }
    setTimeout(() => {
      printInvoice();
    }, 150);
  };

  const handlePdfDownload = async () => {
    setIsExporting(true);
    setExportOpen(false);
    if (activeMobileTab !== 'preview') {
      setActiveMobileTab('preview');
      await new Promise((r) => setTimeout(r, 150));
    }
    await downloadPdf('invoice-printable-document', `${invoice.meta.invoiceNumber || 'CodePhilic-Invoice'}`);
    setIsExporting(false);
  };

  const handlePngDownload = async () => {
    setIsExporting(true);
    setExportOpen(false);
    if (activeMobileTab !== 'preview') {
      setActiveMobileTab('preview');
      await new Promise((r) => setTimeout(r, 150));
    }
    await downloadPng('invoice-printable-document', `${invoice.meta.invoiceNumber || 'CodePhilic-Invoice'}`);
    setIsExporting(false);
  };

  const handleCsvDownload = () => {
    setExportOpen(false);
    exportCsv(invoice, `${invoice.meta.invoiceNumber || 'CodePhilic-Invoice'}`);
  };

  const handleJsonDownload = () => {
    setExportOpen(false);
    downloadJson(invoice, `${invoice.meta.invoiceNumber || 'CodePhilic-Invoice'}`);
  };

  const handleCopySummary = async () => {
    const success = await copyShareText(invoice);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLoadPreset = (presetId: string) => {
    const preset = INVOICE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setInvoice((prev) => ({
        ...prev,
        client: { ...preset.client },
        items: preset.items.map((it) => ({ ...it, id: 'item-' + Math.random().toString(36).substring(2, 9) })),
        meta: {
          ...prev.meta,
          ...preset.meta,
        },
      }));
    }
    setPresetsOpen(false);
  };

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.company && parsed.items) {
            setInvoice(parsed);
          } else {
            alert('Invalid invoice JSON structure.');
          }
        } catch {
          alert('Could not parse JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Brand Left */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group transition-opacity hover:opacity-90" title="Return to CodePhilic Corporate Homepage">
            <div className="w-8 h-8 rounded-lg border border-slate-200 bg-white p-1 flex items-center justify-center shadow-xs group-hover:border-blue-400 transition-colors">
              <Image
                src="/cpLOGO.png"
                alt="CodePhilic"
                width={26}
                height={26}
                priority
                className="object-contain"
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-slate-900 tracking-tight text-base group-hover:text-blue-600 transition-colors">
                CodePhilic
              </span>
              <span className="text-xs text-slate-400 font-normal hidden sm:inline">
                / Invoice Generator
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 font-medium px-2 py-1 rounded-md hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            title="Return to Main Website"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Corporate Site</span>
          </Link>
        </div>

        {/* Mobile View Toggle */}
        <div className="flex lg:hidden items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium">
          <button
            onClick={() => setActiveMobileTab('editor')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeMobileTab === 'editor'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveMobileTab('preview')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeMobileTab === 'preview'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Actions Right */}
        <div className="flex items-center gap-2">
          {/* Templates Dropdown */}
          <div className="relative" ref={presetsRef}>
            <button
              onClick={() => setPresetsOpen(!presetsOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Templates</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {presetsOpen && (
              <div className="absolute right-0 mt-1.5 w-64 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 z-50 text-xs">
                <div className="px-3 py-1.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Quick Presets
                </div>
                {INVOICE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleLoadPreset(preset.id)}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex flex-col gap-0.5 transition-colors"
                  >
                    <div className="flex items-center justify-between font-medium text-slate-900">
                      <span>{preset.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {preset.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 truncate">
                      {preset.client.companyName}
                    </span>
                  </button>
                ))}
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setInvoice({ ...DEFAULT_INVOICE });
                      setPresetsOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <RotateCcw className="w-3 h-3 text-slate-400" />
                    Reset to Default
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Saved History */}
          <button
            onClick={openSavedModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            title="Saved Invoices"
          >
            <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Saved</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Copy Summary */}
          <button
            onClick={handleCopySummary}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            title="Copy text summary to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share</span>
              </>
            )}
          </button>

          {/* Direct Print */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            title="Print invoice"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative" ref={exportRef}>
            <button
              onClick={() => setExportOpen(!exportOpen)}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? 'Generating...' : 'Download PDF'}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {exportOpen && (
              <div className="absolute right-0 mt-1.5 w-56 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 z-50 text-xs">
                <button
                  onClick={handlePdfDownload}
                  className="w-full text-left px-3 py-2 text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 font-medium transition-colors"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <div>
                    <div>PDF Document (.pdf)</div>
                    <div className="text-[10px] text-slate-400 font-normal">Standard A4 format</div>
                  </div>
                </button>

                <button
                  onClick={handleCsvDownload}
                  className="w-full text-left px-3 py-2 text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 font-medium transition-colors"
                >
                  <Table className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div>CSV Spreadsheet (.csv)</div>
                    <div className="text-[10px] text-slate-400 font-normal">Excel / accounting data</div>
                  </div>
                </button>

                <button
                  onClick={handlePngDownload}
                  className="w-full text-left px-3 py-2 text-slate-800 hover:bg-slate-50 flex items-center gap-2.5 font-medium transition-colors"
                >
                  <FileText className="w-4 h-4 text-amber-600" />
                  <div>
                    <div>PNG Image (.png)</div>
                    <div className="text-[10px] text-slate-400 font-normal">High-resolution image</div>
                  </div>
                </button>

                <div className="border-t border-slate-100 my-1 pt-1">
                  <button
                    onClick={handleJsonDownload}
                    className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <FileCode className="w-3.5 h-3.5 text-slate-400" />
                    <span>Backup (.json)</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-400" />
                    <span>Import JSON</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleJsonUpload}
                    accept=".json"
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
