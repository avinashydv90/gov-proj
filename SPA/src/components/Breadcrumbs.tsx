// import { Link, useLocation } from "react-router-dom";
// import { Breadcrumb } from "react-bootstrap";

// const Breadcrumbs = () => {
//   const location = useLocation();

//   // Get path segments
//   const pathSegments = location.pathname
//     .split("/")
//     .filter((segment) => segment);

//   return (
//     <Breadcrumb className="mt-3">
//       <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
//         Home
//       </Breadcrumb.Item>

//       {pathSegments.map((segment, index) => {
//         const path = "/" + pathSegments.slice(0, index + 1).join("/");
//         const label = segment.replace(/-/g, " "); // Format label

//         return (
//           <Breadcrumb.Item
//             key={path}
//             linkAs={Link}
//             linkProps={{ to: path }}
//             active={index === pathSegments.length - 1}
//           >
//             {label}
//           </Breadcrumb.Item>
//         );
//       })}
//     </Breadcrumb>
//   );
// };

// export default Breadcrumbs;

// import { Link, useMatches } from "react-router-dom";
import ComingSoon from "./ComingSoon";
// import { Breadcrumb } from "react-bootstrap";

const Breadcrumbs = () => {
  // const matches = useMatches(); // Get all matched routes

  return (
    <ComingSoon />
    // <Breadcrumb className="mt-3">
    //   {matches.map((match, index) => {
    //     const label = match.pathname.split("/").pop(); // Use last segment if no label
    //     const isLast = index === matches.length - 1;

    //     return (
    //       <Breadcrumb.Item
    //         key={match.pathname}
    //         linkAs={!isLast ? Link : undefined}
    //         linkProps={!isLast ? { to: match.pathname } : undefined}
    //         active={isLast}
    //       >
    //         {label}
    //       </Breadcrumb.Item>
    //     );
    //   })}
    // </Breadcrumb>
  );
};

export default Breadcrumbs;
