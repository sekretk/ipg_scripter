import { toUser } from '../parse';

describe(`'parse' modulte tast suite`, () => {
  describe(`'toUser' function test suite`, () => {
    it('should parse line without spaces', () => {
      expect(
        toUser('rnd_audit;CN=Аудит,OU=RND,DC=IPG,DC=LOCAL;False;2023-03-14'),
      ).toEqual({
        name: 'rnd_audit',
        unit: 'RND',
        fullname: 'Аудит',
        disabled: true,
        lastLogin: '2023-03-14',
      });
    });

    it('should parse line spaces in name', () => {
      expect(
        toUser(
          'krm_harchev;CN=Харчев Александр Юрьевич,OU=CRM,DC=IPG,DC=LOCAL;True;2020-03-16',
        ),
      ).toEqual({
        name: 'krm_harchev',
        unit: 'CRM',
        fullname: 'Харчев Александр Юрьевич',
        disabled: false,
        lastLogin: '2020-03-16',
      });
    });
  });
});
