import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '@/app/types/Book';

type Props = {
    books: Book[];
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
    setEditingBook: (book: Book) => void;
    setVisible: (visible: boolean) => void;
    onEdit: (book: Book) => void;
};


const Table: React.FC<Props> = ({ books, setBooks, setEditingBook, setVisible, onEdit  }) => {
    const deleteBook = (id: string) => {
        Alert.alert('Eliminar', '¿Estás seguro de eliminar este libro?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: async () => {
                    const updatedBooks = books.filter((book) => book.id !== id);
                    await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
                    setBooks(updatedBooks);
                },
            },
        ]);
    };

    const editBook = (book: Book) => {
        setEditingBook(book);
        setVisible(true);
        onEdit(book);
    };

    return (
        <ScrollView horizontal>
            <View>
                <View style={styles.header}>
                    {['Título', 'Autor', 'Año', 'Páginas', 'Rating', 'Acciones'].map((title) => (
                        <Text key={title} style={styles.headerText}>{title}</Text>
                    ))}
                </View>
                {books.map((book) => (
                    <View key={book.id} style={styles.row}>
                        <Text style={styles.cell}>{book.title}</Text>
                        <Text style={styles.cell}>{book.author}</Text>
                        <Text style={styles.cell}>{book.price}</Text>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.editBtn} onPress={() => editBook(book)}>
                                <Text style={styles.actionText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteBook(book.id)}>
                                <Text style={styles.actionText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: { flexDirection: 'row', backgroundColor: '#333', padding: 10 },
    headerText: { color: '#fff', fontWeight: 'bold', width: 100 },
    row: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#ccc' },
    cell: { width: 100 },
    actions: { flexDirection: 'row', gap: 10 },
    editBtn: { backgroundColor: '#4CAF50', padding: 5, borderRadius: 5 },
    deleteBtn: { backgroundColor: '#F44336', padding: 5, borderRadius: 5 },
    actionText: { color: '#fff', fontWeight: 'bold' },
});

export default Table;
