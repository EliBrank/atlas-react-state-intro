import { useState, useEffect, useMemo } from 'react';

export default function SchoolCatalog() {
  const [coursesData, setCoursesData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortField, setSortField] = useState('trimester');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetch('/api/courses.json')
      .then((response) => response.json())
      .then((data) => {
        setCoursesData(data);
      });
  }, []);

  const handleSort = (field) => {
    setSortField(field);
    // sortAsc set to false if same sort re-triggered, otherwise true
    setSortAsc((sortField === field && sortAsc) ? false : true);
  }


  const coursesProcessed = useMemo(() => {
    const coursesFiltered = coursesData.filter((course) => {
      return course.courseNumber.startsWith(filterText) ||
        course.courseName.startsWith(filterText);
    });

    // spread operator used on coursesFiltered to create copy
    // so that sort method does not alter it directly
    const coursesSorted = [...coursesFiltered].sort((a, b) => {
      const sortModifier = sortAsc ? 1 : -1;
      const stringSortFields = [
        'courseNumber',
        'courseName',
      ];

      // process for sorting strings, numbers is different
      // so check which the column is using
      if (stringSortFields.includes(sortField)) {
        return a[sortField].localeCompare(b[sortField]) * sortModifier;
      }
      return (a[sortField] - b[sortField]) * sortModifier;
    });

    return coursesSorted;
    // only re-compute if these change (useMemo)
  }, [coursesData, filterText, sortField, sortAsc]);

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
            <th onClick={() => handleSort('trimester')}>Trimester</th>
            <th onClick={() => handleSort('courseNumber')}>Course Number</th>
            <th onClick={() => handleSort('courseName')}>Courses Name</th>
            <th onClick={() => handleSort('semesterCredits')}>Semester Credits</th>
            <th onClick={() => handleSort('totalClockHours')}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {coursesProcessed.map((course) => (
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
