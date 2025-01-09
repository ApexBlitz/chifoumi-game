import axios from "axios"
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; 
import { useState, useEffect } from "react"


const getUserData = () => {
    const token = Cookies.get('token'); 
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub;
}

export default getUserData;

/* ------ UTILISATION : --------- 

const [userData, setUserData] = useState(null);

    const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
    };

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.[type de requete](`route${userId}`, config);
        setUserData(response.data);
        } catch (error) {
        console.error('Error fetching user data:', error);
        }
    };

    fetchData();
    }, [userId]);


    -> Utiliser les données : userId.data

*/


