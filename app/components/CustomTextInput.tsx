import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    label: string;
}

const CustomTextInput: React.FC<Props> = ({ value, onChangeText, placeholder, label }) => {
    return (
        <Animated.View entering={ZoomIn.duration(500)} style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
});

export default CustomTextInput;