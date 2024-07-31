import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StudentManager from "../StudentManager/StudentManager";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from 'react';

const DrawerView = createDrawerNavigator();


function CustomDrawerContent(props) {
    const [user, setUser] = useState('');
    const [mail, setMail] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userValue = await AsyncStorage.getItem('user');
                const mailValue = await AsyncStorage.getItem('mail');
                if (userValue) setUser(userValue);
                if (mailValue) setMail(mailValue);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
            <View style={styles.drawerHeader}>
                <Text style={styles.username}>{user}</Text>
                <Text style={styles.email}>{mail}</Text>
            </View>
            <Divider style={styles.divider} />
            <DrawerItemList {...props} />
            <Divider style={styles.divider} />
            <DrawerItem
                label="Log Out"
                onPress={props.logOut}
                labelStyle={styles.drawerItemLabel}
                style={styles.drawerItem}
            />
        </DrawerContentScrollView>
    );
}

export default function Drawer() {
    const navigation = useNavigation()

    const logOut = async () => {
        try {

            await AsyncStorage.removeItem("login");
            console.log("logout successfully");
            navigation.navigate("Login2")
        } catch (error) {
            console.error("Error removing item", error);
        }
    }
    return (
        <DrawerView.Navigator drawerContent={(props) => <CustomDrawerContent {...props} logOut={logOut} />}>
            <DrawerView.Screen name="Student Manager" component={StudentManager} />
        </DrawerView.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        paddingTop: 0,
    },
    drawerHeader: {
        backgroundColor: '#1565C0',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    username: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    email: {
        fontSize: 14,
        color: '#fff',
    },
    divider: {
        marginVertical: 10,
    },
    drawerItem: {
        marginVertical: 5,
    },
    drawerItemLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
});
