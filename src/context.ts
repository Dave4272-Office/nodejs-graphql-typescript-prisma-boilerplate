import prismaClient from "@prisma/client";

export interface Context {
  req: Express.Request;
  res: Express.Response;
  prisma: prismaClient.PrismaClient;
}
