import { View, Text, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function ProductScreen() {
  const { id, name, price , description} = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
          <Text style={styles.abelimg}>Product Image</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.label}>${price}</Text>
        <View style={styles.divider} />
        <Text style={styles.labelsmall}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  
  },
  imagecontainer: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    backgroundColor: '#BABABA'
    ,display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  label: {
    fontSize: 24,
    marginBottom: 5,
    color:'#FF4C17'
  },
  abelimg: {
    fontSize: 18,
    color: '#7D7D7D',
    fontWeight: 'bold',
    
  },
  containerText: {
    display:'flex',
    padding:10, 
    width:'100%'
    
  },
  labelsmall:{
    fontSize: 16,
    color: "#969292"
  },
  divider: {
  height: 1,
  backgroundColor: '#D1D1D1',
  marginVertical: 12,
  alignSelf: 'stretch',
},



});