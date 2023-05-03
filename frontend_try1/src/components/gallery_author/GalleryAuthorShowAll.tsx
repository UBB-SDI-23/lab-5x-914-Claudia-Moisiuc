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
    Tooltip, Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {GalleryAuthor} from "../../models/GalleryAuthor";
import axios from "axios";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";


export const GalleryAuthorShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [galleries_authors, setGalleryAuthor] = useState<GalleryAuthor[]>([]);
    const [refreshUsers, setRefreshUsers] = useState(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const itemsPerPage = 25;

    useEffect(() => {
        setLoading(true);
        setRefreshUsers(false);
        axios.get(`${BACKEND_API_URL}/galleryauthor?page=${pageNumber}`)
            .then((response) => {
                setGalleryAuthor(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [refreshUsers, pageNumber]);


    const handleOnPreviousPage = () => {
        setPageNumber(pageNumber - 1);
    };

    const handleOnNextPage = () => {
        setPageNumber(pageNumber + 1);
    };

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
                <>
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
                                <tr>
                                    <TableCell align="center">{gallery_author.id}</TableCell>
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
                <Box sx={{mt: 2, gap: 1}}>
                        <IconButton disabled={pageNumber == 1} onClick={handleOnPreviousPage}>
                            <NavigateBeforeIcon color={"primary"} fontSize={"large"}/>
                        </IconButton>
                        <IconButton onClick={handleOnNextPage}>
                            <NavigateNextIcon color={"primary"} fontSize={"large"}/>
                        </IconButton>
                    </Box>
                </>
            )}
        </div>
    );
};
