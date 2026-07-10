export const TRIVIA_QUESTIONS = [
  { question: 'מהי בירת צרפת?', options: ['פריז', 'לונדון', 'רומא', 'ברלין'], correctIndex: 0 },
  { question: 'כמה יבשות יש בעולם?', options: ['5', '6', '7', '8'], correctIndex: 2 },
  {
    question: 'מהו האיבר הגדול ביותר בגוף האדם?',
    options: ['הלב', 'הכבד', 'העור', 'המוח'],
    correctIndex: 2,
  },
  {
    question: 'באיזו שנה נחת האדם הראשון על הירח?',
    options: ['1965', '1969', '1972', '1958'],
    correctIndex: 1,
  },
  { question: 'מהי בירת יפן?', options: ['טוקיו', 'קיוטו', 'אוסקה', 'יוקוהמה'], correctIndex: 0 },
  {
    question: 'כמה צלעות יש בגוף האדם הבוגר?',
    options: ['12', '24', '32', '206'],
    correctIndex: 1,
  },
  {
    question: 'מי כתב את המחזה "רומיאו ויוליה"?',
    options: ['שייקספיר', 'דיקנס', 'טולסטוי', 'מארק טוויין'],
    correctIndex: 0,
  },
  { question: 'מהו הסימן הכימי של חמצן?', options: ['Au', 'O', 'Fe', 'Zn'], correctIndex: 1 },
  {
    question: 'איזה כוכב לכת הכי קרוב לשמש?',
    options: ['נוגה', 'מאדים', 'כוכב חמה', 'כדור הארץ'],
    correctIndex: 2,
  },
  {
    question: 'כמה שחקנים יש בקבוצת כדורגל על המגרש?',
    options: ['9', '10', '11', '12'],
    correctIndex: 2,
  },
  {
    question: 'מהי המדינה הגדולה בעולם בשטחה?',
    options: ['סין', 'קנדה', 'ארצות הברית', 'רוסיה'],
    correctIndex: 3,
  },
  {
    question: 'מי צייר את "המונה ליזה"?',
    options: ['ואן גוך', 'פיקאסו', 'לאונרדו דה וינצ׳י', 'מיכלאנג׳לו'],
    correctIndex: 2,
  },
  {
    question: 'איזה נהר נחשב לארוך בעולם, לפי הידע המסורתי?',
    options: ['האמזונס', 'הנילוס', 'המיסיסיפי', 'היאנגצה'],
    correctIndex: 1,
  },
  { question: 'כמה עצמות יש בגוף מבוגר?', options: ['106', '206', '306', '150'], correctIndex: 1 },
  {
    question: 'מהי בירת אוסטרליה?',
    options: ['סידני', 'מלבורן', 'קנברה', 'פרת׳'],
    correctIndex: 2,
  },
  {
    question: 'איזה גז הצמחים פולטים בתהליך הפוטוסינתזה?',
    options: ['פחמן דו-חמצני', 'חנקן', 'חמצן', 'מימן'],
    correctIndex: 2,
  },
  {
    question: 'מי מוכר כממציא הטלפון?',
    options: ['תומאס אדיסון', 'אלכסנדר גרהם בל', 'ניקולה טסלה', 'בנג׳מין פרנקלין'],
    correctIndex: 1,
  },
  {
    question: 'כמה זמן לוקח לכדור הארץ להקיף את השמש?',
    options: ['יום אחד', 'חודש', 'שנה', 'עשור'],
    correctIndex: 2,
  },
  { question: 'מהי המטבע הרשמי של יפן?', options: ['וון', 'יואן', 'ין', 'באט'], correctIndex: 2 },
  {
    question: 'מי היה הנשיא הראשון של ארצות הברית?',
    options: ['אברהם לינקולן', 'ג׳ורג׳ וושינגטון', 'תומאס ג׳פרסון', 'בנג׳מין פרנקלין'],
    correctIndex: 1,
  },
]

export function pickRandomQuestions(count) {
  const shuffled = [...TRIVIA_QUESTIONS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
