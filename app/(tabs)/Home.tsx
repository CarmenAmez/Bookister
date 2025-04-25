import React, { useEffect, useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '@/app/types/Book';
import Form from '@/app/components/form/Form';
import Table from '@/app/table/Table';

export default function HomeScreen() {
    const [books, setBooks] = useState<Book[]>([]);
    const [visible, setVisible] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            const stored = await AsyncStorage.getItem('books');
            if (stored) setBooks(JSON.parse(stored));
        };
        loadBooks();
    }, []);

    const handleSubmit = async (book: Book) => {
        let updatedBooks;
        if (editingBook) {
            updatedBooks = books.map((b) => (b.id === book.id ? book : b));
        } else {
            updatedBooks = [...books, book];
        }
        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
        setEditingBook(null);
        setVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📚 Mi Biblioteca</Text>
            <Table
                books={books}
                setBooks={setBooks}
                setEditingBook={setEditingBook}
                setVisible={setVisible}
                onEdit={handleSubmit}
            />
            <Form visible={visible}
                setVisible={setVisible}
                setBooks={setBooks}
                editingBook={editingBook}
                setEditingBook={setEditingBook} 
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
