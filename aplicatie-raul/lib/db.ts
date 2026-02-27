import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'veterinar.db');

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initSchema(db);
  }
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      birthdate TEXT,
      address TEXT,
      city TEXT,
      phone TEXT,
      secondary_phone TEXT,
      email TEXT,
      personal_id_number TEXT,
      id_card_number TEXT,
      obs TEXT
    );

    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY,
      client_id INTEGER,
      nickname TEXT,
      species TEXT,
      breed TEXT,
      crossbreed TEXT,
      mix_with TEXT,
      color TEXT,
      distinctive_marks TEXT,
      birthday TEXT,
      gender TEXT,
      chip_number TEXT,
      rabic_tag_number TEXT,
      microchip_location TEXT,
      insurance_number TEXT,
      passport TEXT,
      pet_description TEXT,
      weight TEXT,
      allergies TEXT,
      blood_type TEXT,
      hormonal_status TEXT,
      obs TEXT,
      FOREIGN KEY (client_id) REFERENCES clients(id)
    );

    CREATE TABLE IF NOT EXISTS vets (
      id INTEGER PRIMARY KEY,
      email TEXT,
      first_name TEXT,
      last_name TEXT,
      title TEXT,
      phone TEXT,
      status TEXT,
      license_number TEXT,
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY,
      patient_id INTEGER,
      vet_id INTEGER,
      service TEXT,
      observations TEXT,
      date TEXT,
      duration TEXT,
      reason TEXT,
      notification_message TEXT,
      user_note TEXT
    );

    CREATE TABLE IF NOT EXISTS records (
      id INTEGER PRIMARY KEY,
      date TEXT,
      pet_id INTEGER,
      pet TEXT,
      vet TEXT,
      service TEXT,
      diagnosis TEXT,
      diagnosis_description TEXT,
      presumptive_diagnosis TEXT,
      treatment_description TEXT,
      recommendations TEXT,
      comments TEXT
    );

    CREATE TABLE IF NOT EXISTS prescriptions (
      id INTEGER PRIMARY KEY,
      record_id INTEGER,
      vet_id INTEGER,
      pet_id INTEGER,
      product_name TEXT,
      quantity TEXT,
      unit TEXT,
      label TEXT,
      recommendations TEXT,
      prescribed_at TEXT,
      expires_at TEXT,
      status TEXT,
      internal_notes TEXT,
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS reminders (
      id INTEGER PRIMARY KEY,
      pet_id INTEGER,
      protocol_name TEXT,
      name TEXT,
      administration_date TEXT,
      due_date TEXT
    );

    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY,
      vet_id INTEGER,
      customer_id INTEGER,
      invoice_id TEXT,
      subtotal TEXT,
      total TEXT,
      tax_amount TEXT,
      amount_paid TEXT,
      payment_type TEXT,
      status TEXT,
      payment_date TEXT,
      created_at TEXT,
      updated_at TEXT
    );
  `);
}

export default getDb;
