// import { useEffect, useState } from "react";
// import { AiOutlineArrowUp } from "react-icons/ai";

// const ScrollToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const toggleVisibility = () => {
//       setIsVisible(window.scrollY > 300);
//     };
//     window.addEventListener("scroll", toggleVisibility);
//     return () => window.removeEventListener("scroll", toggleVisibility);
//   }, []);

//   return isVisible ? (
//     <button
//       onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//       className="fixed bottom-10 right-10 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
//     >
//       <AiOutlineArrowUp size={24} />
//     </button>
//   ) : null;
// };

// export default ScrollToTop;
