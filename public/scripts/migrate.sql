-- Tabla respondent
CREATE TABLE IF NOT EXISTS respondent (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sex TINYINT NOT NULL,            -- 0 mujer, 1 hombre
  grade TINYINT NOT NULL,          -- 0 otros, 4=4to, 5=5to
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabla question
CREATE TABLE IF NOT EXISTS question (
  question_no INT PRIMARY KEY,
  text_a VARCHAR(255) NOT NULL,
  text_b VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Tabla answer
CREATE TABLE IF NOT EXISTS answer (
  respondent_id INT NOT NULL,
  question_no INT NOT NULL,
  value TINYINT NOT NULL,          -- 0 Ninguno, 1 A, 2 B, 3 Ambos
  PRIMARY KEY (respondent_id, question_no),
  CONSTRAINT fk_answer_resp FOREIGN KEY (respondent_id)
    REFERENCES respondent(id) ON DELETE CASCADE,
  CONSTRAINT fk_answer_q FOREIGN KEY (question_no)
    REFERENCES question(question_no) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_answer_resp ON answer(respondent_id);
CREATE INDEX IF NOT EXISTS idx_answer_q ON answer(question_no);

-- Semilla mínima (para probar rápido)
INSERT INTO question (question_no, text_a, text_b) VALUES
(1, 'Le gusta resolver problemas de matemáticas.', 'Prefiere diseñar modelos de casas.'),
(2, 'Disfruta trabajar con datos y tablas.', 'Prefiere crear bocetos y maquetas.'),
(3, 'Se siente cómodo con lógica y algoritmos.', 'Prefiere actividades artísticas y espaciales.')
ON DUPLICATE KEY UPDATE text_a=VALUES(text_a), text_b=VALUES(text_b);
