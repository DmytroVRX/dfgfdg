import React, { useState } from 'react';
import CourseCard from './components/CourseCard';
import { initialCourses, sampleFourthCourse } from './data/courses';
import './App.css';

function App() {
  // Стан зі списком курсів (за замовчуванням 3 курси)
  const [courses, setCourses] = useState(initialCourses);
  
  // Індивідуальне завдання: стан фільтрації (всі курси або тільки доступні)
  const [filterOnlyAvailable, setFilterOnlyAvailable] = useState(false);
  
  // Індивідуальне завдання: стан списку курсів, на які користувач записався
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  
  // Повідомлення для зворотного зв'язку (toast)
  const [toastMessage, setToastMessage] = useState(null);

  // Функція для показу сповіщення
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Обробник запису на курс (індивідуальне завдання)
  const handleToggleEnroll = (course) => {
    if (!course.isAvailable && !enrolledCourseIds.includes(course.id)) {
      showToast(`⚠️ На жаль, на курс "${course.title}" запис уже закрито.`);
      return;
    }

    if (enrolledCourseIds.includes(course.id)) {
      setEnrolledCourseIds((prev) => prev.filter((id) => id !== course.id));
      showToast(`ℹ️ Ви скасували запис на курс "${course.title}".`);
    } else {
      setEnrolledCourseIds((prev) => [...prev, course.id]);
      showToast(`🎉 Вітаємо! Ви успішно записалися на "${course.title}".`);
    }
  };

  // Додавання 4-го курсу (наочна відповідь на питання аналізу №3)
  const handleAddFourthCourse = () => {
    const exists = courses.some((c) => c.id === sampleFourthCourse.id);
    if (!exists) {
      setCourses((prev) => [...prev, sampleFourthCourse]);
      showToast(`✨ Додано новий 4-й курс: "${sampleFourthCourse.title}"!`);
    } else {
      showToast(`⚠️ 4-й курс уже присутній у списку.`);
    }
  };

  // Інтерактивна зміна props першого курсу (для перевірки вимоги №3)
  const handleToggleFirstCourseAvailability = () => {
    setCourses((prev) =>
      prev.map((c, index) =>
        index === 0
          ? {
              ...c,
              isAvailable: !c.isAvailable,
              availableSeats: !c.isAvailable ? 6 : 0
            }
          : c
      )
    );
    showToast(`🔄 Змінено значення prop 'isAvailable' для першого курсу!`);
  };

  // Скидання до початкових 3-х курсів
  const handleResetCourses = () => {
    setCourses(initialCourses);
    setEnrolledCourseIds([]);
    setFilterOnlyAvailable(false);
    showToast(`🔄 Скинуто до початкових 3 курсів.`);
  };

  // Відфільтрований список для відображення
  const displayedCourses = filterOnlyAvailable
    ? courses.filter((course) => course.isAvailable)
    : courses;

  const totalAvailable = courses.filter((c) => c.isAvailable).length;

  return (
    <div className="app-container">
      {/* Спливаюче сповіщення */}
      {toastMessage && (
        <div className="toast">
          {toastMessage}
        </div>
      )}

      {/* Верхня панель / Заголовок */}
      <header className="app-header">
        <div className="badge-pill">React Components & Props Demo</div>
        <h1 className="app-title">Навчальні курси</h1>
        <p className="app-subtitle">
          Демонстраційний застосунок: один універсальний компонент <code>CourseCard</code>, 
          що відображає різні курси завдяки передачі даних через <strong>props</strong>.
        </p>

        {/* Статистична панель */}
        <div className="stats-bar">
          <div className="stat-card">
            <span className="stat-value">{courses.length}</span>
            <span className="stat-label">Всього курсів</span>
          </div>
          <div className="stat-card">
            <span className="stat-value stat-value--success">{totalAvailable}</span>
            <span className="stat-label">Відкрито для запису</span>
          </div>
          <div className="stat-card">
            <span className="stat-value stat-value--accent">{enrolledCourseIds.length}</span>
            <span className="stat-label">Мої активні записи</span>
          </div>
        </div>

        {/* Панель керування та перевірки (Вимоги 3, 4 та запитання 3) */}
        <div className="control-bar">
          <div className="filter-group">
            <button
              type="button"
              className={`filter-btn ${!filterOnlyAvailable ? 'filter-btn--active' : ''}`}
              onClick={() => setFilterOnlyAvailable(false)}
            >
              Всі курси ({courses.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${filterOnlyAvailable ? 'filter-btn--active' : ''}`}
              onClick={() => setFilterOnlyAvailable(true)}
            >
              Тільки доступні ({totalAvailable})
            </button>
          </div>

          <div className="action-group">
            <button
              type="button"
              className="action-btn action-btn--test"
              onClick={handleToggleFirstCourseAvailability}
              title="Перевірка зміни props на льоту"
            >
              ⚡ Змінити props курсу №1
            </button>

            {courses.length === 3 ? (
              <button
                type="button"
                className="action-btn action-btn--add"
                onClick={handleAddFourthCourse}
                title="Відповідь на питання 3: додавання 4-го курсу"
              >
                + Додати 4-й курс
              </button>
            ) : (
              <button
                type="button"
                className="action-btn action-btn--reset"
                onClick={handleResetCourses}
              >
                ↺ Скинути до 3-х курсів
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Основна сітка з картками курсів */}
      <main className="main-content">
        <section className="courses-grid">
          {displayedCourses.map((course) => (
            /* 
              Пункт 2 завдання:
              Компонент CourseCard отримує дані через props:
              - title: назва курсу
              - instructor: ім'я викладача
              - duration: тривалість курсу
              - isAvailable: інформація про доступність запису
            */
            <CourseCard
              key={course.id}
              title={course.title}
              instructor={course.instructor}
              duration={course.duration}
              isAvailable={course.isAvailable}
              availableSeats={course.availableSeats}
              level={course.level}
              category={course.category}
              tag={course.tag}
              icon={course.icon}
              isEnrolled={enrolledCourseIds.includes(course.id)}
              onEnroll={() => handleToggleEnroll(course)}
            />
          ))}
        </section>

        {displayedCourses.length === 0 && (
          <div className="empty-state">
            <p>Немає курсів, які відповідають вибраному фільтру.</p>
          </div>
        )}
      </main>

      {/* Інформаційний блок для захисту роботи */}
      <footer className="app-footer">
        <div className="props-info-box">
          <h4>💡 Як передаються props у цьому застосунку:</h4>
          <p>
            Батьківський компонент <code>App</code> зберігає масив курсів у стані <code>courses</code>. 
            Під час рендерингу функція <code>courses.map(...)</code> генерує окремі екземпляри компонента <code>CourseCard</code>, 
            передаючи значення кожного поля через відповідний prop (<code>title</code>, <code>instructor</code>, <code>duration</code>, <code>isAvailable</code>).
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
