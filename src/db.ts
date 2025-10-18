// src/db.ts
import { createPool } from 'mysql2/promise';

// Cargamos las variables de entorno
const env = process.env;

const DB_HOST = env.DB_HOST || env.MYSQLHOST;
const DB_PORT = Number(env.DB_PORT || env.MYSQLPORT || 3306);
const DB_USER = env.DB_USER || env.MYSQLUSER;
const DB_PASSWORD = env.DB_PASSWORD || env.MYSQLPASSWORD;
const DB_NAME = env.DB_NAME || env.MYSQLDATABASE;
const DB_SSL = env.DB_SSL; // Para SSL si se requiere en Railway

// SSL solo si es un servidor proxy o Railway
const shouldUseSSL =
  (DB_SSL && DB_SSL.toLowerCase() === 'true') ||
  (!!DB_HOST && /(\.rlwy\.net|railway|proxy)/i.test(DB_HOST));

export const pool = createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 6,
  ...(shouldUseSSL ? { ssl: { rejectUnauthorized: false } } : {})
});

// Para verificar la conexión
export async function pingDB() {
  const [rows]: any = await pool.query('SELECT NOW() AS now');
  return rows?.[0]?.now;
}
