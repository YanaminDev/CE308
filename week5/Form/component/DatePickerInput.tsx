import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerInputProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
}

export default function DatePickerInput({
  label,
  value,
  onChange,
  error,
  touched,
  placeholder = 'เลือกวันเกิด'
}: DatePickerInputProps) {
  const [show, setShow] = useState(false);
  const hasError = touched && error;

  const formatDate = (date: Date | null) => {
    if (!date) return placeholder;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (selectedDate) {
      onChange(selectedDate);
      if (Platform.OS === 'ios') {
        setShow(false);
      }
    }
  };

  return (
    <View className="mb-4">
      <Text className="text-gray-700 text-sm font-medium mb-2">{label}</Text>
      <TouchableOpacity
        onPress={() => setShow(true)}
        className={`border-2 rounded-lg px-4 py-3 ${
          hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
        }`}
        activeOpacity={0.7}
      >
        <Text className={value ? 'text-gray-900' : 'text-gray-400'}>
          {formatDate(value)}
        </Text>
      </TouchableOpacity>

      {hasError && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}