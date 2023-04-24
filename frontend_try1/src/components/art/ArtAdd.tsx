import {useCallback, useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import {Autocomplete, Button, Card, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {Link, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {debounce} from "lodash";
import {Art} from "../../models/Art";


export const ArtAdd = () => {
    const navigate = useNavigate();

    const [art, setArt] = useState<Art>({
        id: 0,
        title: "",
        author: 1,
        year: 0,
        type: "",
        material: "",
        gallery: 1,
    });

	const addArt = async (event: {preventDefault: () => void}) =>{
        event.preventDefault();
        try{
            await axios.post(`${BACKEND_API_URL}/art/`, art);
            navigate("/art");
        }catch (error){
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/art/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addArt}>
                        <TextField
                            id="title"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setArt({...art, title: event.target.value})}
                        />

                        <TextField
                            id="author"
                            label="Author"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setArt({...art, author: parseInt(event.target.value)})}
                        />

                        <TextField
                            id="year"
                            label="Year"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setArt({...art, year: parseInt(event.target.value)})}
                        />

                        <TextField
							id="type"
							label="Type"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setArt({ ...art, type: event.target.value})}
						/>

                        <TextField
							id="material"
							label="Material"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setArt({ ...art, material: event.target.value })}
						/>

                        <TextField
                            id="gallery"
                            label="Gallery"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setArt({...art, gallery: parseInt(event.target.value)})}
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

                        <Button type="submit">Add Art</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )


}