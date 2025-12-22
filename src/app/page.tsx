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
  const [courses, setCourses] = useState<Course[]>([]);

  const handleAddCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: "",
      units: 0,
      grade: "",
    };
    setCourses([...courses, newCourse]);
  };

  const handleRemoveCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  // Update a specific field of a course
  const handleUpdateCourse = (courseId: string, field: 'name' | 'units' | 'grade', value: string) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        // Convert units to number, keep others as string
        if (field === 'units') {
          return { ...course, [field]: Number(value) || 0 };
        }
        return { ...course, [field]: value };
      }
      return course;
    }));
  };
  function getGradePoints(grade: string): number {
    if (grade === 'A') return 4;
    if (grade === 'B') return 3;
    if (grade === 'C') return 2;
    if (grade === 'D') return 1;
    if (grade === 'F') return 0;
    return 0; // Default for empty/invalid grades
  }
  // Calculate total units
  let totalUnits = 0;
  for (let i = 0; i < courses.length; i++) {
    totalUnits += courses[i].units;
  }

  // Calculate GPA
  let totalWeightedPoints = 0;
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    // Only count courses with a grade and units > 0
    if (course.grade && course.units > 0) {
      const gradePoints = getGradePoints(course.grade);
      const weightedPoints = gradePoints * course.units;
      totalWeightedPoints += weightedPoints;
    }
  }

  // GPA = total weighted points / total units (or 0 if no units)
  const gpa = totalUnits > 0 ? totalWeightedPoints / totalUnits : 0;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>GPASim</h1>
          <p className={styles.subtitle}>Simulate your semester GPA</p>
        </header>

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
              <p style={{ color: "#999", fontSize: "14px", textAlign: "center", padding: "20px" }}>
                Click "Add Course" to get started
              </p>
            )}
          </div>
          <button className={styles.addButton} onClick={handleAddCourse}>
            Add Course
          </button>
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
              <span className={styles.resultValue}>{gpa.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
