import { Typography, Button } from "@mui/material";
import { useRouteError, useNavigate } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="errorClass">
      <div>
        <Typography variant="h6">Oops!</Typography>
        <Typography variant="caption1" color={"text.primary"}>
          {error?.error?.message}
        </Typography>
        <Button variant="outlined" style={{margin: 20}} onClick={() => navigate("/")}>
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default Error;
