import { useState } from "react";
import Button from "../components/Button";
import Table from "../components/Table";
import ModalWindow from "../components/Modal";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import FilterBar from "../components/FilterBar";

const data = [
  {
    id: 1,
    name: "Nana",
    level: 200,
    phone: "0532457632",
    institution: "University of Ghana",
    course: "BSc Computer Science",
    interest: "Database",
    startDate: "23/04/25",
    endDate: "01/01/26",
  },
  {
    id: 2,
    name: "Kwame",
    level: 200,
    phone: "0543219876",
    institution: "KNUST",
    course: "BSc Information Technology",
    interest: "Web Development",
    startDate: "15/05/24",
    endDate: "01/12/25",
  },
  {
    id: 3,
    name: "Akosua",
    level: 200,
    phone: "0678432590",
    institution: "University of Cape Coast",
    course: "BSc Mathematics",
    interest: "Data Science",
    startDate: "10/01/25",
    endDate: "30/06/26",
  },
  {
    id: 4,
    name: "Kofi",
    level: 200,
    phone: "0723456789",
    institution: "University of Ghana",
    course: "BSc Statistics",
    interest: "Machine Learning",
    startDate: "21/08/25",
    endDate: "15/05/26",
  },
  {
    id: 5,
    name: "Abena",
    level: 200,
    phone: "0812345678",
    institution: "University of Energy and Natural Resources",
    course: "BSc Environmental Science",
    interest: "Sustainability",
    startDate: "12/09/24",
    endDate: "22/07/25",
  },
  {
    id: 6,
    name: "Samuel",
    level: 200,
    phone: "0556781234",
    institution: "Ashesi University",
    course: "BSc Business Administration",
    interest: "Entrepreneurship",
    startDate: "01/03/25",
    endDate: "11/11/26",
  },
  {
    id: 7,
    name: "Afia",
    level: 200,
    phone: "0678901234",
    institution: "University of Ghana",
    course: "BSc Sociology",
    interest: "Social Research",
    startDate: "05/10/24",
    endDate: "18/09/25",
  },
  {
    id: 8,
    name: "Yaw",
    level: 200,
    phone: "0765432189",
    institution: "University of Development Studies",
    course: "BSc Agricultural Science",
    interest: "Agronomy",
    startDate: "20/06/25",
    endDate: "24/01/26",
  },
  {
    id: 9,
    name: "Emmanuel",
    level: 200,
    phone: "0887654321",
    institution: "University of Cape Coast",
    course: "BSc Marine and Fisheries",
    interest: "Ecology",
    startDate: "30/11/24",
    endDate: "15/03/26",
  },
  {
    id: 10,
    name: "Peace",
    level: 200,
    phone: "0765432101",
    institution: "University of Ghana",
    course: "BSc Public Administration",
    interest: "Policy Analysis",
    startDate: "01/07/25",
    endDate: "02/04/26",
  },
];

const Intern = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between fixed z-10 py-2 px-4 bg-white w-full top-0 left-0 border border-b-gray-300 shadow-md">
        <button
          onClick={() => navigate("/")}
          className="py-1 px-3 bg-blue-950 rounded-md cursor-pointer text-white flex items-center gap-2"
        >
          <FiLogOut />
          Logout
        </button>

        <div className="flex gap-2 items-center">
          <NavLink
            to="/intern"
            className={({ isActive }) =>
              ` px-3 rounded-md cursor-pointer ${
                isActive
                  ? "bg-blue-950 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Intern
          </NavLink>
          <NavLink
            to="/nss"
            className={({ isActive }) =>
              `px-3 rounded-md cursor-pointer ${
                isActive
                  ? "bg-blue-950 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            NSS
          </NavLink>
        </div>
      </div>
      <div className="mx-auto mb-9 mt-20 w-[90%]">
        <div className="mb-3">
          <h2 className="font-bold text-2xl">Internship Dashboard</h2>
          <p>
            Manage, monitor, and track all active and completed internships in
            one place.
          </p>
        </div>
        <FilterBar />
        <Table data={data} />
        <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} />
        <Button setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};
export default Intern;
