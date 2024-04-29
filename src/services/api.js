import axios from "axios";
import React from 'react';

const API_URL = 'https://localhost:7011/api';



export const listarCasas = async () => {
  try {
    const response = await axios.get(`${API_URL}/casa/listar`);
    return response.data;
    }catch (error) {
        throw error;
    }
}
