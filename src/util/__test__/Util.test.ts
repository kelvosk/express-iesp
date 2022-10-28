import { fullNameConcat } from '../Utils';

describe('Util Test', () => {
  it('Should concat first name and last name', () => {
    const name = fullNameConcat('Anderson', 'Leal');
    expect(name).toBe('Anderson Leal');
  });
});
