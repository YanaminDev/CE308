import {View, Text, Button, StyleSheet, TextInput, ScrollView, Pressable} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {RootState, AppDispatch} from '../redux/store'
import {addTodo, toggleTodo, removeTodo, clearCompleted} from '../redux/to-do-list'
import {useState} from 'react'

const TodoScreen = () => {
    const todos = useSelector((state: RootState) => state.todos)
    const dispatch = useDispatch<AppDispatch>()
    const [title, setTitle] = useState<string>('')

    const handleAddTodo = () => {
        if (title.trim()) {
            dispatch(addTodo({title: title.trim()}))
            setTitle('')
        }
    }

    const completedCount = todos.todos.filter(todo => todo.completed).length

    return (
        <ScrollView style={styles.container}>
            {/* ฟอร์มเพิ่มงาน */}
            <View style={styles.form}>
                <Text style={styles.label}>เพิ่มงานใหม่</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="กรอกชื่องาน..."
                    onSubmitEditing={handleAddTodo}
                />
                <Button
                    onPress={handleAddTodo}
                    title="เพิ่มงาน"
                    color="#65deff"
                />
            </View>

            

            {/* รายการงาน */}
            <View style={styles.todosContainer}>
                <Text style={styles.todosTitle}>รายการงาน ({todos.todos.length})</Text>
                {todos.todos.length === 0 ? (
                    <Text style={styles.emptyText}>ไม่มีงานในรายการ</Text>
                ) : (
                    todos.todos.map(todo => (
                        <View key={todo.id} style={styles.todoRow}>
                            <Pressable
                                onPress={() => dispatch(toggleTodo(todo.id))}
                                style={[
                                    styles.checkbox,
                                    todo.completed && styles.checkboxChecked
                                ]}
                            >
                                <Text style={styles.checkmark}>
                                    {todo.completed ? '✓' : ''}
                                </Text>
                            </Pressable>
                            <View style={styles.todoCard}>
                                <Text style={[
                                    styles.todoTitle,
                                    todo.completed && styles.todoCompleted
                                ]}>
                                    {todo.title}
                                </Text>
                            </View>
                            <Pressable
                                onPress={() => dispatch(removeTodo(todo.id))}
                                style={styles.deleteButton}
                            >
                                <Text style={styles.deleteButtonText}>ลบ</Text>
                            </Pressable>
                        </View>
                    ))
                )}
            </View>

            {/* ปุ่มลบงานที่เสร็จแล้ว */}
            {completedCount > 0 && (
                <Button
                    onPress={() => dispatch(clearCompleted())}
                    title="ลบงานที่เสร็จแล้ว"
                    color="#65deff"
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
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
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
    stats: {
        backgroundColor: '#e3f2fd',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    statsText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1976d2',
        textAlign: 'center',
    },
    todosContainer: {
        marginBottom: 20,
    },
    todosTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    todoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    checkbox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    checkboxChecked: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    checkmark: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    todoCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    todoTitle: {
        fontSize: 16,
        color: '#333',
    },
    todoCompleted: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 14,
        padding: 20,
    },
    deleteButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#FF5252',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
})

export default TodoScreen
