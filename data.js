/* SafeSite data & translations. Loaded before app.js. No external dependencies. */
'use strict';

window.APP_I18N = {
  en: {
    appName: 'SafeSite', tagline: 'Workplace Safety & Security',
    installBtn: '⬇ Install App', installing: 'Installing SafeSite…', installed: 'SafeSite installed',
    offlineBadge: '● Offline', storageNote: 'Records saved on this device',
    tabChecklists: '✅ Checklists', tabIncident: '🚨 Incident', tabRecords: '📁 Records', tabGuide: '📖 Guide', tabSettings: '⚙️ Settings',
    checklistsTitle: 'Checklists',
    checklistsIntro: 'Pick a checklist to start an inspection. Progress is saved automatically on this device — even offline.',
    itemsWord: 'items', savedInspections: 'saved inspections', inProgress: 'In progress',
    backToList: '← All checklists', siteLocation: 'Site / Location', inspector: 'Inspector',
    sitePh: 'e.g. Warehouse B, Floor 2', inspectorPh: 'Your name',
    yes: '✔ Yes', no: '✘ No', na: '— N/A',
    flaggedNote: '⚠️ Flagged as non-compliant — include in corrective actions.',
    reset: 'Reset', saveInspection: '💾 Save Inspection',
    resetConfirm: 'Clear all answers for this checklist?',
    partialConfirm: 'Some items are unanswered. Save anyway?',
    inspectionSaved: '✅ Inspection saved', checklistReset: 'Checklist reset',
    yesShort: 'Yes', noShort: 'No', naShort: 'N/A', unanswered: 'unanswered',
    viewAllAnswers: 'View all answers', delete: 'Delete',
    delInspConfirm: 'Delete this inspection record?', delIncConfirm: 'Delete this incident report?',
    incidentTitle: 'Report an Incident',
    incidentIntro: 'Record incidents or near-misses. Reports are stored on this device and can be exported as CSV.',
    dateTime: 'Date & time', type: 'Type', severity: 'Severity', location: 'Location',
    locationPh: 'Where did it happen?', people: 'People involved', peoplePh: 'Names or roles (optional)',
    whatHappened: 'What happened?', whatHappenedPh: 'Describe the event, sequence and immediate causes...',
    actionTaken: 'Immediate action taken', actionPh: 'e.g. area closed off, spill contained, first aid given...',
    reportedCheckbox: 'Reported to supervisor / emergency services', saveReport: '💾 Save Report',
    incidentSaved: '🚨 Incident report saved — see Records to export',
    recordsTitle: 'Saved Records', exportCsv: '⬇ Export CSV', exportJson: '⬇ Export JSON',
    printPdf: '🖨 PDF', deleteAll: '🗑 Delete all records',
    deleteAllConfirm: 'Delete ALL saved inspections and incident reports from this device? This cannot be undone.',
    allDeleted: 'All records deleted', nothingToExport: 'Nothing to export yet', csvExported: 'CSV exported', jsonExported: 'JSON exported',
    tabInsp: 'Inspections', tabInc: 'Incidents',
    noInspections: 'No saved inspections yet. Complete a checklist to see it here.',
    noIncidents: 'No incident reports yet. Use the Incident tab to file one.',
    reportedSup: 'Reported to supervisor', notReported: 'Not reported',
    whatHappenedLbl: 'What happened:', actionTakenLbl: 'Action taken:',
    guideTitle: 'Emergency & Safety Guide',
    settingsTitle: 'Settings & Branding',
    settingsIntro: 'Customize the app for your company. Settings are saved on this device and appear in the app header, splash screen and printed reports.',
    companyName: 'Company name', companyNamePh: 'e.g. ACME Logistics Ltd.',
    companyLogo: 'Company logo', chooseLogo: '📷 Choose logo image', removeLogo: 'Remove logo',
    logoHint: 'PNG or JPG, ideally square. Stored locally on this device.',
    themeColor: 'Brand color', resetBranding: 'Reset to default',
    language: 'Language', brandingSaved: 'Branding saved', saveBranding: '💾 Save Branding',
    savedRecordTitle: 'Saved inspection', reportTitle: 'Workplace Safety Inspection Report',
    reportGenerated: 'Generated', signature: 'Inspector signature', approvedBy: 'Reviewed by (supervisor)',
    printHint: 'Use your browser Print dialog and choose "Save as PDF".',
    noLocation: '—',
    savedWord: 'saved'
  },
  es: {
    appName: 'SafeSite', tagline: 'Seguridad y Protección Laboral',
    installBtn: '⬇ Instalar app', installing: 'Instalando SafeSite…', installed: 'SafeSite instalado',
    offlineBadge: '● Sin conexión', storageNote: 'Registros guardados en este dispositivo',
    tabChecklists: '✅ Listas', tabIncident: '🚨 Incidente', tabRecords: '📁 Registros', tabGuide: '📖 Guía', tabSettings: '⚙️ Ajustes',
    checklistsTitle: 'Listas de verificación',
    checklistsIntro: 'Elige una lista para iniciar una inspección. El progreso se guarda automáticamente en este dispositivo, incluso sin conexión.',
    itemsWord: 'puntos', savedInspections: 'inspecciones guardadas', inProgress: 'En curso',
    backToList: '← Todas las listas', siteLocation: 'Sitio / Ubicación', inspector: 'Inspector',
    sitePh: 'ej. Almacén B, Piso 2', inspectorPh: 'Su nombre',
    yes: '✔ Sí', no: '✘ No', na: '— N/A',
    flaggedNote: '⚠️ Marcado como incumplimiento — incluir en acciones correctivas.',
    reset: 'Reiniciar', saveInspection: '💾 Guardar inspección',
    resetConfirm: '¿Borrar todas las respuestas de esta lista?',
    partialConfirm: 'Hay puntos sin responder. ¿Guardar de todos modos?',
    inspectionSaved: '✅ Inspección guardada', checklistReset: 'Lista reiniciada',
    yesShort: 'Sí', noShort: 'No', naShort: 'N/A', unanswered: 'sin responder',
    viewAllAnswers: 'Ver todas las respuestas', delete: 'Eliminar',
    delInspConfirm: '¿Eliminar este registro de inspección?', delIncConfirm: '¿Eliminar este reporte de incidente?',
    incidentTitle: 'Reportar un incidente',
    incidentIntro: 'Registre incidentes o cuasi accidentes. Los reportes se guardan en este dispositivo y pueden exportarse a CSV.',
    dateTime: 'Fecha y hora', type: 'Tipo', severity: 'Gravedad', location: 'Ubicación',
    locationPh: '¿Dónde ocurrió?', people: 'Personas involucradas', peoplePh: 'Nombres o roles (opcional)',
    whatHappened: '¿Qué ocurrió?', whatHappenedPh: 'Describa el evento, la secuencia y las causas inmediatas...',
    actionTaken: 'Acción inmediata tomada', actionPh: 'ej. área acordonada, derrame contenido, primeros auxilios...',
    reportedCheckbox: 'Reportado al supervisor / servicios de emergencia', saveReport: '💾 Guardar reporte',
    incidentSaved: '🚨 Reporte de incidente guardado — vea Registros para exportar',
    recordsTitle: 'Registros guardados', exportCsv: '⬇ Exportar CSV', exportJson: '⬇ Exportar JSON',
    printPdf: '🖨 PDF', deleteAll: '🗑 Eliminar todos los registros',
    deleteAllConfirm: '¿Eliminar TODAS las inspecciones y reportes de incidentes de este dispositivo? No se puede deshacer.',
    allDeleted: 'Todos los registros eliminados', nothingToExport: 'Aún no hay nada que exportar', csvExported: 'CSV exportado', jsonExported: 'JSON exportado',
    tabInsp: 'Inspecciones', tabInc: 'Incidentes',
    noInspections: 'Aún no hay inspecciones guardadas. Complete una lista para verla aquí.',
    noIncidents: 'Aún no hay reportes de incidentes. Use la pestaña Incidente para crear uno.',
    reportedSup: 'Reportado al supervisor', notReported: 'No reportado',
    whatHappenedLbl: 'Qué ocurrió:', actionTakenLbl: 'Acción tomada:',
    guideTitle: 'Guía de emergencia y seguridad',
    settingsTitle: 'Ajustes e identidad visual',
    settingsIntro: 'Personalice la app para su empresa. Los ajustes se guardan en este dispositivo y aparecen en el encabezado, la pantalla de inicio y los reportes impresos.',
    companyName: 'Nombre de la empresa', companyNamePh: 'ej. ACME Logística S.A.',
    companyLogo: 'Logotipo de la empresa', chooseLogo: '📷 Elegir imagen de logo', removeLogo: 'Quitar logo',
    logoHint: 'PNG o JPG, preferiblemente cuadrado. Se guarda localmente en este dispositivo.',
    themeColor: 'Color de marca', resetBranding: 'Restablecer valores',
    language: 'Idioma', brandingSaved: 'Identidad guardada', saveBranding: '💾 Guardar identidad',
    savedRecordTitle: 'Inspección guardada', reportTitle: 'Reporte de Inspección de Seguridad Laboral',
    reportGenerated: 'Generado', signature: 'Firma del inspector', approvedBy: 'Revisado por (supervisor)',
    printHint: 'Use el diálogo de impresión del navegador y elija "Guardar como PDF".',
    noLocation: '—',
    savedWord: 'guardadas'
  }
};

