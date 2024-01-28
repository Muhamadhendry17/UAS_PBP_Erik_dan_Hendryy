import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: 'test'
        }
    });
}

export const removeAllTestCards = async () => {
    await prismaClient.card.deleteMany({
        where: {
            username: 'test'
        }
    });
}

export const createTestCard = async () => {
    await prismaClient.card.create({
        data: {
            username: "test",
            name: "test",
            nik: "test",
            tempatlahir: "test",
            jeniskelamin: "test",
            alamat: "cibitung",
            agama: "islam",
        }
    })
}

export const createManyTestCards = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.card.create({
            data: {
                username :`test`,
                name: `test${i}`,
                nik: `test ${i}`,
                tempatlahir: `test ${i}`,
                jeniskelamin: `test${i}`,
                alamat: `cibitung${i}`,
                agama: `islam${i}`
            }
        })
    }
}

export const getTestCard = async () => {
    return prismaClient.card.findFirst({
        where: {
            username: 'test'
        }
    })
}

// export const removeAllTestAddresses = async () => {
//     await prismaClient.address.deleteMany({
//         where: {
//             contact: {
//                 username: "test"
//             }
//         }
//     });
// }