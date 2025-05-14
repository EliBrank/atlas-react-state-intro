import { useState, useEffect, useMemo } from 'react';

export default function SchoolCatalog() {
  const [courseData, setCourseData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortColumn, setSortColumn] = useState('Trimester');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetch('/api/courses.json')
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data);
      });
  }, []);


  const coursesProcessed = useMemo(() => {
    const coursesFiltered = courses.filter((course) => {
      return course.courseNumber.startsWith(filterText) ||
        course.courseName.startsWith(filterText);
    });

    const coursesSorted = coursesFiltered.sort(a, b) {

    }
  });

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setFilterText(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {coursesFiltered.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
