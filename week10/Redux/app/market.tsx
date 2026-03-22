import {View , Text , Button , StyleSheet , TextInput , ScrollView , Pressable}  from 'react-native'
import {useSelector , useDispatch} from 'react-redux'
import {RootState, AppDispatch} from '../redux/store'
import {addItem , removeItem ,  clearCart} from '../redux/market'
import {useState} from 'react'

const MarketScreen = () => {
    const market = useSelector((state : RootState) => state.market);
    const dispatch = useDispatch<AppDispatch>();
    const [name , setName] = useState<string>('')
    const [price , setPrice] = useState<number>(0)
    const [quantity , setQuantity] = useState<number>(0)

    const handleAddItem = () => {
        if (name.trim() && price > 0 && quantity > 0) {
            dispatch(addItem({
                id: Date.now().toString(),
                name,
                quantity,
                price
            }))
            // รีเซตฟอร์ม
            setName('')
            setPrice(0)
            setQuantity(0)
        }
    }

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>ตะกร้าสินค้า</Text>

            {/* ฟอร์มเพิ่มสินค้า */}
            
                <Text style={styles.label}>ชื่อสินค้า</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="กรอกชื่อสินค้า"
                />

                <Text style={styles.label}>ราคา</Text>
                <TextInput
                    style={styles.input}
                    value={String(price)}
                    keyboardType="numeric"
                    onChangeText={prev => setPrice(Number(prev))}
                    placeholder="0"
                />

                <Text style={styles.label}>จำนวน</Text>
                <TextInput
                    style={styles.input}
                    value={String(quantity)}
                    keyboardType="numeric"
                    onChangeText={prev => setQuantity(Number(prev))}
                    placeholder="0"
                />

                <Button
                    onPress={handleAddItem}
                    title="เพิ่มลงตระกร้า"
                    color="#52b3cb"
                />
            

            {/* รายการสินค้า */}
            
                <Text style={styles.itemsTitle}>รายการสินค้า ({market.items.length})</Text>
                {market.items.length === 0 ? (
                    <Text style={styles.emptyText}>ไม่มีสินค้าในตะกร้า</Text>
                ) : (
                    market.items.map(item => (
                        <View key={item.id} style={styles.itemRow}>
                            <View >
                                <Text style={styles.itemName}>{item.name} ราคา: ฿{item.price} × {item.quantity} = ฿{(item.price * item.quantity).toFixed(2)}</Text>
                            </View>
                            <Pressable
                                onPress={() => dispatch(removeItem(item.id))}
                                style={styles.removeButton}
                            >
                                <Text style={styles.removeButtonText}>ลบ</Text>
                            </Pressable>
                        </View>
                    ))
                )}
            

            {/* สรุปราคา */}
            
                <Text style={styles.totalLabel}>ยอดรวมทั้งหมด {market.totalAmount.toFixed(2)}</Text>
                
            

            {/* ปุ่มล้างตะกร้า */}
            {market.items.length > 0 && (
                <Button
                    onPress={() => dispatch(clearCart())}
                    title="ล้างตะกร้า"
                    color="#2196F3"
                />
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 14,
    },
    itemsContainer: {
        marginBottom: 20,
    },
    itemsTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    itemCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '300',
        color: '#333',
    },
    itemDetails: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 14,
        padding: 20,
    },
    summary: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    totalLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    totalAmount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    removeButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#FF5252',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    }
})

export default MarketScreen
