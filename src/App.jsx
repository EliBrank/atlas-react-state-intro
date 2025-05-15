import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import { createContext, useState } from "react";

export const EnrolledContext = createContext();

export default function App() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  return (
    <div>
      <EnrolledContext.Provider value={{enrolledCourses, setEnrolledCourses}}>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </EnrolledContext.Provider>
    </div>
  );
}
