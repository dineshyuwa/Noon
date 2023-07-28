export interface Comment {
    id: number;
    text: string;
  }
  
export interface Item {
    id: string;
    name: string;
    image: string;
    description: string;
    likes: number;
    isBookmarked: boolean;
    comments: Comment[];
}
  
export interface FetchItemsFunc {
      (): Promise<void>;
}
    
export interface ItemCardProps {
      item: Item;
      fetchItems: FetchItemsFunc;
}