export type InvoiceStatus = 'PAID' | 'PENDING' | 'OVERDUE' | 'DRAFT' | 'PARTIALLY_PAID';

export type InvoiceTheme = 'signature' | 'cyber-dark' | 'minimal';

export interface InvoiceItem {
  id: string;
  title: string;
  description: string;
  quantity: number;
  rate: number;
  taxable?: boolean;
}

export interface CompanyDetails {
  name: string;
  legalName: string;
  tagline: string;
  regNo: string;
  vatNo: string;
  address: string;
  cityCountry: string;
  email: string;
  phone: string;
  website: string;
  logoUrl: string;
}

export interface ClientDetails {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  cityCountry: string;
  taxId: string;
  poNumber: string;
}

export interface PaymentDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  swiftBic: string;
  iban?: string;
  paymentMethod: string;
  paymentLink?: string;
  upiOrId?: string;
  cashReceiver?: string;
  cashInstructions?: string;
}

export interface InvoiceMeta {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  paymentTerms: string;
  currency: string;
  currencySymbol: string;
  status: InvoiceStatus;
  theme: InvoiceTheme;
  notes: string;
  terms: string;
  signatoryName: string;
  signatoryRole: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  taxRate: number;
  shippingFee: number;
  amountPaid: number;
  paidSealStyle?: 'circular' | 'stamp' | 'badge';
  paidSealColor?: 'emerald' | 'red' | 'blue';
  showQrCode?: boolean;
  paymentMethodType?: 'bank' | 'cash' | 'none';
}

export interface InvoiceData {
  id: string;
  createdAt: string;
  updatedAt: string;
  company: CompanyDetails;
  client: ClientDetails;
  items: InvoiceItem[];
  meta: InvoiceMeta;
  payment: PaymentDetails;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  label: string;
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', label: 'USD - US Dollar ($)' },
  { code: 'EUR', symbol: '\u20ac', label: 'EUR - Euro (\u20ac)' },
  { code: 'GBP', symbol: '\u00a3', label: 'GBP - British Pound (\u00a3)' },
  { code: 'BDT', symbol: '\u09f3', label: 'BDT - Bangladeshi Taka (\u09f3)' },
  { code: 'INR', symbol: '\u20b9', label: 'INR - Indian Rupee (\u20b9)' },
  { code: 'CAD', symbol: 'CA$', label: 'CAD - Canadian Dollar (CA$)' },
  { code: 'AUD', symbol: 'AU$', label: 'AUD - Australian Dollar (AU$)' },
  { code: 'SGD', symbol: 'SG$', label: 'SGD - Singapore Dollar (SG$)' },
  { code: 'AED', symbol: 'AED', label: 'AED - UAE Dirham (AED)' },
  { code: 'JPY', symbol: '\u00a5', label: 'JPY - Japanese Yen (\u00a5)' },
];
