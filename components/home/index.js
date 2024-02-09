import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [showMenu, setShowMenu] = useState(false);
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        fetchCourseList();
    }, []);

    async function fetchCourseList() {
        try {
            const response = await axios.get('http://10.0.2.2:8080/api/v1/course');
            console.log(response.data.data)
            setCourseList(response?.data?.data || []);
        } catch (e) {
            console.log("Error while fetching course", e);
        }
    }

    const handleLogout = () => {
        navigation.navigate('Login');
    };
    return (
        <View style={styles.container}>
            {showMenu && (
                <View style={styles.dropdown}>
                    <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <Image
                    style={styles.userIcon}
                    source={require('../../assets/user.png')}
                />
            </TouchableOpacity>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Courses"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.dashboard}>
                {courseList && courseList.map(item => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.course}
                        onPress={() => navigation.navigate('Content', { courseId: item.id })}
                    >
                    <View style={styles.course}>
                        <Text style={styles.courseTitle}>{item?.title}</Text>
                        <Text style={styles.courseDescription}>{item?.description}</Text>
                    </View>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    searchButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    dashboard: {
        flex: 1,
        padding: 10,
    },
    course: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    menu: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: '#ffffff',
        borderRadius: 4,
        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    menuItem: {
        padding: 10,
    },
    userIconContainer: {
        position: 'absolute',
        top: 10, // Adjust the top position as needed
        right: 10, // Adjust the right position as needed
    },
    userIcon: {
        width: 32, // Adjust the width as needed
        height: 32, // Adjust the height as needed
        borderRadius: 16, // Adjust the border radius to make it circular
    },
    dropdown: {
        position: 'absolute',
        top: 50, // Adjust the top position as needed
        right: 10, // Adjust the right position as needed
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 10,
        elevation: 5,
        zIndex: 1, // Ensure the dropdown is above other components
    },
    courseDescription: {
        fontSize: 16,
        marginBottom: 10,
    }
});

export default HomeScreen;
