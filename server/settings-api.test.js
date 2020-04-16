const {dbApi} = require('./db-api.js');
const {settingsApi} = require('./settings-api.js');

jest.mock('./db-api');

const expectedSettings = {repoName: 'repoName'};
describe('settings API', () => {
  it('fetches settings from DB', async () => {
    dbApi.get.mockResolvedValue({data: {data: expectedSettings}});
    const settings = await settingsApi.fetch();
    expect(dbApi.get).toHaveBeenCalledTimes(1);
    expect(settings).toEqual(expectedSettings);
  });
});
