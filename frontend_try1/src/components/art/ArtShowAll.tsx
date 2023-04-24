import {useEffect, useState} from "react";
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
import {Art} from "../../models/Art";

export const ArtShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [arts, setArt] = useState<Art[]>([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/art/`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setArt(data);
            });
    }, []);

    if (arts.length == 0) {
        return <div>No arts</div>;
    }

    return (
        <div>
            <h1>Arts List</h1>
            {!loading && arts.length === 0 && <p>No arts found</p>}
            {!loading && (
                <IconButton
                    sx={{mr: 3}}
                    onClick={() => {
                        window.location.href = '/art/add/';
                    }}
                >
                    <Tooltip title="Add a new art" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && arts.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">

                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Author</TableCell>
                                <TableCell align="center">Year</TableCell>
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="center">Material</TableCell>
                                <TableCell align="center">Gallery</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arts.map((art: Art, index) => (
                                <tr key={index}>
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{art.title}</TableCell>
                                    <TableCell align="center">{art.author}</TableCell>
                                    <TableCell align="center">{art.year}</TableCell>
                                    <TableCell align="center">{art.type}</TableCell>
                                    <TableCell align="center">{art.material}</TableCell>
                                    <TableCell align="center">{art.gallery}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/art/${art.id}/details`;
                                            }}
                                        >
                                            <Tooltip title="View art details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/art/${art.id}/edit`;
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/art/${art.id}/delete`;
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
