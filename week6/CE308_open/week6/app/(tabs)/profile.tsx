import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const router = useRouter();
    

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                </View>
                <Text style={styles.name}>ชื่อผู้ใช้</Text>
                <Text style={styles.email}>user@example.com</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center'
    },
    profileHeader: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        padding: 32,
        paddingTop: 24,
        
        
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#BABABA',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 4,
        borderColor: '#BABABA',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#BABABA',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginTop: -20,
        borderRadius: 12,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statBoxMiddle: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#E5E7EB',
    },
    statNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 13,
        color: '#6B7280',
    },
    menuContainer: {
        margin: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EEF2FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 13,
        color: '#6B7280',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEE2E2',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#DC2626',
    },
});
