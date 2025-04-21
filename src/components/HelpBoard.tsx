const HelpBoard = () => {
  const photo = localStorage.getItem("photo");

  return (
    <div className="bg-[#0A0D17] pl-[280px] pt-[30px]">
      <h1 className="text-3xl font-bold text-white">Sapex HelpBoard</h1>
      <img
        src={photo || undefined}
        alt="User Profile"
        className="w-10 h-10 rounded-full border border-white absolute top-5 right-[40px] z-50"
      />
    </div>
  );
};

export default HelpBoard;
