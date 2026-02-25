import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>  
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
      <Stack.Screen name="product/[id]"  options={{title: 'Product Details',headerShown: true, 
      headerStyle:{
        backgroundColor: '#FF4C17'
        
      },
      headerTitleStyle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        
      },headerTintColor: '#FFFFFF',

      }} />
    </Stack>
  );
}

