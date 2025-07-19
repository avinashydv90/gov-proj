// interface ButtonItem {
//   label: string;
//   onClick: () => void;
// }

// interface ButtonListProps {
//   buttons: ButtonItem[];
// }

interface ButtonListProps {
  buttons: { label: string; onClick: () => void, disabled?: boolean;  }[];
}
export default function ButtonList({ buttons }: ButtonListProps) {
  return (
    <>
      {buttons.map((btn, index) => (
        <button
          key={index}
          type="button"
          disabled={btn.disabled}
          onClick={btn.onClick}
        className="text-sm font-semibold hover:bg-[#4a3328] bg-[#5c4033] text-white rounded-md px-4 py-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
   
        
          {btn.label}
        </button>
      ))}
    </>
  );
}
