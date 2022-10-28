import supertest from 'supertest';

import appServer from '../../app';
import { UserRequest } from '../../services/UserService';

function createUser() {
  return {
    name: 'Anderson Leal',
    userName: 'anderson+' + new Date().getTime(),
    password: '123qwe',
  };
}
describe('Auth router test', () => {
  it('Should sing up a user', async () => {
    const signInObject: UserRequest = createUser();

    const response = await supertest(appServer)
      .post('/sing-up')
      .send(signInObject)
      .expect(200);

    expect(response.body.token).toBeTruthy();
  });

  it('Should not sing up a user with a same username', async () => {
    const signInObject: UserRequest = createUser();

    // Cria o primeiro usuario
    await supertest(appServer).post('/sing-up').send(signInObject).expect(200);

    // Deve retornar status 400
    const response = await supertest(appServer)
      .post('/sing-up')
      .send(signInObject)
      .expect(400);
    console.log({ response });
  });
});
