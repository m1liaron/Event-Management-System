import type { User } from "./user.type"

type RegisterResponse = {
    user: User,
    token: string;
}

export type { RegisterResponse };