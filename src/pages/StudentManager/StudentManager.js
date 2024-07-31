import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import createAxiosInstance from '../../service/axiosOrder';
import Accordion from '../../components/Accordion/Accordion';
import { Button } from 'react-native-paper';
import Model from '../../components/Model/Model';

export default function StudentManager() {
    const [response, setResponse] = useState(null);

    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        getAll()
    }, [])

    const getAll = async () => {
        try {
            const axiosInstance = await createAxiosInstance();
            const response = await axiosInstance.get('/student/getAll');
            setResponse(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching students:', error)
        }
    }
    const saveStd =async (addressApi,std)=>{
        const axiosInstance = await createAxiosInstance();
        await axiosInstance.post(addressApi,std);
    }



    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={()=>setVisible(true)}
                style={styles.addButton}
            >
                Add Student
            </Button>
            {
                response ?
                    <Accordion dataArray={response} getsAll={getAll}/>
                    :
                    <View>
                        <Text>Loading...</Text>
                    </View>
            }

            <Model visible={visible} hideDialog={()=>setVisible(false)} getAll={getAll} apiCall={"save"} testFn={saveStd}/>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    addButton: {
        marginBottom: 20,
        backgroundColor: '#1565C0', // Example background color
    },
});
