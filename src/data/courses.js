// Масив навчальних курсів
// Кожен об'єкт містить обов'язкові поля згідно з завданням:
// 1. назва курсу (title)
// 2. ім'я викладача (instructor)
// 3. тривалість курсу (duration)
// 4. інформація про доступність запису (isAvailable)

export const initialCourses = [
  {
    id: 1,
    title: "Основи React та сучасного Frontend",
    instructor: "Олександр Коваленко",
    duration: "8 тижнів (32 години)",
    isAvailable: true,
    availableSeats: 6,
    level: "Початковий",
    category: "Розробка",
    tag: "Популярний",
    icon: "⚛️"
  },
  {
    id: 2,
    title: "Python: від синтаксису до Data Science",
    instructor: "Марія Шевченко",
    duration: "10 тижнів (40 годин)",
    isAvailable: true,
    availableSeats: 2,
    level: "Середній",
    category: "Data Science",
    tag: "Гаряче",
    icon: "🐍"
  },
  {
    id: 3,
    title: "UI/UX Дизайн інтерфейсів у Figma",
    instructor: "Дмитро Мельник",
    duration: "6 тижнів (24 години)",
    isAvailable: false,
    availableSeats: 0,
    level: "Початковий",
    category: "Дизайн",
    tag: "Набір закрито",
    icon: "🎨"
  }
];

// Зразок 4-го курсу для демонстрації додавання (відповідь на питання №3)
export const sampleFourthCourse = {
  id: 4,
  title: "DevOps та хмарні сервери (Docker & CI/CD)",
  instructor: "Василь Бондаренко",
  duration: "7 тижнів (28 годин)",
  isAvailable: true,
  availableSeats: 8,
  level: "Високий",
  category: "Інфраструктура",
  tag: "Новий курс",
  icon: "☁️"
};
