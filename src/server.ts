import express from "express";
import type { Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";

import { createPool } from "mysql2/promise";
import type { Pool } from "mysql2/promise";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api/register", async (req: Request, res: Response) => {
  const body = req.body as { sex: number; grade: number; answers: number[] };

  // Validación básica
  if (body.sex !== 0 && body.sex !== 1) {
    return res.status(400).json({ error: "sexo inválido (1=hombre, 0=mujer)" });
  }
  if (![0, 4, 5].includes(body.grade)) {
    return res.status(400).json({ error: "grado inválido (4, 5 o 0)" });
  }
  

  try {
    const [result]: any = await pool.query(
      "INSERT INTO respondent (sex, grade) VALUES (?, ?)",
      [body.sex, body.grade]
    );
    const id = result.insertId;
    res.json({ ok: true, id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "error guardando datos" });
  }
});


app.post("/api/submit", async (req: Request, res: Response) => {
  const { respondentId, answers } = req.body as { respondentId: number; answers: number[] };

  // Validación de los datos
  if (!respondentId || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: "Faltan datos para enviar respuestas" });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const placeholders = answers.map(() => "(?, ?, ?)").join(",");
    const values: any[] = [];
    answers.forEach((v, i) => values.push(respondentId, i + 1, v)); // `question_no = i+1`

    // Guardar las respuestas en la tabla `answer`
    await conn.execute(
      `INSERT INTO answer (respondent_id, question_no, value) VALUES ${placeholders}`,
      values
    );

    await conn.commit();  // Confirmar la transacción
    res.json({ ok: true });  // Responder con éxito
  } catch (e) {
    await conn.rollback();  // Si hay un error, deshacer la transacción
    console.error(e);
    res.status(500).json({ error: "Error guardando respuestas" });
  } finally {
    conn.release();
  }
});

const pool: Pool = createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: 30
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.get("/api/questions", async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;  // Página solicitada (por defecto la página 1)
  const limit = 13;  // Número de preguntas por página
  const offset = (page - 1) * limit;  // Calcular el desplazamiento (offset) para las preguntas

  try {
    const [rows] = await pool.query(
      "SELECT question_no, text_a, text_b FROM question ORDER BY question_no LIMIT ? OFFSET ?",
      [limit, offset]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "No se pudieron listar las preguntas" });
  }
});


const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});

export { app, pool };
