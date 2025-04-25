import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import HeadingText from "../shared-components/HeadingText";
// import { PrakalpKaryalayAdhikari } from "../constants/PrakalpKaryalayAdhikari";
import PageLayout from "../shared-components/PageLayout";
import HelmetComponent from "../shared-components/HelemetComponent";

const Vipimages = [
  "/images/ContactusImage/rajendrakumarHausabaiBhanudasHiwale.jpg",
  "/images/ContactusImage/diwakarGaukarnaDevidasKalpande.jpg",
  "/images/ContactusImage/arvindSaraswatiRamlalJadhav.jpg",
  "/images/ContactusImage/pandharinathLakshmibaiNarayanWekhande.jpg",
  "/images/ContactusImage/bapuraoVatsalabaiRamaJadhav.jpg",
  "/images/ContactusImage/sunilsingAnusayaNavalsingPatil.jpg",
  "/images/ContactusImage/vilasJanabaiNamdevChanne.jpg",
];

interface Officer {
  id: number;
  officerName: string;
  title: string;
  designation: string;
  contact: string;
  email: string;
  photo: string | null;
}
const primaryColor = "#5E3023";

const ContactUs = () => {
  const [contactUs, setContactUs] = useState<Officer[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.poitdp.shahapur-mh.in/api/ProjectOfficer/project-officer"
        );
        setContactUs(response.data);
      } catch (error) {
        console.error("Error fetching officer data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PageLayout>
      <HelmetComponent
        title="संपर्क करा | एकात्मिक आदिवासी विकास प्रकल्प शहापूर"
        description="शहापूर प्रकल्प कार्यालयाशी संपर्क साधण्यासाठी अधिकाऱ्यांची यादी, फोन नंबर आणि ईमेल तपशील येथे पहा."
        canonical="https://poitdp.shahapur-mh.in/contact-us"
      />

      <div className="bg-white shadow-xl p-6 md:p-10 rounded-xl border border-gray-200">
        <HeadingText text="प्रकल्प कार्यालय अधिकारी संपर्क" />
        <ul className="mt-6 grid gap-6 max-h-[750px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 sm:grid-cols-1 md:grid-cols-2">
          {contactUs.map((person, index) => (
            <motion.li
              key={person.id}
              className="flex items-center gap-5 bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ borderLeft: `4px solid ${primaryColor}` }}
            >
              <img
                src={person.photo ?? Vipimages[index % Vipimages.length]}
                alt={person.officerName}
                onError={(e) =>
                  (e.currentTarget.src = "/images/ContactusImage/default.jpg")
                }
                className="w-20 h-20 rounded-lg object-cover shadow-sm border border-gray-300"
              />
              <div className="flex flex-col justify-center">
                <span
                  className="font-bold text-base md:text-lg leading-tight"
                  style={{ color: primaryColor }}
                >
                  {person.officerName}
                </span>
                <span className="text-gray-600 text-sm md:text-base">
                  {person.title} –{" "}
                  <span className="italic">{person.designation}</span>
                </span>
                <span className="text-gray-500 text-sm mt-1">
                  📞 {person.contact}
                </span>
                <span className="text-gray-500 text-sm">📧 {person.email}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
};

export default ContactUs;
