import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, View, TextInput, Button } from 'react-native';
function HomeScreen(props) {
    const [election, onChangeElection] = React.useState("")

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./assets/FondoNubesAnime.jpg')} resizeMode="cover" style={styles.imageBackground}>
                <TextInput
                    placeholder="¿Qué animé querés buscar?"
                    style={styles.textInput}
                    onChangeText={onChangeElection}
                    value={election}
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
    }



});