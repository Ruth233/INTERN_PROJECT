const Header = ({ title, summary }: { title: string; summary: string }) => {
  return (
    <div className="mb-3 w-[90%] mx-auto">
      <h2 className="font-bold text-2xl">{title}</h2>
      <p>{summary}</p>
    </div>
  );
};
export default Header;
