import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const CartItem = ({ onRemove, quantity, title, amount }) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{ quantity } {' '}</Text>
                <Text style={styles.title}>{ title }</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>{ amount }</Text>
                <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
                    <Ionicons
                        size={23}
                        color="red"
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'work-sans',
        color: '#888',
        fontSize: 16
    },
    title: {
        fontFamily: 'work-bold',
        fontSize: 16
    },
    amount: {
        fontFamily: 'work-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;