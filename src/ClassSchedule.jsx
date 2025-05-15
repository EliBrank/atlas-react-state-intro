import { useContext } from "react";
import { EnrolledContext } from "./App";

export default function ClassSchedule() {
  const { enrolledCourses, setEnrolledCourses } = useContext(EnrolledContext);

  const dropCourse = (courseToDrop) => {
    setEnrolledCourses(enrolledCourses.filter((course) => {
      return course !== courseToDrop;
    }));
  }

  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>
                <button onClick={() => dropCourse(course)}>Drop</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
