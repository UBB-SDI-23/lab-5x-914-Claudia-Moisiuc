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
import axios from "axios";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const GalleryShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [galleries, setGallery] = useState<Gallery[]>([]);

     const [refreshUsers, setRefreshUsers] = useState(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const itemsPerPage = 25;


    useEffect(() => {
        setLoading(true);
        setRefreshUsers(false);
        axios.get(`${BACKEND_API_URL}/gallery?page=${pageNumber}`)
            .then((response) => {
                setGallery(response.data);
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

    if (galleries.length == 0) {
        return <div>No galleries</div>;
    }

    return (
        <div>
            <h1>Galleries List</h1>
            {!loading && galleries.length === 0 && <p>No galleries found</p>}
            {!loading && (
                <IconButton
                    sx={{mr: 3}}
                    onClick={() => {
                        window.location.href = '/gallery/add/';
                    }}
                >
                    <Tooltip title="Add a new gallery" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && galleries.length > 0 && (
                <>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">


                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Theme</TableCell>
                                <TableCell align="center">Street</TableCell>
                                <TableCell align="center">Capacity</TableCell>
                                <TableCell align="center">Location</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {galleries.map((gallery: Gallery, index) => (
                                <tr key={index}>
                                    <TableCell align="center">{gallery.id}</TableCell>
                                    <TableCell align="center">{gallery.name}</TableCell>
                                    <TableCell align="center">{gallery.theme}</TableCell>
                                    <TableCell align="center">{gallery.street}</TableCell>
                                    <TableCell align="center">{gallery.capacity}</TableCell>
                                    <TableCell align="center">{gallery.location?.toString()}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/gallery/${gallery.id}/details`;
                                            }}
                                        >
                                            <Tooltip title="View gallery details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/gallery/${gallery.id}/edit`;
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/gallery/${gallery.id}/delete`;
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
