import {
    createManyTestCards,
    createTestCard,
    createTestUser,
    getTestCard,
    removeAllTestCards,
    removeTestUser
} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";
import {logger} from "../src/application/logging.js";
import { request } from "express";

describe('POST /api/cards', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestCards();
        await removeTestUser();
    })

    it('should can create new card', async () => {
        const result = await supertest(web)
            .post("/api/cards")
            .set('Authorization', 'test')
            .send({
                name: "test",
                nik: "test",
                tempatlahir: "test",
                jeniskelamin: "test",
                alamat: "cibitung",
                agama: "islam",
        });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.nik).toBe("test");
        expect(result.body.data.tempatlahir).toBe("test");
        expect(result.body.data.jeniskelamin).toBe("test");
        expect(result.body.data.alamat).toBe("cibitung");
        expect(result.body.data.agama).toBe("islam");
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .post("/api/cards")
            .set('Authorization', 'test')
            .send({
                name: "",
                nik: "test",
                tempatlahir: "test",
                jeniskelamin: "",
                alamat: "sukabumi",
                agama: "islam",
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/cards/:cardId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestCard();
    })

    afterEach(async () => {
        await removeAllTestCards();
        await removeTestUser();
    })

    it('should can get card', async () => {
        const testCard = await getTestCard();

        const result = await supertest(web)
            .get("/api/cards/" + testCard.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe(testCard.name);
        expect(result.body.data.nik).toBe(testCard.nik);
        expect(result.body.data.tempatlahir).toBe(testCard.tempatlahir);
        expect(result.body.data.jeniskelamin).toBe(testCard.jeniskelamin);
        expect(result.body.data.alamat).toBe(testCard.alamat);
        expect(result.body.data.agama).toBe(testCard.agama);
    });

    it('should return 404 if contact id is not found', async () => {
        const testCard = await getTestCard();

        const result = await supertest(web)
            .get("/api/cards/" + (testCard.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('PUT /api/cards/:cardId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestCard();
    })

    afterEach(async () => {
        await removeAllTestCards();
        await removeTestUser();
    })

    it('should can update existing card', async () => {
        const testCard = await getTestCard();

        const result = await supertest(web)
            .put('/api/cards/' + testCard.id)
            .set('Authorization', 'test')
            .send({
                name: "erikriswanto",
                nik: "212121",
                tempatlahir: "sukabumi",
                jeniskelamin: "pria",
                alamat : "KarangTenggah",
                agama : "islam"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testCard.id);
        expect(result.body.data.name).toBe("erikriswanto");
        expect(result.body.data.nik).toBe("212121");
        expect(result.body.data.tempatlahir).toBe("sukabumi");
        expect(result.body.data.jeniskelamin).toBe("pria");
        expect(result.body.data.alamat).toBe("KarangTenggah");
        expect(result.body.data.agama).toBe("islam");
    });

    it('should reject if request is invalid', async () => {
        const testCard = await getTestCard();

        const result = await supertest(web)
            .put('/api/cards/' + testCard.id)
            .set('Authorization', 'test')
            .send({
                name: "",
                nik: "",
                tempatlahir: "pria",
                jeniskelamin: "",
                alamat: "",
                agama: ""
            });

        expect(result.status).toBe(400);
    });

    it('should reject if card is not found', async () => {
        const testCard = await getTestCard();

        const result = await supertest(web)
            .put('/api/cards/' + (testCard.id + 1))
            .set('Authorization', 'test')
            .send({
                name: "erikRiswantos",
                nik: "212121",
                tempatlahir: "sukabumi",
                jeniskelamin: "pria",
                alamat : "KarangTenggah",
                agama : "islam"
            });

        expect(result.status).toBe(404);
    });
});

describe('DELETE /api/cards/:cardId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestCard();
    })

    afterEach(async () => {
        await removeAllTestCards();
        await removeTestUser();
    })

    it('should can delete card', async () => {
        let testCard = await getTestCard();
        const result = await supertest(web)
            .delete('/api/cards/' + testCard.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testCard = await getTestCard();
        expect(testCard).toBeNull();
    });

    it('should reject if card is not found', async () => {
        let testCard = await getTestCard();
        const result = await supertest(web)
            .delete('/api/cards/' + (testCard.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('GET /api/cards', function () {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestCards();
    })

    afterEach(async () => {
        await removeAllTestCards();
        await removeTestUser();
    })

    it('should can search without parameter', async () => {
        const result = await supertest(web)
            .get('/api/cards')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it('should can search to page 2', async () => {
        const result = await supertest(web)
            .get('/api/cards')
            .query({
                page: 2
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.paging.page).toBe(2);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it('should can search using name', async () => {
        const result = await supertest(web)
            .get('/api/cards')
            .query({
                name: "test 1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.paging.page).toBe(1);
    });

    it('should can search using nik', async () => {
        const result = await supertest(web)
            .get('/api/cards')
            .query({
                nik: "test1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.paging.page).toBe(1);
    });

    it('should can search using tempatlahir', async () => {
        const result = await supertest(web)
            .get('/api/cards')
            .query({
                tempatlahir: "sukabumi"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.paging.page).toBe(1);
    });

    it('should can search using JenisKelamin', async () => {
        const result = await supertest(web)
            .get('/api/cards')
            .query({
                jeniskelamin: "pria"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.paging.page).toBe(1);
    });

    it('should can search using alamat', async () => {
        const result = await supertest(web)
            .get('/api/cards')
            .query({
                alamat: "KarangTenggah"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.paging.page).toBe(1);
    });

    it('should can search using agama', async () => {
        const result = await supertest(web)
            .get('/api/cards')
            .query({
                agama: "islam"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.paging.page).toBe(1);
    });
});
