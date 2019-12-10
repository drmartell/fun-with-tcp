const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  describe('GET routes', () => {
    test('homepage should return "hi"', () => request(app)
      .get('/')
      .then(res => expect(res.text).toEqual('hi'))
    );
    test('homepage status should be 200', () => request(app)
      .get('/')
      .then(res => {
        //console.log(res);
        return expect(res.status).toEqual(200);
      }
      ));
    test('/red should return a red html string', () => request(app)
      .get('/red')
      .then(res => expect(res.text).toEqual('<h1 style="color: red">RED</h1>'))
    );
    test('/green should return a red html string', () => request(app)
      .get('/green')
      .then(res => expect(res.text).toEqual('<h1 style="color: green">GREEN</h1>'))
    );
    test('/blue should return a red html string', () => request(app)
      .get('/blue')
      .then(res => expect(res.text).toEqual('<h1 style="color: blue">BLUE</h1>'))
    );
    it('should return 404 if invalid route', () => request(app)
      .get('/xyz')
      .then(res => expect(res.text).toEqual('Not Found - YOU\'VE BEEN KICKED!!!'))
    );
  });
  describe('POST routes', () => {
    test('/echo should return posted body', () => request(app)
      .post('/echo')
      .send({
        make: 'Ford',
        model: 'Fiesta',
        year: 2021
      })
      .then(res => { expect(JSON.parse(res.text)).toEqual(expect.objectContaining({
        make: 'Ford',
        model: 'Fiesta',
        year: 2021
      }));
      }));
  });
});
