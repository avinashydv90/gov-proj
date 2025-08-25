import React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { IStandard } from "../types/standard";

interface StandardFilterProps {
  standards?: IStandard[];
  selectedSchoolId?: string;
  onStandardChange: (standard: IStandard | null) => void;
}

const filterOptions = createFilterOptions<IStandard>({
  matchFrom: "start",
  stringify: (option) => option.name,
});

const StandardFilter: React.FC<StandardFilterProps> = ({
  standards,
  selectedSchoolId,
  onStandardChange,
}) => {
  const filteredStandards =
    selectedSchoolId && standards
      ? standards.filter((std) => std.schoolId === selectedSchoolId)
      : [];

  return (
    <Autocomplete
      options={filteredStandards}
      getOptionLabel={(option) => option?.name || ""}
      filterOptions={filterOptions}
      onChange={(_, newValue) => onStandardChange(newValue)}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="इयत्ता निवडा"
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
      disabled={!selectedSchoolId}
    />
  );
};

export default StandardFilter;
