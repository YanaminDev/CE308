import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native'

const DATA = [
  {id: '1' , title : 'การใช้งาน view'},
  {id: '2' , title : 'การใช้งาน Text'},
  {id: '3' , title : 'การใช้งาน ScrollView'},
  {id: '4' , title : 'การใช้งาน FlatList'},


]

const LIKETHING = [
  {id: '1' , title : 'การเขียนโปรเเกรม'},
  {id: '2' , title : 'การนอน'},
  {id: '3' , title : 'การเล่นเกม'},
  {id: '4' , title : 'การถ่ายรูป'},
  {id: '5' , title : 'การดูหนังเเละซีรีย์หรือยูทูป'},
  {id: '6' , title : 'การถ่ายรูป'},
  {id: '7' , title : 'การไปเที่ยว'},
  {id: '8' , title : 'พิซซ่าเเละไก่ทอด'},
  {id: '9' , title : 'ฝนตก'},
  {id: '10' , title : 'เรียนรู้เเอปหรือเครื่องมือใหม่ๆ'},
]

const NOTLIKETHING = [
  {id: '1' , title : 'บุหรี่หรือสารเสพติด'},
  {id: '2' , title : 'ไม่ชอบให้มาเล่นกับใจ ฮือๆๆๆๆ'},
  {id: '3' , title : 'กาเเฟขม'},
  {id: '4' , title : 'เเฟน เพราะตอนนี้ชอบวีน'},
  {id: '5' , title : 'การโดนบังคับ'},
  {id: '6' , title : 'เสียงดังเกินไป'},
  {id: '7' , title : 'การโกหก'},
  {id: '8' , title : 'อากาศหนาวหรือร้อนเกินไป'},
  {id: '9' , title : 'การนอนดึก'},
  {id: '10' , title : 'ข้างบ้านเพราะเด็กเสียงดัง'},
]

const App = () => {
  const renderItem = ({item}:{item:{id : string; title:string}}) =>(
    <View style={styles.itemContainer}>
      <View style={styles.dot}/>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );


  
  



  return(
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.box,{backgroundColor : '#9bcf64'}]}>
          <Text style={styles.boxText}>รหัส</Text>
          <Text style={styles.boxText1}>66111633</Text>
        </View>
        <View style={[styles.box,{backgroundColor : '#5ccfc7'}]}>
          <Text style={styles.boxText}>คณะ</Text>
          <Text style={styles.boxText1}>วิทยาลัยวิศวกรรมศาสตร์เเละเทคโนโลยี</Text>
        </View>
        <View style={[styles.box,{backgroundColor : '#4e61cd'}]}>
          <Text style={styles.boxText}>สาขา</Text>
          <Text style={styles.boxText1}>วิศวคอมพิวเตอร์</Text>
        </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>ข้อมูลส่วนตัว</Text>
          <View style={styles.listItem}>
            <Text> ชื่อ : ธีรภัทร ประชัน</Text>
          </View>
          <View style={styles.listItem}>
            <Text> ชื่อเล่น  : บอส</Text>
          </View>
          <View style={styles.listItem}>
            <Text> อีเมล : 66111633@dpu.ac.th</Text>
          </View>
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>การศึกษา</Text>
          <View style={styles.listItem}>
            <Text> ระดับอุดมศึกษา : มหาวิทยาลัยธุรกิจณ์บัณฑิตย์</Text>
          </View>
          <View style={styles.listItem}>
            <Text> สาขา  : วิศวคอมพิวเตอร์</Text>
          </View>     
      </View>


      <View style={styles.contentSection}>
        <Text style={styles.title}>ที่อยู่</Text>
          <View style={styles.listItem}>
            <Text> 75 อัญชลี ซอย 10 ตำบลท่าทราบ อำเภอ เมืองนนทบุรี จังหวัด นนทบุรี 11000</Text>
          </View>
               
      </View>

      <View style={styles.contentSection}>
        <FlatList
        data={LIKETHING}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text style={styles.headerFlatList}>สิ่งที่ชอบ</Text>}
        />
      </View>

      <View style={styles.contentSection}>
        <FlatList
        data={NOTLIKETHING}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={<Text style={styles.headerFlatList}>สิ่งที่ไม่ชอบ</Text>}
        />
      </View>

      



    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContent:{
    padding:20,
  },
  header:{
    height:100,
    backgroundColor:'#2d965b',
    justifyContent:'center',
    alignItems : 'center',
    borderRadius:10,
    marginBottom: 20
  },
  headerText:{
    color: 'white',
    fontSize : 24,
    fontWeight : 'bold'
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:20,
  },
  box:{
    flex:1,
    height:100,
    marginHorizontal:5,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8
  },
  boxText:{
    color:'white',
    fontWeight:'600'
  },
  boxText1:{
    textAlign:'center',
    fontSize:8,
    color:'white',
    fontWeight:'600'
  },
  contentSection:{
    marginTop:10,
  },
  title : {
    fontSize: 18,
    fontWeight : 'bold',
    marginBottom:10,
  },
  listItem:{
    backgroundColor:'white',
    padding:15,
    borderRadius:5,
    marginBottom:10,
    borderLeftWidth:5,
    borderLeftColor:'#2d965b'
  },
  contentSectionFlatList:{
    marginTop:20,
  },
  headerFlatList:{
    fontSize:24,
    fontWeight:'bold',
    padding:20,
    color:'white',
    backgroundColor:'rgb(119, 177, 83)'
  },
  itemContainer:{
    flexDirection:'row',
    alignItems:'center',
    padding:15,
    borderBottomWidth:1,
    borderBottomColor: '#ddd'
  },
  dot:{
    width:8,
    height:8,
    borderRadius:4,
    backgroundColor:'blue',
    marginRight:10,
  },
  itemText:{
    fontSize:18
  }

});

export default App;