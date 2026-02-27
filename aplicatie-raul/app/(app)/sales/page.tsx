import SectionPage from '@/components/SectionPage';
import { Column } from '@/lib/types';

const columns: Column[] = [
  { key: 'id', label: 'ID', type: 'text', readOnly: true },
  { key: 'vet_id', label: 'Vet ID', type: 'number' },
  { key: 'customer_id', label: 'Customer ID', type: 'number' },
  { key: 'invoice_id', label: 'Invoice ID', type: 'text' },
  { key: 'subtotal', label: 'Subtotal', type: 'text' },
  { key: 'total', label: 'Total', type: 'text' },
  { key: 'tax_amount', label: 'Tax', type: 'text' },
  { key: 'amount_paid', label: 'Amount Paid', type: 'text' },
  { key: 'payment_type', label: 'Payment Type', type: 'select', options: ['cash', 'card', 'online', '0'] },
  { key: 'status', label: 'Status', type: 'select', options: ['0', '1', '2'] },
  { key: 'payment_date', label: 'Payment Date', type: 'date' },
  { key: 'created_at', label: 'Created At', type: 'text', readOnly: true },
  { key: 'updated_at', label: 'Updated At', type: 'text', readOnly: true },
];

export default function SalesPage() {
  return <SectionPage title="Sales" apiPath="sales" columns={columns} />;
}
