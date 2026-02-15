import "./global.css";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import CustomInput from "@/component/CustomInput";
import CustomButton from "@/component/CustomButton";
import Checkbox from "@/component/Checkbox";
import RadioButton from "@/component/Radiobutton";
import DatePickerInput from "@/component/DatePickerInput"


interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address : string;
  checked : boolean;
  gender: string;
  birthDate: Date | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address? : string
  checked?:string
  gender?:string
  birthDate?: string
}



export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address : "",
    checked : false,
    gender: "",
    birthDate: null
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: string, value: string | boolean | Date| null ): string | undefined => {
    switch (name) {
      case "fullName" :
        if ((typeof value === 'string' && !value.trim())) {
          return "กรุณากรอกชื่อ-นามสกุล";
        }
        if (typeof value === 'string' && value.trim().length < 3) {
          return "ชื่อ-นามสกุล ต้องมีอย่างน้อย 3 ตัว";
        }
        return undefined;
      
      case "email":
        if (typeof value === 'string' && !value.trim()) {
          return "กรุณากรอกอีเมล";
        }

        if (typeof value === 'string') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "รูปแบบอีเมลไม่ถูกต้อง";
        }
      }
        return undefined;

      case "phone":
        if (typeof value === 'string' && !value.trim()) {
          return "กรุณากรอกเบอร์โทรศัพท์";
        }
        if (typeof value === 'string') {
          const phoneRegex = /^[0-9]{10}$/;
          if (!phoneRegex.test(value)) {
            return "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก";
          }}
        return undefined;
      case "password":
        if (typeof value === 'string' && !value) {
          return "กรุณากรอกรหัสผ่าน";
        }
        if (typeof value === 'string' && value.length < 6) {
          return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        }
        return undefined;
      case "confirmPassword":
        if (typeof value === 'string' && !value) {
          return "กรุณากรอกยืนยันรหัสผ่าน";
        }
        if (typeof value === 'string' && value !== formData.password) {
          return "รหัสผ่านไม่ตรงกัน";
        }
        return undefined;
      case "address":
        if (typeof value === 'string' && !value) {
          return "กรุณากรอกที่อยู่";
        }
        if (typeof value === 'string' && value.length < 10) {
          return "กรุณากรอกข้อมูลที่อยู่เพิ่มเติม";
        }
        return undefined;
      case "checked":
        if (typeof value === 'boolean' && !value){
          return "กรุณากดยินยอมข้อตกลง"
        }
        return undefined

        case "birthDate":
          if (!value) {
            return "กรุณาเลือกวันเกิด";
          }
          if (value instanceof Date) {
            const today = new Date();
            const age = today.getFullYear() - value.getFullYear();
            const monthDiff = today.getMonth() - value.getMonth();
            const dayDiff = today.getDate() - value.getDate();
            
            const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) 
              ? age - 1 
              : age;
            
            if (actualAge < 13) {
              return "อายุต้องมากกว่า 13 ปี";
            }
          }
          return undefined;
    
        case "gender":
          if (!value) {
            return "กรุณาเลือกเพศ";
          }
          return undefined;
        

    

      default:
        return undefined;
    }
  };
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };
  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  


  const validationForm = () => {
  const newErrors: Partial<Record<keyof FormData, string>> = {};
  let isValid = true;

  (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
    const error = validateField(key, formData[key]);
    if (error) {
      newErrors[key] = error;
      isValid = false;
    }
  });
  
  setErrors(newErrors);

  const allTouched: Partial<Record<keyof FormData, boolean>> = {};
  Object.keys(formData).forEach((key) => {
    allTouched[key as keyof FormData] = true;
  });
  setTouched(allTouched);
  
  return isValid;
};

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!validationForm()) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณาตรวจสอบข้อมูลเเละลองใหม่อีกครั้ง");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "สำเร็จ",
        `ลงทะเบียนสำเร็จ\n\nชื่อ: ${formData.fullName}\n\nอีเมล: ${formData.email}\nเบอร์โทรศัพท์: ${formData.phone}`,
        [
          {
            text: "ตรวจสอบ",
            onPress: () => console.log("FORM DATA:", formData),
          },
          {
            text: "รีเซ็ตฟอร์ม",
            onPress: handleReset,
            style: "cancel",
          },
        ],
      );
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      checked : false,
      gender: "",
      birthDate : null

    });
    setErrors({});
    setTouched({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerClassName="pb-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="bg-blue-600 pt-16 pb-8 px-6">
            <Text className="text-white text-3xl font-bold">
              ลงทะเบียนสมาชิก
            </Text>
            <Text className="text-blue-100 text-base mt-2">
              กรุณากรอกข้อมูลให้ครบถ้วน
            </Text>
          </View>
          <View className="px-6 mt-6">
            <CustomInput
              label="ชื่อ - นามสกุล"
              placeholder="ระบุชื่อเเละนามสกุล"
              value={formData.fullName}
              onChangeText={(value) => handleChange("fullName", value)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
              autoCapitalize="words"
            ></CustomInput>
            <CustomInput
              label="อีเมล"
              placeholder="example@email.com"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              autoCapitalize="none"
              autoCorrect={false}
            ></CustomInput>
            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="0812345678"
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              keyboardType="phone-pad"
              maxLength={10}
            ></CustomInput>
            <CustomInput
              label="รหัสผ่าน"
              placeholder="อย่างน้อย 6 ตัวอักษร"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              autoCapitalize="none"
            ></CustomInput>
            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
            ></CustomInput>
            <CustomInput
            label="ที่อยู่"
            placeholder="กรุณากรอกที่อยู่"
            value={formData.address}
            onChangeText={(value) => handleChange("address", value)}
            onBlur={() => handleBlur("address")}
            error={errors.address}
            touched={touched.address}
            secureTextEntry
            multiline
            autoCapitalize="none"
            count={formData.address.length}
            
            >
            </CustomInput>

            <DatePickerInput
              label="วันเกิด"
              value={formData.birthDate}
              onChange={(date) => {
                setFormData({ ...formData, birthDate: date });
                const error = validateField("birthDate", date);
                setErrors({ ...errors, birthDate: error });
              }}
              error={errors.birthDate}
              touched={touched.birthDate}
              placeholder="เลือกวันเกิด"
            />

            <RadioButton
            label="เพศ"
            options={[
              { label: "ชาย", value: "male" },
              { label: "หญิง", value: "female" },
              { label: "ไม่ระบุ", value: "other" }
            ]}
            selectedValue={formData.gender}
            onSelect={(value) => handleChange("gender", value)}
            error={errors.gender}
            touched={touched.gender}
/>

            <Checkbox 
            label="ฉันยอมรับข้อกำหนดและเงื่อนไข" 
            checked={formData.checked} 
            error={errors.checked}
            touched={touched.checked}
            onPress={() => {
              const newValue = !formData.checked;
              setFormData({ ...formData, checked: newValue });
              const error = validateField("checked", newValue);
              setErrors({ ...errors, checked: error });}}/>

          </View>
          <View className="mt-4 flex-col  space-y-3 px-6">
            <CustomButton
              title="ลงทะเบียน"
              onPress={handleSubmit}
              variant="primary"
              loading={isLoading}
            ></CustomButton>
            
            <CustomButton
              title="รีเซ็ตฟอร์ม"
              onPress={handleReset}
              variant="secondary"
              loading={isLoading}
            ></CustomButton>
          </View>
          
          <View className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <Text className="text-blue-800 font-semibold text-base mb-2">
              {" "}
              คำเเนะนำ
            </Text>
            <Text className="text-blue-700 text-sm leading-5">
              - กรอกข้อมูลให้ครบถ้วน {"\n"}- อีเมลต้องมีรูปเเบบที่ถูกต้อง{"\n"}-
              เบอร์โทรต้องเป็นนตัวเลข 10 หลัก {"\n"} - รหัสผ่านต้องมีอย่างน้อย 6
              ตัวอักษร
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
