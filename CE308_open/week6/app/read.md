# ไฟล์ _layout.tsx ของ root
เราจะตั้ง stack ให้ folder (tabs) ทำการซ่อน header และ โฟล์เดอร์ product/[id]   
ให้ทำการเเสดง stack header  เเละกำหนด backgroundColor เเละกำหนดให้ backgroundColor มีสีส้ม

# ไฟล์ (tab)/_layout.tsx

ในโฟล์เดอร์ tab ให้มีการสร้างไฟล์ _layout.tsx เพื่อกำหนดรูปเเบบ layout ของภายในโฟล์เดอร์ tab ซึ่งเราจะกำหนด tab ให้มีสองหัวข้อ ด้วยคำสั่ง Tabs.Screen ซึ่งจะมีหัวข้อ market เเละ profile
ซึ่งเราจะให้มี header เป็นของตัวเองโดยไม่ใช้ stack โดย element tab เราจะทำการกำหนด header เช่น  headerStyle , headerTintColor , headerTitleStyle

# ไฟล์ (tab)/index.tsx
เราจะกำหนดให้หน้านี้เเสดง market เป็น card เกี่ยวกับสินค้า ในตัวเเปร product ที่เป็น arrey ที่ข้างในเป็น object เราทำการเพิ่มข้อมูล เป็นสามชุด คือ id , price , description ในตอนที่เราลูปสร้าง card เราจะทำการส่งไปที่ path :  ../product/[id] ด้วยคำสั่ง router.push เเละส่ง  id , price , description
เราทำการปรับขนาด card ให้มีขนาดใหญ่มากขึ้น เเละมีการเพิ่ม icon ด้วย element = Ionicons โดยกำหนด name ให้เป็น chevron-forward เเละกำหนดให้ card เป็น flex


# ไฟล์ (tab)/profile.tsx
เราจะทำให้มีการเเสดงเเค่ชื่อ เเละ อีเมลผู้ใช้ ในบล็อกของโปรไฟล์เราใช้คำสั่ง alignItems: 'center' เพื่อจัดให้บล็อก profile อยู่กึ่งกลางหน้าจอ เเละ avatarContainer ให้ทำการเพิ่ม avatarContainer เปลี่ยน background color เป็นสีเทา

# ไฟล์  product/[id].tsx
ทำการเก็บค่าที่ส่งมาลงตัวเเปร id, name, price , description ด้วยคำสั่ง useLocalSearchParams(); เเละทำการเพิ่ม block view เพื่อจะกำหนดว่าตรงนี้คือส่วนการใส่รูปภาพ เเต่เราจะใส่ข้อความไปก่อน เเละกำหนด style ให้ใช้ imagecontainer สำหรับ block card โดยตกเเต่งให้เป็นสีเทา เเละจัดข้อความใน view ให้อยู่ตรงกลาง โดยใช้ flex เเละใช้justifyContent,alignItems ในการจัด
เราจะเพิ่มให้มีการเเสดงผล ของ description โดยกำหนดให้ใช้ style ของ labelsmall ซึ่งจะมีการเเต่งให้ฟอนด์มีขนาดเล็กเเละใช้สีเทาอ่อน
