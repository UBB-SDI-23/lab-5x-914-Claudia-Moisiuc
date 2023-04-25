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

export const GalleryShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [galleries, setGallery] = useState<Gallery[]>([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/gallery/`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setGallery(data);
            });
    }, []);

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
                                    <TableCell align="center">{index}</TableCell>
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
            )}
        </div>
    );
};

/*<div>
            <h1>Locations List</h1>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>country</th>
                        <th>city</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location: Location, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{location.country}</td>
                            <td>{location.city}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>*/