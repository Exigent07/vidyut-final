export default function MenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 text-white rounded-md focus:outline-none"
    >
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16m-7 6h7"
        ></path>
      </svg>
    </button>
  );
};
