const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

let items = [
    {
        id: '1',
        name: 'Nature Lover 1',
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
        name: 'Foodie 1',
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
        name: 'Travel Buddy 1',
        image: 'https://source.unsplash.com/200x150/?travel',
        description: 'Travel with friends ....',
        likes: 15,
        isBookmarked: true,
        comments: [
            { id: 5, text: 'Amazing view!' },
            { id: 6, text: 'I need to plan a trip there!' },
            { id: 7, text: 'I need to plan a trip there!' },
        ],
    },
    {
        id: '4',
        name: 'Nature Lover 2',
        image: 'https://source.unsplash.com/200x150/?nature',
        description: 'Awesome experience in beach',
        likes: 10,
        isBookmarked: false,
        comments: [
            { id: 8, text: 'Beautiful photo!' },
            { id: 9, text: 'I wish I was there!' },
        ],
    },
    {
        id: '5',
        name: 'Foodie 2',
        image: 'https://source.unsplash.com/200x150/?food',
        description: 'Dinner with my family ...',
        likes: 5,
        isBookmarked: false,
        comments: [
            { id: 10, text: 'Looks delicious!' },
            { id: 11, text: 'I want to try this recipe!' },
        ],
    },
    {
        id: '6',
        name: 'Travel Buddy 2',
        image: 'https://source.unsplash.com/200x150/?travel',
        description: 'Travel with friends ....',
        likes: 15,
        isBookmarked: true,
        comments: [
            { id: 12, text: 'Amazing view!' },
            { id: 13, text: 'I need to plan a trip there!' },
            { id: 14, text: 'I need to plan a trip there!' },
        ],
    },
    {
        id: '7',
        name: 'Nature Lover 3',
        image: 'https://source.unsplash.com/200x150/?landscape',
        description: 'Exploring the wilderness...',
        likes: 20,
        isBookmarked: false,
        comments: [
            { id: 15, text: 'Breath-taking scenery!' },
            { id: 16, text: 'I want to go there!' },
        ],
    },
    {
        id: '8',
        name: 'Foodie 3',
        image: 'https://source.unsplash.com/200x150/?food',
        description: 'Delicious cuisines...',
        likes: 8,
        isBookmarked: false,
        comments: [
            { id: 17, text: 'Mouth-watering dishes!' },
            { id: 18, text: 'Must-try recipes!' },
        ],
    },
];

app.use(cors());
app.use(express.json());

console.log("server started");

app.get('/items', (req, res) => {
    res.json(items);
});

app.put('/markFavourite/:id', (req, res) => {
    const id = req.params.id;
    const item = items.find((item) => item.id === id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    item.isBookmarked = !item.isBookmarked;

    res.json({ message: 'Item marked/unmarked as favorite successfully', item });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});