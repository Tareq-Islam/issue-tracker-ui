const base = {
  ip: 'http://192.168.0.119:5000',
  local: 'http://localhost:32773',
  live: 'http://issuetrackerapi.wajeha.xyz',
};
export const environment = {
  production: false,
  staging: false,
  development: true,
  client: {
    allowTest: true,
    api_key: '154982',
    base_url: base.local,
    front_end_url: 'http:localhost:4200',
  },
};
