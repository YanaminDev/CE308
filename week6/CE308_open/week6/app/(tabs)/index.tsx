import { Text, Button, StyleSheet, Pressable, ScrollView , View} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const products = [
  { id: '1', name: 'Premium Coffee Bean', price: '450' ,  description: 'เมล็ดกาเเฟจากเชียงใหม่ในหน้าหนาว' },
  { id: '2', name: 'Green Tea Powder', price: '290' , description: 'ชาเขียวจากภูเขาฟูจิประเทศญี่ปุ่น'},
  { id: '3', name: 'Oat Milk 1L', price: '115' , description: 'ขมข้าวโอ้ตจากวัวสายรุ้ง'},
];

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {products.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => {
            router.push({
              pathname: '../product/[id]',
              params: { 
                id: item.id, 
                name: item.name, 
                price: item.price ,
                description: item.description
              }
            });
          }}
          style={styles.productCard}
        >
            <View>
                <Text style={styles.productname}>{item.name}</Text>
                <Text style={styles.price}>฿{item.price}</Text>
            </View>
            <View>
                <Ionicons name="chevron-forward" size={20} color="#BABABA" />
            </View>
          
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    gap: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
  },
  productCard: {
    display : 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 0,
    width: '100%',
    borderRadius: 12,
    elevation: 3,                 
    shadowColor: '#000',          
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1,          
    shadowRadius: 4,             
  },
  price: {
    color: '#FF4C17',
    marginTop: 5,
  },
  productname:{
    fontSize: 20,
    fontWeight: 'bold',
  }
});
