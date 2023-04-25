import {useEffect, useState} from "react";
import {Gallery} from "../../models/Gallery";
import {BACKEND_API_URL} from "../../constants";
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {GalleryAuthor} from "../../models/GalleryAuthor";

export const GalleryAuthorShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [galleries_authors, setGalleryAuthor] = useState<GalleryAuthor[]>([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/galleryauthor/`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setGalleryAuthor(data);
            });
    }, []);

    if (galleries_authors.length == 0) {
        return <div>No galleries and authors</div>;
    }

    return (
        <div>
            <h1>Galleries and Authors List</h1>
            {!loading && galleries_authors.length === 0 && <p>No galleries and authors found</p>}
            {!loading && (
                <IconButton
                    sx={{mr: 3}}
                    onClick={() => {
                        window.location.href = '/galleryauthor/add/';
                    }}
                >
                    <Tooltip title="Add a new gallery and author" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && galleries_authors.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">

                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Author</TableCell>
                                <TableCell align="center">Gallery</TableCell>
                                <TableCell align="center">Starting exposition</TableCell>
                                <TableCell align="center">Ending exposition</TableCell>
                                <TableCell align="center">Number Participants</TableCell>
                                <TableCell align="center">Invited</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {galleries_authors.map((gallery_author: GalleryAuthor, index) => (
                                <tr key={index}>
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{gallery_author.author.toString()}</TableCell>
                                    <TableCell align="center">{gallery_author.gallery.toString()}</TableCell>
                                    <TableCell align="center">{gallery_author.starting_exposition}</TableCell>
                                    <TableCell align="center">{gallery_author.ending_exposition}</TableCell>
                                    <TableCell align="center">{gallery_author.nb_participants}</TableCell>
                                    <TableCell align="center">{gallery_author.invited}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/galleryauthor/${gallery_author.id}/details`;
                                            }}
                                        >
                                            <Tooltip title="View gallery and author details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/galleryauthor/${gallery_author.id}/edit`;
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/galleryauthor/${gallery_author.id}/delete`;
                                            }}
                                        >
                                            <DeleteForeverIcon sx={{color: "red"}} />
                                        </IconButton>
                                    </TableCell>
                                </tr>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};
