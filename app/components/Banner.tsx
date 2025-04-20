import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const banners = [
    {
        uri: 'https://vinfastnewway.com.vn/wp-content/uploads/2020/09/banner-president-02-1000x377.jpg',
        title: 'Khuyến mãi xe máy mới!',
    },
    {
        uri: 'https://danhgiaxevinfast.com/wp-content/uploads/2018/03/o-to-vinfast-banner-600x214.jpg',
        title: 'Giảm giá 20% hôm nay!',
    },
    {
        uri: 'https://vinfastquangbinh3s.com/wp-content/uploads/2024/11/banner-vinfast-1.jpg',
        title: 'Xe máy điện siêu tiết kiệm!',
    },
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageError, setImageError] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % banners.length;
                // console.log('Switching to banner:', banners[newIndex].uri); // Log mỗi lần chuyển
                setImageError(null); // Reset lỗi
                return newIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.bannerContainer}>
            <View style={styles.debugContainer}>
                {imageError ? (
                    <Text style={styles.errorText}>{imageError}</Text>
                ) : (
                    <Image
                        source={{ uri: banners[currentIndex].uri }}
                        style={styles.bannerImage}
                        resizeMode="cover"
                        onError={(e) => {
                            console.log('Image load error:', banners[currentIndex].uri, e.nativeEvent.error);
                            setImageError(`Không tải được hình: ${banners[currentIndex].uri}`);
                        }}
                        onLoad={() => console.log('Image loaded:', banners[currentIndex].uri)}
                    />
                )}
                <Text style={styles.bannerTitle}>{banners[currentIndex].title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#f0f0f0', // Thêm background để debug
        zIndex: 1, // Đảm bảo không bị che
    },
    debugContainer: {
        width: '100%',
        alignItems: 'center',
    },
    bannerImage: {
        width: '90%',
        height: 100,
        borderRadius: 10,
        borderWidth: 1, // Thêm border để debug
        borderColor: '#000',
    },
    bannerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 5,
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        textAlign: 'center',
        marginVertical: 10,
        width: '90%',
        height: 100,
        lineHeight: 100, // Căn giữa theo chiều dọc
    },
});

export default Banner;