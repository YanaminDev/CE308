# workshop 1

ทำการเขียน component ชื่อ ItemCard  โดยมีการรับ props คือ productName , price , pcs , btnSize , btnColor  จากนั้นทำการสร้าง export ItemCard โดยด้านในจะมีการตกเเต่งด้วย nativewind เเละมีการ switch case ของ btnSize 
เพื่อให้สามารถรับค่า  small , medium , large  เเละเเปลงเป็น sm , md , lg เพื่อให้ตรงเงื่อนไขของ CustomButton
ภายใน index.tsx สร้าง object item ที่มี type ItemCardProps เพื่อใช้สร้าง ItemCard เเล้วนำมา  FlatList เพื่อลูปในการสร้าง itemcard


# workshop 2
ทำการสร้าง CustomInputProp เพื่อรับค่า label , value , placeholder ,  เเละฟังชั่น  onChangeText
เเละทำ return component ทำการตกเเต่ง ด้วย  nativewind 
ในหน้าของ index.tsx  ทำการสร้าง useState โดยมีการสร้างมา 3 ตัวคือ name , price , pcs เพื่อใช้ในการส่งค่า value เเละ ฟังก์ชั่น update ค่า สำหรับ component CustomInput
