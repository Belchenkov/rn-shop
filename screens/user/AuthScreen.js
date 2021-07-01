import React from 'react';
import { ScrollView, StyleSheet, Button, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

const AuthScreen = () => {
    return (
        <View
            style={styles.screen}
        >
            <LinearGradient
                colors={['#ffedff', '#88b195']}
                style={styles.gradient}
            >
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorMessage="Please enter a valid email address!"
                            onValueChange={() => {}}
                            initialValue=""
                            onInputChange={() => {}}
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={6}
                            autoCapitalize="none"
                            errorMessage="Please enter a valid password!"
                            onValueChange={() => {}}
                            initialValue=""
                            onInputChange={() => {}}
                        />
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {}}
                            title="Login"
                            color={Colors.primary}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {}}
                            title="Switch to Sign Up"
                            color={Colors.accent}
                        />
                    </View>
                </Card>
            </LinearGradient>
        </View>
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
    authContainer: {
        width: '80%',
        maxWidth: 400,
        height: '50%',
        maxHeight: 400,
        padding: 20
    },
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;
