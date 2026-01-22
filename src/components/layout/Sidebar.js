const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed">
      <h1 className="text-xl font-bold p-4 border-b border-gray-700">
        Merchant Panel
      </h1>

      <ul className="p-4 space-y-3">
        <li className="text-gray-300 hover:text-white cursor-pointer">
          Orders
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
