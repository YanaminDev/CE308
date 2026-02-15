import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioButtonProps {
  options: RadioOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  error?: string;
  touched?: boolean;
  label?: string;
}

export default function RadioButton({ 
  options, 
  selectedValue, 
  onSelect, 
  error, 
  touched,
  label 
}: RadioButtonProps) {
  const hasError = touched && error;

  return (
    <View className="mb-6">
      {label && (
        <Text className="text-gray-700 text-sm font-semibold mb-3">{label}</Text>
      )}
      <View className="space-y-3 ]">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => onSelect(option.value)}
              className="flex-row items-center"
              activeOpacity={0.7}
            >
              <View className={`w-6 h-6  rounded-full border-2 items-center justify-center mr-3 ${
                hasError 
                  ? 'border-red-500' 
                  : isSelected 
                    ? 'border-blue-500' 
                    : 'border-gray-400'
              }`}>
                {isSelected && (
                  <View className="w-3 h-3 rounded-full bg-blue-500" />
                )}
              </View>
              <Text className={`text-sm ${
                isSelected ? 'text-blue-700 font-medium' : 'text-gray-700'
              }`}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {hasError && (
        <Text className="text-red-500 text-sm mt-2">{error}</Text>
      )}
    </View>
  );
}