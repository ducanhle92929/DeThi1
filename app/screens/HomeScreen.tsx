import React, { useEffect, useCallback } from 'react'; 
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setXeMayList } from '../redux/xeMaySlice';
import { fetchXeMayList, deleteXeMay } from '../api/xeMayApi';
import XeMayItem from '../components/XeMayItem';
import Banner from '../components/Banner';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // thêm useFocusEffect
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { XeMay } from '../models/XeMay';

type RootStackParamList = {
    Home: undefined;
    AddEdit: { xeMay?: XeMay };
    Favorite: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const xeMayList = useSelector((state: RootState) => state.xeMay.xeMayList);
    const navigation = useNavigation<NavigationProp>();

    const loadXeMay = async () => {
        try {
            const data = await fetchXeMayList();
            dispatch(setXeMayList(data));
        } catch (error) {
            console.error('Error fetching xe may:', error);
        }
    };

    // 👉 Khi màn hình Home được focus lại (vd: sau khi Update hoặc Add thành công)
    useFocusEffect(
        useCallback(() => {
            loadXeMay();
        }, [dispatch])
    );

    const handleDelete = async (id: string) => {
        try {
            await deleteXeMay(id);
            const updatedList = xeMayList.filter((item) => item.id !== id);
            dispatch(setXeMayList(updatedList));
        } catch (error) {
            console.error('Error deleting xe may:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Banner />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddEdit', { xeMay: undefined })}
            >
                <Text style={styles.addButtonText}>Thêm xe mới</Text>
            </TouchableOpacity>
            <FlatList
                data={xeMayList}
                keyExtractor={(item) => item.id!}
                renderItem={({ item }) => <XeMayItem xeMay={item} onDelete={handleDelete} />}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        margin: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
