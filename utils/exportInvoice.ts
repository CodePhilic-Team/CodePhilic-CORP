import { InvoiceData } from '@/types/invoice';

export function printInvoice(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}

/**
 * Creates a clean, 100% opaque white canvas of the invoice document.
 * Eliminates transparency to prevent jsPDF from rendering transparent alpha pixels as solid black.
 */
async function createInvoiceCanvas(elementId: string): Promise<HTMLCanvasElement | null> {
  if (typeof window === 'undefined') return null;

  const target = document.getElementById(elementId);
  if (!target) return null;

  const html2canvas = (await import('html2canvas')).default;

  // 1. Create a clean sandbox container attached to body
  const sandbox = document.createElement('div');
  sandbox.id = 'invoice-export-sandbox';
  sandbox.style.position = 'fixed';
  sandbox.style.top = '0';
  sandbox.style.left = '0';
  sandbox.style.width = '794px'; // Strict A4 width at 96 DPI (210mm)
  sandbox.style.backgroundColor = '#ffffff';
  sandbox.style.color = '#0f172a';
  sandbox.style.zIndex = '-99999';
  sandbox.style.opacity = '1';
  sandbox.style.pointerEvents = 'none';
  sandbox.style.overflow = 'visible';

  // 2. Clone the invoice document
  const clone = target.cloneNode(true) as HTMLElement;
  clone.id = 'invoice-clone-for-export';
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.padding = '60px 53px 53px 53px'; // Standard A4 print margins (16mm top, 14mm sides)
  clone.style.width = '794px';
  clone.style.maxWidth = '794px';
  clone.style.minHeight = '1123px'; // Strict A4 height at 96 DPI (297mm)
  clone.style.boxSizing = 'border-box';
  clone.style.boxShadow = 'none';
  clone.style.border = 'none';
  clone.style.borderRadius = '0';
  clone.style.backgroundColor = '#ffffff';
  clone.style.display = 'flex';
  clone.style.flexDirection = 'column';
  clone.style.justifyContent = 'space-between';
  clone.style.visibility = 'visible';
  clone.style.color = '#0f172a';

  sandbox.appendChild(clone);
  document.body.appendChild(sandbox);

  try {
    // 3. Ensure fonts & images are fully loaded
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const imgs = Array.from(clone.querySelectorAll('img'));
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) return resolve(true);
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
          })
      )
    );

    // Brief frame wait for layout paint
    await new Promise((r) => setTimeout(r, 80));

    // 4. Capture with html2canvas (strict A4 resolution)
    const exportHeight = Math.max(1123, clone.offsetHeight);
    const rawCanvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff', // Explicit solid white
      scrollX: 0,
      scrollY: 0,
      width: 794,
      height: exportHeight,
      windowWidth: 794,
      logging: false,
    });

    // 5. Draw onto a guaranteed 100% opaque white canvas (removes any alpha channel)
    const opaqueCanvas = document.createElement('canvas');
    opaqueCanvas.width = rawCanvas.width;
    opaqueCanvas.height = rawCanvas.height;
    const ctx = opaqueCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, opaqueCanvas.width, opaqueCanvas.height);
      ctx.drawImage(rawCanvas, 0, 0);
      return opaqueCanvas;
    }

    return rawCanvas;
  } finally {
    if (sandbox.parentNode) {
      sandbox.parentNode.removeChild(sandbox);
    }
  }
}

