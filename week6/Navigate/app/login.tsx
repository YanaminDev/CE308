import {View, Text , Button , StyleSheet , TextInput , } from 'react-native'
import {router}  from 'expo-router'

export default function LoginScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>This opens as a model</Text>
            <TextInput style={styles.input} placeholder='Email' placeholderTextColor="#999"></TextInput>
            <TextInput style={styles.input} placeholder='Password' placeholderTextColor="#999" secureTextEntry></TextInput>

            <Button title="Login" onPress={() => router.back()}></Button>
            <Button title="Close Model" onPress={() => router.back()} color="#888"></Button>
        </View>

        

    
    )
}

const styles= StyleSheet.create({
            container:{
                flex:1,
                justifyContent:'center',
                alignItems: 'center',
                padding:20,
                backgroundColor:'#fff'
            },
            title:{
                fontWeight: 'bold'
                ,fontSize:28,
                margin: 10
            },
            subtitle:{
                color : '#888'
                ,fontSize:14,
                margin: 30
            },
            input:{
                width: '100%'
                ,height: 50 ,
                borderWidth: 1,
                borderColor : '#ddd',
                borderRadius: 8 ,
                paddingHorizontal:15,
                marginBottom:15,
                fontSize:16
            }
        })