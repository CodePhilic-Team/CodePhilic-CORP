import type { Metadata } from 'next';
import InvoiceGeneratorApp from '@/components/invoice/InvoiceGeneratorApp';

export const metadata: Metadata = {
  title: 'Invoice Generator | CodePhilic Limited',
  description:
    'Professional invoice generator for CodePhilic Limited. Create, export, and manage invoices in PDF, CSV, PNG formats with full print support.',
  robots: { index: false, follow: false },
};

export default function InvoiceGeneratorPage() {
  return <InvoiceGeneratorApp />;
}
