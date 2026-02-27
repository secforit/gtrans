import SectionPage from '@/components/SectionPage';
import { Column } from '@/lib/types';

const columns: Column[] = [
  { key: 'id', label: 'ID', type: 'text', readOnly: true },
  { key: 'date', label: 'Date', type: 'date' },
  { key: 'pet_id', label: 'Pet ID', type: 'number' },
  { key: 'pet', label: 'Pet Name', type: 'text' },
  { key: 'vet', label: 'Vet', type: 'text' },
  { key: 'service', label: 'Service', type: 'text' },
  { key: 'diagnosis', label: 'Diagnosis', type: 'text' },
  { key: 'diagnosis_description', label: 'Diagnosis Desc.', type: 'textarea' },
  { key: 'presumptive_diagnosis', label: 'Presumptive Diag.', type: 'text' },
  { key: 'treatment_description', label: 'Treatment', type: 'textarea' },
  { key: 'recommendations', label: 'Recommendations', type: 'textarea' },
  { key: 'comments', label: 'Comments', type: 'textarea' },
];

export default function RecordsPage() {
  return <SectionPage title="Medical Records" apiPath="records" columns={columns} />;
}
