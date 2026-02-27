import SectionPage from '@/components/SectionPage';
import { Column } from '@/lib/types';

const columns: Column[] = [
  { key: 'id', label: 'ID', type: 'text', readOnly: true },
  { key: 'record_id', label: 'Record ID', type: 'number' },
  { key: 'vet_id', label: 'Vet ID', type: 'number' },
  { key: 'pet_id', label: 'Pet ID', type: 'number' },
  { key: 'product_name', label: 'Product', type: 'text' },
  { key: 'quantity', label: 'Quantity', type: 'text' },
  { key: 'unit', label: 'Unit', type: 'text' },
  { key: 'label', label: 'Label', type: 'textarea' },
  { key: 'recommendations', label: 'Recommendations', type: 'textarea' },
  { key: 'prescribed_at', label: 'Prescribed At', type: 'date' },
  { key: 'expires_at', label: 'Expires At', type: 'date' },
  { key: 'status', label: 'Status', type: 'select', options: ['ACTIVE', 'INACTIVE', 'EXPIRED'] },
  { key: 'internal_notes', label: 'Internal Notes', type: 'textarea' },
  { key: 'created_at', label: 'Created At', type: 'text', readOnly: true },
  { key: 'updated_at', label: 'Updated At', type: 'text', readOnly: true },
];

export default function PrescriptionsPage() {
  return <SectionPage title="Prescriptions" apiPath="prescriptions" columns={columns} />;
}
