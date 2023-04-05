import {useState} from "react";
import {Location} from "../../models/Location";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const AddLocation = () =>{
    const navigate = useNavigate();

    const [location, setLocation] = useState<Location>({
        id: 0,
        country: "",
        city: ""
    });

    const addLocation = async (event: {preventDefault: () => void}) =>{
        event.preventDefault();
        try{
            await axios.post(`${BACKEND_API_URL}/location/`, location);
            navigate("/location");
        }catch (error){
            console.log(error);
        }
    };

    return(
        <Container>
            <Card>
                <CardContent>
                    <IconButton component = {Link} sx={{ mr: 3}} to ={`/location/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addLocation}>
						<TextField
							id="country"
							label="Country"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setLocation({ ...location, country: event.target.value })}
						/>
						<TextField
							id="city"
							label="City"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setLocation({ ...location, city: event.target.value })}
						/>

						<Button type="submit">Add Course</Button>
					</form>
                </CardContent>
            </Card>
        </Container>
    )


}