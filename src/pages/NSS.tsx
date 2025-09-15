import Button from "../components/Button";
import FilterBar from "../components/FilterBar";
import Header from "../components/Header";
import ModalWindow from "../components/Modal";
import Table from "../components/Table";
import { useGenericContext } from "../contexts/GenericContext";

const NSS = () => {
  const {
    filteredData,
    handleFiltersChange,
    filterCounts,
    isModalOpen,
    setIsModalOpen,
    editingItem,
    dataType,
  } = useGenericContext();

  return (
    <div>
      <div className="mx-auto mb-9 mt-20 ">
        <Header
          title="NSS Dashboard"
          summary="Manage, monitor, and track all active and completed NSS personnel in one place."
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
            item={editingItem ?? undefined}
          />
          <Button setIsOpen={setIsModalOpen} />
        </div>
      </div>
    </div>
  );
};
export default NSS;
