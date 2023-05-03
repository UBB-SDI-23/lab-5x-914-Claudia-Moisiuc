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
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
    Toolbar,
    Button, Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Author} from "../../models/Author";
import axios from "axios";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const AuthorShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [authors, setAuthor] = useState<Author[]>([]);

     const [refreshUsers, setRefreshUsers] = useState(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const itemsPerPage = 25;


    useEffect(() => {
        setLoading(true);
        setRefreshUsers(false);
        axios.get(`${BACKEND_API_URL}/author?page=${pageNumber}`)
            .then((response) => {
                setAuthor(response.data);
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

    if (authors.length == 0) {
        return <div>No authors</div>;
    }

    return (
        <div>
            <h1>Authors List</h1>
            {!loading && authors.length === 0 && <p>No authors found</p>}
            {!loading && (
                <IconButton
                    sx={{mr: 3}}
                    onClick={() => {
                        window.location.href = '/author/add/';
                    }}
                >
                    <Tooltip title="Add a new author" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && authors.length > 0 && (
                <>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">

                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Date_birth</TableCell>
                                <TableCell align="center">Date_death</TableCell>
                                <TableCell align="center">Period</TableCell>
                                <TableCell align="center">Originated</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {authors.map((author: Author, index) => (
                                <tr>
                                    <TableCell align="center">{author.id}</TableCell>
                                    <TableCell align="center">{author.name}</TableCell>
                                    <TableCell align="center">{author.date_birth}</TableCell>
                                    <TableCell align="center">{author.date_death}</TableCell>
                                    <TableCell align="center">{author.period}</TableCell>
                                    <TableCell align="center">{author.originated}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/author/${author.id}/details`;
                                            }}
                                        >
                                            <Tooltip title="View author details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/author/${author.id}/edit`;
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/author/${author.id}/delete`;
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
