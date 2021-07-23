import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, View, TextInput, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
    const [text, onChangetext] = React.useState("")

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./assets/FondoNubesAnime.jpg')} resizeMode="cover" style={styles.imageBackground}>
                <Image source={require('./assets/Myanimelist_logo.png')} resizeMode="cover" style={styles.logo}></Image>
                <TextInput
                    placeholder="¿Qué animé querés buscar?"
                    style={styles.textInput}
                    onChangeText={onChangetext}
                    value={text}
                />
                <Button
                    title="Buscar"
                    onPress={() => navigation.navigate('AnimeCard', { anime: text })}
                    style={styles.button}
                />
            </ImageBackground>
            <StatusBar style="inverted" />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        backgroundColor: "#ffffff"
    },
    button: {
        color: '#FFFFFF',
    },
    logo: {
        width: '80%',
        height: '10%',
        resizeMode: 'contain'
    }
});