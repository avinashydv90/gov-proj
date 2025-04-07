const people = [
  { name: "श्री. देवेंद्र फडणवीस", title: "माननीय मुख्यमंत्री, महाराष्ट्र" },
  { name: "श्री. एकनाथ शिंदे", title: "माननीय उपमुख्यमंत्री, महाराष्ट्र" },
  { name: "श्री. अजित पवार", title: "माननीय उपमुख्यमंत्री, महाराष्ट्र" },
  { name: "श्री. अशोक रामजी उईके", title: "मा. मंत्री, आदिवासी विकास" },
  {
    name: "श्री. इंद्रनील मनोहरराव नाईक",
    title: "मा. राज्यमंत्री, आदिवासी विकास",
  },
  { name: "श्री. विजय वाघमारे", title: "सचिव, आदिवासी विकास विभाग" },
];

const Vipimages = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
];

const PeopleList = () => {
  return (
    <div className="bg-white shadow-md p-2 md:p-4 rounded-lg border border-gray-300">
      <h2 className="bg-[#891538] text-white p-3 rounded-md text-lg font-semibold">
        महत्वाच्या व्यक्ती
      </h2>
      <ul className="mt-4 space-y-4 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {people.map((person, index) => (
          <li key={index} className="flex items-center gap-3 border-b pb-3">
            <img
              src={Vipimages[index % Vipimages.length]} // Display image from Vipimages array
              alt={person.name}
              className="w-[49px] h-[49px] rounded-full object-cover"
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
