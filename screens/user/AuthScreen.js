import React, { useCallback, useReducer, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, StyleSheet, Button, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

import { signUp } from "../../store/actions/auth";

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

const AuthScreen = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );

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

    const signUpHandler = () => {
        dispatch(signUp(
            formState.inputValues.email,
            formState.inputValues.password
        ));
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
                            onPress={signUpHandler}
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
