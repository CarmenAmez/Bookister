import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Book } from '@/app/types/Book'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    visible: boolean;
    setVisible: (value: boolean) => void;
    setBooks: (books: Book[]) => void;
    editingBook: Book | null;
    setEditingBook: (book: Book | null) => void;
    onSubmit: (book: Book) => Promise<void>; 
    bookToEdit?: Book;  
}

const Form: React.FC<Props> = ({
    visible,
    setVisible,
    setBooks,
    editingBook,
    setEditingBook,
}) => {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (editingBook) {
            setAuthor(editingBook.author || '');
            setTitle(editingBook.title || '');
            setPrice(editingBook.price || '');
        } else {
            setAuthor('');
            setTitle('');
            setPrice('');
        }
    }, [editingBook]);

    const closeModal = () => {
        setVisible(false);
        setEditingBook(null);
    };

    const handleSave = async () => {
        const storedBooks = await AsyncStorage.getItem('books');
        const parsedBooks: Book[] = storedBooks ? JSON.parse(storedBooks) : [];

        let updatedBooks: Book[];

        if (editingBook && editingBook.id) {
            updatedBooks = parsedBooks.map((book) =>
                book.id === editingBook.id
                    ? { ...book, author, title, price }
                    : book
            );
        } else {
            const newBook: Book = {
                id: uuidv4(),
                author,
                title,
                price,
            };
            updatedBooks = [...parsedBooks, newBook];
        }

        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
        closeModal();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.modalContainer}
            >
                <View style={styles.modalView}>
                    <Text style={styles.title}>
                        {editingBook ? 'Editar Libro' : 'Añadir Nuevo Libro'}
                    </Text>

                    <TextInput
                        placeholder="Autor"
                        style={styles.input}
                        value={author}
                        onChangeText={setAuthor}
                    />

                    <TextInput
                        placeholder="Título"
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                    />

                    <TextInput
                        placeholder="Precio"
                        style={styles.input}
                        keyboardType="numeric"
                        value={price}
                        onChangeText={setPrice}
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveText}>
                            {editingBook ? 'Guardar Cambios' : 'Añadir'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    saveText: {
        color: '#fff',
        fontWeight: '600',
    },
    cancelButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    cancelText: {
        color: '#555',
    },
});

export default Form;
