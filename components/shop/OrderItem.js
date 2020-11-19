import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native';

import Colors from "../../constants/Colors";

const OrderItem = ({ amount, date }) => {
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Button
                color={Colors.primary}
                title="Show Details"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: .26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'work-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'work-sans',
        fontSize: 16,
        color: '#888'
    }
});

export default OrderItem;