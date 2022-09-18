import { User } from "@prisma/client";

export type TypeUserData = Omit<User, "id">;
