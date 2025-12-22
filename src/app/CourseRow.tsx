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

export default function CourseRow({ course, onRemove, onUpdate }: CourseRowProps) {
  return (
    <div className={styles.courseRow}>
      <input
        type="text"
        placeholder="Course name (optional)"
        className={styles.courseName}
        value={course.name}
        onChange={(e) => onUpdate('name', e.target.value)}
      />
      <input
        type="number"
        placeholder="Units"
        className={styles.courseUnits}
        value={course.units || ""}
        onChange={(e) => onUpdate('units', e.target.value)}
      />
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
      <button className={styles.removeButton} onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}

