import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/teams.model';
import { mockedTeams } from './mocks/mockedTeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Team tests', () => {
  beforeEach(() => {
    sinon.stub(Team, 'findAll').resolves(mockedTeams as Team[]);
  })
  afterEach(() => {
    sinon.restore();
  })
  it('/teams return all teams with proper http code', async () => {
    const res = await chai.request(app).get('/teams');
    expect(res.body).to.deep.equal(mockedTeams);
    expect(res.status).to.equal(200);
  });
});
