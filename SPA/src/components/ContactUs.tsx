import { motion } from "framer-motion";
import HeadingText from "../shared-components/HeadingText";
import { PrakalpKaryalayAdhikari } from "../constants/PrakalpKaryalayAdhikari"; // adjust path as needed
import PageLayout from "../shared-components/PageLayout";

const Vipimages = [
  "/images/VipImages/slide1.jpg",
  "/images/VipImages/slide2.jpg",
  "/images/VipImages/slide3.jpg",
  "/images/VipImages/slide4.jpg",
  "/images/VipImages/slide5.jpg",
  "/images/VipImages/slide6.jpg",
  "/images/VipImages/slide7.jpg",
  "/images/VipImages/slide8.jpg",
  "/images/VipImages/slide9.jpg",
];

const ContactUs = () => {
  return (
    <PageLayout>
      <div className="bg-white shadow-md p-4 md:p-6 rounded-lg border border-gray-300">
        <HeadingText text="महत्वाच्या व्यक्ती" />
        <ul className="mt-4 space-y-4 max-h-[701px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {PrakalpKaryalayAdhikari.map((person, index) => (
            <motion.li
              key={person.id}
              className="flex items-center gap-4 border-b pb-3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={Vipimages[index % Vipimages.length]}
                alt={person.officerName}
                className="w-[49px] h-[49px] rounded-full object-fill shadow-sm"
              />
              <div className="flex flex-col justify-center">
                <span className="text-gray-800 font-semibold leading-tight">
                  {person.officerName}
                </span>
                <span className="text-gray-500 text-sm leading-tight">
                  {person.title} - {person.Designation}
                </span>
                <span className="text-gray-500 text-sm">{person.Contact}</span>
                <span className="text-gray-500 text-sm">{person.Email}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
};

export default ContactUs;
