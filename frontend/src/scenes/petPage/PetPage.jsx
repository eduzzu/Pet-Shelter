import { Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import AdvertsWidget from "../../widgets/AdvertsWidget"
import Footer from "../footer/Footer"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { removePet } from "../../state/petsSlice";

const PetPage = () => {

    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getPet = async () => {

        try {
            const response = await fetch(`http://localhost:3001/pets/${id}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await response.json();
            setPet(data);
        } catch (error) {
            console.error("Cannot extract pet data.", error);
        }
    }

    useEffect(() => {
        getPet();
    }, [id]);

    if (!pet) return null;

    const {
        name,
        age,
        category,
        breed,
        gender,
        size,
        picturePath,
        health,
        status,
        description,
        previousOwners,
        viewedPet
    } = pet;

    function createData(statName, stat) {
        return { statName, stat };
    }

    const rows = [
        createData("Name", name),
        createData("Age", age),
        createData("Category", category),
        createData("Breed", breed),
        createData("Gender", gender),
        createData("Size", size),
        createData("Health", health),
        createData("Status", status),
        createData("Previous Owners", previousOwners),
        createData("People who watched this pet", viewedPet),
    ];

    const handleDeletePet = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this pet?");
        
        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:3001/pets/${id}/deletePet`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await response.json();
                console.log(data);

                dispatch(removePet(id)); 
                navigate('/pets'); 
            } catch (error) {
                console.error("Error deleting pet:", error);
            }
        }
    };

    return (
        <Box>
            <Navbar />

            <Box
                sx={{
                    display: "flex",
                    gap: "5%",
                    justifyContent: "center",
                }}


            >

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: "3%",
                        alignItems: "center"

                    }}
                >
                    <img
                        src={`http://localhost:3001/assets/${picturePath}`}
                        alt={name}
                        width="100%"
                        height="auto"
                        
                    />
                    <Typography
                        sx={{
                            mt: "3%",
                            textAlign: "center",
                            fontSize: "32px",
                            fontFamily: "revert",
                            color: "gray",
                            textShadow: "2px 2px 4px gray"
                        }}
                    > {name}, {age} years old {category}
                    
                    <Button
                        sx={{
                            mt: "3%",
                            width: "60%",
                            padding: "2% 10%",
                            border: "1px solid #9381ff",
                            borderRadius: "20px",
                            fontSize: "16px",
                            fontFamily: "inherit",
                            fontWeight: "bold",
                            color: "white",
                            backgroundColor: "#9381ff",
                            "&:hover": {color: "white", backgroundColor: "#9900ff"}
                        }}
                        onClick={() => navigate(`/pets/${pet._id}/adopt`)}
                    >Enquire about {name}
                    </Button>
                    </Typography>
                    
                </Box>

                <TableContainer component={Paper} sx={{ mt: "3%", border: "none", width: "50%", height: "50%" }}>
                    <Table sx={{
                        backgroundColor: "rgb(235, 230, 230);",
                        border: 'none'
                    }}
                    >
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, paddingTop: 0 }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold", fontFamily: "revert" }}>{row.statName}</TableCell>
                                    <TableCell align="left" sx={{ color: "#9381ff", fontFamily: "revert" }}>{row.stat}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>

            <Box
                sx={{
                    mt: "3%",
                    ml: "6%",
                    mr: "16%"

                }}
            >
                <Typography
                    sx={{
                        fontSize: "32px",
                        color: "#9381ff",
                        fontFamily: "revert",
                        textShadow: "2px 2px 4px #9381ff"

                    }}
                >About {name}
                </Typography>

                <Typography sx={{mt: "2%", fontFamily: "revert"}}>{description}</Typography>
                
                
            </Box>

            

                {isAdmin && (
                    <Box
                        sx={{
                            mt: "2%",
                            ml: "6%",
                            display: "flex"
                            
                        }}
                    >
                        <Button variant="contained" color="warning"
                            sx={{
                                mr: "2%",
                                borderRadius: "10px",
                                p: "0.5% 2.5%"
                            }}
                            onClick={() => navigate(`/pets/${id}/editPet`)}
                        >Edit Pet
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeletePet}
                            sx={{
                                ml: "2%",
                                borderRadius: "10px",
                                p: "0.5% 2%"
                            }}
            >
                Delete Pet
            </Button>
                        
                    </Box>
                    )}

            

            <AdvertsWidget />
            <Footer />
        </Box>
    )

}

export default PetPage;