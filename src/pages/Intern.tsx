import Button from "../components/Button";
import Table from "../components/Table";
import ModalWindow from "../components/Modal";
import FilterBar from "../components/FilterBar";
import Header from "../components/Header";
import { useGenericContext } from "../contexts/GenericContext";

const Intern = () => {
  const {
    filteredData,
    handleFiltersChange,
    filterCounts,
    isModalOpen,
    setIsModalOpen,
    dataType,
  } = useGenericContext();
  return (
    <div>
      <div className="mx-auto mb-9 mt-20 ">
        <Header
          title="Internship Dashboard"
          summary="Manage, monitor, and track all active and completed internships in one
        place."
        />
        <FilterBar
          onFiltersChange={handleFiltersChange}
          filterCounts={filterCounts}
        />
        <div className="w-[90%] mx-auto">
          <Table data={filteredData} dataType={dataType} />
          <ModalWindow
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            type={dataType}
          />
          <Button setIsOpen={setIsModalOpen} />
        </div>
      </div>
    </div>
  );
};
export default Intern;
