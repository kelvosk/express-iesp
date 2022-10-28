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

describe('User router test', () => {
  it('Should List Users', async () => {
    const signInObject: UserRequest = createUser();

    let response = await supertest(appServer)
      .post('/sing-up')
      .send(signInObject)
      .expect(200);

    const token = response.body.token;

    response = await supertest(appServer)
      .get('/user')
      .send(signInObject)
      .set('Authorization', `bearer ${token}`)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });
});
