import SectionPage from '@/components/SectionPage';
import { Column } from '@/lib/types';

const columns: Column[] = [
  { key: 'id', label: 'ID', type: 'text', readOnly: true },
  { key: 'client_id', label: 'Client ID', type: 'number' },
  { key: 'nickname', label: 'Name', type: 'text' },
  { key: 'species', label: 'Species', type: 'select', options: ['species.dog', 'species.cat', 'species.bird', 'species.rabbit', 'species.other'] },
  { key: 'breed', label: 'Breed', type: 'text' },
  { key: 'crossbreed', label: 'Crossbreed', type: 'text' },
  { key: 'mix_with', label: 'Mix With', type: 'text' },
  { key: 'color', label: 'Color', type: 'text' },
  { key: 'distinctive_marks', label: 'Distinctive Marks', type: 'text' },
  { key: 'birthday', label: 'Birthday', type: 'date' },
  { key: 'gender', label: 'Gender', type: 'select', options: ['male', 'female'] },
  { key: 'chip_number', label: 'Chip Number', type: 'text' },
  { key: 'rabic_tag_number', label: 'Rabies Tag', type: 'text' },
  { key: 'microchip_location', label: 'Microchip Location', type: 'text' },
  { key: 'insurance_number', label: 'Insurance No.', type: 'text' },
  { key: 'passport', label: 'Passport', type: 'text' },
  { key: 'pet_description', label: 'Description', type: 'textarea' },
  { key: 'weight', label: 'Weight', type: 'text' },
  { key: 'allergies', label: 'Allergies', type: 'textarea' },
  { key: 'blood_type', label: 'Blood Type', type: 'text' },
  { key: 'hormonal_status', label: 'Hormonal Status', type: 'text' },
  { key: 'obs', label: 'Notes', type: 'textarea' },
];

export default function PetsPage() {
  return <SectionPage title="Pets" apiPath="pets" columns={columns} />;
}
