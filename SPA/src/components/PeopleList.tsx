const people = [
  {
    name: "श्री. देवेंद्र फडणवीस",
    title: "माननीय मुख्यमंत्री, महाराष्ट्र राज्य",
  },
  {
    name: "श्री. एकनाथ शिंदे",
    title: "माननीय उपमुख्यमंत्री, महाराष्ट्र राज्य",
  },
  { name: "श्री. अजित पवार", title: "माननीय उपमुख्यमंत्री, महाराष्ट्र राज्य" },
  {
    name: "श्री. अशोक रामजी उईके",
    title: "माननीय मंत्री, आदिवासी विकास विभाग",
  },
  {
    name: "श्री. इंद्रनील मनोहरराव नाईक",
    title: "माननीय राज्यमंत्री, आदिवासी विकास विभाग",
  },
  {
    name: "श्री.विजय वाघमारे (भा.प्र.से)",
    title: "मा.सचिव, आदिवासी विकास विभाग",
  },
  {
    name: "श्रीम. लीना बनसोडे (भा.प्र.से)",
    title: "मा.आयुक्त, आदिवासी विकास, महाराष्ट्र राज्य, नाशिक",
  },
  {
    name: "श्री. गोपीचंद कदम (भा.प्र.से)",
    title: "मा.अपर आयुक्त, आदिवासी विकास, ठाणे",
  },
  {
    name: "श्री. राजेंद्रकुमार हिवाळे",
    title: "प्रकल्प अधिकारी, एकात्मिक आदिवासी विकास प्रकल्प, शहापूर",
  },
];

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

const PeopleList = () => {
  return (
    <div className="bg-white shadow-md p-4 md:p-6 rounded-lg border border-gray-300">
      <h2 className="bg-[#5E3023] text-white p-3 rounded-md text-lg font-semibold text-center">
        महत्वाच्या व्यक्ती
      </h2>
      <ul className="mt-4 space-y-4 max-h-[701px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {people.map((person, index) => (
          <li key={index} className="flex items-center gap-4 border-b pb-3">
            <img
              src={Vipimages[index % Vipimages.length]}
              alt={person.name}
              className="w-[49px] h-[49px] rounded-full object-cover shadow-sm"
            />
            <div className="flex flex-col justify-center">
              <span className="text-gray-800 font-semibold leading-tight">
                {person.name}
              </span>
              <span className="text-gray-500 text-sm leading-tight">
                {person.title}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;
