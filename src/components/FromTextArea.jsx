function FromTextArea({ label, name, type }) {
  return (
    <div>
      <label
        className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        htmlFor=""
      >
        {label}
      </label>
      <br />
      <div className="relative">
        <textarea
          className="w-full px-6   py-2 pr-10 rounded-xl border  border-gray-200 dark:border-gray-600 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition duration-200 ease-in-out
                   hover:border-gray-300 dark:hover:border-gray-500
                   placeholder-gray-400 dark:placeholder-gray-500 z-0"
          type={type}
          name={name}
        />
      </div>
    </div>
  );
}

export default FromTextArea;
