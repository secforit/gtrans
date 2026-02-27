import Database from 'better-sqlite3';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CSV_DIR = path.join(ROOT, 'CSVs');
const DB_PATH = path.join(ROOT, 'data', 'veterinar.db');

// Ensure data directory exists
fs.mkdirSync(path.join(ROOT, 'data'), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = OFF'); // OFF during bulk import for speed

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

// ── Schema ─────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY,
    first_name TEXT, last_name TEXT, birthdate TEXT,
    address TEXT, city TEXT, phone TEXT, secondary_phone TEXT,
    email TEXT, personal_id_number TEXT, id_card_number TEXT, obs TEXT
  );
  CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY, client_id INTEGER,
    nickname TEXT, species TEXT, breed TEXT, crossbreed TEXT, mix_with TEXT,
    color TEXT, distinctive_marks TEXT, birthday TEXT, gender TEXT,
    chip_number TEXT, rabic_tag_number TEXT, microchip_location TEXT,
    insurance_number TEXT, passport TEXT, pet_description TEXT,
    weight TEXT, allergies TEXT, blood_type TEXT, hormonal_status TEXT, obs TEXT
  );
  CREATE TABLE IF NOT EXISTS vets (
    id INTEGER PRIMARY KEY, email TEXT, first_name TEXT, last_name TEXT,
    title TEXT, phone TEXT, status TEXT, license_number TEXT,
    created_at TEXT, updated_at TEXT
  );
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY, patient_id INTEGER, vet_id INTEGER,
    service TEXT, observations TEXT, date TEXT, duration TEXT,
    reason TEXT, notification_message TEXT, user_note TEXT
  );
  CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY, date TEXT, pet_id INTEGER, pet TEXT, vet TEXT,
    service TEXT, diagnosis TEXT, diagnosis_description TEXT,
    presumptive_diagnosis TEXT, treatment_description TEXT,
    recommendations TEXT, comments TEXT
  );
  CREATE TABLE IF NOT EXISTS prescriptions (
    id INTEGER PRIMARY KEY, record_id INTEGER, vet_id INTEGER, pet_id INTEGER,
    product_name TEXT, quantity TEXT, unit TEXT, label TEXT,
    recommendations TEXT, prescribed_at TEXT, expires_at TEXT,
    status TEXT, internal_notes TEXT, created_at TEXT, updated_at TEXT
  );
  CREATE TABLE IF NOT EXISTS reminders (
    id INTEGER PRIMARY KEY, pet_id INTEGER, protocol_name TEXT, name TEXT,
    administration_date TEXT, due_date TEXT
  );
  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY, vet_id INTEGER, customer_id INTEGER,
    invoice_id TEXT, subtotal TEXT, total TEXT, tax_amount TEXT,
    amount_paid TEXT, payment_type TEXT, status TEXT,
    payment_date TEXT, created_at TEXT, updated_at TEXT
  );
