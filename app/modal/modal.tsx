import React, { useEffect, useState } from 'react';
import { Modal as RNModal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '@/app/types/Book';

type Props = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
    editingBook: Book | null;
    setEditingBook: (book: Book | null) => void;
};

const Modal: React.FC<Props> = ({ visible, setVisible, setBooks, editingBook, setEditingBook }) => {
    const [book, setBook] = useState<Book>({
        id: '',
        title: '',
        author: '',
        price: '',
    });

    useEffect(() => {
        if (editingBook) {
            setBook(editingBook);
        } else {
            setBook({
                id: Date.now().toString(),
                title: '',
                author: '',
                price: '',
            });
        }
    }, [editingBook]);

    const handleChange = (field: keyof Book, value: string) => {
        setBook({ ...book, [field]: value });
    };

    const saveBook = async () => {
        const storedBooks = await AsyncStorage.getItem('books');
        const currentBooks = storedBooks ? JSON.parse(storedBooks) : [];

        const updatedBooks = editingBook
            ? currentBooks.map((b: Book) => (b.id === book.id ? book : b))
            : [...currentBooks, book];

        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
        setBooks(updatedBooks);
        closeModal();
    };

    const closeModal = () => {
        setVisible(false);
        setEditingBook(null);
    };

    return (
        <RNModal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{editingBook ? 'Editar Libro' : 'Añadir Libro'}</Text>

                    {['title', 'author', 'price'].map((field) => (
                        <TextInput
                            key={field}
                            style={styles.input}
                            placeholder={field.toUpperCase()}
                            value={(book as any)[field]}
                            onChangeText={(text) => handleChange(field as keyof Book, text)}
                            keyboardType={field === 'year' || field === 'pages' || field === 'rating' ? 'numeric' : 'default'}
                        />
                    ))}

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.saveButton} onPress={saveBook}>
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 16, width: '90%' },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
    buttons: { flexDirection: 'row', justifyContent: 'space-between' },
    saveButton: { backgroundColor: '#444', padding: 10, borderRadius: 8 },
    cancelButton: { backgroundColor: '#999', padding: 10, borderRadius: 8 },
    buttonText: { color: '#fff', fontWeight: '600' },
});

export default Modal;
