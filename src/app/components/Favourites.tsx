"use client";
// components/Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ItemCard from './card';
import { Item } from '../Models/models';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Favorites: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get<Item[]>('http://localhost:5000/items');
            setItems(response.data);
        } catch (error) {
          console.log('Error fetching blogs:', error);
        }
    };
    
    const bookmarkedItems = items.filter((item) => item.isBookmarked);

  return (
    <Container>
          {bookmarkedItems.map((item) => (
          <ItemCard item={item} fetchItems={fetchItems} key={item.id} />
      ))}
    </Container>
  );
};

export default Favorites;
