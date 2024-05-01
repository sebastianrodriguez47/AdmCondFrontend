import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { listarCasas, listarJefesHogarByCasas } from "../services/api";
import emotionStyled from "@emotion/styled";
import React from 'react';
import { Box, Button, Modal, ThemeProvider, makeStyles } from "@mui/material";
import { createTheme } from '@mui/material/styles';

export const TableAxios = () => {

    const [houses, setHouses] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState([]);


    useEffect(() => {
        async function fetchData() {
            const data = await listarCasas();
            setHouses(data);
        }
        fetchData();
    }, []);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF5733',
            },
            secondary: {
                main: '#E0C2FF',
                light: '#F5EBFF',
                contrastText: '#47008F',
            },
        },
        components: {
            MUIDataTableBodyCell: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#F5EBFF',
                    }
                }
            },
            MUIDataTableHeadCell: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#E0C2FF'
                    }
                }
            },
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#E0C2FF'
                    }
                }
            }
        }
    });


    const columns = [
        {
            name: "number",
            label: "NUMERO",
        },
        {
            name: "debt",
            label: "DEUDA"
        }
    ]
    const columnsJefe = [
        {
            name: "name",
            label: "Nombre",
        },
        {
            name: "birthDate",
            label: "Fecha Nacimiento"
        },
        {
            name: "run",
            label: "Run"
        },
        {
            name: "phone",
            label: "telefono"
        },
        {
            name: "email",
            label: "Correo"
        }
    ]

    const options = {
        expandableRowsOnClick: true,
        selectableRows: 'none',
        responsive: 'standard',
        onRowClick: (row, index) => {
            async function fetchData() {
                const data = await listarJefesHogarByCasas(row[0]);
                console.log(data);
                setSelectedRowData(data);
            }
            fetchData()
            setOpenModal(true);

        },
    }

    const optionsJefe = {
        expandableRowsOnClick: true,
        selectableRows: 'none',
        download: 'false',
        print: 'false',
        search: 'false',
        filter: 'false',
        onRowClick: (row, index) => {
            async function fetchData() {
                const data = await listarJefesHogarByCasas(row[0]);
                console.log(data);
                setSelectedRowData(data);
            }
            fetchData()

            setOpenModal(true);

        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (

        <div style={{ width: "100%", height: "100%" , backgroundColor: '#E0C2FF'}}>
            <ThemeProvider theme={theme} variant={"secondary"}>
                <div style={{ width: "70%", height: "70%", display: "inline-block", borderStyle: "inset" }}>

                    <MUIDataTable
                        title={"Listado de Casas"}
                        data={houses}
                        columns={columns}
                        options={options}
                    />
                </div>
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: "auto", bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                        <p id="modal-modal-description">

                            {selectedRowData.length > 0 ? (

                                <MUIDataTable
                                    title={"Jefes de Hogar"}
                                    data={selectedRowData}
                                    columns={columnsJefe}
                                    options={optionsJefe}
                                />
                            ) : (
                                <span>Esta Casa No tiene Jefes de Hogar Asignados</span>
                            )}
                        </p>
                        <Button onClick={handleCloseModal}>Close</Button>
                    </Box>
                </Modal>
            </ThemeProvider>
        </div>

    )
}
