// Central program configuration - single source of truth.
// Values here are defaults; admins can override them from /admin (stored in the
// program_settings table) without touching code.

export const PROGRAM_DEFAULTS = {
  name: "MIA Saudi PT",
  fullName: "MIA Saudi PT — 10-Day Intensive Preparation Program",
  tagline: "10 Days. 10 Lectures. One Complete Revision Journey.",
  institution: "Medical Intelligence Academy",
  instructor: "Dr. Ashraf Alaa Mostafa",
  instructorAr: "د. أشرف علاء مصطفى",
  startDate: "2026-11-26", // provisional start, editable from admin
  timezone: "Asia/Riyadh",
  durationDays: 10,
  lectureCount: 10,
  lectureHours: 2,
  totalHours: 20,
  mcqTarget: 350,
  caseTarget: 20,
  seatsNote: "العرض حصري لأول ٥٠ مشترك", // user-confirmed cap (50)
  price: "500 ريال — 300 ريال لأول 50 مشترك — 250 ريال للفرد في مجموعة 4" as string | null,
  registrationOpen: true,
  whatsappSupport: "201141999069", // editable from admin
  whatsappMessage:
    "السلام عليكم، عندي استفسار عن برنامج MIA Saudi PT — 10-Day Intensive Preparation Program، وأرغب بمعرفة تفاصيل المحاضرات والتجربة المجانية.",
  whatsappSampleMessage:
    "السلام عليكم، أرغب بمشاهدة نموذج من الشرح بتقنية 3D لبرنامج MIA Saudi PT.",
  demoVideo1: "/videos/demo-acl-short.mp4",
  demoVideo2: "/videos/demo-acl-full.mp4",
  doctorPhoto: "" as string, // hero photo slot: set from admin settings once Dr. Ashraf provides his photo
  confirmationMessage:
    "تم تسجيل بياناتك في MIA Saudi PT Program. سيتم التواصل معك عبر واتساب بتفاصيل المحاضرات وخطوات الانضمام.",
};

export type ProgramSettings = typeof PROGRAM_DEFAULTS & {
  sessionTimes?: string;
  freeLectureDates?: string;
  descriptionExtra?: string;
};

export interface CurriculumDay {
  day: number;
  titleAr: string;
  titleEn: string;
  topics: string[];
  free?: boolean;
}

