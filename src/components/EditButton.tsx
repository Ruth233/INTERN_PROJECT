import { BiEdit } from "react-icons/bi";
import { useGenericContext, type PersonData } from "../contexts/GenericContext";

const EditButton = ({ item }: { item: PersonData }) => {
  const { openEditModal } = useGenericContext();

  const handleEditClick = () => {
    openEditModal(item);
  };

  return (
    <span
      className="cursor-pointer text-blue-400 flex items-center justify-center"
      onClick={handleEditClick}
      title="Edit"
    >
      <BiEdit size={20} />
    </span>
  );
};
export default EditButton;
