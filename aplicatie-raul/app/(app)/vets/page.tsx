import SectionPage from '@/components/SectionPage';
import { Column } from '@/lib/types';

const columns: Column[] = [
  { key: 'id', label: 'ID', type: 'text', readOnly: true },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'first_name', label: 'First Name', type: 'text' },
  { key: 'last_name', label: 'Last Name', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['0', '1'] },
  { key: 'license_number', label: 'License No.', type: 'text' },
  { key: 'created_at', label: 'Created At', type: 'text', readOnly: true },
  { key: 'updated_at', label: 'Updated At', type: 'text', readOnly: true },
];

export default function VetsPage() {
  return <SectionPage title="Veterinarians" apiPath="vets" columns={columns} />;
}
