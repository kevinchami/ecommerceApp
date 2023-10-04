import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";


const fetchCart = async() => {
    const [data, setData] = useState([]);
    const [loading, setLoader] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async() => {
        setLoader(true);
        const token = await AsyncStorage.getItem('token');
        //console.log("Token from AsyncStorage:", token);
        //console.log("\n");


        try {
            const endpoint = 'http://localhost:3000/api/cart/find';

            const headers = {
                'Content-Type': 'application/json',
                'token': 'Bearer ' + JSON.parse(token)
            };
            //console.log("API Request Headers:", headers);

           const response = await axios.get(endpoint, {headers});
           const cartProducts = response.data[0].products;

            //console.log("Data before update:", data);

        // Update the data state with cartProducts
            if(cartProducts){
                setData(cartProducts);
            }
        // Log the updated data state
            //console.log("Data after update:", data);
            //console.log("\n");
            //console.log("CART PRODUCTS: ", cartProducts);

           setLoader(false);
        } catch (error) {
            setError(error);
        }finally{
            setLoader(false);
        }
    }

    //console.log("Data after update:", data);
    useEffect(() => {
        console.log("Fetching data...");
        fetchData();

    }, []);

    const refetch = () => {
        setLoader(true);
        fetchData();
    }

    return {data, loading, error, refetch}
};

export default fetchCart;

