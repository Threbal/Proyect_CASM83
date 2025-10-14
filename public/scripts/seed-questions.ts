// scripts/seed-questions.ts
import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});

type Q = { question_no: number; text_a: string; text_b: string };

/**
 * TODO: Reemplaza este arreglo con tus 143 enunciados reales.
 *  - question_no: 1..143
 *  - text_a: enunciado de la opción 1 (A)
 *  - text_b: enunciado de la opción 2 (B)
 */
const QUESTIONS: Q[] = [
  { question_no: 1, text_a: "Le gusta resolver problemas de matemáticas.", text_b: "Prefiere diseñar el modelo de casas, edificios, parques, robots, etc." },
  { question_no: 2, text_a: "Le agrada observar la conducta de las personas y opinar sobre su personalidad.", text_b: "Prefiere expresar un fenómeno concreto en una ecuación matemática." },
  { question_no: 3, text_a: "Le gusta caminar por los cerros buscando piedras raras.", text_b: "Prefiere diseñar las viviendas de una urbanización." },
  { question_no: 4, text_a: "Le gusta escribir artículos deportivos para un diario.", text_b: "Prefiere determinar la resistencia de materiales para una construcción." },
  { question_no: 5, text_a: "Le gusta hacer tallado en madera.", text_b: "Prefiere calcular la cantidad de materiales para una construcción." },
  { question_no: 6, text_a: "Le gusta ordenar y archivar documentos.", text_b: "Prefiere proyectar el sistema eléctrico y electrónico de una construcción." },
  { question_no: 7, text_a: "Le agrada dedicar su tiempo en el estudio de teorías económicas.", text_b: "Prefiere dedicar su tiempo en la lectura de revistas sobre mecánica." },
  { question_no: 8, text_a: "Le gusta mucho la vida militar.", text_b: "Prefiere diseñar máquinas, motores, etc., de alto rendimiento." },
  { question_no: 9, text_a: "Le gusta planificar acerca de cómo formar una empresa.", text_b: "Prefiere estudiar lenguajes de computación." },
  { question_no: 10, text_a: "Le agrada estudiar la gramática.", text_b: "Prefiere estudiar las matemáticas." },
  { question_no: 11, text_a: "Le interesa mucho ser abogado.", text_b: "Preferiría dedicarse a escribir un libro de Física-Matemática." },
  { question_no: 12, text_a: "Le cuenta a su padre y a su madre todas sus cosas.", text_b: "Prefiere ocultar algunas cosas para usted solo(a)." },
  { question_no: 13, text_a: "Le agrada estudiar la estructura anatómica de los cuerpos.", text_b: "Prefiere asumir la defensa legal de una persona acusada por algún delito." },
  { question_no: 14, text_a: "Le interesa mucho estudiar cómo funciona un computador.", text_b: "Prefiere el estudio de las leyes y principios de la conducta de las personas." },
  { question_no: 15, text_a: "Le agrada analizar la forma como se organiza un pueblo.", text_b: "Prefiere responderse a la pregunta de ¿Por qué de los seres y las cosas?" },
  { question_no: 16, text_a: "Le gusta analizar las rocas, piedras y tierra para averiguar su composición mineral.", text_b: "Prefiere el estudio de las organizaciones sean: campesinas, educativas, laborales, políticas, económicas o religiosas." },
  { question_no: 17, text_a: "Le gusta escribir artículos culturales para un diario.", text_b: "Prefiere pensar largamente acerca de la forma como el hombre podría mejorar su existencia." },
  { question_no: 18, text_a: "Le agrada diseñar: muebles, puertas, ventanas, etc.", text_b: "Prefiere dedicar su tiempo en conocer las costumbres y tradiciones de los pueblos." },
  { question_no: 19, text_a: "Le interesa mucho conocer el trámite documentario de una institución pública.", text_b: "Prefiere el estudio de las religiones." },
  { question_no: 20, text_a: "Le interesa mucho conocer los mecanismos de la economía nacional.", text_b: "Prefiere ser guía espiritual de las personas." },
  { question_no: 21, text_a: "Le gusta ser parte del equipo militar, que capacite al cadete en valores.", text_b: "Prefiere enseñar lo que sabe a un grupo de sus compañeros." },
  { question_no: 22, text_a: "Le gusta ser parte de la administración económica de una empresa.", text_b: "Prefiere el estudio de las formas más efectivas para la enseñanza de jóvenes y niños." },
  { question_no: 23, text_a: "Le interesa mucho investigar la raíz gramatical de las palabras de su idioma.", text_b: "Prefiere dedicar su tiempo en la búsqueda de huacos y ruinas." },
  { question_no: 24, text_a: "Le agrada mucho estudiar el código del derecho civil.", text_b: "Prefiere el estudio de las culturas peruanas y de otras naciones." },
  { question_no: 25, text_a: "Le agrada que sus hermanos o familiares lo vigilen constantemente.", text_b: "Prefiere que confíen en su buen criterio." },
  { question_no: 26, text_a: "Le gustaría escribir un libro acerca de la Historia del Perú.", text_b: "Prefiere asesorar sobre asuntos legales." },
  { question_no: 27, text_a: "Le gusta proyectar las redes de agua y desagüe de una ciudad.", text_b: "Prefiere estudiar acerca de las enfermedades de la dentadura." },
  { question_no: 28, text_a: "Le gusta visitar museos arqueológicos y conocer la vivienda y otros utensilios de nuestros antepasados.", text_b: "Prefiere hacer moldes para una dentadura postiza." },
  { question_no: 29, text_a: "Le gusta recolectar plantas y clasificarlas por especie.", text_b: "Prefiere leer sobre el origen y funcionamiento de las plantas y animales." },
  { question_no: 30, text_a: "Le gusta saber cómo se organiza una editorial periodística.", text_b: "Prefiere conocer las características de los órganos humanos y cómo funcionan." },
  { question_no: 31, text_a: "Le agrada construir: muebles, puertas, ventanas, etc.", text_b: "Prefiere estudiar acerca de las enfermedades de las personas." },
  { question_no: 32, text_a: "Le agradaría trabajar en la recepción y trámite documentario de una oficina pública.", text_b: "Prefiere experimentar con las plantas para obtener una nueva especie." },
  { question_no: 33, text_a: "Le gusta proyectar los mecanismos de inversión económica de una empresa.", text_b: "Prefiere analizar las tierras para obtener mayor producción agropecuaria." },
  { question_no: 34, text_a: "Le agrada recibir y ejecutar órdenes de un superior.", text_b: "Prefiere el estudio de los órganos de los animales y su funcionamiento." },
  { question_no: 35, text_a: "Le gusta saber mucho sobre los principios económicos de una empresa.", text_b: "Prefiere conocer las enfermedades que atacan al ganado, aves, perros, etc." },
  { question_no: 36, text_a: "Le agrada estudiar los fonemas (sonidos verbales) de su idioma, o de otros.", text_b: "Prefiere decidir mucho de su tiempo en el estudio de la química." },
  { question_no: 37, text_a: "Le agrada defender pleitos judiciales de recuperación de tierras.", text_b: "Prefiere hacer mezclas de sustancias químicas para obtener derivados con fines productivos." },
  { question_no: 38, text_a: "Sus amigos saben todo de usted, para ellos no tiene secretos.", text_b: "Prefiere reservar algunos secretos para usted." },
  { question_no: 39, text_a: "Le gusta investigar acerca de los recursos naturales de nuestro país (su fauna, su flora y su suelo).", text_b: "Prefiere estudiar el derecho internacional." },
  { question_no: 40, text_a: "Le gusta desarrollar programas de computación para proveer de información rápida y eficiente a una empresa, institución, etc.", text_b: "Prefiere obtener fotografías que hagan noticia." },
  { question_no: 41, text_a: "Le gusta mucho conocer el problema de las personas y tramitar su solución.", text_b: "Prefiere dedicar su tiempo en la búsqueda de personajes que hacen noticia." },
  { question_no: 42, text_a: "Le gusta estudiar las características territoriales de los continentes.", text_b: "Prefiere entrevistar a políticos con el propósito de establecer su posición frente a un problema." },
  { question_no: 43, text_a: "Le gusta conocer el funcionamiento de las máquinas impresoras de periódicos.", text_b: "Prefiere trabajar en el montaje fotográfico de un diario o revista." },
  { question_no: 44, text_a: "Le gusta proyectar el tipo de muebles, cortinas y adornos para una oficina o el hogar.", text_b: "Prefiere trabajar como redactor de un diario o revista." },
  { question_no: 45, text_a: "Le gusta redactar cartas comerciales, al igual que oficios y solicitudes.", text_b: "Prefiere averiguar lo que opina el público respecto a un producto." },
  { question_no: 46, text_a: "Le gusta estudiar las leyes de la oferta y la demanda.", text_b: "Prefiere redactar el tema para un anuncio publicitario." },
  { question_no: 47, text_a: "Le gusta organizar el servicio de inteligencia de un cuartel.", text_b: "Prefiere trabajar en una agencia de publicidad." },
  { question_no: 48, text_a: "Le gusta trabajar buscando casas de alquiler para ofrecerlas al público.", text_b: "Prefiere estudiar las características psicológicas para lograr un buen impacto publicitario." },
  { question_no: 49, text_a: "Le interesa investigar acerca de cómo se originaron los idiomas.", text_b: "Prefiere preparar y ejecutar encuestas para conocer la opinión de las personas." },
  { question_no: 50, text_a: "Le agrada hacer los trámites legales de un juicio de divorcio.", text_b: "Prefiere trabajar estableciendo contactos entre una empresa y otra." },
  { question_no: 51, text_a: "Cuando está dando un examen y tiene la oportunidad de verificar una respuesta, nunca lo hace.", text_b: "Prefiere aprovechar la seguridad que la ocasión le confiere." },
  { question_no: 52, text_a: "Le interesa investigar sobre los problemas del lenguaje en la comunicación masiva.", text_b: "Prefiere redactar documentos legales para contratos internacionales." },
  { question_no: 53, text_a: "Le gusta trabajar haciendo instalaciones eléctricas.", text_b: "Prefiere dedicar su tiempo en la lectura de las novedades en la decoración de ambientes." },
  { question_no: 54, text_a: "Le agrada mucho visitar el hogar de los trabajadores con el fin de verificar su verdadera situación social y económica.", text_b: "Prefiere trabajar en el decorado de tiendas y vitrinas." },
  { question_no: 55, text_a: "Le gusta estudiar los recursos geográficos.", text_b: "Prefiere observar el comportamiento de las personas e imitarlas." },
  { question_no: 56, text_a: "Le gusta dedicar su tiempo a la organización de eventos deportivos entre dos o más centros laborales.", text_b: "Prefiere dedicarse al estudio de la vida y obra de los grandes actores del cine y del teatro." },
  { question_no: 57, text_a: "Le gusta la idea de estudiar escultura en la escuela de bellas artes.", text_b: "Le atrae ser parte de un elenco de teatro." },
  { question_no: 58, text_a: "Le gusta trabajar haciendo tipeos o digitando documentos y datos.", text_b: "Le gusta más dar forma a objetos moldeables, sea: plastelina, migas, arcilla, piedras, etc." },
  { question_no: 59, text_a: "Le agrada mucho estudiar los fundamentos por los que una moneda se devalúa.", text_b: "Prefiere la lectura acerca de la vida y obra de grandes escultores como Miguel Ángel, Leonardo Da Vinci, etc." },
  { question_no: 60, text_a: "Le agrada mucho la vida del marino.", text_b: "Prefiere combinar colores para expresar con naturalidad y belleza un rostro o un paisaje." },
  { question_no: 61, text_a: "Encuentra atractivo trabajar tramitando la compra-venta de inmuebles.", text_b: "Prefiere utilizar las líneas y colores para expresar un sentimiento." },
  { question_no: 62, text_a: "Le agrada estudiar las lenguas y dialectos aborígenes.", text_b: "Prefiere combinar sonidos para obtener una nueva música." },
  { question_no: 63, text_a: "Le agrada tramitar judicialmente el reconocimiento de hijos.", text_b: "Le agrada más aprender o tocar algún instrumento musical." },
  { question_no: 64, text_a: "Si pasa por un cine y descubre que no hay vigilancia, no se aprovecha de la ocasión.", text_b: "Prefiere aprovechar la ocasión para ingresar sin pagar su boleto." },
  { question_no: 65, text_a: "Le interesa diseñar y/o confeccionar artículos de cuero.", text_b: "Prefiere asumir la defensa legal en la demarcación de fronteras territoriales." },
  { question_no: 66, text_a: "Prefiere estudiar acerca de cómo la energía se transforma en imágenes de TV, radio, etc.", text_b: "Le gusta tomar apuntes textuales o dictados de otras personas." },
  { question_no: 67, text_a: "Le gusta leer sobre la vida y obra de los santos religiosos.", text_b: "Prefiere hacer catálogos o listados de los libros de una biblioteca." },
  { question_no: 68, text_a: "Le gusta dedicar mucho de su tiempo en la lectura sobre astronomía.", text_b: "Prefiere trabajar clasificando los libros por autores." },
  { question_no: 69, text_a: "Le gusta trabajar difundiendo el prestigio de su centro laboral.", text_b: "Prefiere trabajar recibiendo y entregando documentos valorados como: cheques, giros, libretas de ahorro, etc." },
  { question_no: 70, text_a: "Le interesa mucho leer sobre la vida y obra de músicos famosos.", text_b: "Prefiere el tipo de trabajo de un empleado bancario." },
  { question_no: 71, text_a: "Le interesa mucho conseguir un trabajo en un banco comercial.", text_b: "Prefiere dedicarse a clasificar libros por especialidad." },
  { question_no: 72, text_a: "Le gusta dedicar su tiempo en el conocimiento del por qué ocurre la inflación económica.", text_b: "Prefiere dedicarse al estudio de cómo se organiza una biblioteca." },
  { question_no: 73, text_a: "Le interesa mucho el conocimiento de la organización de un buque de guerra.", text_b: "Prefiere dedicarse a la recepción y comunicación de mensajes sean verbales o por escrito." },
  { question_no: 74, text_a: "Le gusta trabajar tramitando la compra-venta de vehículos motorizados.", text_b: "Prefiere transcribir los documentos de la administración pública." },
  { question_no: 75, text_a: "Le gusta dedicar gran parte de su tiempo al estudio de las normas y reglas para el uso adecuado del lenguaje.", text_b: "Prefiere trabajar como secretario adjunto al jefe." },
  { question_no: 76, text_a: "Le gusta dedicar su tiempo planteando la defensa de un juicio de alquiler.", text_b: "Prefiere asesorar y aconsejar en torno a trámites documentarios." },
  { question_no: 77, text_a: "Si en la calle se encuentra dinero, sin documento alguno acude a la radio o TV para buscar al infortunado.", text_b: "Preferiría quedarse con el dinero, pues no se conoce quién es el dueño." },
  { question_no: 78, text_a: "Le interesa trabajar en la implementación de bibliotecas distritales.", text_b: "Prefiere asumir la responsabilidad legal para que un fugitivo, con residencia en otro país, sea repatriado." },
  { question_no: 79, text_a: "Le gusta estudiar acerca de cómo la energía se transforma en movimiento.", text_b: "Preferiría hacer una tesis sobre el manejo económico para el país." },
  { question_no: 80, text_a: "Le agrada leer sobre la vida y obra de grandes personajes de educación, sean: profesores, filósofos, psicólogos, etc.", text_b: "Prefiere estudiar acerca de las bases económicas de un país." },
  { question_no: 81, text_a: "Le gusta estudiar los astros: sus características, origen y evolución.", text_b: "Prefiere establecer comparaciones entre los sistemas y modelos económicos del mundo." },
  { question_no: 82, text_a: "Le interesa trabajar exclusivamente promocionando la imagen de una empresa.", text_b: "Prefiere estudiar las grandes corrientes ideológicas del mundo." },
  { question_no: 83, text_a: "Le gusta y practica el baile como expresión artística.", text_b: "Prefiere estudiar las bases de la organización política del Tahuantinsuyo." },
  { question_no: 84, text_a: "Le gusta mucho saber sobre el manejo de los archivos públicos.", text_b: "Prefiere establecer diferencias entre los distintos modelos políticos." },
  { question_no: 85, text_a: "Le gusta investigar sobre las características de los regímenes totalitarios, democráticos, republicanos, etc.", text_b: "Prefiere ser el representante de su país en el extranjero." },
  { question_no: 86, text_a: "Le gusta ser capitán de un buque de guerra.", text_b: "Le interesa más formar parte y conducir grupos con fines políticos." },
  { question_no: 87, text_a: "Le agrada ser visitador médico.", text_b: "Prefiere dedicar su tiempo en la lectura de la vida y obra de los grandes políticos." },
  { question_no: 88, text_a: "Siente placer buscando en el diccionario el significado de palabras nuevas.", text_b: "Prefiere dedicar todo su tiempo en aras de la paz entre las naciones." },
  { question_no: 89, text_a: "Le interesa mucho estudiar el código penal.", text_b: "Prefiere estudiar los sistemas políticos de otros países." },
  { question_no: 90, text_a: "Le agrada que le dejen muchas tareas para su casa.", text_b: "Prefiere que estas sean lo necesario para aprender." },
  { question_no: 91, text_a: "Le agrada ser miembro activo de una agrupación política.", text_b: "Prefiere escuchar acusaciones y defensas para sancionar de acuerdo a lo que la ley manda." },
  { question_no: 92, text_a: "Le gusta hacer los cálculos para el diseño de las telas a gran escala.", text_b: "Le interesa más la mecánica de los barcos y submarinos." },
  { question_no: 93, text_a: "Le agrada observar y evaluar cómo se desarrolla la inteligencia y personalidad.", text_b: "Prefiere ser aviador." },
  { question_no: 94, text_a: "Le atrae dedicar su tiempo en el descubrimiento de nuevos medicamentos.", text_b: "Prefiere dedicarse a la lectura de la vida y obra de reconocidos militares." },
  { question_no: 95, text_a: "Le gusta la aventura cuando está dirigida a descubrir algo que haga noticia.", text_b: "Prefiere conocer el mecanismo de los aviones de guerra." },
  { question_no: 96, text_a: "Le gusta ser parte de una agrupación de baile y danza.", text_b: "Preferiría pertenecer a la Fuerza Aérea." },
  { question_no: 97, text_a: "Le gusta la idea de trabajar llevando mensajes de una dependencia a otra.", text_b: "Prefiere ser miembro de la policía." },
  { question_no: 98, text_a: "Le gusta la idea de trabajar estableciendo vínculos culturales con otros países.", text_b: "Prefiere el trabajo en la detección y comprobación del delito." },
  { question_no: 99, text_a: "Le gusta trabajar custodiando el orden público.", text_b: "Le gusta ser vigilante resguardando nuestras fronteras." },
  { question_no: 100, text_a: "Le gusta persuadir a los boticarios en la compra de nuevos medicamentos.", text_b: "Prefiere trabajar vigilando a los presos en las cárceles." },
  { question_no: 101, text_a: "Le apasiona leer obras de escritores serios y famosos.", text_b: "Prefiere organizar el servicio de inteligencia en la destrucción del narcotráfico." },
  { question_no: 102, text_a: "Le gusta asumir la defensa legal de una acusación de robo.", text_b: "Prefiere conocer el mecanismo de las armas de fuego." },
  { question_no: 103, text_a: "Se aleja Ud. cuando sus amistades cuentan 'chistes colorados'.", text_b: "Prefiere quedarse gozando de la ocasión." },
  { question_no: 104, text_a: "Le interesa mucho saber cómo se organiza un ejército.", text_b: "Prefiere participar como jurado de un juicio." },
  { question_no: 105, text_a: "Le gusta proyectar la extracción de metales de una mina.", text_b: "Prefiere estudiar el nombre de los medicamentos y su ventaja comercial." },
  { question_no: 106, text_a: "Le gusta descifrar los diseños gráficos y escritos de culturas muy antiguas.", text_b: "Prefiere persuadir a la gente para que compre un producto." },
  { question_no: 107, text_a: "Le agrada el estudio de los mecanismos de la visión y de sus enfermedades.", text_b: "Prefiere vender cosas." },
  { question_no: 108, text_a: "Le gustaría ganarse la vida escribiendo para un diario o revista.", text_b: "Prefiere estudiar el mercado y descubrir el producto de mayor demanda." },
  { question_no: 109, text_a: "Le gusta actuar, representando a distintos personajes.", text_b: "Le agrada más tener su propio negocio." },
  { question_no: 110, text_a: "Le gusta sentirse importante sabiendo que de Ud. depende la rapidez o la lentitud de una solicitud.", text_b: "Prefiere trabajar en un bazar." },
  { question_no: 111, text_a: "Le gusta planificar presupuestos para una empresa local o a nivel nacional.", text_b: "Prefiere el negocio de una bodega o tienda de abarrotes." },
  { question_no: 112, text_a: "Le interesa mucho utilizar sus conocimientos en la construcción de armamentos.", text_b: "Prefiere organizar empresas de finanzas y comercio." },
  { question_no: 113, text_a: "Le agrada llevar la contabilidad de una empresa o negocio.", text_b: "Prefiere hacer las planillas de pago para los trabajadores de una empresa o institución." },
  { question_no: 114, text_a: "Le agrada escribir cartas y luego hacer tantas correcciones como sean necesarias.", text_b: "Prefiere ser incorporado como miembro de la corporación nacional de comercio." },
  { question_no: 115, text_a: "Le gusta asumir la defensa legal de una persona acusada de asesinato.", text_b: "Prefiere ser incorporado como miembro ejecutivo de la bolsa de valores." },
  { question_no: 116, text_a: "Le agrada vestir todos los días muy formalmente (con terno y corbata por ejemplo).", text_b: "Prefiere reservar esa vestimenta para ciertas ocasiones." },
  { question_no: 117, text_a: "Le gusta evaluar la producción laboral de un grupo de trabajadores.", text_b: "Prefiere planear, previa investigación, la acusación de un sujeto que ha actuado en contra de la ley." },
  { question_no: 118, text_a: "Le gusta estudiar acerca de los reactores atómicos.", text_b: "Prefiere el estudio de las distintas formas literarias." },
  { question_no: 119, text_a: "Le agrada investigar la problemática social del Perú.", text_b: "Prefiere escribir, cuidando mucho ser comprendido, al tiempo que sus escritos resulten agradables al lector." },
  { question_no: 120, text_a: "Le gustaría escribir un libro sobre anatomía humana.", text_b: "Prefiere recitar sus propios poemas." },
  { question_no: 121, text_a: "Le gustaría incorporarse al Colegio de Periodistas del Perú.", text_b: "Prefiere aprender otro idioma." },
  { question_no: 122, text_a: "Le gusta diseñar y/o confeccionar: adornos, utensilios, etc., en cerámica, vidrio, etc.", text_b: "Prefiere traducir textos escritos en otros idiomas." },
  { question_no: 123, text_a: "Le gustaría desarrollar técnicas de mayor eficiencia en el trámite documentario de un ministerio público.", text_b: "Prefiere escribir en otro idioma." },
  { question_no: 124, text_a: "Le agradaría mucho ser el secretario general de una organización social.", text_b: "Prefiere dedicar su tiempo al estudio de lenguas extintas (muertas)." },
  { question_no: 125, text_a: "Le gustaría dedicarse al estudio de armas de alta peligrosidad.", text_b: "Prefiere trabajar como traductor." },
  { question_no: 126, text_a: "Le gusta llevar las estadísticas de ingresos y egresos mensuales de una empresa o tal vez de una nación.", text_b: "Prefiere los cursos de idiomas: inglés, francés, italiano, etc." },
  { question_no: 127, text_a: "Le gustaría ser incorporado como miembro de la Real Academia de la lengua española.", text_b: "Prefiere ser incorporado al Instituto Nacional del Idioma." },
  { question_no: 128, text_a: "Le interesaría ser el asesor legal de un ministro de Estado.", text_b: "Prefiere aquellas situaciones que le inspiraran a escribir." },
  { question_no: 129, text_a: "Nunca ha bebido licor, aún en ciertas ocasiones lo ha rechazado.", text_b: "Por lo contrario, se ha adecuado a las circunstancias." },
  { question_no: 130, text_a: "Le agrada dedicar mucho su tiempo en la escritura de poemas, cuentos.", text_b: "Prefiere sentirse importante al saber que de su defensa legal depende la libertad de una persona." },
  { question_no: 131, text_a: "Le agrada estudiar la estructura atómica de los cuerpos.", text_b: "Prefiere asumir la defensa legal de una persona acusada por algún delito." },
  { question_no: 132, text_a: "Le gustaría escribir un libro acerca de la Historia del Perú.", text_b: "Prefiere asesorar sobre asuntos legales." },
  { question_no: 133, text_a: "Le gusta investigar acerca de los recursos naturales de nuestro país (su fauna, su flora y su suelo).", text_b: "Prefiere estudiar el derecho internacional." },
  { question_no: 134, text_a: "Le interesa investigar sobre los problemas de lenguaje en la comunicación masiva.", text_b: "Prefiere redactar documentos legales para contratos internacionales." },
  { question_no: 135, text_a: "Le interesa diseñar y/o confeccionar artículos de cuero.", text_b: "Prefiere asumir la defensa legal en la demarcación de fronteras territoriales." },
  { question_no: 136, text_a: "Le interesa trabajar en la implementación de bibliotecas distritales.", text_b: "Prefiere asumir la responsabilidad legal para que un fugitivo, con residencia en otro país, sea repatriado." },
  { question_no: 137, text_a: "Le agrada ser miembro activo de una agrupación política.", text_b: "Prefiere escuchar acusaciones y defensas, para sancionar de acuerdo a lo que la ley señala." },
  { question_no: 138, text_a: "Le interesa mucho saber cómo se organiza un ejército.", text_b: "Prefiere participar como jurado en un juicio." },
  { question_no: 139, text_a: "Le gusta evaluar la producción laboral de un grupo de trabajadores.", text_b: "Prefiere planear previa investigación la acusación de un sujeto que ha ido en contra de la ley." },
  { question_no: 140, text_a: "Le gusta dedicar mucho su tiempo en la escritura de poemas, cuentos.", text_b: "Prefiere sentirse importante al saber que de su defensa legal depende la libertad de una persona." },
  { question_no: 141, text_a: "Le gustaría dedicarse a la legalización de documentos (contratos, cartas, partidas, títulos, etc.).", text_b: "Prefiere ser incorporado en una comisión para redactar un proyecto de ley." },
  { question_no: 142, text_a: "Le agrada viajar en un microbús repleto de gente aun cuando no tiene ningún apuro.", text_b: "Prefiere esperar otro vehículo." },
  { question_no: 143, text_a: "Le gusta resolver problemas matemáticos.", text_b: "Prefiere diseñar el modelo de casas, edificios, parques, etc." },

];

async function main() {
  if (QUESTIONS.length === 0) {
    console.error("No hay preguntas en el arreglo QUESTIONS.");
    process.exit(1);
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const placeholders = QUESTIONS.map(() => "(?,?,?)").join(",");
    const values: any[] = [];
    for (const q of QUESTIONS) {
      values.push(q.question_no, q.text_a, q.text_b);
    }

    await conn.execute(
      `INSERT INTO question (question_no, text_a, text_b)
       VALUES ${placeholders}
       ON DUPLICATE KEY UPDATE
         text_a = VALUES(text_a),
         text_b = VALUES(text_b)`,
      values
    );

    await conn.commit();
    console.log(`✅ Insertadas/actualizadas ${QUESTIONS.length} preguntas.`);
  } catch (e) {
    await conn.rollback();
    console.error("❌ Error ejecutando seed:", e);
  } finally {
    conn.release();
    await pool.end();
  }
}

main();
