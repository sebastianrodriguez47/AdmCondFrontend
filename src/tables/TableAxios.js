import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { listarCasas } from "../services/api";
import emotionStyled from "@emotion/styled";

import React from 'react'

export const TableAxios = () => {

    const [houses, setHouses] = useState([]);


    useEffect(() => {
        async function fetchData() {
            const data = await listarCasas();
            console.log(data);
            setHouses(data);
        }
        fetchData();
        
        
    }, []);


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

    const options = {
        selectableRows: false,
        selectableRowsOnClick: true
    }

    return (
        <MUIDataTable
            title={"Listado de Casas"}
            data={houses}
            columns={columns}
            options={options}
        />
    )
}
