import { Injectable } from '@angular/core';
import { Auth, UserCredential, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, getDoc, getFirestore, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../components/types/users.type';
import { AuthService } from './auth.service';
import { Notification } from '../components/types/notification.type';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    constructor(private authService: AuthService) {
    }
    public notificationSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public async createNotification(message: string, notificationType: string, userId: string) {
        //Use firebase to get ref to the user document
        console.log(userId)
        const docRef = doc(getFirestore(), 'users', userId);
        getDoc(docRef).then((doc) => {
            console.log(doc.exists())
            if (doc.exists()) {
                const user = doc.data() as User;
                if(user.notifications === undefined) {
                    user.notifications = [];
                }
                user.notifications.push({
                    id: user.notifications.length + 1,
                    message: message,
                    notificationType: notificationType,
                    read: false
                })
                return updateDoc(docRef, {
                    notifications: user.notifications
                }
                )
            } else {
                return null
            }
        })
    }


    public getNotifications() {
        const userId = this.authService.getUser().uid;
        console.log(userId)
        onSnapshot(doc(getFirestore(), 'users', userId), (doc) => {
            console.log(doc.exists())
            if (doc.exists()) {
                const user = doc.data() as User;
                this.notificationSubject.next(user.notifications);
            }
        })   
}

async closeNotification(notification: Notification): Promise<void> {
    const userId = this.authService.getUser().uid;
    const userRef = doc(getFirestore(), 'users', userId);

    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
        const userData = userSnapshot.data() as User;
        const updatedNotifications = userData.notifications.filter(notificationFilt => notificationFilt.id !== notification.id);

        await updateDoc(userRef, { notifications: updatedNotifications });
    }
}
}