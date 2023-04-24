import {useCallback, useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import { Button, Card, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {Link, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Gallery} from "../../models/Gallery";
import {debounce} from "lodash";
import {Location} from "../../models/Location";


export const GalleryAdd = () => {
    const navigate = useNavigate();

    const [gallery, setGallery] = useState<Gallery>({
        id: 0,
        name: "",
        theme: "",
        street: "",
        capacity: 0,
        location_id: 1,
        location:1
    });

    const [locations, setLocations] = useState<Location[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			const response = await axios.get<Location[]>(
				`${BACKEND_API_URL}/location/autocomplete/?query=${query}/`
			);
			const data = await response.data;
			setLocations(data);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	};

	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

    useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);

    const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);

		if (reason === "input") {
			debouncedFetchSuggestions(value);
		}
	};

    const addGallery = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/gallery/`, gallery);
            navigate("/gallery");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/gallery/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addGallery}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setGallery({...gallery, name: event.target.value})}
                        />
                        <TextField
                            id="theme"
                            label="Theme"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setGallery({...gallery, theme: event.target.value})}
                        />

                        <TextField
                            id="street"
                            label="Street"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setGallery({...gallery, street: event.target.value})}
                        />

                        <TextField
							id="capacity"
							label="Capacity"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setGallery({ ...gallery, capacity: parseInt(event.target.value) })}
						/>

                        <TextField
							id="location"
							label="Location"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setGallery({ ...gallery, location: parseInt(event.target.value) })}
						/>

                        {/*<Autocomplete*/}
						{/*	id="location_id"*/}
						{/*	options={locations}*/}
						{/*	getOptionLabel={(option) => `${option.city} - ${option.country}`}*/}
						{/*	renderInput={(params) => <TextField {...params} label="Location" variant="outlined" />}*/}
						{/*	filterOptions={(x) => x}*/}
						{/*	onInputChange={handleInputChange}*/}
						{/*	onChange={(event, value) => {*/}
						{/*		if (value) {*/}
						{/*			console.log(value);*/}
						{/*			setGallery({ ...gallery, location_id: value.id });*/}
						{/*		}*/}
						{/*	}}*/}
						{/*/>*/}

                        <Button type="submit">Add Gallery</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )


}