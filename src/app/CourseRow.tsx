import styles from "./page.module.css";

interface Course {
  id: string;
  name: string;
  units: number;
  grade: string;
}

interface CourseRowProps {
  course: Course;
  onRemove: () => void;
  onUpdate: (field: 'name' | 'units' | 'grade', value: string) => void;
}

// CourseRow component: Displays a single course entry with inputs for name, units, and grade
// Uses dropdown for grade selection (A-F) to ensure valid input
export default function CourseRow({ course, onRemove, onUpdate }: CourseRowProps) {
  return (
    <div className={styles.courseRow}>
      {/* Course name input (optional field) */}
      <input
        type="text"
        placeholder="Course name (optional)"
        className={styles.courseName}
        value={course.name}
        onChange={(e) => onUpdate('name', e.target.value)}
      />
      {/* Units input: min="1" ensures units must be greater than 0 */}
      <input
        type="number"
        placeholder="Units"
        className={styles.courseUnits}
        value={course.units || ""}
        onChange={(e) => onUpdate('units', e.target.value)}
        min="1"
        step="1"
        title="Units must be greater than 0"
      />
      {/* Grade dropdown: A-F grades only, prevents invalid input */}
      <select 
        className={styles.courseGrade} 
        value={course.grade} 
        onChange={(e) => onUpdate('grade', e.target.value)}
      >
        <option value="">Grade</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select>
      {/* Remove button: deletes this course from the list */}
      <button className={styles.removeButton} onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}

