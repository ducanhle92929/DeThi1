import axios from 'axios';
import { XeMay } from '../models/XeMay';

// const API_URL = 'https://67ffcaf9b72e9cfaf725eaec.mockapi.io/XeMay'; // Thay bằng URL MockAPI của bạn
const API_URL = 'https://67bd35f3321b883e790b93e9.mockapi.io/XeMay'; // Thay bằng URL MockAPI của bạn
export const fetchXeMayList = async (): Promise<XeMay[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addXeMay = async (xeMay: XeMay): Promise<XeMay> => {
    const response = await axios.post(API_URL, xeMay);
    return response.data;
};

export const updateXeMay = async (id: string, xeMay: XeMay): Promise<XeMay> => {
    const response = await axios.put(`${API_URL}/${id}`, xeMay);
    return response.data;
};

export const deleteXeMay = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};