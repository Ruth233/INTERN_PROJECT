import Modal from "react-modal";
import { MdClose } from "react-icons/md";

Modal.setAppElement("#root");

interface ModalWindowProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  type: "intern" | "nss";
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "70%",
    padding: "40px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(4px)",
  },
};

const ModalWindow = ({ isOpen, setIsOpen, type }: ModalWindowProps) => {
  const closeModal = () => setIsOpen(false);
  return (
    <div className="relative">
      <Modal style={customStyles} isOpen={isOpen} contentLabel="Example Modal">
        <button
          onClick={closeModal}
          className="font-bold text-2xl cursor-pointer hover:text-red-400 fixed top-2 right-3"
        >
          <MdClose />
        </button>

        <h4 className="font-semibold text-2xl mb-3">
          Add New {type === "intern" ? "Intern" : "NSS Personnel"} Form
        </h4>
        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="fullName">Full Name</label>
            <div className="border border-gray-600 rounded-md w-[50%]">
              <input
                id="fullName"
                className="bg-transparent outline-none p-2 w-full"
                type="text"
                placeholder="eg.Emmanuel Doe"
              />
            </div>
          </div>

          <div className="flex items-center gap-20">
            {type === "intern" && (
              <div>
                <label htmlFor="level">Level</label>
                <div className="border border-gray-600 rounded-md">
                  <input
                    id="level"
                    className="bg-transparent outline-none p-2 w-full"
                    type="number"
                    placeholder="eg. 200"
                  />
                </div>
              </div>
            )}

            {type === "nss" && (
              <>
                <div>
                  <label htmlFor="nssID">NSS ID</label>
                  <div className="border border-gray-600 rounded-md">
                    <input
                      id="nssID"
                      className="bg-transparent outline-none p-2 w-full"
                      type="text"
                      placeholder="eg. NSS123456"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <div className="border border-gray-600 rounded-md">
                    <input
                      id="email"
                      className="bg-transparent outline-none p-2 w-full"
                      type="email"
                      placeholder="eg. john@example.com"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="telephone">Phone Number</label>
              <div className="border border-gray-600 rounded-md">
                <input
                  id="telephone"
                  className="bg-transparent outline-none p-2 w-full"
                  type="tel"
                  placeholder="eg.05********"
                />
              </div>
            </div>

            <div>
              <label htmlFor="university">Current Institution</label>
              <div className="border border-gray-600 rounded-md">
                <input
                  className="bg-transparent outline-none p-2 w-full"
                  list="universities"
                  id="university"
                  name="university"
                  placeholder="Type your university..."
                />
                <datalist id="universities">
                  <option value="Ghana Communication Technology University">
                    Ghana Communication Technology University (GCTU)
                  </option>
                  <option value="Intercom Programming Manufacturing Company">
                    Intercom Programming And Manufacturing Company (IPMC)
                  </option>
                  <option value="University of Ghana">
                    University of Ghana (UG)
                  </option>
                  <option value="Kwame Nkrumah University of Science and Technology">
                    Kwame Nkrumah University of Science and Technology (KNUST)
                  </option>
                  <option value="University of Cape Coast">
                    University of Cape Coast (UCC)
                  </option>
                  <option value="University of Education, Winneba">
                    University of Education, Winneba (UEW)
                  </option>
                  <option value="University of Health and Allied Sciences">
                    University of Health and Allied Sciences (UHAS)
                  </option>
                  <option value="Ghana Institute of Management and Public Administration">
                    Ghana Institute of Management and Public Administration
                    (GIMPA)
                  </option>
                  <option value="University of Energy and Natural Resources">
                    University of Energy and Natural Resources
                  </option>
                  <option value="University of Professional Studies, Accra">
                    University of Professional Studies, Accra (UPSA)
                  </option>
                  <option value="Ashesi University">Ashesi University</option>
                  <option value="Valley View University">
                    Valley View University
                  </option>
                </datalist>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="course">Course</label>
            <div className="border border-gray-600 rounded-md w-[50%]">
              <input
                id="course"
                className="bg-transparent outline-none p-2 w-full"
                type="text"
                placeholder="eg. Computer Science"
              />
            </div>
          </div>

          <div>
            <label htmlFor="interest">Interest</label>
            <div className="border border-gray-600 rounded-md w-[50%]">
              <input
                id="interest"
                className="bg-transparent outline-none p-2 w-full"
                type="text"
                placeholder="eg. Database"
              />
            </div>
          </div>

          <div className="flex items-center gap-20">
            <div>
              <label htmlFor="start">Start Date</label>
              <div className="border border-gray-600 rounded-md">
                <input
                  id="start"
                  className="bg-transparent outline-none p-2 w-full"
                  type="date"
                  placeholder="eg. 01/01/24"
                />
              </div>
            </div>

            <div>
              <label htmlFor="end">End Date</label>
              <div className="border border-gray-600 rounded-md">
                <input
                  id="end"
                  className="bg-transparent outline-none p-2 w-full"
                  type="date"
                  placeholder="eg. 01/01/25"
                />
              </div>
            </div>

            <button className="text-white px-3 py-2 mt-5 cursor-pointer hover:bg-blue-900 transition-colors duration-[0.3s] bg-blue-950 rounded-md ">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default ModalWindow;
