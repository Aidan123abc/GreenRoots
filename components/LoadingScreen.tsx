import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Easing,
    Image,
    Text,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const LoadingScreen: React.FC = () => {
    const rotation = useRef(new Animated.Value(0)).current; // Rotation value
    const colorScheme = useColorScheme();
    const themeColors = Colors[colorScheme ?? 'light'];

    const [loadingText, setLoadingText] = useState('LOADING'); // Animated text state

    // Choose background image based on theme
    const backgroundImage =
        colorScheme === 'dark'
            ? require('@/public/MapDark.webp') // Dark mode map
            : require('@/public/MapLight.webp'); // Light mode map

    // Rotating animation
    useEffect(() => {
        const rotate = Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );
        rotate.start();

        return () => rotate.stop();
    }, [rotation]);

    // Interpolate rotation value to a degree
    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    // Animated loading text
    useEffect(() => {
        const loadingStages = ['LOADING', 'LOADING.', 'LOADING..', 'LOADING...'];
        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % loadingStages.length; // Cycle through stages
            setLoadingText(loadingStages[index]);
        }, 200); // Change every 500ms

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: themeColors.background }]}>
            {/* Background Map */}
            <Image
                source={backgroundImage}
                style={styles.backgroundImage}
                resizeMode="cover"
            />

            {/* Rotating Disc */}
            <Animated.View
                style={[styles.rotatingDisc, { transform: [{ rotate: spin }] }]}
            >
                <View style={styles.innerCircle}>
                    <Image
                        source={require('@/public/Icon.png')} // Replace with your logo path
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
            </Animated.View>

            {/* Loading Text */}
            <Text style={[styles.loadingText, { color: themeColors.text }]}>
                {loadingText}
            </Text>
        </View>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.2, // Slight transparency for the background image
    },
    rotatingDisc: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 10,
        borderColor: '#037A6A', // Color of the disc
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#FFFFFF', // Background color of the inner circle
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 23,
    },
    logo: {
        width: 100,
        height: 100,
    },
    loadingText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 16,
    },
});
