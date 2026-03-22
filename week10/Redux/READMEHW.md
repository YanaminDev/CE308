# Redux Workshop - Shopping Cart & To-Do List

โปรเจ็กต์นี้เป็นการฝึกใช้ Redux Toolkit ผ่าน Expo React Native โดยสร้างสองฟีเจอร์หลัก: **ตะกร้าสินค้า** และ **รายการงาน**

---

## 🚀 เริ่มต้นใช้งาน

```bash
npm start          # Expo Dev Server
npm run web        # รันบน Web Browser (แนะนำ)
npm run ios        # รันบน iOS Simulator
npm run android    # รันบน Android Emulator
```

---

## 📚 Workshop 1: ตะกร้าสินค้า (Shopping Cart)

### 🎯 วัตถุประสงค์
สร้างระบบตะกร้าสินค้าที่สามารถเพิ่ม/ลบสินค้า และคำนวณยอดรวมอัตโนมัติ

### 📁 ไฟล์ที่เกี่ยวข้อง

#### 1. **Redux Slice** - `redux/market.ts`
```typescript
interface CartItem {
    id: string,           // รหัส unique
    name: string,         // ชื่อสินค้า
    quantity: number,     // จำนวน
    price: number         // ราคาต่อหน่วย
}

interface CartState {
    items: CartItem[],    // รายการสินค้า
    totalAmount: number   // ยอดรวมทั้งหมด
}
```

**Reducers:**
- `addItem`: เพิ่มสินค้า + คำนวณ totalAmount
- `removeItem`: ลบสินค้า + อัปเดต totalAmount
- `clearCart`: ล้างตะกร้า

**🔑 Key Points:**
```typescript
// เมื่อเพิ่มสินค้า ให้คำนวณราคา
state.totalAmount += action.payload.price * action.payload.quantity

// เมื่อลบ ให้หักราคาออก
state.totalAmount -= item.price * item.quantity
```

#### 2. **UI Component** - `app/market.tsx`
```
┌─────────────────────────────┐
│    ตะกร้าสินค้า 🛒         │
├─────────────────────────────┤
│  ฟอร์มกรอกข้อมูล           │
│  - ชื่อสินค้า              │
│  - ราคา                    │
│  - จำนวน                   │
│  [➕ เพิ่มลงตระกร้า]       │
├─────────────────────────────┤
│  รายการสินค้า (2)          │
│  ┌──────────────────────┐   │
│  │ ชื่อ ฿50 × 2 = ฿100 │ [ลบ] │
│  └──────────────────────┘   │
│  ┌──────────────────────┐   │
│  │ ชื่อ ฿30 × 3 = ฿90  │ [ลบ] │
│  └──────────────────────┘   │
├─────────────────────────────┤
│  ยอดรวมทั้งหมด: ฿190      │
├─────────────────────────────┤
│  [🔄 ล้างตะกร้า]           │
└─────────────────────────────┘
```

**Features:**
- ✅ Validation: ตรวจสอบข้อมูลก่อนเพิ่ม
- ✅ Real-time Total: อัปเดตยอดรวมทันที
- ✅ Delete Individual: ลบแต่ละรายการ
- ✅ Clear All: ล้างตะกร้าทั้งหมด

#### 3. **Redux Store** - `redux/store.ts`
```typescript
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        market: marketReducer,   // ← ตะกร้าสินค้า
        todos: todoReducer
    }
})
```

### 💡 วิธีการทำงาน

**Step 1: User Input**
```typescript
const [name, setName] = useState<string>('')
const [price, setPrice] = useState<number>(0)
const [quantity, setQuantity] = useState<number>(0)
```

**Step 2: Dispatch Action**
```typescript
dispatch(addItem({
    id: Date.now().toString(),  // สร้าง unique ID
    name,
    quantity,
    price
}))
```

**Step 3: Redux Update State**
```typescript
addItem: (state, action) => {
    state.items.push(action.payload)
    state.totalAmount += action.payload.price * action.payload.quantity
}
```

