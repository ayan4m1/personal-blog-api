import { PrismaClient, Service } from '@prisma/client';

const prisma = new PrismaClient();

export const getServices = (): Promise<Service[]> => prisma.service.findMany();
