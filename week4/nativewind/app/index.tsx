import "./global.css"
import { Text, View , FlatList} from "react-native";
import { CenteredView } from "@/components/CenteredView";
import {ItemList} from "@/components/ItemList";
import {CustomButton} from '@/components/CustomButton'
import { ItemCard, ItemCardProps } from "@/components/ItemCard";
import { CustomInput } from "@/components/CustomInput";
import { ScrollView } from "react-native";
import {useState} from 'react'
const items: ItemCardProps[] = [
  {
    id: "1",
    productName: "Banana",
    price: 2000,
    pcs: 10,
    btnSize: "small",
    btnColor: "primary",
  },
  {
    id: "2",
    productName: "Mango",
    price: 2000,
    pcs: 10,
    btnSize: "medium",
    btnColor: "secondary",
  },
  {
    id: "3",
    productName: "Apple",
    price: 2000,
    pcs: 10,
    btnSize: "large",
    btnColor: "danger",
  },
];




export default function App() {
  const [productname , setproductname] = useState("")
  const [productprice , setpice] = useState("")
  const [productpcs , setpcs] = useState("")
  return (
    

    <ScrollView>
      <FlatList
    data={items}
    keyExtractor = {(item) => item.id}
    renderItem = {({item}) => (
      <ItemCard
      id={item.id}
      productName={item.productName}
      price={item.price}
      pcs={item.pcs}      
      btnSize={item.btnSize}
      btnColor={item.btnColor}
      />
    )}
    />

    <Text className="font-bold text-2xl mt-[50px]"> กรอกข้อมูลสอนค้า</Text>
    <CustomInput label="ชื่อสินค้า" placeholder="กรอกชื่อสินค้า" value={productname} onChangeText={setproductname}></CustomInput>
    <CustomInput label="ราคา" placeholder="กรอกราคา" value={productprice} onChangeText={setpice}></CustomInput>
    <CustomInput label="จำนวน" placeholder="กรอกจำนวน" value={productpcs} onChangeText={setpcs}></CustomInput>  
    <View className='w-[20%] ml-2 mb-2'>
      <CustomButton title="ยืนยัน"  variant="primary" size="md" onPress={() => {}} ></CustomButton>
    </View> 
    </ScrollView>
    
  );
}