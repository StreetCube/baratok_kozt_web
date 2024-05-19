import { Notification } from "./notification.type";

export type User = {
    birthDate: string,
    email: string,
    firstName: string,
    lastName: string,
    notifications: Notification[],
}