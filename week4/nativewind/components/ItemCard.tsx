import {View , Text , FlatList} from 'react-native';
import { CustomButton } from './CustomButton';

export type ItemCardProps = {
  id: string ,
  productName: string ,
  price: number ,
  pcs: number ,
  btnSize? : 'small' | 'medium' | 'large' ,
  btnColor? : 'primary' | 'secondary' | 'danger'
};




export const ItemCard = ({id ,productName , price , pcs , btnSize = 'small', btnColor='primary' } : ItemCardProps) => {
    let buttonsize: 'sm' | 'md' | 'lg' = 'sm'
    switch(btnSize){
        case 'small' : buttonsize = 'sm'; break;
        case 'medium' : buttonsize = 'md'; break;
        case 'large' : buttonsize = 'lg'; break;
        default : break;
    }

    

    return(
        <View className='flex-col w-[90%] max-h-[400px] bg-gray-300 m-4 p-4 rounded-lg justify-between gap-[5px] rounded-md'>
            <Text className='text-[2.25rem] font-bold'>ซื้อสินค้า : {productName}</Text>
            <Text className='text-[1rem]' >{price}</Text>
            <Text className='text-[1rem]' >{pcs}</Text>
            <View className='w-[25%] h-[40px]'>
               <CustomButton title="สั่งซื้อ"  variant={btnColor} size={buttonsize} onPress={() => {}} ></CustomButton>
            </View>   
        </View>
    )
    
}