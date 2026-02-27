import SectionPage from '@/components/SectionPage';
import { Column } from '@/lib/types';

const columns: Column[] = [
  { key: 'id', label: 'ID', type: 'text', readOnly: true },
  { key: 'first_name', label: 'First Name', type: 'text' },
  { key: 'last_name', label: 'Last Name', type: 'text' },
  { key: 'birthdate', label: 'Birthdate', type: 'date' },
  { key: 'address', label: 'Address', type: 'text' },
  { key: 'city', label: 'City', type: 'text' },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'secondary_phone', label: 'Secondary Phone', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'personal_id_number', label: 'Personal ID', type: 'text' },
  { key: 'id_card_number', label: 'ID Card', type: 'text' },
  { key: 'obs', label: 'Notes', type: 'textarea' },
];

export default function ClientsPage() {
  return <SectionPage title="Clients" apiPath="clients" columns={columns} />;
}
