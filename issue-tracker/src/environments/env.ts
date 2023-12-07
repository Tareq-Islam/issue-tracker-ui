const base = {
  ip: 'http://192.168.0.119:5005',
  local: 'http://localhost:5005',
  live: 'https://wfmapi.eyeelectronics.net',
};
export const environment = {
  production: false,
  staging: false,
  development: true,
  client: {
    allowTest: true,
    api_key: '154982',
    base_url: base.local,
    front_end_url: 'http:localhost:4003',
  },
};
