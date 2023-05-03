import {useEffect, useState} from "react";
import {Location} from "../../models/Location";
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

export const LocationShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [locations, setLocation] = useState<Location[]>([]);
    const [refreshUsers, setRefreshUsers] = useState(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const itemsPerPage = 25;

    useEffect(() => {
        setLoading(true);
        setRefreshUsers(false);
        axios.get(`${BACKEND_API_URL}/locations?page=${pageNumber}`)
            .then((response) => {
                setLocation(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [refreshUsers, pageNumber]);

    if (locations.length == 0) {
        return <div>No locations</div>;
    }

    const handleOnPreviousPage = () => {
        setPageNumber(pageNumber - 1);
    };

    const handleOnNextPage = () => {
        setPageNumber(pageNumber + 1);
    };

    return (
        <div>
            <h1>Locations List</h1>
            {!loading && locations.length === 0 && <p>No locations found</p>}
            {!loading && (
                <IconButton
                    sx={{mr: 3}}
                    onClick={() => {
                        window.location.href = '/locations/add/';
                    }}
                >
                    <Tooltip title="Add a new location" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && locations.length > 0 && (
                <>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Country</TableCell>
                                <TableCell align="center">City</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {locations.map((location: Location) => (
                                <tr>
                                    <TableCell align="center">{location.id}</TableCell>
                                    <TableCell align="center">{location.country}</TableCell>
                                    <TableCell align="center">{location.city}</TableCell>
                                    <TableCell align="center">{location.to_visit}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/locations/${location.id}/details`;
                                            }}
                                        >
                                            <Tooltip title="View location details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/locations/${location.id}/edit`;
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/locations/${location.id}/delete`;
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

