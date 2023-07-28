"use client";
// components/Home.tsx
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { HeartOutlined,HeartFilled,MessageOutlined,ShareAltOutlined,LikeOutlined} from '@ant-design/icons';
import { ItemCardProps } from '../Models/models';

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

const ItemCard: React.FC<ItemCardProps> = ({item,fetchItems}) => {
  const [expandedItemId, setExpandedItemId] = useState('');

  const toggleExpandDescription = (itemId: string) => {
    if (itemId === expandedItemId) {
      setExpandedItemId('');
    } else {
      setExpandedItemId(itemId);
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

    return (
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
  );
};

export default ItemCard;
