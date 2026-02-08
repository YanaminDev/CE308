import { View, Text, TextInput } from "react-native";
import { CustomButton } from './CustomButton';
import { useState } from "react";

type CustomInputProps = {
    label : string,
    value : string,
    placeholder : string,
    onChangeText: (text : string) => void,

}


export const CustomInput = ({label , value , placeholder , onChangeText } : CustomInputProps) => {
    
    return(
        <View className='flex-col gap-[10px] w-full mb-2 mt-2 ml-2 mr-2'>
            <Text className="font-semibold text-lg">{label}</Text>
            <TextInput className="bg-gray-300 w-[90%] rounded-md" placeholder={placeholder} value={value} onChangeText={onChangeText}></TextInput>
        </View>
    )}