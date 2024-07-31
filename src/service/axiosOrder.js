import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure you import AsyncStorage

const createAxiosInstance = async () => {
  const token = await AsyncStorage.getItem("login");

  const instance = axios.create({
    baseURL: 'https://test.acpt.lk/api',
    headers: { Authorization: `Bearer ${token}` }
  });

  return instance;
};

export default createAxiosInstance;
