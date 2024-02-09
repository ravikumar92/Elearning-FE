import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setEmail('');
            setPassword('');
            setErrorMessage('');
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        let timeout;
        if (errorMessage) {
            timeout = setTimeout(() => {
                setErrorMessage('');
            }, 1000); // 3 seconds
        }

        return () => clearTimeout(timeout);
    }, [errorMessage]);

    const navigateToCreateAccount = () => {
        navigation.navigate('Register');
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:8080/api/v1/user/login', {
                email: email,
                password: password,
            });
            if (response.data.success) {
                navigation.navigate('Dashboard');
            } else {
                setErrorMessage('Invalid email or password.');
            }
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.createAccount} onPress={navigateToCreateAccount}>
                <Text>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    loginContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    createAccount: {
        marginTop: 20,
    },
    errorMessage: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
