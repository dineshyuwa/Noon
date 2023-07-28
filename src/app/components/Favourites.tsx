"use client";
// components/Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { HeartOutlined,HeartFilled,MessageOutlined,ShareAltOutlined,LikeOutlined} from '@ant-design/icons';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  width: 300px;
  background-color: #fff;
  color: #000;
`;

const Image = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`;

const Content = styled.div`
  padding: 10px;
`;

const Heading = styled.h3`
  margin: 5px 0;
  font-weight: bold;
`;

const Description = styled.p<{ isExpanded: boolean }>`
  margin: 10px 0;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    display: block;
    width: 100%;
    height: 20px;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    display: block;
    width: 20px;
    height: 20px;
    background: white;
  }

  & a {
    display: inline-block;
    color: blue;
    cursor: pointer;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* Add this line to align items vertically */
  margin: 10px;
`;

const LikeCommentShareWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const CommentButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const ShareButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const BookmarkedButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${(props) => (props.isBookmarked ? 'red' : 'black')};
`;

const Icon = styled.span`
  margin-right: 5px;
`;

const ViewAllCommentsButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: blue;
  margin: 10px;
  font-size: 13px;
`;

interface Comment {
  id: number;
  text: string;
}

interface Item {
  id: string;
  name: string;
  image: string;
  description: string;
  likes: number;
  isBookmarked: boolean;
  comments: Comment[];
}

const Favorites: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [expandedItemId, setExpandedItemId] = useState('');

  const toggleExpandDescription = (itemId: string) => {
    if (itemId === expandedItemId) {
      setExpandedItemId('');
    } else {
      setExpandedItemId(itemId);
    }
  };

  const initialData: Item[] = [
    {
      id: '1',
      name: 'Nature Lover',
      image: 'https://source.unsplash.com/200x150/?nature',
      description: 'Awesome experience in beach',
      likes: 10,
      isBookmarked: false,
      comments: [
        { id: 1, text: 'Beautiful photo!' },
        { id: 2, text: 'I wish I was there!' },
      ],
    },
    {
      id: '2',
      name: 'Foodie',
      image: 'https://source.unsplash.com/200x150/?food',
      description: 'Dinner with my family ...',
      likes: 5,
      isBookmarked: false,
      comments: [
        { id: 3, text: 'Looks delicious!' },
        { id: 4, text: 'I want to try this recipe!' },
      ],
    },
    {
      id: '3',
      name: 'Travel Buddy',
      image: 'https://source.unsplash.com/200x150/?travel',
      description: 'Travel with friends ....',
      likes: 15,
      isBookmarked: true,
      comments: [
        { id: 5, text: 'Amazing view!' },
          { id: 6, text: 'I need to plan a trip there!' },
          { id: 7, text: 'I need to plan a trip there!' }
      ],
    },
  ];

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
    
    const markFavourite = async (id: string) => {
        console.log(id);
    try {
        await axios.put(`http://localhost:5000/markFavourite/${id}`);
        fetchItems();
    } catch (error) {
      console.log('Error fetching blogs:', error);
    }
  };
    
    const bookmarkedItems = items.filter((item) => item.isBookmarked);

  return (
    <Container>
      {bookmarkedItems.map((item) => (
        <Card key={item.id}>
          <Image src={item.image} alt={item.name} />
          <ButtonsWrapper>
            <LikeCommentShareWrapper>
              <LikeButton>
                <Icon><LikeOutlined /></Icon>
              </LikeButton>
              <CommentButton>
                <Icon><MessageOutlined/></Icon>
              </CommentButton>
              <ShareButton>
                <Icon><ShareAltOutlined/></Icon>
              </ShareButton>
            </LikeCommentShareWrapper>
            <BookmarkedButton isBookmarked={item.isBookmarked} onClick={()=>{markFavourite(item.id)}}>
              {item.isBookmarked ? <HeartFilled/> : <HeartOutlined/>}
            </BookmarkedButton>
          </ButtonsWrapper>
          <Content>
            <Heading>{item.name}</Heading>
            <Description isExpanded={item.id === expandedItemId}>
              {item.description}
              {item.description.length > 40 && (
                <>
                  {' '}
                  <a onClick={() => toggleExpandDescription(item.id)}>
                    {item.id === expandedItemId ? 'See Less' : 'See More'}
                  </a>
                </>
              )}
            </Description>
          </Content>
          <ViewAllCommentsButton onClick={() => toggleExpandDescription(item.id)}>
            View All {item.comments.length} Comments
          </ViewAllCommentsButton>
        </Card>
      ))}
    </Container>
  );
};

export default Favorites;