export async function downloadPdf(elementId: string, filename: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = await createInvoiceCanvas(elementId);
    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas render failed');
    }

    const { jsPDF } = await import('jspdf');
    // Use JPEG with 0.98 quality: JPEG HAS NO ALPHA CHANNEL, completely eliminating any black background bug in jsPDF
    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const contentHeight = (canvas.height * pageWidth) / canvas.width;

    // Fill page background with pure white
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    if (contentHeight <= pageHeight + 4) {
      // Single page strict A4 (fits 100% on standard 210mm x 297mm sheet)
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, Math.min(pageHeight, contentHeight), undefined, 'FAST');
    } else {
      // Multi-page document
      let heightLeft = contentHeight;
      let position = 0;
      const printableHeight = pageHeight;

      pdf.addImage(imgData, 'JPEG', 0, position, pageWidth, contentHeight, undefined, 'FAST');
      heightLeft -= printableHeight;

      while (heightLeft > 5) {
        position = -(contentHeight - heightLeft);
        pdf.addPage();
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
        pdf.addImage(imgData, 'JPEG', 0, position, pageWidth, contentHeight, undefined, 'FAST');
        heightLeft -= printableHeight;
      }
    }

    pdf.save(`${filename || 'CodePhilic-Invoice'}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Direct PDF generation fallback: opening print dialog to Save as PDF.');
    window.print();
    return false;
  }
}

export async function downloadPng(elementId: string, filename: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = await createInvoiceCanvas(elementId);
    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas render failed');
    }

    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.href = image;
    link.download = `${filename || 'CodePhilic-Invoice'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Error exporting PNG:', err);
    return false;
  }
}

export function downloadJson(data: InvoiceData, filename: string): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename || 'CodePhilic-Invoice'}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportCsv(data: InvoiceData, filename: string): void {
  const headers = ['Item #', 'Title', 'Description', 'Quantity/Hours', 'Rate', 'Total'];
  const rows = data.items.map((item, index) => [
    index + 1,
    `"${item.title.replace(/"/g, '""')}"`,
    `"${item.description.replace(/"/g, '""')}"`,
    item.quantity,
    item.rate !== undefined && item.rate !== null && item.rate > 0 ? item.rate : '—',
    (item.amount !== undefined && item.amount !== null && !isNaN(item.amount) && item.amount > 0
      ? Number(item.amount)
      : item.quantity * (item.rate || 0)
    ).toFixed(2),
  ]);

  const csvContent = [
    `"Invoice Number","${data.meta.invoiceNumber}"`,
    `"Issue Date","${data.meta.issueDate}"`,
    `"Due Date","${data.meta.dueDate}"`,
    `"Client","${data.client.companyName}"`,
    `"Currency","${data.meta.currency}"`,
    '',
    headers.join(','),
    ...rows.map(r => r.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename || 'CodePhilic-Invoice'}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function copyShareText(data: InvoiceData): Promise<boolean> {
  const subtotal = data.items.reduce(
    (acc, item) => acc + (item.amount !== undefined && item.amount !== null && !isNaN(item.amount) && item.amount > 0 ? Number(item.amount) : item.quantity * (item.rate || 0)),
    0
  );
  const discountAmount =
    data.meta.discountType === 'percentage'
      ? (subtotal * data.meta.discountValue) / 100
      : data.meta.discountValue;
  const taxable = subtotal - discountAmount;
  const taxAmount = (taxable * data.meta.taxRate) / 100;
  const grandTotal = taxable + taxAmount + (data.meta.shippingFee || 0);

  const text = `
CODEPHILIC LIMITED - INVOICE ${data.meta.invoiceNumber}
----------------------------------------
To: ${data.client.companyName} (${data.client.contactPerson || 'Accounts'})
Date: ${data.meta.issueDate} | Due: ${data.meta.dueDate}
Status: ${data.meta.status}
Total Amount: ${data.meta.currencySymbol}${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${data.meta.currency}

Items:
${data.items.map((it, idx) => {
  const itemTotal = it.amount !== undefined && it.amount !== null && !isNaN(it.amount) && it.amount > 0 ? Number(it.amount) : it.quantity * (it.rate || 0);
  const rateStr = it.rate !== undefined && it.rate !== null && it.rate > 0 ? ` @ ${data.meta.currencySymbol}${it.rate}` : '';
  return `${idx + 1}. ${it.title} (${it.quantity}${it.unit ? ' ' + it.unit : ''}${rateStr}) = ${data.meta.currencySymbol}${itemTotal.toLocaleString()}`;
}).join('\n')}

Bank Details:
Bank: ${data.payment.bankName}
A/C Name: ${data.payment.accountName}
A/C No: ${data.payment.accountNumber}
SWIFT: ${data.payment.swiftBic}

CodePhilic Limited | "We Architect Imagination"
https://codephilic.com
`.trim();

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}