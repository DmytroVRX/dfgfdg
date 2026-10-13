import React from 'react';

/**
 * Компонент CourseCard (Картка навчального курсу)
 * 
 * Отримує дані через props (властивості):
 * @param {string} title - назва навчального курсу (Обов'язкова вимога)
 * @param {string} instructor - ім'я та прізвище викладача (Обов'язкова вимога)
 * @param {string} duration - загальна тривалість курсу (Обов'язкова вимога)
 * @param {boolean} isAvailable - доступність запису (true / false) (Обов'язкова вимога)
 * @param {number} availableSeats - кількість вільних місць
 * @param {string} level - рівень складності (Початковий, Середній тощо)
 * @param {string} category - напрямок (Розробка, Дизайн тощо)
 * @param {string} tag - бейдж статусу
 * @param {string} icon - тематична іконка
 * @param {boolean} isEnrolled - чи записався користувач
 * @param {function} onEnroll - callback-функція натискання на кнопку запису (індивідуальне завдання)
 */
function CourseCard({
  title,
  instructor,
  duration,
  isAvailable,
  availableSeats = 0,
  level = "Загальний",
  category = "IT",
  tag,
  icon = "📚",
  isEnrolled = false,
  onEnroll
}) {
  return (
    <article className={`course-card ${!isAvailable ? 'course-card--closed' : ''} ${isEnrolled ? 'course-card--enrolled' : ''}`}>
      {/* Верхня частина картки з категорією та статусом доступності */}
      <div className="course-card__header">
        <span className="course-card__category">
          <span className="course-card__icon">{icon}</span>
          {category}
        </span>
        
        {/* Відображення доступності запису */}
        <span 
          className={`course-card__badge ${isAvailable ? 'badge--open' : 'badge--closed'}`}
          title={isAvailable ? "Запис активний" : "Запис призупинено"}
        >
          <span className="badge__dot"></span>
          {isAvailable ? "Запис відкрито" : "Місць немає"}
        </span>
      </div>

      {/* Назва курсу */}
      <h3 className="course-card__title" title={title}>
        {title}
      </h3>

      {/* Інформація про викладача та деталі курсу */}
      <div className="course-card__meta">
        <div className="meta-item">
          <span className="meta-item__label">Викладач:</span>
          <span className="meta-item__value">
            <svg className="meta-icon" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <strong>{instructor}</strong>
          </span>
        </div>

        <div className="meta-item">
          <span className="meta-item__label">Тривалість:</span>
          <span className="meta-item__value">
            <svg className="meta-icon" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{duration}</span>
          </span>
        </div>

        <div className="meta-item">
          <span className="meta-item__label">Складність:</span>
          <span className="meta-item__value">
            <span className="level-pill">{level}</span>
            {isAvailable && availableSeats > 0 && (
              <span className="seats-info">({availableSeats} місць)</span>
            )}
          </span>
        </div>
      </div>

      {/* Нижня частина картки: дія / кнопка взаємодії */}
      <div className="course-card__footer">
        {isEnrolled ? (
          <button 
            type="button" 
            className="card-btn card-btn--enrolled" 
            onClick={onEnroll}
          >
            ✓ Ви записані (Скасувати)
          </button>
        ) : (
          <button
            type="button"
            className="card-btn card-btn--primary"
            disabled={!isAvailable}
            onClick={onEnroll}
          >
            {isAvailable ? "Записатися на курс →" : "Реєстрація недоступна"}
          </button>
        )}
      </div>
    </article>
  );
}

export default CourseCard;
