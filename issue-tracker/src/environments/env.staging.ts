const STAGING = {
  base_url: 'http://issue-tracker-api.localhost',
  front_end_url: 'http://issue-tracker.localhost',
};



export const environment = {
  production: false,
  staging: true,
  development: false,
  client: {
    allowTest: false,
    api_key: '154982',
    base_url: STAGING.base_url,
    front_end_url: STAGING.front_end_url,
  },
};
