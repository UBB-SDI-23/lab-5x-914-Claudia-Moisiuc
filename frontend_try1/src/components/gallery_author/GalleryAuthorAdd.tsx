import {useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import {Button, Card, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {Link, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {GalleryAuthor} from "../../models/GalleryAuthor";


export const GalleryAuthorAdd = () => {
    const navigate = useNavigate();

    const [gallery_author, setGalleryAuthor] = useState<GalleryAuthor>({
        id: 0,
        author: 1,
        gallery: 1,
        starting_exposition: "",
        ending_exposition: "",
        nb_participants: 1,
        invited: 1
    });

	const addGalleryAuthor = async (event: {preventDefault: () => void}) =>{
        event.preventDefault();
        try{
            await axios.post(`${BACKEND_API_URL}/galleryauthor/`, gallery_author);
            navigate("/galleryauthor");
        }catch (error){
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/galleryauthor/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addGalleryAuthor}>
                        <TextField
                            id="author"
                            label="Author"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setGalleryAuthor({...gallery_author, author: parseInt(event.target.value)})}
                        />
                        <TextField
                            id="gallery"
                            label="Gallery"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setGalleryAuthor({...gallery_author, gallery: parseInt(event.target.value)})}
                        />

                        <TextField
                            id="starting_exposition"
                            label="Starting Exposition"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setGalleryAuthor({...gallery_author, starting_exposition: event.target.value})}
                        />

                        <TextField
							id="ending_exposition"
							label="Ending Exposition"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setGalleryAuthor({ ...gallery_author, ending_exposition: event.target.value})}
						/>

                        <TextField
							id="nb_participants"
							label="Number of participants"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setGalleryAuthor({ ...gallery_author, nb_participants: parseInt(event.target.value) })}
						/>

                        <TextField
							id="invited"
							label="Invited"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setGalleryAuthor({ ...gallery_author, invited: parseInt(event.target.value) })}
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