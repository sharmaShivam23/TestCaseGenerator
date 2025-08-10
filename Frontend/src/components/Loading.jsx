export default function Loader() {
  return (
    <div className="flex items-center mt-5 justify-center bg-black/40 backdrop-blur-sm rounded-lg p-4">
      <div className="relative w-16 h-16">
        {/* Outer spinning ring */}
        <div className="absolute w-full h-full border-4 border-transparent border-t-violet-500 rounded-full animate-spin"></div>

        {/* Inner spinning ring in reverse direction */}
        <div className="absolute w-12 h-12 top-2 left-2 border-4 border-transparent border-b-white rounded-full animate-[spin_1.5s_linear_reverse_infinite]"></div>

        {/* Center pulse */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-violet-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );
}
