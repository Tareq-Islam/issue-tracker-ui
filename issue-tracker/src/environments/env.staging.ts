const STAGING = {
  base_url: 'http://192.168.0.240:5005',
  front_end_url: 'http://192.168.0.240:4005',
};

// const STAGING = {
//   base_url: 'https://kmsdevapi.eyeelectronics.net',
//   front_end_url: 'https://kmsdev.eyeelectronics.net',
// };


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
