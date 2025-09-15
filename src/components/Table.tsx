import type { PersonData } from "../contexts/GenericContext";
import type { Intern } from "../Types/intern";
import type { Nss } from "../Types/nss";
import EditButton from "./EditButton";

interface TableProps {
  data: PersonData[];
  dataType: "intern" | "nss";
}

const Table = ({ data, dataType }: TableProps) => {
  return (
    <div className="relative text-center">
      <table className="border border-gray-400 mx-auto w-full bg-white rounded-lg shadow-md ">
        <thead>
          <tr className="bg-gray-200 text-center text-gray-600 uppercase text-sm">
            <th className="thead">ID</th>
            <th className="thead">Name</th>
            {dataType === "intern" && <th className="thead">Level</th>}
            {dataType === "nss" && <th className="thead">NSS ID</th>}
            {dataType === "nss" && <th className="thead">Email</th>}
            <th className="thead">Phone Number</th>
            <th className="thead">Current school</th>
            <th className="thead">Course</th>
            <th className="thead">Interest</th>
            <th className="thead">Start Date</th>
            <th className="thead">End Date</th>
            <th className="thead">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100 relative">
              <td className="tdata">{item.id}</td>
              <td className="tdata">{item.name}</td>
              {dataType === "intern" && (
                <td className="tdata">{(item as Intern).level}</td>
              )}
              {dataType === "nss" && (
                <>
                  <td className="tdata">{(item as Nss).nssID}</td>
                  <td className="tdata">{(item as Nss).email}</td>
                </>
              )}
              <td className="tdata">{item.phone}</td>
              <td className="tdata">{item.institution}</td>
              <td className="tdata">{item.course}</td>
              <td className="tdata">{item.interest}</td>
              <td className="tdata">{item.startDate}</td>
              <td className="tdata">{item.endDate}</td>
              <td>
                <EditButton item={item} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
