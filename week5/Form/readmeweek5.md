# Week 5 - Form Validation Assignment


### 4.1 เพิ่ม Field "ที่อยู่"
- เพิ่ม `multiline` TextInput ใน `CustomInput` component
- กำหนดความสูงขั้นต่ำ 100px ด้วย `numberOfLines={4}`
- เพิ่ม validation ตรวจสอบอย่างน้อย 10 ตัวอักษร
- แสดงจำนวนตัวอักษร (count/200) ที่มุมขวา

### 4.2 เพิ่ม Checkbox "ยอมรับข้อตกลง"
- สร้าง `Checkbox` component ใหม่
- ใช้ `expo-checkbox` สำหรับ UI
- เพิ่ม field `checked: boolean` ใน FormData
- เพิ่ม validation ตรวจสอบว่าต้องกดยอมรับก่อน submit
- แสดง error message ถ้ายังไม่ได้เช็ค

### 4.3 เพิ่ม Gender Selector
- สร้าง `RadioButton` component ใหม่
- มีตัวเลือก: ชาย, หญิง, ไม่ระบุ
- แสดงเป็น vertical radio buttons
- เพิ่ม field `gender: string` ใน FormData
- เพิ่ม validation ตรวจสอบว่าต้องเลือกเพศ

### 4.4 Date of Birth Picker
- ติดตั้ง `@react-native-community/datetimepicker`
- สร้าง `DatePickerInput` component ใหม่
- แสดงเป็น TouchableOpacity ที่กดแล้วเปิด Date Picker
- Format วันที่: DD/MM/YYYY
- เพิ่ม field `birthDate: Date | null` ใน FormData
- เพิ่ม validation ตรวจสอบอายุต้องมากกว่า 13 ปี

## การติดตั้ง Dependencies
```bash
npx expo install expo-checkbox
npx expo install @react-native-community/datetimepicker