import React from 'react'
import { View, Text, TouchableOpacity } from "react-native";
import ExpoCheckbox from 'expo-checkbox';


interface Checkboxprops {
    label: string,
    checked:boolean,
    onPress : () => void,
    error?:string,
    touched?:boolean,

}

export default function Checkbox({ label, checked, error, touched, onPress }: Checkboxprops) {
    const hasError = touched && error;
    
    return (
        <View className="mb-4 mt-6">
            <View className="flex-row items-center flex flex-row">
                <ExpoCheckbox
                    value={checked}
                    onValueChange={onPress}
                    color={checked ? '#3b82f6' : hasError ? '#ef4444' : undefined}
                />
                <TouchableOpacity onPress={onPress} activeOpacity={0.7} className="flex-1 ml-3">
                    <Text className="text-sm">{label}</Text>
                </TouchableOpacity>
            </View>
            {hasError && (
                <Text className="text-red-500 text-sm mt-1 ml-8">{error}</Text>
            )}
        </View>
    );
}