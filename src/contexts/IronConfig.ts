const ironconfig = {
  cookieName: 'my-auth-cookie',
  password: process.env.IRON_SESSION_SECRET,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
};

export default ironconfig;
