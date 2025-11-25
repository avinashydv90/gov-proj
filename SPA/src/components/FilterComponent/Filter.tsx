import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ISchool } from "../types/School";

interface SchoolFilterProps {
 schools?: ISchool[]; // Optional prop in case it's undefined at first
  onSchoolChange: (school: ISchool | null) => void;
 selectedSchool?: ISchool | null;
 
}

const filterOptions = createFilterOptions<ISchool>({
  matchFrom: 'start',
  stringify: (option) => option.name,
});

export default function Filter({ schools, onSchoolChange,selectedSchool }: SchoolFilterProps) {
  return (
    <Autocomplete
      options={schools || []}
      value={selectedSchool || null}
      getOptionLabel={(option) => option?.name || "" }
      filterOptions={filterOptions}
      onChange={(_, newValue) => onSchoolChange(newValue)}
      sx={{ width: 300 }}
       renderInput={(params) => <TextField {...params} label=" कृपया शाळा निवडा"
       className="mt-1 block w-full rounded-md border text-sm font-semibold 
       shadow-sm p-2 bg-white/90 border-[#5C4033] focus:border-[#4a3328] focus:ring-[#4a3328]"
     sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#4a3328", // Change outline color
              },
            },
            "& .MuiInputLabel-root": {
              color: "#5C4033", // Default label color
              "&.Mui-focused": {
                color: "#4a3328", // Label color when focused
              },
            },
          }}
      />}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
    />
  );
}

