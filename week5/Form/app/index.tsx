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
} from "react-native";
import CustomInput from "@/component/CustomInput";
import CustomButton from "@/component/CustomButton";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "fullName": {
        if (!value.trim()) {
          return "กรุณากรอกชื่อ-นามสกุล";
        }
        if (value.trim().length < 3) {
          return "ชื่อ-นามสกุล ต้องมีอย่างน้อย 3 ตัว";
        }
        return undefined;
      }
      case "email":
        if (!value.trim()) {
          return "กรุณากรอกอีเมล";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "รูปเเบบอีเมลไม่ถูกต้อง";
        }
        return undefined;

      case "phone":
        if (!value.trim()) {
          return "กรุณากรอกเบอร์โทรศัพท์";
        }
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
          return "เบอร์โทรศัพท์ต้องป็นตัวเลข 10 หลัก";
        }
        return undefined;
      case "password":
        if (!value) {
          return "กรุณากรอกรหัสผ่าน";
        }
        if (value.length < 6) {
          return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        }
        return undefined;
      case "confirmPassword":
        if (!value) {
          return "กรุณากรอกยืนยันรหัสผ่าน";
        }
        if (value !== formData.password) {
          return "รหัสผ่านไม่ตรงกัน";
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
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);

    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
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
          </View>
          <View className="mt-4 space-y-3">
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
