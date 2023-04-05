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
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
    Toolbar,
    Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Link} from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


export const LocationShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [locations, setLocation] = useState<Location[]>([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/location/`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setLocation(data);
            });
    }, []);

    if (locations.length == 0) {
        return <div>No locations</div>;
    }

    return (
        <div>
            <h1>Locations List</h1>
            {!loading && locations.length === 0 && <p>No locations found</p>}
            {!loading && (
                <IconButton
                    sx={{mr: 3}}
                    onClick={() => {
                        window.location.href = '/location/add/';
                    }}
                >
                    <Tooltip title="Add a new location" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && locations.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Country</TableCell>
                                <TableCell align="center">City</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {locations.map((location: Location, index) => (
                                <tr key={index}>
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{location.country}</TableCell>
                                    <TableCell align="center">{location.city}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/location/${location.id}/details`;
                                            }}
                                        >
                                            <Tooltip title="View location details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/location/${location.id}/edit`;
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/location/${location.id}/delete`;
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