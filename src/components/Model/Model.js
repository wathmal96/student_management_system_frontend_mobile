import React from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import createAxiosInstance from '../../service/axiosOrder';

const Model = ({ visible, hideDialog,getAll, apiCall,testFn }) => {
    const [name, setName] = React.useState("");
    const [age, setAge] = React.useState(0);
    const [address, setAddress] = React.useState("");
    const [contact, setContact] = React.useState("");

    const saveStudent = async () => {
        try {
            const postedData = await testFn('/student/'+ apiCall, {
                student_name: name,
                student_age: age,
                student_address: address,
                student_contact: contact
            })
            console.log(postedData);
            
            const res = await getAll()
            hideDialog()
            console.log(postedData);
        } catch (error) {
            console.error("Error during post:", error);
            console.log("hooo");
        }
    }



    return (
        <Portal>
            <Dialog visible={visible}>
                <Dialog.Title>Enter Student Details</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        label="Name"
                        mode="outlined"
                        placeholder="Enter name"
                        value={name}
                        onChangeText={setName}
                        style={{ marginBottom: 10 }}
                    />
                    <TextInput
                        label="Age"
                        mode="outlined"
                        placeholder="Enter age"
                        value={age}
                        onChangeText={setAge}
                        style={{ marginBottom: 10 }}
                    />
                    <TextInput
                        label="Address"
                        mode="outlined"
                        placeholder="Enter address"
                        value={address}
                        onChangeText={setAddress}
                        style={{ marginBottom: 10 }}
                    />
                    <TextInput
                        label="Contact"
                        mode="outlined"
                        placeholder="Enter contact"
                        value={contact}
                        onChangeText={setContact}
                        style={{ marginBottom: 10 }}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Cancel</Button>
                    <Button onPress={saveStudent}>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default Model;
