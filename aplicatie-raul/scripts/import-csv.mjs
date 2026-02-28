import { createClient } from '@supabase/supabase-js';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CSV_DIR = path.join(ROOT, 'CSVs');

// Load env vars from .env.local
const envPath = path.join(ROOT, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

function readCsv(name) {
  const filePath = path.join(CSV_DIR, name, `${name}.csv`);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ CSV not found: ${filePath}`);
    return [];
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  const result = Papa.parse(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: h => h.trim(),
  });
  return result.data;
}

function val(v) {
  if (v === undefined || v === null || v === '') return null;
  return String(v).trim();
}

function num(v) {
  const s = val(v);
  if (s === null) return null;
  const n = Number(s);
  return isNaN(n) ? null : n;
}

function dedup(rows) {
  const seen = new Map();
  for (const row of rows) seen.set(row.id, row);
  return [...seen.values()];
}

async function upsert(table, rows) {
  if (rows.length === 0) return 0;
  const unique = dedup(rows);
  const BATCH = 500;
  let total = 0;
  for (let i = 0; i < unique.length; i += BATCH) {
    const batch = unique.slice(i, i + BATCH);
    const { error } = await supabase
      .from(table)
      .upsert(batch, { onConflict: 'id' });
    if (error) {
      console.error(`  ❌ Error upserting into ${table}:`, error.message);
      throw error;
    }
    total += batch.length;
  }
  return total;
}

// ── 1. pets_clients_export → clients + pets ─────────────────────────────
console.log('\n📂 Importing pets_clients_export...');
const petsClients = readCsv('pets_clients_export');

const clientMap = new Map();
const petRows = [];

for (const row of petsClients) {
  const userId = num(row['user_id']);
  if (userId && !clientMap.has(userId)) {
    clientMap.set(userId, {
      id: userId,
      first_name: val(row['name']),
      last_name: val(row['last_name']),
      birthdate: val(row['birthdate']),
      address: val(row['address']),
      city: val(row['city']),
      phone: val(row['phone']),
      secondary_phone: val(row['secondary_phone']),
      email: val(row['email']),
      personal_id_number: val(row['personal_id_number']),
      id_card_number: val(row['id_card_number']),
      obs: val(row['client_obs']),
      number: val(row['number']),
      archive_type_id: val(row['archive_type_id']),
      reason: val(row['reason']),
    });
  }
  const petId = num(row['id']);
  if (petId) {
    petRows.push({
      id: petId,
      client_id: userId,
      nickname: val(row['nickname']),
      species: val(row['Species']),
      breed: val(row['breed']),
      crossbreed: val(row['crossbreed']),
      mix_with: val(row['mix with']),
      color: val(row['color']),
      distinctive_marks: val(row['distinctive_marks']),
      birthday: val(row['birthday']),
      gender: val(row['gender']),
      chip_number: val(row['chip_number']),
      rabic_tag_number: val(row['rabic_tag_number']),
      microchip_location: val(row['microchip_location']),
      insurance_number: val(row['insurance_number']),
      passport: val(row['passport']),
      pet_description: val(row['pet_description']),
      weight: val(row['weight']),
      allergies: val(row['allergies']),
      blood_type: val(row['blood_type']),
      hormonal_status: val(row['hormonal_status']),
      obs: val(row['pet_obs']),
      nr_recs: val(row['nr_recs']),
    });
  }
}

const clientRows = [...clientMap.values()];
const clientCount = await upsert('clients', clientRows);
console.log(`  ✓ Clients: ${clientCount}`);
const petCount = await upsert('pets', petRows);
console.log(`  ✓ Pets:    ${petCount}`);

// ── 2. vets_export ──────────────────────────────────────────────────────
console.log('\n📂 Importing vets_export...');
const vetsData = readCsv('vets_export');
const vetRows = vetsData
  .filter(row => val(row['id']))
  .map(row => ({
    id: num(row['id']),
    email: val(row['email']),
    first_name: val(row['first_name']),
    last_name: val(row['last_name']),
    title: val(row['title']),
    phone: val(row['phone']),
    status: val(row['status']),
    license_number: val(row['license_number']),
    created_at: val(row['created_at']),
    updated_at: val(row['updated_at']),
    created_date: val(row['created_date']),
    is_urgent: val(row['is_urgent']),
    tooltip: val(row['tooltip']),
    deleted_at: val(row['deleted_at']),
  }));
console.log(`  ✓ Vets: ${await upsert('vets', vetRows)}`);

// ── 3. appointments_export ──────────────────────────────────────────────
console.log('\n📂 Importing appointments_export...');
const appointmentsData = readCsv('appointments_export');
const apptRows = appointmentsData
  .filter(row => val(row['id']))
  .map(row => ({
    id: num(row['id']),
    patient_id: num(row['patient_id']),
    vet_id: num(row['vet_id']),
    service: val(row['Service']),
    observations: val(row['observations']),
    date: val(row['Date']),
    duration: val(row['duration']),
    reason: val(row['Reason']),
    notification_message: val(row['notification_message']),
    user_note: val(row['user_note']),
  }));
console.log(`  ✓ Appointments: ${await upsert('appointments', apptRows)}`);

// ── 4. records_export ───────────────────────────────────────────────────
console.log('\n📂 Importing records_export...');
const recordsData = readCsv('records_export');
const recordRows = recordsData
  .filter(row => val(row['file case ID']))
  .map(row => ({
    id: num(row['file case ID']),
    date: val(row['date']),
    pet_id: num(row['pet_id']),
    pet: val(row['pet']),
    vet: val(row['vet']),
    service: val(row['Service']),
    diagnosis: val(row['Diagnosis']),
    diagnosis_description: val(row['Diagnosis description']),
    presumptive_diagnosis: val(row['presumptive_diagnosis']),
    treatment_description: val(row['Treatment description']),
    recommendations: val(row['recommendations']),
    comments: val(row['comments']),
  }));
console.log(`  ✓ Records: ${await upsert('records', recordRows)}`);

// ── 5. prescriptions_export ─────────────────────────────────────────────
console.log('\n📂 Importing prescriptions_export...');
const rxData = readCsv('prescriptions_export');
const rxRows = rxData
  .filter(row => val(row['id']))
  .map(row => ({
    id: num(row['id']),
    record_id: num(row['record_id']),
    clinic_id: val(row['clinic_id']),
    vet_id: num(row['vet_id']),
    pet_id: num(row['pet_id']),
    product_id: val(row['product_id']),
    product_name: val(row['product_name']),
    type: val(row['type']),
    quantity: val(row['quantity']),
    unit_id: val(row['unit_id']),
    unit: val(row['unit']),
    max_refills: val(row['max_refills']),
    label: val(row['label']),
    recommendations: val(row['recommendations']),
    prescribed_at: val(row['prescribed_at']),
    expires_at: val(row['expires_at']),
    status: val(row['status']),
    delivery_status: val(row['delivery_status']),
    delivery_provider: val(row['delivery_provider']),
    internal_notes: val(row['internal_notes']),
    product_ext_id: val(row['product_ext_id']),
    prescription_ext_id: val(row['prescription_ext_id']),
    order_ext_id: val(row['order_ext_id']),
    external_source: val(row['external_source']),
    external_id: val(row['external_id']),
    created_at: val(row['created_at']),
    updated_at: val(row['updated_at']),
    deleted_at: val(row['deleted_at']),
  }));
console.log(`  ✓ Prescriptions: ${await upsert('prescriptions', rxRows)}`);

// ── 6. reminders_export ─────────────────────────────────────────────────
console.log('\n📂 Importing reminders_export...');
const remindersData = readCsv('reminders_export');
const reminderRows = remindersData
  .filter(row => val(row['id']))
  .map(row => ({
    id: num(row['id']),
    pet_id: num(row['pet_id']),
    protocol_usage_itemable_type: val(row['protocol_usage_itemable_type']),
    protocol_name: val(row['reminder_protocol_name']),
    name: val(row['name']),
    administration_date: val(row['administration_date']),
    due_date: val(row['due_date']),
  }));
console.log(`  ✓ Reminders: ${await upsert('reminders', reminderRows)}`);

// ── 7. sales_export ─────────────────────────────────────────────────────
console.log('\n📂 Importing sales_export...');
const salesData = readCsv('sales_export');
const saleRows = salesData
  .filter(row => val(row['id']))
  .map(row => ({
    id: num(row['id']),
    vet_id: num(row['vet_id']),
    clinic_id: val(row['clinic_id']),
    customer_id: num(row['customer_id']),
    invoice_id: val(row['invoice_id']),
    type: val(row['type']),
    consolidated: val(row['consolidated']),
    consolidated_by: val(row['consolidated_by']),
    tax_applied_order: val(row['tax_applied_order']),
    subtotal: val(row['subtotal']),
    products_discount_amount: val(row['products_discount_amount']),
    services_discount_amount: val(row['services_discount_amount']),
    global_discount_amount: val(row['global_discount_amount']),
    tax_amount: val(row['tax_amount']),
    total: val(row['total']),
    discount_type: val(row['discount_type']),
    discount_percentage: val(row['discount_percentage']),
    discount: val(row['discount']),
    products_discount_net: val(row['products_discount_net']),
    products_discount_tax: val(row['products_discount_tax']),
    products_discount_gross: val(row['products_discount_gross']),
    services_discount_net: val(row['services_discount_net']),
    services_discount_tax: val(row['services_discount_tax']),
    services_discount_gross: val(row['services_discount_gross']),
    global_discount_net: val(row['global_discount_net']),
    global_discount_tax: val(row['global_discount_tax']),
    global_discount_gross: val(row['global_discount_gross']),
    amount_paid: val(row['amount_paid']),
    payment_type: val(row['payment_type']),
    is_online: val(row['is_online']),
    status: val(row['status']),
    edit_state: val(row['edit_state']),
    hide_details: val(row['hide_details']),
    payment_date: val(row['payment_date']),
    calculation_version: val(row['calculation_version']),
    external_source: val(row['external_source']),
    external_id: val(row['external_id']),
    created_at: val(row['created_at']),
    updated_at: val(row['updated_at']),
    deleted_at: val(row['deleted_at']),
    first_line_item_added_at: val(row['first_line_item_added_at']),
    checkout_at: val(row['checkout_at']),
    taxable_at: val(row['taxable_at']),
    closed_at: val(row['closed_at']),
    hidden_at: val(row['hidden_at']),
  }));
console.log(`  ✓ Sales: ${await upsert('sales', saleRows)}`);

// ── Summary ─────────────────────────────────────────────────────────────
console.log('\n✅ Import complete!\n');
const tables = ['clients', 'pets', 'vets', 'appointments', 'records', 'prescriptions', 'reminders', 'sales'];
for (const t of tables) {
  const { count } = await supabase.from(t).select('*', { count: 'exact', head: true });
  console.log(`  ${t}: ${count} rows`);
}
