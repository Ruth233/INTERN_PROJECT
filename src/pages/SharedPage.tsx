import Button from "../components/Button";
import Table from "../components/Table";
import ModalWindow from "../components/Modal";
import FilterBar from "../components/FilterBar";
import Header from "../components/Header";
import { useGenericContext } from "../contexts/GenericContext";

const SharedPage = () => {
  const {
    filteredData,
    handleFiltersChange,
    filterCounts,
    isModalOpen,
    setIsModalOpen,
    editingItem,
    dataType,
  } = useGenericContext();

  // Dynamic title and summary based on data type
  const pageConfig = {
    intern: {
      title: "Internship Dashboard",
      summary:
        "Manage, monitor, and track all active and completed internships in one place.",
    },
    nss: {
      title: "NSS Dashboard",
      summary:
        "Manage, monitor, and track all active and completed NSS personnel in one place.",
    },
  };

  const config = pageConfig[dataType];

  return (
    <div>
      <div className="mx-auto mb-9 mt-20 ">
        <Header title={config.title} summary={config.summary} />
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

export default SharedPage;
