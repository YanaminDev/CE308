import { Text, View , TouchableOpacity } from "react-native";
import "./global.css"
import {useRouter} from 'expo-router'


export default function HomeScreen(){
  const router = useRouter()

  return(
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-3xl font-bold">Manage your book collection</Text>
      <Text className="text-blue-600 text-base">Manage your book collection</Text>
      <TouchableOpacity className="bg-white px-8 py-3 rounded-full mt-4" onPress={() => router.push('/books')}>
        <Text className="text-blue-600 font-bold text-lg">Go to books</Text>
      </TouchableOpacity>
    </View>
  )
}

