"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

// Sample client data - replace with your actual clients
const clientsData = [
  { id: 1, name: "Company One", logo: "/images/clients/client1.svg" },
  { id: 2, name: "Company Two", logo: "/images/clients/client2.svg" },
  { id: 3, name: "Company Three", logo: "/images/clients/client3.svg" },
  { id: 4, name: "Company Four", logo: "/images/clients/client4.svg" },
  { id: 5, name: "Company Five", logo: "/images/clients/client5.svg" },
  { id: 6, name: "Company Six", logo: "/images/clients/client6.svg" },
  { id: 7, name: "Company Seven", logo: "/images/clients/client7.svg" },
  { id: 8, name: "Company Eight", logo: "/images/clients/client8.svg" },
  { id: 9, name: "Company Nine", logo: "/images/clients/client9.svg" },
  { id: 10, name: "Company Ten", logo: "/images/clients/client10.svg" },
];

export default function ClientShowcase() {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Handle theme changes
  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  // Create duplicate data for seamless infinite scroll
  const duplicatedClients = [...clientsData, ...clientsData];
  
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Our Trusted <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Clients</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Partnering with industry leaders to deliver exceptional luxury experiences worldwide
          </p>
        </div>
        
        {/* Single row with continuous horizontal scrolling logos */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 w-48 md:w-64 mx-6 flex items-center justify-center"
              >
                <div className="h-24 md:h-28 w-48 md:w-56 relative bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 transition-all duration-300 hover:shadow-md">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain p-2 opacity-80 hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      // Fallback for missing images
                      const target = e.target as HTMLImageElement;
                      target.src = "/api/placeholder/180/90";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}