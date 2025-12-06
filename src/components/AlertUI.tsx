import Alert from '@mui/material/Alert';


interface AlertConfig {
  description: string;
  variant?: "standard" | "filled" | "outlined";
  severity?: "success" | "error" | "warning" | "info";
}


export default function AlertUI(config: AlertConfig) {
  return (
    <Alert 
      variant={config.variant || "standard"} 
      severity={config.severity || "success"}
    >
      {config.description}
    </Alert>
  );
}

