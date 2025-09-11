import { BiEdit } from "react-icons/bi";
import type { Intern } from "../Types/intern";

const Table = ({ data }: { data: Intern[] }) => {
  return (
    <div className="relative text-center">
      <table className="border border-gray-400 mx-auto w-full bg-white rounded-lg shadow-md ">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="thead">ID</th>
            <th className="thead">Name</th>
            <th className="thead">Level</th>
            <th className="thead">Phone Number</th>
            <th className="thead">Current school</th>
            <th className="thead">Course</th>
            <th className="thead">Interest</th>
            <th className="thead">Start Date</th>
            <th className="thead">End Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className="hover:bg-gray-100 relative">
              <td className="tdata">{item.id}</td>
              <td className="tdata">{item.name}</td>
              <td className="tdata">{item.level}</td>
              <td className="tdata">{item.phone}</td>
              <td className="tdata">{item.institution}</td>
              <td className="tdata">{item.course}</td>
              <td className="tdata">{item.interest}</td>
              <td className="tdata">{item.startDate}</td>
              <td className="tdata">{item.endDate}</td>
              <span className="absolute mt-3 ml-1 cursor-pointer hover:text-blue-500">
                <BiEdit size={25} />
              </span>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
