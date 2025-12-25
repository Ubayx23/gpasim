"use client";

import { useState } from "react";
import styles from "./page.module.css";
import CourseRow from "./CourseRow";

interface Course {
  id: string;
  name: string;
  units: number;
  grade: string;
}

export default function Home() {
  // State: Array of courses managed by React
  // When courses change, component re-renders with updated data
  const [courses, setCourses] = useState<Course[]>([]);

  // Add a new empty course to the list
  const handleAddCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: "",
      units: 0,
      grade: "",
    };
    setCourses([...courses, newCourse]);
  };

  // Remove a course by filtering out the matching ID
  const handleRemoveCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  // Update a course field (name, units, or grade)
  // Converts units string to number, validates input (must be > 0)
  const handleUpdateCourse = (courseId: string, field: 'name' | 'units' | 'grade', value: string) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        if (field === 'units') {
          // Convert to number, ensure positive integer (units must be > 0)
          const numValue = Number(value);
          // Allow empty string for input field, but store as 0 temporarily
          // Validation happens when calculating GPA (only courses with units > 0 are counted)
          if (value === '' || isNaN(numValue) || numValue <= 0) {
            return { ...course, [field]: 0 };
          }
          return { ...course, [field]: Math.floor(numValue) };
        }
        return { ...course, [field]: value };
      }
      return course;
    }));
  };

  // Clear all courses from the list
  const handleClearAll = () => {
    setCourses([]);
  };

  // Convert letter grade to points (4.0 scale)
  function getGradePoints(grade: string): number {
    if (grade === 'A') return 4;
    if (grade === 'B') return 3;
    if (grade === 'C') return 2;
    if (grade === 'D') return 1;
    if (grade === 'F') return 0;
    return 0;
  }

  // Calculate total units (all courses, including ungraded)
  let totalUnits = 0;
  for (let i = 0; i < courses.length; i++) {
    totalUnits += courses[i].units;
  }

  // Calculate GPA: only count courses with both grade and units > 0
  // Formula: (sum of gradePoints × units) / (sum of units for graded courses)
  let totalWeightedPoints = 0;
  let gradedUnits = 0;
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    if (course.grade && course.units > 0) {
      const gradePoints = getGradePoints(course.grade);
      totalWeightedPoints += gradePoints * course.units;
      gradedUnits += course.units;
    }
  }

  // Calculate Cumulative GPA: automatically calculated from all courses entered
  // Formula: (sum of gradePoints × units) / (sum of units for graded courses)
  // This is calculated automatically as courses are added/updated
  // Handle edge cases: no graded courses, division by zero, NaN
  // Always round to 2 decimal places for display
  const cumulativeGPA = gradedUnits > 0 && !isNaN(totalWeightedPoints / gradedUnits)
    ? Number((totalWeightedPoints / gradedUnits).toFixed(2))
    : 0;

  // Cumulative units: total units from all courses with grades
  // This is automatically calculated from all entered courses
  const cumulativeUnits = gradedUnits;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>GPASim</h1>
          <p className={styles.subtitle}>Simulate your semester and cumulative GPA</p>
        </header>

        {/* Cumulative GPA Display Section: Automatically calculated from all courses entered */}
        <section className={styles.cumulativeSection}>
          <h2 className={styles.sectionTitle}>Cumulative GPA</h2>
          <div className={styles.cumulativeInputs}>
            <div className={styles.cumulativeInputGroup}>
              <label className={styles.cumulativeLabel}>
                Current Cumulative GPA
              </label>
              {/* Display-only field showing GPA calculated from all courses */}
              <div className={styles.cumulativeDisplay}>
                {cumulativeGPA.toFixed(2)}
              </div>
            </div>
            <div className={styles.cumulativeInputGroup}>
              <label className={styles.cumulativeLabel}>
                Units Completed So Far
              </label>
              {/* Display-only field showing total units from all courses */}
              <div className={styles.cumulativeDisplay}>
                {cumulativeUnits}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.coursesSection}>
          <h2 className={styles.sectionTitle}>Courses</h2>
          <div className={styles.coursesContainer}>
            {courses.map((course) => (
              <CourseRow
                key={course.id}
                course={course}
                onRemove={() => handleRemoveCourse(course.id)}
                onUpdate={(field, value) => handleUpdateCourse(course.id, field, value)}
              />
            ))}
            {courses.length === 0 && (
              <p style={{ color: "#999", fontSize: "14px", textAlign: "center", padding: "24px 20px" }}>
                Click "Add Course" to get started
              </p>
            )}
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.addButton} onClick={handleAddCourse}>
              Add Course
            </button>
            {courses.length > 0 && (
              <button className={styles.clearButton} onClick={handleClearAll}>
                Clear All
              </button>
            )}
          </div>
        </section>

        <section className={styles.resultsSection}>
          <h2 className={styles.sectionTitle}>Results</h2>
          <div className={styles.resultsContainer}>
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Total Units:</span>
              <span className={styles.resultValue}>{totalUnits}</span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.resultLabel}>Semester GPA:</span>
              <span className={styles.resultValue}>
                {cumulativeGPA.toFixed(2)}
              </span>
            </div>
            {/* Cumulative GPA: Automatically calculated from all courses entered */}
            {cumulativeUnits > 0 && (
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Cumulative GPA:</span>
                <span className={styles.resultValue}>
                  {cumulativeGPA.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