export const CURRICULUM: CurriculumDay[] = [
  {
    day: 1,
    titleAr: "العلاج الطبيعي للعظام والإصابات الرياضية I — الكتف والعمود الرقبي",
    titleEn: "MSK & Sports Injuries I — Shoulder & Cervical Spine",
    free: true,
    topics: [
      "Functional Anatomy",
      "Shoulder & Cervical Biomechanics",
      "Rotator Cuff Injuries",
      "Shoulder Instability",
      "Frozen Shoulder",
      "Cervical Radiculopathy",
      "Clinical Examination & Special Tests",
      "Diagnosis & Rehabilitation",
    ],
  },
  {
    day: 2,
    titleAr: "العلاج الطبيعي للعظام والإصابات الرياضية II — العمود القطني والورك",
    titleEn: "MSK & Sports Injuries II — Lumbar Spine & Hip",
    free: true,
    topics: [
      "Lumbar Anatomy & Biomechanics",
      "Lumbar Disc Herniation",
      "Mechanical Low Back Pain",
      "Lumbar Radiculopathy",
      "Hip Osteoarthritis",
      "Hip Impingement",
      "Gait Biomechanics",
      "Differential Diagnosis & Treatment",
    ],
  },
  {
    day: 3,
    titleAr: "العلاج الطبيعي للعظام والإصابات الرياضية III — الركبة والكاحل والتأهيل الرياضي",
    titleEn: "MSK & Sports Injuries III — Knee, Ankle & Sports Rehabilitation",
    topics: [
      "Knee Anatomy & Biomechanics",
      "ACL and Meniscal Injuries",
      "Patellofemoral Pain",
      "Knee Osteoarthritis",
      "Ankle Sprains",
      "Achilles Tendinopathy",
      "Postoperative Rehabilitation",
      "Return-to-Sport Criteria",
    ],
  },
  {
    day: 4,
    titleAr: "الأعصاب I — علم التشريح والفسيولوجيا العصبية والجهاز العصبي المركزي",
    titleEn: "Neurology I — Neuroanatomy, Neurophysiology & CNS",
    topics: [
      "CNS Anatomy",
      "Motor and Sensory Pathways",
      "Neurophysiology",
      "UMN vs LMN",
      "Stroke",
      "Spinal Cord Injury",
      "Traumatic Brain Injury",
      "Neurological Assessment",
    ],
  },
  {
    day: 5,
    titleAr: "الأعصاب II — تأهيل الجهاز العصبي المركزي واضطرابات الأعصاب الطرفية",
    titleEn: "Neurology II — CNS Rehabilitation & PNS Disorders",
    topics: [
      "Parkinson's Disease",
      "Multiple Sclerosis",
      "Cerebellar Disorders",
      "Peripheral Nerve Injuries",
      "Neuropathies",
      "Gait Rehabilitation",
      "Motor Learning",
      "Neuro Clinical Cases",
    ],
  },
  {
    day: 6,
    titleAr: "الأطفال I — النمو والتطور وطب الأعصاب للأطفال",
    titleEn: "Pediatrics I — Growth, Development & Pediatric Neurology",
    topics: [
      "Developmental Milestones",
      "Primitive Reflexes",
      "Postural Reactions",
      "Cerebral Palsy",
      "Spina Bifida",
      "Developmental Delay",
      "Pediatric Neurorehabilitation",
    ],
  },
  {
    day: 7,
    titleAr: "الأطفال II — الحالات الخاصة وفئات مميزة",
    titleEn: "Pediatrics II — Pediatric Conditions & Special Populations",
    topics: [
      "Pediatric Orthopedic Conditions",
      "Muscular Dystrophy",
      "Developmental Dysplasia of Hip",
      "Clubfoot",
      "Geriatric Physical Therapy",
      "Fall Prevention",
      "Women's Health",
      "Pregnancy & Postpartum Rehabilitation",
    ],
  },
  {
    day: 8,
    titleAr: "العلاج الكهربائي والعلاج المائي",
    titleEn: "Electrotherapy & Hydrotherapy",
    topics: [
      "TENS",
      "IFC",
      "NMES and FES",
      "Therapeutic Ultrasound",
      "Laser Therapy",
      "Cryotherapy and Thermotherapy",
      "Hydrotherapy",
      "Parameters, Indications, Contraindications and Clinical Selection",
    ],
  },
  {
    day: 9,
    titleAr: "التمارين العلاجية والتأهيل",
    titleEn: "Therapeutic Exercise & Rehabilitation",
    topics: [
      "Exercise Physiology",
      "Muscle Contractions",
      "Strengthening",
      "Stretching",
      "ROM",
      "Proprioception and Balance",
      "Motor Control",
      "Exercise Prescription",
      "Kinesiology",
      "Ergonomics",
      "Clinical Exercise Progression",
    ],
  },
  {
    day: 10,
    titleAr: "العلاج الطبيعي للقلب والصدر والعناية المركزة",
    titleEn: "Cardiopulmonary & ICU Physical Therapy",
    topics: [
      "Respiratory Anatomy and Physiology",
      "COPD",
      "Asthma",
      "Pulmonary Rehabilitation",
      "Airway Clearance",
      "Cardiac Rehabilitation",
      "Vital Signs",
      "ICU Rehabilitation",
      "Early Mobilization",
      "Patient Safety",
    ],
  },
];

export const FAQ_ITEMS = [
  {
    q: "هل أول أسبوع مجاني؟",
    a: "نعم، الأسبوع الأول مجاني بالكامل: تحضر وتجرّب طريقة الشرح، وتاخد حاجات هتساعدك جدًا في المذاكرة.",
  },
  {
    q: "هل المحاضرات مباشرة أم مسجلة؟",
    a: "المحاضرات تتوفر مباشرة ومسجلة، ويمكنك اختيار الطريقة الأنسب لك.",
  },
  {
    q: "هل البرنامج مناسب لخريجي العلاج الطبيعي خارج السعودية؟",
    a: "نعم، خصوصًا لمن يستعدون لاختبار التصنيف السعودي أو التقييمات الوظيفية، مع مراعاة متطلبات الأهلية الرسمية لكل متقدم.",
  },
  {
    q: "هل أحصل على تطبيق مع البرنامج؟",
    a: "نعم، يحصل الطلاب الملتحقون بالبرنامج على إمكانية استخدام التطبيق المرافق وفق صلاحيات الاشتراك.",
  },
  {
    q: "هل توجد أسئلة وحالات للتدريب؟",
    a: "يتضمن البرنامج بنكًا مستهدفًا يتجاوز 350 MCQ وتدريبات Clinical Cases، مع إجابات مشروحة.",
  },
  {
    q: "هل البرنامج يضمن اجتياز الامتحان؟",
    a: "البرنامج يهدف إلى تنظيم المراجعة ورفع مستوى الاستعداد، لكنه لا يضمن النجاح في الاختبار الرسمي.",
  },
  {
    q: "كيف أعرف تفاصيل الانضمام؟",
    a: "بعد التسجيل واستكمال تأكيد البيانات، تصلك إرشادات الانضمام عبر وسائل التواصل المعتمدة.",
  },
  {
    q: "هل يوجد سعر للاشتراك بعد التجربة المجانية؟",
    a: "البرنامج الكامل (١٠ محاضرات + التطبيق) سعره ٥٠٠ ريال، وعليه خصم لأول ٥٠ مشترك فقط ليصبح ٣٠٠ ريال. ولو سجّلتوا ٤ طلاب مع بعض، كل طالب يدفع ٢٥٠ ريال فقط.",
  },
];
