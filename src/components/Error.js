import { Typography } from "@mui/material"
import { useRouteError } from "react-router-dom";



const Error = () => {
    const error = useRouteError();
    console.log(error)

    return(
        <div className="errorClass">
            <div>
            <Typography variant="h6">Oops!</Typography>
            <Typography variant="caption1" color={'text.primary'}>{error?.error?.message}</Typography>
            </div>
        </div>
    )
}

export default Error