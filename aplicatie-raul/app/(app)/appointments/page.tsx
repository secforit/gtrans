import SectionPage from '@/components/SectionPage';
import { Column } from '@/lib/types';

const columns: Column[] = [
  { key: 'id', label: 'ID', type: 'text', readOnly: true },
  { key: 'patient_id', label: 'Pet ID', type: 'number' },
  { key: 'vet_id', label: 'Vet ID', type: 'number' },
  { key: 'service', label: 'Service', type: 'text' },
  { key: 'observations', label: 'Observations', type: 'textarea' },
  { key: 'date', label: 'Date', type: 'text' },
  { key: 'duration', label: 'Duration (min)', type: 'number' },
  { key: 'reason', label: 'Reason', type: 'text' },
  { key: 'notification_message', label: 'Notification', type: 'textarea' },
  { key: 'user_note', label: 'User Note', type: 'textarea' },
];

export default function AppointmentsPage() {
  return <SectionPage title="Appointments" apiPath="appointments" columns={columns} />;
}
