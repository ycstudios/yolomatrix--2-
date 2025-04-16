import { useEffect, useState, useRef } from "react";
import { Sparkles, Gift, Globe, CalendarClock, Headphones } from "lucide-react";
import { useTheme } from "next-themes";  // Import theme context

const benefits = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Huge savings with every booking",
    description: "Unlock exclusive offers you won't find elsewhere."
  },
  {
    icon: <Gift className="h-5 w-5" />,
    title: "Bonus handpicked inclusions",
    description: "Enjoy curated experiences tailored just for you."
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Thousands of travel options",
    description: "Discover flights, hotels, tours, cruises and more."
  },
  {
    icon: <CalendarClock className="h-5 w-5" />,
    title: "Flexible booking options",
    description: "Change plans with ease for complete peace of mind."
  },
  {
    icon: <Headphones className="h-5 w-5" />,
    title: "24/7 Customer Service",
    description: "Our dedicated team is always ready to help you."
  }
];

const BenefitsSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const { theme } = useTheme();  // Get theme from context
  const isDarkMode = theme === 'dark';  // Determine mode from theme context

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Check if section is in viewport
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        setInView(isInView);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className={`py-8 relative overflow-hidden ${
          isDarkMode ? "bg-navy-900" : "bg-white"
        }`}
        style={{
          height: "auto",
          minHeight: "40vh" // Reduced height
        }}
      >
        {/* Solid background colors instead of images */}
        <div 
          className={`absolute inset-0 ${
            isDarkMode ? "bg-blue-950" : "bg-white"
          }`}
          style={{
            zIndex: -2
          }}
        />
        
        {/* Subtle overlay - lighter for aesthetics */}
        <div 
          className={`absolute inset-0 z-[-1] ${
            isDarkMode ? "bg-blue-900/10" : "bg-gray-50/30"
          }`}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div 
            className={`text-center mb-6 transform transition-all duration-500 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}>
              Experience Premium Service
            </h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-3 rounded-full"></div>
            <p className={`max-w-2xl mx-auto text-base ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            }`}>
              Enjoy exclusive benefits with every booking
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  isDarkMode 
                    ? "bg-blue-900/60 hover:bg-blue-900/80" 
                    : "bg-white hover:bg-gray-50"
                } ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 80}ms` // Faster animation
                }}
              >
                <div className={`rounded-full p-3 inline-flex mb-3 ${
                  isDarkMode 
                    ? "bg-blue-800/70 text-blue-300" 
                    : "bg-blue-100 text-blue-600"
                }`}>
                  {benefit.icon}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {benefit.title}
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements - with theme-appropriate colors */}
        <div className={`absolute -bottom-12 -left-12 w-48 h-48 rounded-full blur-2xl ${
          isDarkMode ? "bg-blue-500/10" : "bg-blue-500/5"
        }`}></div>
        <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-xl ${
          isDarkMode ? "bg-yellow-500/10" : "bg-yellow-500/5"
        }`}></div>
      </section>
    </>
  );
};

export default BenefitsSection;