# workshop
รหัส , คณะ , สาขา ทำการเพิ่มอีกบล็อกนึงเข้ามา คือ view  เเล้วใน view ใส่ text อีกบรรทัดเพื่อเป็นข้อมูล เช่น 66111633 , วิศวกรรมคอมพิวเตอร์
ตัวอย่างโค้ด

<View style={[styles.box,{backgroundColor : '#4e61cd'}]}>
    <Text style={styles.boxText}>สาขา</Text>
    <Text style={styles.boxText1}>วิศวคอมพิวเตอร์</Text>
</View>


ตอ่ไป สิ่งที่ชอบเเละสิ่งที่ไม่ชอบ ให้สร้าง ตัวเเปร object ให้เก็บ 2 ข้อมูล คือ id เเละ title ให้เก็บ 10 ข้อมูล
สร้างมาสองตัว LIKETHING , NOTLIKETHING 
เเละนำมาลูปเเสดงผล ในโค้ดตัวอย่าง โดยการเปลี่ยน data
ตัวอย่างโค้ด
<View style={styles.contentSection}>
    <FlatList
    data={LIKETHING}
    renderItem={renderItem}
    keyExtractor={item => item.id}
    ListHeaderComponent={<Text style={styles.headerFlatList}>สิ่งที่ชอบ</Text>}
    />
</View>
