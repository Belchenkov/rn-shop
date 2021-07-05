import React, { useCallback, useReducer, useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { ScrollView, StyleSheet, Button, View, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

import { login, signUp } from "../../store/actions/auth";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        error && Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }, [error]);

    const authHandler = async () => {
        let action;

        if (isSignup) {
            action = signUp(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = login(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }

        setError(null);
        setIsLoading(true);

        try {
            await dispatch(action);

        } catch (err) {
            setError(err.message);
        }

        setIsLoading(false);
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        <View
            style={styles.screen}
        >
            <LinearGradient
                colors={['#ffedff', '#505c8c']}
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
                            errorTexte="Please enter a valid email address!"
                            onValueChange={() => {}}
                            initialValue=""
                            onInputChange={inputChangeHandler}
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={6}
                            autoCapitalize="none"
                            errorTexte="Please enter a valid password!"
                            onValueChange={() => {}}
                            initialValue=""
                            onInputChange={inputChangeHandler}
                        />
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={authHandler}
                            title={ isSignup ? "Sign Up" : "Login"}
                            color={Colors.primary}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        { isLoading
                            ? <ActivityIndicator size="small" color={Colors.primary} />
                            : <Button
                                onPress={() => { setIsSignup(prevState => !prevState) }}
                                title={ `Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                                color={Colors.accent}
                            />
                        }
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
