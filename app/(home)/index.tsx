import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { SignOutButton } from '@/app/components/SignOutButton';
import Modal from '@/app/modal/modal';
//import Table from '@/app/components/table/Table';
import { FontAwesome6 } from '@expo/vector-icons';

export default function HomeScreen() {
    const { user } = useUser();

    const [books, setBooks] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

 /*   useEffect(() => {
        // Simulamos localStorage con estado inicial
        const initialBooks = []; // Aquí podrías usar AsyncStorage más adelante
        setBooks(initialBooks);
    }, []);*/

    const handleEdit = (book) => {
        setEditingBook(book);
        setVisible(true);
    };

    const handleAdd = () => {
        setEditingBook({});
        setTimeout(() => {
            setEditingBook(null);
            setVisible(true);
        }, 0);
    };

    return (
        <View style={styles.container}>
            <SignedIn>
                <Text style={styles.welcome}>Hola, {user?.emailAddresses[0].emailAddress}</Text>
                <SignOutButton />

                <ScrollView contentContainerStyle={styles.content}>
                    <Modal
                        visible={visible}
                        setVisible={setVisible}
                        setBooks={setBooks}
                        editingBook={editingBook}
                        setEditingBook={setEditingBook}
                    />

            <Table books={books} onEdit={handleEdit} setBooks={setBooks} />

                    <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                        <FontAwesome6 name="plus" size={18} color="#fff" />
                        <Text style={styles.addText}>Añadir</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SignedIn>

            <SignedOut>
                <View style={styles.authContainer}>
                    <Link href="/(auth)/sign-in">
                        <Text style={styles.authLink}>Iniciar sesión</Text>
                    </Link>
                    <Link href="/(auth)/sign-up">
                        <Text style={styles.authLink}>Registrarse</Text>
                    </Link>
                </View>
            </SignedOut>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    welcome: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    content: {
        flexGrow: 1,
        gap: 20,
    },
    addButton: {
        marginTop: 20,
        padding: 14,
        backgroundColor: '#444',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    addText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authLink: {
        fontSize: 18,
        marginVertical: 10,
        color: '#555',
    },
});

