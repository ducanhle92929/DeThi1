import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { XeMay } from '../models/XeMay';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { SlideInRight } from 'react-native-reanimated';

type RootStackParamList = {
    Home: undefined;
    AddEdit: { xeMay?: XeMay };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
    xeMay: XeMay;
    onDelete: (id: string) => void;
}

const XeMayItem: React.FC<Props> = ({ xeMay, onDelete }) => {
    const navigation = useNavigation<NavigationProp>();

    const handleDelete = () => {
        if (!xeMay.id) {
            Alert.alert('Lỗi', 'Không thể xóa vì thiếu ID.');
            return;
        }
        Alert.alert(
            'Xác nhận xóa',
            `Bạn có chắc muốn xóa ${xeMay.ten_xe_PH49116}?`,
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Xóa',
                    style: 'destructive',
                    onPress: () => onDelete(xeMay.id!),
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <Animated.View entering={SlideInRight.duration(500)} style={styles.container}>
            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('AddEdit', { xeMay })}
            >
                <Image
                    source={{ uri: xeMay.hinh_anh || 'https://vinfastnewway.com.vn/wp-content/uploads/2020/09/banner-president-02-1000x377.jpg' }}
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.name}>{xeMay.ten_xe_PH49116}</Text>
                    <Text style={styles.detail}>Màu: {xeMay.mau_sac}</Text>
                    {/* <Text style={styles.detail}>Giá: ${xeMay.gia_ban.toLocaleString()}</Text> */}
                    <Text style={styles.detail}>
  Giá: ${xeMay.gia_ban ? xeMay.gia_ban.toLocaleString() : "0"}
</Text>

                </View>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('AddEdit', { xeMay })}
                >
                    <Text style={styles.editButtonText}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.deleteText}>Xóa</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    info: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detail: {
        fontSize: 14,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    editButton: {
        backgroundColor: '#007bff', // Blue for edit
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default XeMayItem;