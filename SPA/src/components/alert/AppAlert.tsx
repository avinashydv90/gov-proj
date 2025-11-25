import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AlertColor } from "@mui/material/Alert";

interface AppAlertProps {
    type?: AlertColor;   // 'success' | 'info' | 'warning' | 'error'
    message: string | null;  // message to display
    onClose?: () => void;   // close handler
}

const AppAlert : React.FC<AppAlertProps> = ({type = "info", message ,onClose}) => {
    if (!message) return null;
    
  return (
   <Stack sx={{ width: "100%", marginTop: 2 }} spacing={2}>
      <Alert severity={type} onClose={onClose}>
        {message}
      </Alert>
    </Stack>
  )
}

export default AppAlert ;
