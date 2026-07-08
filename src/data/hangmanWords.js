const CATEGORIES = [
  {
    category: 'חיות',
    words: ['כלב', 'חתול', 'אריה', 'פיל', 'תוכי', 'קוף', 'נמר', 'זברה', 'דוב', 'ינשוף', 'תנין', 'קנגורו'],
  },
  {
    category: 'פירות',
    words: ['תפוח', 'בננה', 'ענבים', 'תות', 'אבטיח', 'מלון', 'אגס', 'שזיף', 'רימון', 'תמר', 'מנגו', 'קיווי'],
  },
  {
    category: 'מדינות',
    words: ['ישראל', 'צרפת', 'יפן', 'ברזיל', 'קנדה', 'מצרים', 'הודו', 'ספרד', 'איטליה', 'יוון', 'תורכיה', 'מרוקו'],
  },
  {
    category: 'מקצועות',
    words: ['רופא', 'מורה', 'טבח', 'שוטר', 'כבאי', 'נהג', 'צייר', 'זמר', 'מהנדס', 'שחקן', 'טייס', 'ספר'],
  },
  {
    category: 'צבעים',
    words: ['אדום', 'כחול', 'ירוק', 'צהוב', 'סגול', 'כתום', 'ורוד', 'שחור', 'לבן', 'חום', 'תכלת', 'אפור'],
  },
  {
    category: 'ספורט',
    words: ['כדורגל', 'כדורסל', 'טניס', 'שחייה', 'ריצה', 'אופניים', 'התעמלות', 'כדורעף', 'גלישה', 'יוגה'],
  },
]

export function pickRandomWord() {
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
  const word = category.words[Math.floor(Math.random() * category.words.length)]
  return { word, category: category.category }
}
