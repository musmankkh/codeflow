
import SingleStats from "./SingleStats";
import { useState, useEffect } from "react";
import axios from "axios";

const Stats = () => {
    const [studentCount, setStudentCount] = useState(0);
  
    useEffect(() => {
      const fetchStudentCount = async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/users/count"); // adjust base path if needed
          setStudentCount(res.data.totalStudents);
        } catch (error) {
          console.error("Failed to fetch student count:", error);
        }
      };
  
      fetchStudentCount();
    }, []);
  return (
    <div>
      <h2 className="text-3xl text-whiteSecondary font-bold mb-7">Balance Overview</h2>
      <div className="flex justify-start gap-x-20 max-[1800px]:flex-wrap gap-y-10 mr-1 max-[1352px]:gap-x-10 max-[1050px]:mr-5">
      <SingleStats title="New Users" value={studentCount?.toString()} />
        <SingleStats title="New Orders" value="56" />
        <SingleStats title="Sales" value="$51,393" />
        <SingleStats title="Revenue" value="$99,825" />
      </div>
    </div>
  );
};
export default Stats;
