import SectionPage from '@/components/SectionPage';
import { Column } from '@/lib/types';

const columns: Column[] = [
  { key: 'id', label: 'ID', type: 'text', readOnly: true },
  { key: 'pet_id', label: 'Pet ID', type: 'number' },
  { key: 'protocol_name', label: 'Protocol', type: 'text' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'administration_date', label: 'Administration Date', type: 'date' },
  { key: 'due_date', label: 'Due Date', type: 'date' },
];

export default function RemindersPage() {
  return <SectionPage title="Reminders" apiPath="reminders" columns={columns} />;
}
