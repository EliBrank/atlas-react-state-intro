import { useState, useEffect, useMemo } from 'react';

export default function SchoolCatalog() {
  // USESTATE
  const [coursesData, setCoursesData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortField, setSortField] = useState('trimester');
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  // USEEFFECT
  useEffect(() => {
    fetch('/api/courses.json')
      .then((response) => response.json())
      .then((data) => {
        setCoursesData(data);
      });
  }, []);

  // HELPER FUNCTIONS
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
    // only re-compute if the below change (useMemo)
  }, [coursesData, filterText, sortField, sortAsc]);

  // VARIABLES
  const currentPage = coursesProcessed.slice(
    ((page - 1) * PAGE_SIZE), (page * PAGE_SIZE)
  );
  const hasMore = page * PAGE_SIZE < coursesProcessed.length;
  const hasLess = page > 1;

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setFilterText(e.target.value)}
      />
      <table className="catalog">
        <thead>
          <tr>
            <th className="" onClick={() => handleSort('trimester')}>Trimester</th>
            <th className="" onClick={() => handleSort('courseNumber')}>Course Number</th>
            <th className="" onClick={() => handleSort('courseName')}>Courses Name</th>
            <th className="" onClick={() => handleSort('semesterCredits')}>Semester Credits</th>
            <th className="" onClick={() => handleSort('totalClockHours')}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {currentPage.map((course) => (
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
        <button disabled={!hasLess} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={!hasMore} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