`);

// ── 1. pets_clients_export → clients + pets ─────────────────────────────
console.log('\n📂 Importing pets_clients_export...');
const petsClients = readCsv('pets_clients_export');

const insertClient = db.prepare(`
  INSERT OR REPLACE INTO clients
    (id, first_name, last_name, birthdate, address, city, phone, secondary_phone,
     email, personal_id_number, id_card_number, obs)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const insertPet = db.prepare(`
  INSERT OR REPLACE INTO pets
    (id, client_id, nickname, species, breed, crossbreed, mix_with, color,
     distinctive_marks, birthday, gender, chip_number, rabic_tag_number,
     microchip_location, insurance_number, passport, pet_description,
     weight, allergies, blood_type, hormonal_status, obs)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const seenClients = new Set();
let clientCount = 0;
let petCount = 0;

const importPetsClients = db.transaction(() => {
  for (const row of petsClients) {
    // Client
    const userId = val(row['user_id']);
    if (userId && !seenClients.has(userId)) {
      seenClients.add(userId);
      insertClient.run(
        userId,
        val(row['name']),
        val(row['last_name']),
        val(row['birthdate']),
        val(row['address']),
        val(row['city']),
        val(row['phone']),
        val(row['secondary_phone']),
        val(row['email']),
        val(row['personal_id_number']),
        val(row['id_card_number']),
        val(row['client_obs'])
      );
      clientCount++;
    }
    // Pet
    const petId = val(row['id']);
    if (petId) {
      insertPet.run(
        petId,
        userId,
        val(row['nickname']),
        val(row['Species']),
        val(row['breed']),
        val(row['crossbreed']),
        val(row['mix with']),
        val(row['color']),
        val(row['distinctive_marks']),
        val(row['birthday']),
        val(row['gender']),
        val(row['chip_number']),
        val(row['rabic_tag_number']),
        val(row['microchip_location']),
        val(row['insurance_number']),
        val(row['passport']),
        val(row['pet_description']),
        val(row['weight']),
        val(row['allergies']),
        val(row['blood_type']),
        val(row['hormonal_status']),
        val(row['pet_obs'])
      );
      petCount++;
    }
  }
});
importPetsClients();
console.log(`  ✓ Clients: ${clientCount}`);
console.log(`  ✓ Pets:    ${petCount}`);

// ── 2. vets_export ──────────────────────────────────────────────────────
console.log('\n📂 Importing vets_export...');
const vetsData = readCsv('vets_export');
const insertVet = db.prepare(`
  INSERT OR REPLACE INTO vets
    (id, email, first_name, last_name, title, phone, status, license_number, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const importVets = db.transaction(() => {
  for (const row of vetsData) {
    if (val(row['id'])) {
      insertVet.run(
        val(row['id']), val(row['email']), val(row['first_name']),
        val(row['last_name']), val(row['title']), val(row['phone']),
        val(row['status']), val(row['license_number']),
        val(row['created_at']), val(row['updated_at'])
      );
    }
  }
});
importVets();
console.log(`  ✓ Vets: ${vetsData.length}`);

// ── 3. appointments_export ──────────────────────────────────────────────
console.log('\n📂 Importing appointments_export...');
const appointmentsData = readCsv('appointments_export');
const insertAppt = db.prepare(`
  INSERT OR REPLACE INTO appointments
    (id, patient_id, vet_id, service, observations, date, duration, reason, notification_message, user_note)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const importAppts = db.transaction(() => {
  for (const row of appointmentsData) {
    if (val(row['id'])) {
      insertAppt.run(
        val(row['id']), val(row['patient_id']), val(row['vet_id']),
        val(row['Service']), val(row['observations']), val(row['Date']),
        val(row['duration']), val(row['Reason']),
        val(row['notification_message']), val(row['user_note'])
      );
    }
  }
});
importAppts();
console.log(`  ✓ Appointments: ${appointmentsData.length}`);

// ── 4. records_export ───────────────────────────────────────────────────
console.log('\n📂 Importing records_export...');
const recordsData = readCsv('records_export');
const insertRecord = db.prepare(`
  INSERT OR REPLACE INTO records
    (id, date, pet_id, pet, vet, service, diagnosis, diagnosis_description,
     presumptive_diagnosis, treatment_description, recommendations, comments)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const importRecords = db.transaction(() => {
  for (const row of recordsData) {
    const id = val(row['file case ID']);
    if (id) {
      insertRecord.run(
        id, val(row['date']), val(row['pet_id']), val(row['pet']),
        val(row['vet']), val(row['Service']), val(row['Diagnosis']),
        val(row['Diagnosis description']), val(row['presumptive_diagnosis']),
        val(row['Treatment description']), val(row['recommendations']),
        val(row['comments'])
      );
    }
  }
});
importRecords();
console.log(`  ✓ Records: ${recordsData.length}`);

// ── 5. prescriptions_export ─────────────────────────────────────────────
console.log('\n📂 Importing prescriptions_export...');
const rxData = readCsv('prescriptions_export');
const insertRx = db.prepare(`
  INSERT OR REPLACE INTO prescriptions
    (id, record_id, vet_id, pet_id, product_name, quantity, unit, label,
     recommendations, prescribed_at, expires_at, status, internal_notes, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const importRx = db.transaction(() => {
  for (const row of rxData) {
    if (val(row['id'])) {
      insertRx.run(
        val(row['id']), val(row['record_id']), val(row['vet_id']),
        val(row['pet_id']), val(row['product_name']), val(row['quantity']),
        val(row['unit']), val(row['label']), val(row['recommendations']),
        val(row['prescribed_at']), val(row['expires_at']), val(row['status']),
        val(row['internal_notes']), val(row['created_at']), val(row['updated_at'])
      );
    }
  }
});
importRx();
console.log(`  ✓ Prescriptions: ${rxData.length}`);

// ── 6. reminders_export ─────────────────────────────────────────────────
console.log('\n📂 Importing reminders_export...');
const remindersData = readCsv('reminders_export');
const insertReminder = db.prepare(`
  INSERT OR REPLACE INTO reminders
    (id, pet_id, protocol_name, name, administration_date, due_date)
  VALUES (?, ?, ?, ?, ?, ?)
`);
const importReminders = db.transaction(() => {
  for (const row of remindersData) {
    if (val(row['id'])) {
      insertReminder.run(
        val(row['id']), val(row['pet_id']),
        val(row['reminder_protocol_name']),
        val(row['name']), val(row['administration_date']), val(row['due_date'])
      );
    }
  }
});
importReminders();
console.log(`  ✓ Reminders: ${remindersData.length}`);

// ── 7. sales_export ─────────────────────────────────────────────────────
console.log('\n📂 Importing sales_export...');
const salesData = readCsv('sales_export');
const insertSale = db.prepare(`
  INSERT OR REPLACE INTO sales
    (id, vet_id, customer_id, invoice_id, subtotal, total, tax_amount,
     amount_paid, payment_type, status, payment_date, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const importSales = db.transaction(() => {
  for (const row of salesData) {
    if (val(row['id'])) {
      insertSale.run(
        val(row['id']), val(row['vet_id']), val(row['customer_id']),
        val(row['invoice_id']), val(row['subtotal']), val(row['total']),
        val(row['tax_amount']), val(row['amount_paid']), val(row['payment_type']),
        val(row['status']), val(row['payment_date']),
        val(row['created_at']), val(row['updated_at'])
      );
    }
  }
});
importSales();
console.log(`  ✓ Sales: ${salesData.length}`);

// ── Summary ─────────────────────────────────────────────────────────────
console.log('\n✅ Import complete!\n');
const tables = ['clients','pets','vets','appointments','records','prescriptions','reminders','sales'];
for (const t of tables) {
  const { count } = db.prepare(`SELECT COUNT(*) as count FROM ${t}`).get();
  console.log(`  ${t}: ${count} rows`);
}

db.close();