/* checklist item: q = {en, es} */
window.CHECKLISTS = [
  {
    id: 'hazard', icon: '🔍',
    title: { en: 'Hazard Identification Walkthrough', es: 'Recorrido de Identificación de Peligros' },
    desc: { en: 'Spot-and-fix routine hazards across walkways, housekeeping and work areas.',
            es: 'Detecte y corrija peligros rutinarios en pasillos, orden y limpieza y áreas de trabajo.' },
    items: [
      { q: { en: 'Walkways, stairs and exits clear of obstructions and trip hazards?', es: '¿Pasillos, escaleras y salidas libres de obstrucciones y riesgos de tropiezo?' } },
      { q: { en: 'Floors dry, clean and free of slippery or damaged surfaces?', es: '¿Pisos secos, limpios y sin superficies resbaladizas o dañadas?' } },
      { q: { en: 'Adequate lighting in all work areas, stairwells and corridors?', es: '¿Iluminación adecuada en todas las áreas de trabajo, escaleras y pasillos?' } },
      { q: { en: 'Stacked materials stable, within height limits and away from edges?', es: '¿Materiales apilados estables, dentro de límites de altura y lejos de bordes?' } },
      { q: { en: 'Emergency exits unlocked, unobstructed and clearly signed?', es: '¿Salidas de emergencia desbloqueadas, despejadas y señalizadas?' } },
      { q: { en: 'Warning signs and barriers in place around temporary hazards?', es: '¿Señales de advertencia y barreras colocadas alrededor de peligros temporales?' } },
      { q: { en: 'Waste removed regularly; bins not overflowing or blocking routes?', es: '¿Residuos retirados con regularidad; contenedores sin desbordar ni bloquear vías?' } },
      { q: { en: 'Ladders and step stools in good condition and used correctly?', es: '¿Escaleras y taburetes en buen estado y usados correctamente?' } },
      { q: { en: 'New or changed tasks assessed for hazards before work started?', es: '¿Tareas nuevas o modificadas evaluadas antes de iniciar el trabajo?' } }
    ]
  },
  {
    id: 'ppe', icon: '🦺',
    title: { en: 'Personal Protective Equipment (PPE)', es: 'Equipo de Protección Personal (EPP)' },
    desc: { en: 'Check PPE availability, condition and correct use across the site.',
            es: 'Verifique disponibilidad, estado y uso correcto del EPP en el sitio.' },
    items: [
      { q: { en: 'Required PPE identified for each task and clearly communicated?', es: '¿EPP requerido identificado por tarea y comunicado claramente?' } },
      { q: { en: 'Head protection (hard hats) available, worn and in date where required?', es: '¿Protección craneal disponible, usada y vigente donde se requiera?' } },
      { q: { en: 'Eye/face protection available and worn for grinding, cutting, chemicals?', es: '¿Protección ocular/facial disponible y usada al rectificar, cortar y con químicos?' } },
      { q: { en: 'Hearing protection available where noise exceeds 85 dB?', es: '¿Protección auditiva disponible donde el ruido supere 85 dB?' } },
      { q: { en: 'Gloves matched to hazard (cut, chemical, heat) and used correctly?', es: '¿Guantes adecuados al riesgo (corte, químico, calor) y bien usados?' } },
      { q: { en: 'Safety footwear worn by everyone in designated areas?', es: '¿Calzado de seguridad usado por todos en áreas designadas?' } },
      { q: { en: 'High-visibility clothing worn where vehicles/plant operate?', es: '¿Ropa de alta visibilidad donde operan vehículos o maquinaria?' } },
      { q: { en: 'Respirators available, fit-tested where required, filters in date?', es: '¿Respiradores disponibles, con prueba de ajuste y filtros vigentes?' } },
      { q: { en: 'PPE inspected — no damaged, worn-out or missing items?', es: '¿EPP inspeccionado — sin artículos dañados, gastados o faltantes?' } },
      { q: { en: 'Fall protection harnesses and lanyards inspected and in date?', es: '¿Arnéses y eslingas contra caídas inspeccionados y vigentes?' } }
    ]
  },
  {
    id: 'fire', icon: '🔥',
    title: { en: 'Fire & Emergency Preparedness', es: 'Prevención de Incendios y Emergencias' },
    desc: { en: 'Fire protection, evacuation routes and emergency response readiness.',
            es: 'Protección contra incendios, rutas de evacuación y respuesta ante emergencias.' },
    items: [
      { q: { en: 'Fire extinguishers present, charged, inspected within the last 12 months?', es: '¿Extintores presentes, cargados e inspeccionados en los últimos 12 meses?' } },
      { q: { en: 'Correct extinguisher types for the hazards in each area?', es: '¿Tipos de extintores correctos para los riesgos de cada área?' } },
      { q: { en: 'Smoke/heat detectors and alarm systems tested and working?', es: '¿Detectores de humo/calor y alarmas probados y funcionando?' } },
      { q: { en: 'Sprinklers, hose reels or standpipes unobstructed and accessible?', es: '¿Rociadores, mangueras o columnas secas despejados y accesibles?' } },
      { q: { en: 'Evacuation routes and exit doors clear, unlocked and illuminated?', es: '¿Rutas de evacuación y puertas de salida despejadas, abiertas e iluminadas?' } },
      { q: { en: 'Evacuation plans posted and assembly point known to all staff?', es: '¿Planes de evacuación publicados y punto de encuentro conocido por todos?' } },
      { q: { en: 'Fire drill conducted within the required interval?', es: '¿Simulacro de incendio realizado dentro del plazo requerido?' } },
      { q: { en: 'Fire wardens/marshals appointed and trained?', es: '¿Brigadistas designados y capacitados?' } },
      { q: { en: 'Combustible waste and flammables stored away from ignition sources?', es: '¿Residuos combustibles y inflamables almacenados lejos de fuentes de ignición?' } },
      { q: { en: 'Emergency contact numbers visibly posted?', es: '¿Números de emergencia visiblemente publicados?' } }
    ]
  },
  {
    id: 'electrical', icon: '⚡',
    title: { en: 'Electrical Safety', es: 'Seguridad Eléctrica' },
    desc: { en: 'Wiring, appliances, panels and lockout/tagout readiness.',
            es: 'Cableado, equipos, tableros y bloqueo/etiquetado (LOTO).' },
    items: [
      { q: { en: 'Cables and extension cords in good condition — no fraying or exposed wires?', es: '¿Cables y extensiones en buen estado — sin desgaste ni cables expuestos?' } },
      { q: { en: 'No daisy-chained power strips or overloaded outlets?', es: '¿Sin regletas encadenadas ni tomacorrientes sobrecargados?' } },
      { q: { en: 'Electrical panels accessible with 1 m clearance, clearly labelled?', es: '¿Tableros eléctricos accesibles con 1 m de espacio y rotulados?' } },
      { q: { en: 'Breakers/fuses correctly rated; no improvised fuses?', es: '¿Breakers/fusibles con calibre correcto; sin fusibles improvisados?' } },
      { q: { en: 'Portable tools and appliances tested/tagged within required interval?', es: '¿Herramientas y equipos portátiles probados/etiquetados según plazo?' } },
      { q: { en: 'GFCI/RCD protection in wet or outdoor areas?', es: '¿Protección GFCI/RCD en áreas húmedas o al aire libre?' } },
      { q: { en: 'Lockout/tagout (LOTO) devices available and procedures followed?', es: '¿Dispositivos de bloqueo/etiquetado disponibles y procedimientos seguidos?' } },
      { q: { en: 'No electrical equipment used with wet hands or in wet conditions?', es: '¿Sin equipos eléctricos usados con manos mojadas o en condiciones húmedas?' } },
      { q: { en: 'Repairs and installations performed only by qualified personnel?', es: '¿Reparaciones e instalaciones realizadas solo por personal calificado?' } }
    ]
  },
  {
    id: 'machine', icon: '⚙️',
    title: { en: 'Machine Guarding & Equipment', es: 'Resguardo de Máquinas y Equipos' },
    desc: { en: 'Guards, interlocks and safe operation of machinery and tools.',
            es: 'Resguardos, enclavamientos y operación segura de maquinaria y herramientas.' },
    items: [
      { q: { en: 'All machine guards in place and secure — none bypassed or removed?', es: '¿Todos los resguardos colocados y firmes — ninguno puenteado ni retirado?' } },
      { q: { en: 'Emergency stops tested and functional on all machines?', es: '¿Paros de emergencia probados y funcionales en todas las máquinas?' } },
      { q: { en: 'Interlocks and light curtains working correctly?', es: '¿Enclavamientos y cortinas de luz funcionando correctamente?' } },
      { q: { en: 'Machines maintained per schedule; maintenance records up to date?', es: '¿Mantenimiento de máquinas al día y registros actualizados?' } },
      { q: { en: 'Only trained and authorized operators using the equipment?', es: '¿Solo operadores capacitados y autorizados usan los equipos?' } },
      { q: { en: 'Loose clothing, jewelry and long hair controlled around rotating machinery?', es: '¿Ropa suelta, joyas y cabello largo controlados cerca de maquinaria rotativa?' } },
      { q: { en: 'Air hoses and hydraulic lines in good condition, whips restrained?', es: '¿Mangueras de aire y líneas hidráulicas en buen estado y aseguradas?' } },
      { q: { en: 'Conveyor nip points and moving parts fully guarded?', es: '¿Puntos de atrape de bandas y partes móviles totalmente resguardados?' } },
      { q: { en: 'Equipment shut down and de-energized before cleaning or adjustments?', es: '¿Equipos apagados y desenergizados antes de limpiar o ajustar?' } }
    ]
  },
  {
    id: 'ergonomics', icon: '🧍',
    title: { en: 'Ergonomics & Manual Handling', es: 'Ergonomía y Manejo Manual de Cargas' },
    desc: { en: 'Workstation setup, lifting practice and repetitive-strain prevention.',
            es: 'Configuración de puestos, técnica de levantamiento y prevención de lesiones por esfuerzo repetitivo.' },
    items: [
      { q: { en: 'Lifting technique trained — lift with legs, load close to body?', es: '¿Técnica de levantamiento entrenada — usar piernas, carga cerca del cuerpo?' } },
      { q: { en: 'Mechanical aids (trolleys, hoists, lifts) available and used for heavy loads?', es: '¿Ayudas mecánicas (carros, grúas, elevadores) disponibles y usadas para cargas pesadas?' } },
      { q: { en: 'Loads within safe weight limits or team-lift rules applied?', es: '¿Cargas dentro de límites seguros o se aplican reglas de levante en equipo?' } },
      { q: { en: 'Workstations adjustable — monitor at eye level, elbows at 90°?', es: '¿Puestos ajustables — monitor a la altura de los ojos, codos a 90°?' } },
      { q: { en: 'Chairs supportive and adjustable for each user?', es: '¿Sillas ergonómicas y ajustables para cada usuario?' } },
      { q: { en: 'Micro-breaks and task rotation in place for repetitive work?', es: '¿Microdescansos y rotación de tareas en trabajo repetitivo?' } },
      { q: { en: 'Anti-fatigue matting for prolonged standing positions?', es: '¿Tapetes antifatiga para posiciones de pie prolongadas?' } },
      { q: { en: 'Early reports of discomfort/pain encouraged and acted on?', es: '¿Se fomenta y atiende el reporte temprano de molestias o dolor?' } }
    ]
  },
  {
    id: 'chemical', icon: '🧪',
    title: { en: 'Chemical Safety & HazCom', es: 'Seguridad Química y Comunicación de Riesgos' },
    desc: { en: 'Labeling, SDS access, storage and spill control for hazardous substances.',
            es: 'Etiquetado, acceso a SDS, almacenamiento y control de derrames de sustancias peligrosas.' },
    items: [
      { q: { en: 'All chemical containers correctly labeled (product, hazard, pictograms)?', es: '¿Todos los recipientes etiquetados (producto, peligro, pictogramas)?' } },
      { q: { en: 'Safety Data Sheets (SDS) accessible to all workers for every chemical?', es: '¿Hojas de Seguridad (SDS) accesibles para todos los trabajadores y químicos?' } },
      { q: { en: 'Chemicals stored by compatibility — no incompatible materials together?', es: '¿Químicos almacenados por compatibilidad — sin materiales incompatibles juntos?' } },
      { q: { en: 'Flammables in rated cabinets; quantities within limits?', es: '¿Inflamables en gabinetes certificados; cantidades dentro de límites?' } },
      { q: { en: 'Ventilation adequate where chemicals are used?', es: '¿Ventilación adecuada donde se usan químicos?' } },
      { q: { en: 'Spill kits stocked, accessible and staff trained in their use?', es: '¿Kits antiderrames surtidos, accesibles y personal entrenado en su uso?' } },
      { q: { en: 'Eyewash stations and safety showers accessible, tested and clean?', es: '¿Lavadores de ojos y duchas de emergencia accesibles, probados y limpios?' } },
      { q: { en: 'Secondary containment for liquid storage areas?', es: '¿Contención secundaria en áreas de almacenamiento de líquidos?' } },
      { q: { en: 'Workers trained on hazards (GHS/HazCom) before handling chemicals?', es: '¿Trabajadores capacitados en peligros (SGA/HazCom) antes de manejar químicos?' } }
    ]
  },
  {
    id: 'firstaid', icon: '⛑️',
    title: { en: 'First Aid Readiness', es: 'Preparación de Primeros Auxilios' },
    desc: { en: 'First aid supplies, trained responders and medical emergency preparedness.',
            es: 'Insumos de primeros auxilios, personal capacitado y preparación ante emergencias médicas.' },
    items: [
      { q: { en: 'First aid kits stocked, sealed and contents within expiry dates?', es: '¿Botiquines surtidos, sellados y con contenidos no vencidos?' } },
      { q: { en: 'First aid kits accessible and clearly marked in every work area?', es: '¿Botiquines accesibles y claramente señalizados en cada área de trabajo?' } },
      { q: { en: 'Trained first-aiders on duty for every shift?', es: '¿Brigadistas de primeros auxilios presentes en cada turno?' } },
      { q: { en: 'AED available, accessible, pads/battery within expiry?', es: '¿DEA disponible, accesible, con parches/batería vigentes?' } },
      { q: { en: 'Emergency numbers and first-aiders\u2019 names visibly posted?', es: '¿Números de emergencia y nombres de brigadistas visiblemente publicados?' } },
      { q: { en: 'Injury/illness log maintained and reviewed?', es: '¿Registro de lesiones/enfermedades mantenido y revisado?' } },
      { q: { en: 'Eyewash/showers tested within the last month?', es: '¿Lavadores/duchas probados en el último mes?' } },
      { q: { en: 'Access for emergency vehicles kept clear?', es: '¿Acceso para vehículos de emergencia siempre despejado?' } }
    ]
  },
  {
    id: 'incident', icon: '📋',
    title: { en: 'Incident Reporting & Investigation', es: 'Reporte e Investigación de Incidentes' },
    desc: { en: 'Verify the reporting process works — from near miss to corrective action.',
            es: 'Verifique que el proceso de reporte funcione — del cuasi accidente a la acción correctiva.' },
    items: [
      { q: { en: 'Reporting procedure documented and known to all employees?', es: '¿Procedimiento de reporte documentado y conocido por todos los empleados?' } },
      { q: { en: 'Near misses actively reported and recorded?', es: '¿Cuasi accidentes reportados y registrados activamente?' } },
      { q: { en: 'Incident report forms readily available (paper or digital)?', es: '¿Formularios de reporte de incidentes fácilmente disponibles (papel o digital)?' } },
      { q: { en: 'Reports investigated promptly with root-cause analysis?', es: '¿Reportes investigados con prontitud y análisis de causa raíz?' } },
      { q: { en: 'Corrective actions assigned with owners and due dates?', es: '¿Acciones correctivas asignadas con responsables y fechas límite?' } },
      { q: { en: 'Corrective actions tracked to completion?', es: '¿Acciones correctivas seguidas hasta su cierre?' } },
      { q: { en: 'Lessons shared with workforce (toolbox talks, bulletins)?', es: '¿Lecciones compartidas con el personal (charlas de 5 minutos, boletines)?' } },
      { q: { en: 'No retaliation or blame culture discouraging reports?', es: '¿Ausencia de represalias o cultura de culpa que desaliente reportes?' } }
    ]
  },
  {
    id: 'security', icon: '🔒',
    title: { en: 'Workplace Security & Access Control', es: 'Seguridad Física y Control de Accesos' },
    desc: { en: 'Physical security, visitor management and workplace violence prevention.',
            es: 'Seguridad física, gestión de visitantes y prevención de violencia laboral.' },
    items: [
      { q: { en: 'Perimeter doors, gates and windows secured outside working hours?', es: '¿Puertas, portones y ventanas perimetrales asegurados fuera del horario?' } },
      { q: { en: 'Access control (badges/keys) working; access revoked for leavers?', es: '¿Control de acceso (tarjetas/llaves) funcionando; accesos revocados a egresados?' } },
      { q: { en: 'Visitor sign-in and escort procedure followed?', es: '¿Registro de visitantes y procedimiento de escolta seguidos?' } },
      { q: { en: 'CCTV cameras operational, unobstructed and recording?', es: '¿Cámaras CCTV operativas, sin obstrucciones y grabando?' } },
      { q: { en: 'Alarms (intruder/panic) tested and monitored?', es: '¿Alarmas (intrusión/pánico) probadas y monitoreadas?' } },
      { q: { en: 'Cash/valuables secured; safe usage rules followed?', es: '¿Efectivo/objetos de valor asegurados; reglas de caja fuerte seguidas?' } },
      { q: { en: 'Lone-worker procedure in place with regular check-ins?', es: '¿Procedimiento para trabajadores solitarios con check-ins regulares?' } },
      { q: { en: 'Parking areas and exterior lighting adequate?', es: '¿Estacionamiento e iluminación exterior adecuados?' } },
      { q: { en: 'Workplace violence policy communicated; warning signs acted on?', es: '¿Política contra violencia laboral comunicada; señales de alerta atendidas?' } },
      { q: { en: 'Staff trained on threat response (avoid / escape / alert / lockdown)?', es: '¿Personal entrenado ante amenazas (evitar / huir / alertar / encerrarse)?' } }
    ]
  },
  {
    id: 'workingatheight', icon: '🪜',
    title: { en: 'Working at Height & Ladders', es: 'Trabajo en Alturas y Escaleras' },
    desc: { en: 'Fall prevention, ladder condition and scaffolding/roofwork controls.',
            es: 'Prevención de caídas, estado de escaleras y controles en andamios y techos.' },
    items: [
      { q: { en: 'Collective protection (guardrails, covers) preferred over PPE?', es: '¿Protección colectiva (barandales, cubiertas) preferida sobre el EPP?' } },
      { q: { en: 'Ladders inspected, tagged and rated for the task?', es: '¿Escaleras inspeccionadas, etiquetadas y aptas para la tarea?' } },
      { q: { en: 'Ladders secured, correct angle (1:4) and extend 1 m above landing?', es: '¿Escaleras aseguradas, ángulo correcto (1:4) y 1 m sobre el nivel de apoyo?' } },
      { q: { en: 'Scaffolds erected/inspected by competent persons, tags current?', es: '¿Andamios montados/inspeccionados por personas competentes, etiquetas vigentes?' } },
      { q: { en: 'Harnesses worn with adequate anchor points where required?', es: '¿Arnéses usados con puntos de anclaje adecuados donde se requiera?' } },
      { q: { en: 'Edge protection and toe boards in place on raised surfaces?', es: '¿Protección de bordes y rodapiés colocados en superficies elevadas?' } },
      { q: { en: 'Falling-object protection (netting, exclusion zones) in place?', es: '¿Protección contra caída de objetos (redes, zonas de exclusión) instalada?' } },
      { q: { en: 'Weather conditions assessed before roof or outdoor height work?', es: '¿Condiciones climáticas evaluadas antes de trabajos en techos o alturas exteriores?' } }
    ]
  },
  {
    id: 'monthlyaudit', icon: '🗓️',
    title: { en: 'Monthly Full-Site Safety Audit', es: 'Auditoría Mensual de Seguridad Integral' },
    desc: { en: 'Comprehensive monthly review across management, documentation and the site.',
            es: 'Revisión mensual integral de gestión, documentación y el sitio.' },
    items: [
      { q: { en: 'Safety policy and responsibilities current and communicated?', es: '¿Política de seguridad y responsabilidades vigentes y comunicadas?' } },
      { q: { en: 'Risk assessments reviewed and updated for all significant tasks?', es: '¿Evaluaciones de riesgo revisadas y actualizadas para tareas significativas?' } },
      { q: { en: 'Statutory inspections (equipment, fire, electrical) all in date?', es: '¿Inspecciones legales (equipos, incendio, eléctrica) todas vigentes?' } },
      { q: { en: 'Safety training matrix up to date; refresher training scheduled?', es: '¿Matriz de capacitación al día; reciclajes programados?' } },
      { q: { en: 'All previous audit findings closed out?', es: '¿Hallazgos de auditorías anteriores cerrados?' } },
      { q: { en: 'Incident and near-miss statistics reviewed for trends?', es: '¿Estadísticas de incidentes y cuasi accidentes revisadas por tendencias?' } },
      { q: { en: 'Contractor safety inductions and permits in order?', es: '¿Inducciones y permisos de seguridad de contratistas en regla?' } },
      { q: { en: 'Emergency drills completed per plan?', es: '¿Simulacros de emergencia completados según plan?' } },
      { q: { en: 'Worker safety suggestions and consultations reviewed?', es: '¿Sugerencias y consultas de seguridad de los trabajadores revisadas?' } },
      { q: { en: 'Walkthrough of all areas completed using core checklists?', es: '¿Recorrido de todas las áreas completado con las listas básicas?' } },
      { q: { en: 'Health surveillance / wellbeing support in place?', es: '¿Vigilancia de salud / apoyo al bienestar en marcha?' } },
      { q: { en: 'Improvement actions from this audit assigned with due dates?', es: '¿Acciones de mejora de esta auditoría asignadas con fechas límite?' } }
    ]
  },
  {
    id: 'construction', icon: '🏗️',
    title: { en: 'Construction Site Safety', es: 'Seguridad en Obra de Construcción' },
    desc: { en: 'Excavations, scaffolds, cranes, tools and site-wide construction hazards.',
            es: 'Excavaciones, andamios, grúas, herramientas y peligros propios de obra.' },
    items: [
      { q: { en: 'Site perimeter secured, fencing intact and gates controlled?', es: '¿Perímetro de obra asegurado, cercado intacto y accesos controlados?' } },
      { q: { en: 'Excavations shored/sloped, inspected daily and after rain?', es: '¿Excavaciones entibadas/taludadas, inspeccionadas a diario y tras lluvias?' } },
      { q: { en: 'Excavation edges protected; spoil piles at least 1 m back?', es: '¿Bordes de excavación protegidos; material retirado a 1 m mínimo?' } },
      { q: { en: 'Scaffold platforms fully planked with safe access?', es: '¿Plataformas de andamio completamente entabladas con acceso seguro?' } },
      { q: { en: 'Cranes and lifting gear certified, with current load charts?', es: '¿Grúas y equipos de izaje certificados, con tablas de carga vigentes?' } },
      { q: { en: 'Lifting zones barricaded; no loads over personnel?', es: '¿Zonas de izaje acordonadas; sin cargas sobre personal?' } },
      { q: { en: 'Barricades and signage around openings, edges and plant?', es: '¿Barricadas y señalización en aberturas, bordes y maquinaria?' } },
      { q: { en: 'Powder-actuated/pressure tools used only by trained operators?', es: '¿Herramientas de pólvora/presión usadas solo por operadores entrenados?' } },
      { q: { en: 'Silica dust controls (wet cutting, extraction, respirators) in place?', es: '¿Controles de polvo de sílice (corte húmedo, extracción, respiradores) instalados?' } },
      { q: { en: 'Underground/overhead utilities located and marked before digging?', es: '¿Servicios subterráneos/aéreos localizados y marcados antes de excavar?' } },
      { q: { en: 'Hot-work permits and fire watch in place for welding/cutting?', es: '¿Permisos de trabajo en caliente y vigilancia contra incendios para soldadura/corte?' } },
      { q: { en: 'Daily pre-task plans (PTP) completed by crews?', es: '¿Planes diarios de tarea completados por las cuadrillas?' } }
    ]
  },
  {
    id: 'food', icon: '🍽️',
    title: { en: 'Food Service & Kitchen Safety', es: 'Seguridad e Higiene en Cocinas y Alimentos' },
    desc: { en: 'Kitchen burns/cuts, slip risks, food hygiene and refrigeration.',
            es: 'Quemaduras/cortes, riesgos de resbalones, higiene alimentaria y refrigeración.' },
    items: [
      { q: { en: 'Oil/fat fires equipment present (Class K/F extinguisher, fire blanket)?', es: '¿Equipos para fuegos de grasa presentes (extintor clase K/F, manta ignífuga)?' } },
      { q: { en: 'Grease traps and extraction hoods cleaned per schedule?', es: '¿Trampas de grasa y campanas extractoras limpiadas según cronograma?' } },
      { q: { en: 'Knives stored safely, sharpened, and cutting boards stable?', es: '¿Cuchillos guardados de forma segura, afilados y tablas de corte estables?' } },
      { q: { en: 'Mandolines/slicers guarded; no unauthorized use?', es: '¿Rebanadoras/acumuladores con resguardo; sin uso no autorizado?' } },
      { q: { en: 'Floor areas degreased; slip-resistant footwear worn?', es: '¿Pisos desengrasados; calzado antideslizante usado?' } },
      { q: { en: 'Cold chain maintained — fridges ≤ 5°C / 41°F, freezers ≤ −18°C / 0°F?', es: '¿Cadena de frío mantenida — refrigeradores ≤ 5 °C, congeladores ≤ −18 °C?' } },
      { q: { en: 'Food at correct temperature; date labeling and FIFO followed?', es: '¿Alimentos a temperatura correcta; etiquetado por fecha y PEPS seguidos?' } },
      { q: { en: 'Hand-washing stations stocked and used; gloves changed properly?', es: '¿Lavamanos surtidos y usados; cambio de guantes correcto?' } },
      { q: { en: 'Allergen information accurate and communicated for all dishes?', es: '¿Información de alérgenos precisa y comunicada para todos los platos?' } },
      { q: { en: 'Cleaning chemicals stored away from food; COSHH/SDS available?', es: '¿Químicos de limpieza lejos de alimentos; SDS disponibles?' } }
    ]
  },
  {
    id: 'office', icon: '💼',
    title: { en: 'Office Safety', es: 'Seguridad en Oficinas' },
    desc: { en: 'Workstation ergonomics, electricals, slips/trips and emergency readiness.',
            es: 'Ergonomía, instalaciones eléctricas, resbalones y preparación ante emergencias.' },
    items: [
      { q: { en: 'Desks, drawers and walkways tidy — no trailing cables?', es: '¿Escritorios, cajones y pasos ordenados — sin cables sueltos?' } },
      { q: { en: 'Chairs, monitors and keyboards adjusted for each user?', es: '¿Sillas, monitores y teclados ajustados para cada usuario?' } },
      { q: { en: 'Heavy items stored between knee and shoulder height?', es: '¿Objetos pesados guardados entre la altura de rodillas y hombros?' } },
      { q: { en: 'Electrical equipment PAT-tested and visual-checked regularly?', es: '¿Equipos eléctricos probados y revisados visualmente con regularidad?' } },
      { q: { en: 'Heaters/photocopy rooms ventilated; no combustibles on heaters?', es: '¿Calefactores y cuartos de copias ventilados; sin combustibles sobre calefactores?' } },
      { q: { en: 'Evacuation routes and meeting points known; wardens appointed?', es: '¿Rutas de evacuación y puntos de encuentro conocidos; brigadistas designados?' } },
      { q: { en: 'First aid kit and trained first-aiders available?', es: '¿Botiquín y brigadistas de primeros auxilios disponibles?' } },
      { q: { en: 'Lone/staff working late have safe building exit arrangements?', es: '¿Personal que trabaja tarde tiene salida segura del edificio?' } }
    ]
  },
  {
    id: 'warehouse', icon: '📦',
    title: { en: 'Warehouse & Logistics Safety', es: 'Seguridad en Almacenes y Logística' },
    desc: { en: 'Forklifts, racking, docks, vehicle movements and stock handling.',
            es: 'Montacargas, estanterías, andenes, circulación de vehículos y manejo de mercancía.' },
    items: [
      { q: { en: 'Forklifts inspected daily (pre-use checklist) and operators certified?', es: '¿Montacargas inspeccionados a diario (checklist) y operadores certificados?' } },
      { q: { en: 'Pedestrian and vehicle routes separated and clearly marked?', es: '¿Rutas peatonales y vehiculares separadas y claramente marcadas?' } },
      { q: { en: 'Racking inspected for damage; load notices displayed?', es: '¿Estanterías inspeccionadas por daños; carteles de carga visibles?' } },
      { q: { en: 'Dock levellers/edges protected; wheel chocks or restraints used?', es: '¿Andenes y bordes protegidos; calzos o retranqueos de rueda usados?' } },
      { q: { en: 'Reversing alarms and lights working on all vehicles?', es: '¿Alarmas de retroceso y luces funcionando en todos los vehículos?' } },
      { q: { en: 'Stacked pallets stable, undamaged and height-limited?', es: '¿Tarimas apiladas estables, sin daños y con altura limitada?' } },
      { q: { en: 'Loading bays lit and traffic marshals used in busy zones?', es: '¿Andenes iluminados y controladores de tránsito en zonas concurridas?' } },
      { q: { en: 'Battery charging areas ventilated with PPE for electrolyte?', es: '¿Áreas de carga de baterías ventiladas con EPP para electrolito?' } },
      { q: { en: 'Order pickers trained on fall risk; harness used where required?', es: '¿Operadores de pedidero entrenados en riesgo de caída; arnés donde se requiera?' } },
      { q: { en: 'Wrapping film, banding and sharp tools disposed of safely?', es: '¿Film de embalaje, flejes y herramientas cortantes desechados con seguridad?' } }
    ]
  }
];

