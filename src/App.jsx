import { motion } from 'framer-motion'; // Import Framer Motion
import fig from './assets/middle.png'; // Import your image
import { useState } from 'react'; // Import useState for ripple effect
import svf from './assets/image.png'
// Define the NavLink component outside of the App component
const NavLink = ({ href, text }) => (
  <motion.li
    whileHover={{ scale: 1.05 }} // Slight scale up on hover
    transition={{ type: 'spring', stiffness: 300 }} // Spring animation
  >
    <a href={href} className="relative text-2xl text-white">
      {text}
      <motion.div
        className="absolute bottom-0 left-0 w-0 h-1 bg-white" // White underline
        whileHover={{ width: '100%' }} // Animate underline on hover
        transition={{ duration: 0.3 }} // Smooth transition
      />
    </a>
  </motion.li>
);
const handleInstall = () => {
  // Replace with the actual app file path
  const appPath = "../app-release.apk"; // or "/app.exe" for Windows

  // Trigger the download
  const link = document.createElement("a");
  link.href = appPath;
  link.download = appPath.split("/").pop(); // Extract filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export default function App() {
  const [ripple, setRipple] = useState(false); // State for ripple effect

  const handleRipple = (e) => {
    setRipple(true); // Trigger ripple effect
    setTimeout(() => setRipple(false), 600); // Reset ripple after 600ms
  };

  return (
    <div className="min-h-screen flex flex-col bg-violet-600">
      {/* Header */}
      <header className="w-full p-4 bg-violet-600 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-5xl font-bold text-white">AIRA</h1>
          <nav>
            <ul className="flex space-x-8"> {/* Increased spacing between links */}
              <NavLink href="#about" text="About" />
              <NavLink href="#contact" text="Contact" />
            </ul>
          </nav>
        </div>
      </header>

      {/* Centered Image with Floating Animation */}
      <div className="flex-grow flex flex-col items-center justify-center  ">
        <motion.img
          src={fig} // Use the imported image
          alt="Floating Image"
          className="max-w-full max-h-[50vh] object-contain" // Adjust image size
          animate={{
            y: [0, -20, 0], // Move the image up and down
          }}
          transition={{
            duration: 2, // Animation duration
            repeat: Infinity, // Loop the animation infinitely
            ease: "easeInOut", // Smooth easing
          }}
        />

        {/* Download Button with Floating Animation and Ripple Effect */}
        <motion.button
          className=" flex ml-24 px-12 py-3 bg-gray-800 text-white text-3xl font-semibold rounded-lg shadow-lg transition-colors relative overflow-hidden"
          animate={{
            y: [0, -20, 0], // Move the button up and down
          }}
          transition={{
            duration: 2, // Animation duration
            repeat: Infinity, // Loop the animation infinitely
            ease: "easeInOut", // Smooth easing
          }}
          onClick={handleInstall} // Trigger ripple effect on click
        >
           <span>DOWNLOAD</span> <img className=' pl-2 w-10' src={svf} alt="" />
          {/* Ripple Effect */}
          {ripple && (
            <motion.span
              className="absolute bg-white rounded-full opacity-0"
              initial={{ scale: 0, opacity: 0.3 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                top: '50%',
                left: '50%',
                width: '100px',
                height: '100px',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
        </motion.button>
      </div>

      {/* Footer */}
      <footer className="w-full p-4 bg-violet-700 text-white text-center">
        <p className="text-lg">© 2025 AIRA Wellness. All rights reserved.</p>
      </footer>
    </div>
  );
}