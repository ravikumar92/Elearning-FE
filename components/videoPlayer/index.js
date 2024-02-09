import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';




const VideoPlayerScreen = ({ url, onClose }) => {
    const extractVideoId = (url) => {
        const match = url.match(/[?&]v=([^?&]+)/);
        console.log(match && match[1])
        return match && match[1];
    };

    return (
        <View style={styles.container}>
            <WebView
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsFullscreenVideo={true}
                source={{ uri: `https://www.youtube.com/embed/${extractVideoId(url)}` }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        marginBottom: 20,
        height: 100
    },
    video: {
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default VideoPlayerScreen;
