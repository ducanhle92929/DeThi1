import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';
import { XeMay } from '../models/XeMay';
import { addXeMay, updateXeMay } from '../api/xeMayApi';

// Define the param list (same as in App.tsx)
type RootStackParamList = {
    Home: undefined;
    AddEdit: { xeMay?: XeMay };
};

type AddEditRouteProp = RouteProp<RootStackParamList, 'AddEdit'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AddEditScreen = () => {
    const route = useRoute<AddEditRouteProp>();
    const navigation = useNavigation<NavigationProp>();
    const xeMay = route.params?.xeMay;

    const [form, setForm] = useState<XeMay>({
        ten_xe_PH49116: xeMay?.ten_xe_PH49116 || '',
        mau_sac: xeMay?.mau_sac || '',
        gia_ban: xeMay?.gia_ban || 0,
        mo_ta: xeMay?.mo_ta || '',
        hinh_anh: xeMay?.hinh_anh || '',
    });

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Quyền truy cập bị từ chối', 'Cần quyền truy cập thư viện ảnh.');
            }
        })();
    }, []);

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setForm({ ...form, hinh_anh: result.assets[0].uri });
        }
    };

    const handleSubmit = async () => {
        if (!form.ten_xe_PH49116 || !form.mau_sac || !form.gia_ban || !form.mo_ta || !form.hinh_anh) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }

        try {
            if (xeMay) {
                await updateXeMay(xeMay.id!, form);
                Alert.alert('Thành công', 'Cập nhật xe thành công!');
            } else {
                await addXeMay(form);
                Alert.alert('Thành công', 'Thêm xe thành công!');
            }
            navigation.goBack();
        } catch (error) {
            console.error('Error saving xe may:', error);
            Alert.alert('Lỗi', 'Không thể lưu xe. Vui lòng thử lại.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <CustomTextInput
                label="Tên xe"
                value={form.ten_xe_PH49116}
                onChangeText={(text) => setForm({ ...form, ten_xe_PH49116: text })}
                placeholder="Nhập tên xe"
            />
            <CustomTextInput
                label="Màu sắc"
                value={form.mau_sac}
                onChangeText={(text) => setForm({ ...form, mau_sac: text })}
                placeholder="Nhập màu sắc"
            />
            <CustomTextInput
                label="Giá bán"
                value={form.gia_ban.toString()}
                onChangeText={(text) => setForm({ ...form, gia_ban: parseFloat(text) || 0 })}
                placeholder="Nhập giá bán"
            />
            <CustomTextInput
                label="Mô tả"
                value={form.mo_ta}
                onChangeText={(text) => setForm({ ...form, mo_ta: text })}
                placeholder="Nhập mô tả"
            />
            <CustomButton title="Chọn ảnh" onPress={handlePickImage} />
            {form.hinh_anh ? (
                <Image
                    source={{ uri: form.hinh_anh }}
                    style={styles.previewImage}
                />
            ) : null}
            <CustomButton
                title={xeMay ? 'Cập nhật' : 'Thêm mới'}
                onPress={handleSubmit}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginVertical: 10,
    },
});

export default AddEditScreen;