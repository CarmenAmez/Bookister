import React, { useState, useEffect } from 'react';
import { Modal as RNModal, KeyboardAvoidingView, Platform } from 'react-native';
import {
    Wrapper,
    Overlay,
    Card,
    Title,
    InputWrapper,
    StyledInput,
    CloseButton,
    AddButton,
    AddButtonText,
    Icon,
} from '@/app/styles/modal.styles';

const Modal = ({
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
            setAuthor(editingBook?.author ?? '');
            setTitle(editingBook?.title ?? '');
            setPrice(editingBook?.price ?? '');
        } else {
            setAuthor('');
            setTitle('');
            setPrice('');
        }
    }, [editingBook]);

    const handleSave = () => {
        // Simulamos localStorage con AsyncStorage si quieres hacerlo persistente luego
        const storedBooks = []; // Aquí iría una lectura de AsyncStorage, si fuera el caso

        let updatedBooks;
        if (editingBook) {
            updatedBooks = storedBooks.map((b) =>
                b.id === editingBook.id ? { ...editingBook, author, title, price } : b
            );
        } else {
            const newBook = {
                id: storedBooks.length + 1,
                author,
                title,
                price,
            };
            updatedBooks = [...storedBooks, newBook];
        }

        setBooks(updatedBooks);
        closeModal();
    };

    const closeModal = () => {
        setVisible(false);
        setEditingBook(null);
    };

    return (
        <RNModal visible={visible} animationType="fade" transparent onRequestClose={closeModal}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <Wrapper>
                    <Overlay onTouchStart={closeModal} />
                    <Card>
                        <CloseButton onPress={closeModal}>
                            <Icon name="square-minus" />
                        </CloseButton>

                        <Title>{editingBook ? 'Editar Libro' : 'Añadir Nuevo Libro'}</Title>

                        <InputWrapper>
                            <Icon name="person" />
                            <StyledInput
                                value={author}
                                onChangeText={setAuthor}
                                placeholder="Autor"
                            />
                        </InputWrapper>

                        <InputWrapper>
                            <Icon name="book" />
                            <StyledInput
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Libro"
                            />
                        </InputWrapper>

                        <InputWrapper>
                            <Icon name="money-bill-wave" />
                            <StyledInput
                                value={price}
                                onChangeText={setPrice}
                                placeholder="Precio"
                            />
                        </InputWrapper>

                        <AddButton onPress={handleSave}>
                            <AddButtonText>
                                {editingBook ? 'Guardar Cambios' : 'Añadir'}
                            </AddButtonText>
                        </AddButton>
                    </Card>
                </Wrapper>
            </KeyboardAvoidingView>
        </RNModal>
    );
};

export default Modal;
