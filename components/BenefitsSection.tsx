import { useEffect, useState, useRef } from "react";
import { Sparkles, Gift, Globe, CalendarClock, Headphones } from "lucide-react";
import { useTheme } from "next-themes";

const benefits = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Huge savings with every booking",
    description: "Unlock exclusive offers you won't find elsewhere."
  },
  {
    icon: <Gift className="h-5 w-5" />,
    title: "Bonus inclusions",
    description: "Curated experiences tailored just for you."
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Thousands of options",
    description: "Flights, hotels, tours, cruises and more."
  },
  {
    icon: <CalendarClock className="h-5 w-5" />,
    title: "Flexible booking",
    description: "Change plans with ease for peace of mind."
  },
  {
    icon: <Headphones className="h-5 w-5" />,
    title: "24/7 Customer Service",
    description: "Our dedicated team is always ready to help."
  }
];

const BenefitsSection = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const { theme } = useTheme();  // Get theme from context
  const isDarkMode = theme === 'dark';  // Determine mode from theme context

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-8 md:py-10 relative overflow-hidden ${
        isDarkMode ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      {/* Background */}
      <div 
        className={`absolute inset-0 ${
          isDarkMode 
            ? "bg-gradient-to-br from-gray-900 to-blue-950" 
            : "bg-gradient-to-br from-white to-blue-50"
        }`}
      />
      
      {/* Decorative elements */}
      <div className={`absolute -top-12 -left-12 w-32 h-32 rounded-full blur-xl opacity-20 ${
        isDarkMode ? "bg-blue-500" : "bg-blue-200"
      }`}></div>
      <div className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full blur-xl opacity-20 ${
        isDarkMode ? "bg-indigo-500" : "bg-indigo-200"
      }`}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`text-center mb-6 transform transition-all duration-500 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}>
            Experience Premium Service
          </h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mb-3 rounded-full"></div>
          <p className={`text-sm md:text-base ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Enjoy exclusive benefits with every booking
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 transition-all duration-300 hover:shadow-md ${
                isDarkMode 
                  ? "bg-gray-800/80 border border-gray-700 hover:bg-gray-800" 
                  : "bg-white border border-gray-100 shadow-sm hover:border-gray-200"
              } ${
                inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 75}ms`
              }}
            >
              <div className={`rounded-full p-2 inline-flex mb-3 ${
                isDarkMode 
                  ? "bg-blue-900/50 text-blue-300" 
                  : "bg-blue-50 text-blue-600"
              }`}>
                {benefit.icon}
              </div>
              <h3 className={`text-base font-semibold mb-1 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}>
                {benefit.title}
              </h3>
              <p className={`text-xs md:text-sm ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;