import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { pool, pingDB } from './db';  // Ahora importamos la conexión desde db.ts

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// Ruta para registrar un nuevo participante
app.post('/api/register', async (req: Request, res: Response) => {
  const body = req.body as { sex: number; grade: number; answers?: number[] };

  if (body.sex !== 0 && body.sex !== 1) {
    return res.status(400).json({ error: 'Sexo inválido (1=hombre, 0=mujer)' });
  }
  if (![0, 4, 5].includes(body.grade)) {
    return res.status(400).json({ error: 'Grado inválido (4, 5 o 0)' });
  }

  try {
    const [result]: any = await pool.query(
      'INSERT INTO respondent (sex, grade) VALUES (?, ?)',
      [body.sex, body.grade]
    );
    const id = result.insertId;
    res.json({ ok: true, id });
  } catch (e) {
    console.error('register error:', e);
    res.status(500).json({ error: 'Error guardando datos' });
  }
});

// Ruta para enviar respuestas del participante
app.post('/api/submit', async (req: Request, res: Response) => {
  const { respondentId, answers } = req.body as { respondentId: number; answers: number[] };

  if (!respondentId || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'Faltan datos para enviar respuestas' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const placeholders = answers.map(() => '(?, ?, ?)').join(',');
    const values: any[] = [];
    answers.forEach((v, i) => values.push(respondentId, i + 1, v)); // question_no = i+1

    await conn.execute(
      `INSERT INTO answer (respondent_id, question_no, value) VALUES ${placeholders}`,
      values
    );

    await conn.commit();
    res.json({ ok: true });
  } catch (e) {
    await conn.rollback();
    console.error('submit error:', e);
    res.status(500).json({ error: 'Error guardando respuestas' });
  } finally {
    conn.release();
  }
});

// Ruta para obtener preguntas (paginadas)
app.get('/api/questions', async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = 13;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await pool.query(
      'SELECT question_no, text_a, text_b FROM question ORDER BY question_no LIMIT ? OFFSET ?',
      [limit, offset]
    );
    res.json(rows);
  } catch (e) {
    console.error('questions error:', e);
    res.status(500).json({ error: 'No se pudieron listar las preguntas' });
  }
});

// Endpoint Health para revisar estado de DB
app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    const ok = Array.isArray(rows) && (rows as any)[0]?.ok === 1;
    res.json({ ok });
  } catch (e) {
    console.error('Health DB error:', e);
    res.status(500).json({ ok: false, error: 'DB error' });
  }
});

// Arranque del servidor
const port = Number(process.env.PORT || 3000);
app.listen(port, '0.0.0.0', () => {
  console.log(`API CASM-83 escuchando en :${port}`);
});

export { app, pool };  // Exportamos para pruebas o uso en otro lugar
