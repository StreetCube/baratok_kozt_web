import { DocumentReference, Timestamp } from "firebase/firestore";

export interface PostCreate {
    title: string;
    content: string;
    uploaded_by: string;
    images: string[];
}

export interface GetPost {
    data: {
        title: string;
        content: string;
        userId: string;
        images: string[];
        userName: string;
        reactions: string[];
        comments: Comment[];
        createdAt: Timestamp;
    };
    reference: DocumentReference;
    }
