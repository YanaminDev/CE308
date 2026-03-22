import {useEffect , useState} from 'react'
import {Alert , ScrollView , Text , TextInput , TouchableOpacity , View} from 'react-native'
import {useLocalSearchParams , useRouter} from 'expo-router'
import {getBookById , updateBook} from '../services/bookService'
import { useInteropClassName } from 'expo-router/build/link/useLinkHooks';

export default function EditBookScreen(){
    const router = useRouter();
    const{id} = useLocalSearchParams<{id:string}>()

    const[title,setTitle] = useState('')
    const[author,setAuthor] = useState('')
    const[description,setDescription] = useState('')
    const[price,setPrice] = useState('')

    useEffect(() => {
        const fetchBook = async() => {
            try{
                const book = await getBookById(id);
                setTitle(book.title)
                setAuthor(book.author)
                setDescription(book.description)
                setPrice(String(book.price))
            
            }catch{
                Alert.alert('Error' , 'Failed to fetch book')
                router.back();
            }
        }
        fetchBook()
    
    },[id])

    const handleUpdate = async() => {
        if(!title || !author || !price){
            Alert.alert('Validation' , 'Title , Author and Price are required')
            return
        }
        try{
            await updateBook(id,{
                title,
                author,
                description,
                price: parseFloat(price)
            })
            Alert.alert('Success' , 'Book updated')
            router.back()
        }catch{
            Alert.alert('Error' , 'Failed to update book')
        }
    }

    return(
        <ScrollView className='flex-1 bg-gray-100'>
            <View className='bg-yellow-400 px-4 py-4'>
                <Text className='text-white text-xl font-bold'>Edit Book</Text>
            </View>
            <View className='p-4 gap-4'>
                <View>
                    <Text className='text-gray-600 mb-1 font-medium'>Title *</Text>
                    <TextInput className='bg-white rounded-xl px-4 py-3 border border-gray-200' placeholder='Book Title' value={title} onChangeText={setTitle}></TextInput>

                </View>
            </View>
        </ScrollView>
    )

    



}