**Step 4: Component Re-render**
```typescript
const market = useSelector((state: RootState) => state.market)
// หากมี state เปลี่ยน component จะ re-render โดยอัตโนมัติ
```

---

## 📝 Workshop 2: รายการงาน (To-Do List)

### 🎯 วัตถุประสงค์
สร้างแอปพลิเคชันจดบันทึกงานที่สามารถเปลี่ยนสถานะ (ขีดชื่องานเมื่อเสร็จ) และลบงาน

### 📁 ไฟล์ที่เกี่ยวข้อง

#### 1. **Redux Slice** - `redux/to-do-list.ts`
```typescript
interface TodoItem {
    id: string,             // รหัส unique
    title: string,          // ชื่องาน
    completed: boolean      // สถานะเสร็จ/ยังไม่เสร็จ
}

interface TodoState {
    todos: TodoItem[]
}
```

**Reducers:**
- `addTodo`: เพิ่มงานใหม่
- `toggleTodo`: เปลี่ยนสถานะเสร็จ/ยังไม่เสร็จ
- `removeTodo`: ลบงาน
- `clearCompleted`: ลบงานที่เสร็จแล้วทั้งหมด

**🔑 Key Points:**
```typescript
// Toggle สถานะ
toggleTodo: (state, action) => {
    const todo = state.todos.find(item => item.id === action.payload)
    if (todo) {
        todo.completed = !todo.completed  // เปลี่ยนระหว่าง true/false
    }
}

// Completed = true → ขีดชื่องาน
// Completed = false → ตัวหนังสือปกติ
```

#### 2. **UI Component** - `app/todo.tsx`
```
┌──────────────────────────────┐
│   📝 To-Do List              │
├──────────────────────────────┤
│  เพิ่มงานใหม่               │
│  [กรอกชื่องาน...] [➕ เพิ่ม] │
├──────────────────────────────┤
│  ทั้งหมด: 3 | เสร็จแล้ว: 1   │
├──────────────────────────────┤
│  รายการงาน (3)              │
│  ☐ ซื้อกาแฟ              [ลบ]  │
│  ☑ ทำการบ้าน           [ลบ]  │  ← ขีดชื่อ + สีเทา
│  ☐ อ่านหนังสือ        [ลบ]  │
├──────────────────────────────┤
│  [🗑️ ลบงานที่เสร็จแล้ว]     │
└──────────────────────────────┘
```

**Features:**
- ✅ Checkbox Toggle: กดเพื่อเปลี่ยนสถานะ
- ✅ Strikethrough: ขีดชื่องานเมื่อเสร็จ
- ✅ Gray Color: เปลี่ยนสีเป็นเทาสำหรับงานที่เสร็จ
- ✅ Statistics: แสดงจำนวนงานทั้งหมดและที่เสร็จ
- ✅ Delete Individual: ลบแต่ละงาน
- ✅ Clear Completed: ลบงานที่เสร็จแล้วทั้งหมด

#### 3. **Styling - Strikethrough Effect**
```typescript
// เมื่อ completed = true
todoCompleted: {
    textDecorationLine: 'line-through',  // ✓ ขีด
    color: '#999',                       // สีเทา
}

// ใช้ conditional styling
<Text style={[
    styles.todoTitle,
    todo.completed && styles.todoCompleted  // ← ใช้เมื่อ completed
]}>
    {todo.title}
</Text>
```

### 💡 วิธีการทำงาน

**Step 1: Toggle Todo**
```typescript
dispatch(toggleTodo(todo.id))
// completed: false → true (เสร็จ)
// completed: true → false (ยังไม่เสร็จ)
```

**Step 2: Style Changes**
```typescript
// Redux state อัปเดต
const todo = todos.find(t => t.id === id)
todo.completed = !todo.completed

// Component นำ completed flag ไปสร้าง style
todo.completed ? styles.todoCompleted : styles.todoTitle
// ผลลัพธ์: ข้อความขีด + สีเทา
```

