import { deleteIntern, deleteNss, getInterns, getNss } from "../services/api";
import { useGenericContext, type PersonData } from "../contexts/GenericContext";
import { FaTrash } from "react-icons/fa6";

export default function DeleteButton({
  dataType,
  item,
}: {
  dataType: "intern" | "nss";
  item: PersonData;
}) {
  const { setData } = useGenericContext();

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "This action cannot be undone. Do you want to delete this record?"
    );
    if (!confirmed) return;
    try {
      if (dataType === "intern") await deleteIntern(id);
      else await deleteNss(id);
      const latest =
        dataType === "intern" ? await getInterns() : await getNss();
      setData(latest);
    } catch (e) {
      console.error(e);
      alert("Failed to delete. Check console/logs.");
    }
  };
  return (
    <button
      title="Delete"
      onClick={() => handleDelete(item.id)}
      className="px-2 py-1 rounded-md cursor-pointer text-red-500 text-sm"
    >
      <FaTrash />
    </button>
  );
}
