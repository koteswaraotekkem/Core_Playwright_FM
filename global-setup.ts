async function globalSetup() {
  process.env.DEBUG = '';
  process.env.PWDEBUG = '';
  process.env.PW_TEST_REPORTER_VERBOSE = 'false';
}

export default globalSetup;