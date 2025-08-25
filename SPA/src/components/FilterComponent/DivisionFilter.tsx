import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Division } from "../types/division";


interface DivisionFilterProps {
  divisions?: Division[];
  selectedStandardId?: string;
  onDivisionChange: (division: Division | null) => void;
}

const filterOptions = createFilterOptions<Division>({
  matchFrom: "start",
  stringify: (option) => option.name,
});

export default function DivisionFilter({
  divisions,
  selectedStandardId,
  onDivisionChange,
}: DivisionFilterProps) {
  const filteredDivisions = selectedStandardId
    ? divisions?.filter((div) => div.standardId === selectedStandardId) || []
    : [];

  return (
    <Autocomplete
      options={filteredDivisions}
      getOptionLabel={(option) => option?.name || ""}
      filterOptions={filterOptions}
      onChange={(_, newValue) => onDivisionChange(newValue)}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="विभाग निवडा"
          className="mt-1 block w-full rounded-md border text-sm font-semibold 
          shadow-sm p-2 bg-white/90 border-[#5C4033] focus:border-[#4a3328] focus:ring-[#4a3328]"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "#4a3328" },
            },
            "& .MuiInputLabel-root": {
              color: "#5C4033",
              "&.Mui-focused": { color: "#4a3328" },
            },
          }}
        />
      )}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      disabled={!selectedStandardId}
    />
  );
}