window.INCIDENT_OPTIONS = {
  types: [
    { en: 'Injury / first aid', es: 'Lesión / primeros auxilios' },
    { en: 'Medical treatment', es: 'Tratamiento médico' },
    { en: 'Near miss', es: 'Cuasi accidente' },
    { en: 'Property / equipment damage', es: 'Daño a propiedad / equipos' },
    { en: 'Fire / emergency event', es: 'Incendio / emergencia' },
    { en: 'Security breach / unauthorized access', es: 'Brecha de seguridad / acceso no autorizado' },
    { en: 'Threat or violence', es: 'Amenaza o violencia' },
    { en: 'Chemical spill / exposure', es: 'Derrame químico / exposición' },
    { en: 'Other', es: 'Otro' }
  ],
  severities: [
    { en: 'Low — no treatment needed', es: 'Baja — sin tratamiento necesario' },
    { en: 'Medium — first aid / minor', es: 'Media — primeros auxilios / menor' },
    { en: 'High — medical attention / lost time', es: 'Alta — atención médica / tiempo perdido' },
    { en: 'Critical — life-threatening', es: 'Crítica — riesgo de vida' }
  ]
};

window.GUIDE = [
  {
    icon: '🔥',
    title: { en: 'Fire emergency — what to do', es: 'Emergencia por incendio — qué hacer' },
    body: {
      en: '<ol><li>Activate the nearest fire alarm pull station and alert people nearby.</li><li>Evacuate via the nearest marked exit route — never use elevators.</li><li>Stay low if there is smoke; check doors for heat before opening.</li><li>Use a fire extinguisher (PASS method) only if the fire is small AND you are trained AND you have a clear escape path.</li><li>Assemble at the designated assembly point and report to the roll-call warden.</li><li>Never re-enter the building until officially cleared.</li></ol>',
      es: '<ol><li>Active la alarma de incendios más cercana y alerte a las personas cercanas.</li><li>Evacúe por la ruta de salida marcada más cercana — nunca use ascensores.</li><li>Agáchese si hay humo; verifique si las puertas están calientes antes de abrirlas.</li><li>Use un extintor (método PASS) solo si el fuego es pequeño, está capacitado y tiene ruta de escape despejada.</li><li>Reúnase en el punto de encuentro y repórtese con el brigadista de conteo.</li><li>Nunca reingrese al edificio hasta que se autorice oficialmente.</li></ol>'
    }
  },
  {
    icon: '🩸',
    title: { en: 'First aid basics', es: 'Primeros auxilios básicos' },
    body: {
      en: '<ol><li>Call for help and know your site\u2019s emergency number and first-aiders.</li><li>Assess: Danger, Response, Airway, Breathing, Circulation.</li><li>Severe bleeding: apply firm direct pressure with a clean dressing.</li><li>Burns: cool with running water for at least 20 minutes. Never apply ice or creams.</li><li>Chemical splash to eye: flush at eyewash station for 15+ minutes.</li><li>Do not move a casualty with suspected head, neck or back injury unless in immediate danger.</li></ol>',
      es: '<ol><li>Pida ayuda y conozca el número de emergencia y los brigadistas de su sitio.</li><li>Evalúe: Peligro, Respuesta, Vía aérea, Respiración, Circulación.</li><li>Sangrado severo: aplique presión directa firme con una gasa limpia.</li><li>Quemaduras: enfríe con agua corriente al menos 20 minutos. Nunca aplique hielo ni cremas.</li><li>Salpicadura química en el ojo: enjuague en el lavador de ojos por más de 15 minutos.</li><li>No mueva a la víctima con sospecha de lesión de cabeza, cuello o espalda, salvo peligro inminente.</li></ol>'
    }
  },
  {
    icon: '⚠️',
    title: { en: 'Chemical spill (HazCom)', es: 'Derrame químico (HazCom)' },
    body: {
      en: '<ol><li>Alert others and evacuate the immediate area if the spill is large or vapors are strong.</li><li>Check the Safety Data Sheet (SDS) for the chemical before handling.</li><li>Wear the PPE specified on the SDS (gloves, goggles, respirator as required).</li><li>Contain with spill kit absorbents; never wash unknown chemicals down drains.</li><li>Dispose of cleanup materials as hazardous waste; report the spill.</li></ol>',
      es: '<ol><li>Alerte a los demás y evacúe el área si el derrame es grande o hay vapores fuertes.</li><li>Consulte la Hoja de Seguridad (SDS) del químico antes de manipularlo.</li><li>Use el EPP indicado en la SDS (guantes, goggles, respirador según corresponda).</li><li>Contenga con absorbentes del kit antiderrame; nunca vierta químicos desconocidos al desagüe.</li><li>Disponga los materiales de limpieza como residuos peligrosos; reporte el derrame.</li></ol>'
    }
  },
  {
    icon: '🔒',
    title: { en: 'Security — intruder / threat', es: 'Seguridad — intruso / amenaza' },
    body: {
      en: '<ol><li>Do not confront unauthorized persons — observe and report.</li><li>Note: description, location, direction of travel, vehicle details.</li><li>Call security / police. Give your name, location and what you see.</li><li>Threat of violence: remove yourself, alert others discreetly, follow the site\u2019s lockdown or evacuation procedure.</li><li>Active threat: Run if you can. Hide if you can\u2019t. Fight only as last resort. Silence phones.</li></ol>',
      es: '<ol><li>No confronte a personas no autorizadas — observe y reporte.</li><li>Anote: descripción, ubicación, dirección de desplazamiento, datos del vehículo.</li><li>Llame a seguridad / policía. Indique su nombre, ubicación y lo que ve.</li><li>Amenaza de violencia: aléjese, alerte a otros con discreción y siga el protocolo de encierro o evacuación del sitio.</li><li>Amenaza activa: huya si puede. Escóndase si no puede. Enfrentar solo como último recurso. Silencie el teléfono.</li></ol>'
    }
  },
  {
    icon: '⚡',
    title: { en: 'Electrical emergency', es: 'Emergencia eléctrica' },
    body: {
      en: '<ol><li>Never touch a person in contact with live electricity — isolate the power first.</li><li>Use the electrical panel / emergency stop to cut power.</li><li>Report shocks, even minor ones — they can cause delayed cardiac effects.</li><li>Never use water on an electrical fire; use a CO2 or dry-powder extinguisher.</li></ol>',
      es: '<ol><li>Nunca toque a una persona en contacto con electricidad — corte la energía primero.</li><li>Use el tablero eléctrico / paro de emergencia para cortar la corriente.</li><li>Reporte las descargas, incluso las leves — pueden causar efectos cardíacos tardíos.</li><li>Nunca use agua en un incendio eléctrico; use extintor de CO2 o polvo seco.</li></ol>'
    }
  },
  {
    icon: '🧯',
    title: { en: 'PPE quick reference', es: 'Referencia rápida de EPP' },
    body: {
      en: '<ul><li><strong>Head:</strong> hard hat where overhead hazards or falling objects exist.</li><li><strong>Eyes:</strong> safety glasses minimum; goggles for chemicals/dust; face shield for grinding.</li><li><strong>Hearing:</strong> earplugs/earmuffs when noise exceeds 85 dB.</li><li><strong>Hands:</strong> match glove type to hazard — cut, chemical, heat (never gloves near rotating machinery).</li><li><strong>Feet:</strong> safety-toe footwear on site at all times.</li><li><strong>High visibility:</strong> whenever vehicles or mobile plant operate nearby.</li><li><strong>Fall protection:</strong> harness required at heights above the legal threshold.</li></ul>',
      es: '<ul><li><strong>Cabeza:</strong> casco donde existan riesgos de caída de objetos.</li><li><strong>Ojos:</strong> gafas de seguridad como mínimo; goggles para químicos/polvo; careta para rectificado.</li><li><strong>Oídos:</strong> tapones/auriculares cuando el ruido supere 85 dB.</li><li><strong>Manos:</strong> guante según el riesgo — corte, químico, calor (nunca guantes cerca de maquinaria rotativa).</li><li><strong>Pies:</strong> calzado con puntera de seguridad en todo momento.</li><li><strong>Alta visibilidad:</strong> siempre que operen vehículos o maquinaria cerca.</li><li><strong>Protección contra caídas:</strong> arnés obligatorio por encima del umbral legal de altura.</li></ul>'
    }
  },
  {
    icon: '📊',
    title: { en: 'About the checklists', es: 'Sobre las listas de verificación' },
    body: {
      en: '<p>The 15 checklists in this app are based on widely used safety frameworks, including OSHA general industry and construction standards and ISO 45001 occupational health &amp; safety management principles. They cover hazard identification, PPE, fire &amp; emergency preparedness, electrical safety, machine guarding, ergonomics, chemical/HazCom, first aid, incident reporting, workplace security, working at height, a monthly full-site audit, plus dedicated checklists for construction, food service, office and warehouse environments.</p><p><strong>Disclaimer:</strong> this app is a helpful tool, not a substitute for your local legal requirements, site-specific risk assessments, or professional advice. Always follow your jurisdiction\u2019s regulations.</p>',
      es: '<p>Las 15 listas de esta app se basan en marcos de seguridad ampliamente utilizados, incluidas las normas generales y de construcción de OSHA y los principios ISO 45001 de gestión de seguridad y salud en el trabajo. Cubren identificación de peligros, EPP, incendios y emergencias, seguridad eléctrica, resguardo de máquinas, ergonomía, químicos/HazCom, primeros auxilios, reporte de incidentes, seguridad física, trabajo en alturas, una auditoría mensual integral y listas dedicadas para construcción, alimentos, oficinas y almacenes.</p><p><strong>Descargo de responsabilidad:</strong> esta app es una herramienta de apoyo, no sustituye los requisitos legales locales, las evaluaciones de riesgo específicas del sitio ni el asesoramiento profesional. Siga siempre la normativa de su jurisdicción.</p>'
    }
  }
];
