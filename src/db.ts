// src/db.ts
import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Obtener las variables de entorno directamente
const {
  MYSQLHOST,
  MYSQLPORT = 3306,
  MYSQLUSER = 'root', // Usuario por defecto es root en Railway
  MYSQLPASSWORD,
  MYSQLDATABASE,
  DB_SSL
} = process.env;

// Configurar el uso de SSL si es necesario
const shouldUseSSL =
  (DB_SSL && DB_SSL.toLowerCase() === 'true') ||
  (MYSQLHOST && /(\.rlwy\.net|railway|proxy)/i.test(MYSQLHOST));

// Crear el pool de conexiones a la base de datos
export const pool = createPool({
  host: MYSQLHOST, // Host de la base de datos proporcionado por Railway
  port: Number(MYSQLPORT), // Puerto (3306 por defecto)
  user: MYSQLUSER, // Usuario de la base de datos (root en Railway)
  password: MYSQLPASSWORD, // Contraseña de la base de datos
  database: MYSQLDATABASE, // Nombre de la base de datos (casm83)
  waitForConnections: true,
  connectionLimit: 6,
  ...(shouldUseSSL ? { ssl: { rejectUnauthorized: false } } : {}) // Habilitar SSL si es necesario
});

// Función de salud para verificar la conexión
export async function pingDB() {
  try {
    const [rows]: any = await pool.query('SELECT NOW() AS now');
    return rows?.[0]?.now; // Devuelve el tiempo actual de la base de datos
  } catch (error) {
    console.error("Error al verificar la conexión a la base de datos:", error);
    throw error; // Lanza el error para que pueda ser manejado
  }
}
