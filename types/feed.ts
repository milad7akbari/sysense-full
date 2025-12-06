export interface FeedItem {
    id: string | number;
    imageUrl: string;
    title?: string;
    user?: {
        name: string;
        avatar?: string;
    };
    type?: 'image' | 'video';
    height?: 'short' | 'medium' | 'tall';
    likes?: number;
}