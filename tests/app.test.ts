import supertest from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/config/database.js";
import userFactory from "./factories/userFactory.js";
import { createTest } from "./factories/testsFactory.js";

describe("Tests user routes", () => {
  it("Should create a user and return status 201", async () => {
    const login = userFactory.createLogin();
    const response = await supertest(app).post(`/signup`).send(login);
    expect(response.status).toBe(201);

    const user = await prisma.user.findFirst({
      where: { email: login.email },
    });
    expect(user.email).toBe(login.email);
  });

  it("given valid email and password, receive token", async () => {
    const login = userFactory.createLogin();
    const user: any = await userFactory.createUser(login);

    const response = await supertest(app).post(`/signin`).send({
      email: user.email,
      password: user.password,
    });
    const token = response.body.token;
    expect(token).not.toBeNull();
  });
  it("Should test if the email is available and in case it's not, return 409", async () => {
    const login = userFactory.createLogin();
    await userFactory.createUser(login);

    const response = await supertest(app).post(`/signup`).send(login);
    expect(response.statusCode).toBe(409);
  });
  it("given invalid password, receive 401", async () => {
    const login = userFactory.createLogin();
    const user = userFactory.createUser(login);

    const response = await supertest(app)
      .post(`/signin`)
      .send({ ...login, password: "outropassword" });
    expect(response.status).toBe(401);
  });
});

async function getToken() {
  const login = userFactory.createLogin();
  const user: any = await userFactory.createUser(login);

  const response = await supertest(app).post(`/signin`).send({
    email: user.email,
    password: user.password,
  });
  const token = response.body.token;
}

describe("Tests test routes", () => {
  it("Should create a test and return status 201", async () => {
    const body = await createTest();
    const token = await getToken();
    const result = await supertest(app)
      .post(`/tests`)
      .send(body)
      .set({ Authorization: token });

    expect(result.status).toBe(201);
  });

  it("Should get tests by its discipline and return 200 ", async () => {
    const token = await getToken();
    const result = await supertest(app)
      .get("/tests/disciplines")
      .send()
      .set({ Authorization: token });
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  it("Should get a test by its teacher and return 200", async () => {
    const token = await getToken();
    const result = await supertest(app)
      .get("/tests/teachers")
      .send()
      .set({ Authorization: token });
    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
