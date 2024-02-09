import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VideoPlayerScreen from '../videoPlayer';
import axios from 'axios';


const CourseContentScreen = ({route}) => {
    const navigation = useNavigation();

    const [showVideo, setShowVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [contentList, setContentList] = useState('');

    useEffect(() => {
        fetchContentList();
    }, []);

    async function fetchContentList() {
        try {
            const courseId = route?.params?.courseId;
            const response = await axios.get(`http://10.0.2.2:8080/api/v1/content/course/${courseId}`);
            console.log("heree", response.data.data)
            setContentList(response?.data?.data || []);
        } catch (e) {
            console.log("Error while fetching content List", e);
        }
    }
    const handleItemClick = (url) => {
        setVideoUrl(url);
        setShowVideo(true);
    }
    const closeVideoPlayer = () => {
        setShowVideo(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Course Content</Text>
            {showVideo &&
                <VideoPlayerScreen url={videoUrl} onClose={closeVideoPlayer}/>
            }
            <View style={[styles.contentList, showVideo && styles.withGap]}>
            {contentList && contentList.map(item => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.item}
                    onPress={() => handleItemClick(item.link)}
                >
                    <Text>{item.title}</Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
    },
    withGap: {
        paddingBottom: 20, // Add padding only if video player is shown
    },
    videoContainer: {
        marginBottom: 20, // Add margin to separate the video player from the content list
    },
});

export default CourseContentScreen;
