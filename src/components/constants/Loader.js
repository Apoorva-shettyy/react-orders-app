const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="h-12 w-12 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
    </div>
  );
};

export default Loader;