**Step 3: Count Completed**
```typescript
const completedCount = todos.todos.filter(
    todo => todo.completed
).length
// แสดง: "ทั้งหมด: 3 | เสร็จแล้ว: 1"
```

---

## 🔄 Redux Flow (ทั่วไป)

```
User Action (เช่น กดปุ่ม)
        ↓
Dispatch Action (เช่น dispatch(addItem({...})))
        ↓
Reducer Process (เช่น state.items.push())
        ↓
State Update (Redux store เปลี่ยน)
        ↓
Selector Re-run (useSelector ตรวจพบการเปลี่ยน)
        ↓
Component Re-render (JSX ถูก render ใหม่)
        ↓
UI Update (user เห็นการเปลี่ยนแปลง)
```

---

## 📊 Comparison: Market vs Todo

| ฟีเจอร์ | Market | Todo |
|--------|---------|------|
| **สถานะ** | items + totalAmount | todos |
| **Add** | ✓ addItem | ✓ addTodo |
| **Delete** | ✓ removeItem | ✓ removeTodo |
| **Toggle** | ✗ | ✓ toggleTodo |
| **Update Value** | ✓ (คำนวณ total) | ✓ (เปลี่ยน completed) |
| **Clear All** | ✓ clearCart | ✓ clearCompleted |
| **UI Effect** | ยอดรวม | ขีดชื่อ + สี |

---

## ⚙️ Redux Toolkit Concepts

### 1. **Slice** (redux/market.ts, redux/to-do-list.ts)
```typescript
createSlice({
    name: 'market',           // ชื่อ slice
    initialState: {...},      // สถานะเริ่มต้น
    reducers: {               // ฟังก์ชันปรับเปลี่ยน state
        addItem: (state, action) => {...}
    }
})
```

### 2. **Selector** (app/market.tsx, app/todo.tsx)
```typescript
const market = useSelector(
    (state: RootState) => state.market
)
// ดึงข้อมูล market จาก Redux store
```

### 3. **Dispatch** (app/market.tsx, app/todo.tsx)
```typescript
const dispatch = useDispatch<AppDispatch>()
dispatch(addItem({id: '1', name: 'Apple', ...}))
// ส่ง action ไป reducer
```

### 4. **Immer Integration** (Redux Toolkit)
```typescript
// ปกติ (ต้องสร้าง object ใหม่):
state.items = [...state.items, newItem]

// Redux Toolkit (สามารถ mutate ได้เพราะมี Immer):
state.items.push(newItem)
```

---

## 🧪 Testing the App

### Market Workflow:
1. ✅ กรอก "Apple" | ราคา "50" | จำนวน "2"
2. ✅ กดปุ่ม "เพิ่มลงตระกร้า"
3. ✅ ยอดรวมเปลี่ยน → ฿100
4. ✅ กดปุ่ม "ลบ" → ยอดรวมเปลี่ยน → ฿0
5. ✅ กดปุ่ม "ล้างตะกร้า" → ว่าง

### Todo Workflow:
1. ✅ กรอก "ซื้อกาแฟ"
2. ✅ กดปุ่ม "เพิ่มงาน"
3. ✅ กดช่อง checkbox → เปลี่ยนสีและขีดชื่อ
4. ✅ กดปุ่ม "ลบ" → ลบงาน
5. ✅ กดปุ่ม "ลบงานที่เสร็จแล้ว" → ลบเฉพาะที่เสร็จ

---

## 📌 สรุป

- **Workshop 1**: เรียนรู้ Reducer ที่ complex (คำนวณ totalAmount)
- **Workshop 2**: เรียนรู้ Conditional Rendering และ State Toggle
- **Both**: Redux Flow, useSelector, useDispatch, Immer Integration

ทั้งสองฟีเจอร์ใช้หลักการเดียวกัน แต่ logic ต่างกันตามลักษณะของข้อมูล!
