import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

interface Props {
  open: boolean;
  message: string | null;
  type?: AlertColor;
  onClose: () => void;
}

const AppSnackbar: React.FC<Props> = ({
  open,
  message,
  type = "info",
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert variant="filled" severity={type} onClose={onClose} sx={{
          width: "360px",            
          fontSize: "1.3rem",        
          padding: "14px 18px",       
          borderRadius: "10px",   
            
          
         
          backgroundColor:
            type === "success"
              ? "#2e7d32"             // green
              : type === "error"
              ? "#d32f2f"             // red
              : type === "warning"
              ? "#ed6c02"             // orange
              : "#0288d1",            // info (blue)
        }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
