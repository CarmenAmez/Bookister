import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import { Row, Cell, Actions, IconButton } from './tableItemStyled';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
}

interface TableItemProps {
  book: Book;
  onEdit: (book: Book) => void;
  books: Book[];
  setBooks: (books: Book[]) => void;
}

export default function TableItem({ book, onEdit, books, setBooks }: TableItemProps) {
  const handlerDelete = async () => {
    const updatedBooks = books.filter(libro => libro.id !== book.id);
    setBooks(updatedBooks);
    await AsyncStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  return (
    <Row>
      <Cell>{book.title}</Cell>
      <Cell>{book.author}</Cell>
      <Cell>{book.price}€</Cell>
      <Actions>
        <IconButton onPress={() => onEdit(book)}>
          <Feather name="edit-2" size={18} color="#888" />
        </IconButton>
        <IconButton onPress={handlerDelete}>
          <Feather name="trash-2" size={18} color="#888" />
        </IconButton>
      </Actions>
    </Row>
  );
}
