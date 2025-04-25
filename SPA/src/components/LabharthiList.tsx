import DocumentExplorer from "../shared-components/DocumentExplorer";
import HelmetComponent from "../shared-components/HelemetComponent";
import PageLayout from "../shared-components/PageLayout";

const LabharthiList = () => {
  return (
    <>
      <PageLayout>
        <HelmetComponent
          title="लाभार्थी यादी | एकात्मिक आदिवासी विकास प्रकल्प शहापूर"
          description="शहापूर प्रकल्पांतर्गत विविध योजनांचे लाभार्थी यादी येथे उपलब्ध आहे."
          canonical="https://poitdp.shahapur-mh.in/labharthiList"
        />
        <DocumentExplorer />
      </PageLayout>
    </>
  );
};

export default LabharthiList;
