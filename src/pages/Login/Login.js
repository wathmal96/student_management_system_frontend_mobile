import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createAxiosInstance from "../../service/axiosOrder";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const theme = useTheme();

    const login = async () => {
        console.log("Email:", email);
        console.log("Password:", password);

        try {
            const axiosInstance = await createAxiosInstance();

            const response = await axiosInstance.post('/login', {
                email,
                password
            });

            const { token, user } = response.data;
            console.log("Token:", token);
            console.log("User:", user);

            await AsyncStorage.multiSet([
                ['login', token],
                ['user', user.name],
                ['mail', user.email]
            ]);

            navigation.navigate("Drawer");
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Please login to continue</Text>
            <TextInput
                mode="outlined"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
                theme={{ colors: { primary: theme.colors.primary } }}
            />
            <TextInput
                mode="outlined"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                theme={{ colors: { primary: theme.colors.primary } }}
            />
            <Button mode="contained" onPress={login} style={styles.button}>
                Login
            </Button>
            <Button mode="text" onPress={() => navigation.navigate("Register")} style={styles.link}>
                Register
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        color: '#666',
    },
    input: {
        width: '100%',
        marginBottom: 15,
    },
    button: {
        width: '100%',
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: '#6200ee', // You can customize the button color
    },
    link: {
        marginTop: 10,
        color: '#6200ee', // You can customize the link color
    },
});
