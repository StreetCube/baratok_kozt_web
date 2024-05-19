import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { REACTIONS } from '../constants/reactions.constants';
import { DocumentReference } from 'firebase/firestore';
import { updateDoc } from '@angular/fire/firestore';
import { GetPost } from '../components/types/post.type';

@Injectable({ providedIn: 'root' })
export class ReactionServive {

    constructor() {}

    public async react(reaction: string, user: User, post: GetPost) {
        const reactions = REACTIONS.map((reaction, index) => ({ ...reaction, number: index }));
        const reactionIndex = reactions.findIndex(reactionObj => reactionObj.name === reaction);
        if (reactionIndex === -1) {
            return
        }
        post.data.reactions[reactionIndex] += 1
        updateDoc(post.reference, 'reactions', post.data.reactions)
    }

}
