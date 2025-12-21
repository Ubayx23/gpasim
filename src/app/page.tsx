import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>GPAsim</h1>
          <p className={styles.subtitle}>Simulate your semester GPA</p>
        </header>

        <section className={styles.coursesSection}>
          <h2 className={styles.sectionTitle}>Courses</h2>
          <div className={styles.coursesContainer}>
            {/* Placeholder for course rows - will be dynamic later */}
            <div className={styles.courseRow}>
              <input
                type="text"
                placeholder="Course name (optional)"
                className={styles.courseName}
                disabled
              />
              <input
                type="number"
                placeholder="Units"
                className={styles.courseUnits}
                disabled
              />
              <select className={styles.courseGrade} disabled>
                <option value="">Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
              <button className={styles.removeButton} disabled>
                Remove
              </button>
            </div>
          </div>
          <button className={styles.addButton} disabled>
            Add Course
          </button>
        </section>

        <section className={styles.resultsSection}>
          <h2 className={styles.sectionTitle}>Results</h2>
          <div className={styles.resultsContainer}>
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Total Units:</span>
              <span className={styles.resultValue}>0</span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Semester GPA:</span>
              <span className={styles.resultValue}>0.00</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
