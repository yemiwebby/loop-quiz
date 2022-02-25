import {Client, expect} from '@loopback/testlab';
import {QuizApplication} from '../..';
import {setupApplication} from './test-helper';
describe('QuestionController', () => {
  let app: QuizApplication;
  let client: Client;
  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });
  after(async () => {
    await app.stop();
  });
  it('successfully makes GET request to /questions', async () => {
    const res = await client.get('/questions').expect(200);
    expect(res.body).to.be.an.Array();
    expect(res.body).to.have.length(8);
  });
  it('successfully makes GET request to /questions/count', async () => {
    const res = await client.get('/questions/count').expect(200);
    expect(res.body).to.be.an.Object();
    expect(res.body.count).to.equal(8);
  });
  it('successfully makes GET request to /questions/{id}', async () => {
    const res = await client.get('/questions/2').expect(200);
    expect(res.body).containEql({
      id: 2,
      difficulty: 'medium',
      question:
        'Which computer hardware device provides an interface for all other connected devices to communicate?',
      answer: 'Motherboard',
    });
  });
  it('makes DELETE request to /questions which fails', async () => {
    await client.delete('/questions/5').expect(403);
  });
});
