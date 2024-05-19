import { Injectable, signal } from '@angular/core';
import {
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  Firestore,
  addDoc,
  collection,
  collectionChanges,
  deleteDoc,
  doc,
  getFirestore,
} from '@angular/fire/firestore';
import {
  DocumentData,
  DocumentReference,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import { GetPost, PostCreate } from '../components/types/post.type';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private fireStore: Firestore) {
    this.getPosts();
  }
  public postChangedSubject: BehaviorSubject<Array<GetPost>> =
    new BehaviorSubject<Array<any>>(null);
  public postReferences: Array<DocumentReference> = [];

  async createPost(post: PostCreate): Promise<DocumentReference> {
    const user = getAuth().currentUser;
    if (!user) {
      throw new Error('User not logged in');
    }
    const postCollection = collection(this.fireStore, 'posts');
    return await addDoc(postCollection, {
      userId: user.uid,
      userName: user.displayName,
      title: post.title,
      content: post.content,
      reactions: [0, 0, 0, 0, 0],
      comments: [],
      createdAt: new Date(),
      images: post.images,
    });
  }

  getPosts() {
    const unsub = onSnapshot(collection(this.fireStore, 'posts'), (snapshot) => {
        let dataArray = this.postChangedSubject.value || [];
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added" || change.type === "modified") {
                const referenceExists = dataArray.some(item => item.reference.id === change.doc.id);

                if (!referenceExists) {
                    dataArray.push({
                        data: change.doc.data() as {
                            title: string;
                            content: string;
                            userId: string;
                            images: string[];
                            userName: string;
                            reactions: string[];
                            comments: Comment[];
                            createdAt: Timestamp;
                        },
                        reference: change.doc.ref,
                    });
                } else {
                    dataArray = dataArray.map((item) => {
                        if (item.reference.id === change.doc.id) {
                            return {
                                data: change.doc.data() as {
                                    title: string;
                                    content: string;
                                    userId: string;
                                    images: string[];
                                    userName: string;
                                    reactions: string[];
                                    comments: Comment[];
                                    createdAt: Timestamp;
                                },
                                reference: change.doc.ref,
                            };
                        }
                        return item;
                    });
                }
            } else if (change.type === "removed") {
                dataArray = dataArray.filter(item => item.reference.id !== change.doc.id);
            }
        });
        this.postChangedSubject.next(dataArray);
    });
}

  public deletePost(reference: DocumentReference) {
    return deleteDoc(reference);
  }
}
