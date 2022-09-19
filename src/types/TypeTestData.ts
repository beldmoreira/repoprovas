import { Test } from "@prisma/client";

export type TypeTestData = Omit<Test, "id">;
