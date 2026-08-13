window.TP_CONFIG = {
  googleClientId: '70341597246-79thd71mqi1t80jgit0b2b6m3ihrpo9j.apps.googleusercontent.com',
  appStorageKey: 'timeandprice.app.v6',
  sessionKey: 'timeandprice.app.v6.session'
};

window.TP_blankAccount = function () {
  return {
    categories: [
      { name: 'math', productive: true, color: '#aeb4c0' },
      { name: 'coding', productive: true, color: '#8a94a8' },
      { name: 'homework', productive: true, color: '#9d9384' },
      { name: 'free time', productive: false, color: '#c4aa78' },
      { name: 'pause', productive: false, color: '#6a6771' }
    ],
    today: [],
    todayKey: '',
    yesterdayLead: 0,
    streak: 0,
    target: 25 * 60,
    month: [],
    days: {}
  };
};

window.TP_uid = function (user) {
  return (user && (user.sub || user.email)) || '';
};

window.TP_readStore = function () {
  try {
    const raw = window.localStorage.getItem(window.TP_CONFIG.appStorageKey);
    if (raw) {
      const o = JSON.parse(raw);
      if (o && o.accounts) return o;
    }
  } catch (e) { /* ignore */ }
  return { accounts: {} };
};

window.TP_writeStore = function (store) {
  try { window.localStorage.setItem(window.TP_CONFIG.appStorageKey, JSON.stringify(store)); } catch (e) { /* ignore */ }
};

window.TP_readSession = function () {
  try {
    const raw = window.localStorage.getItem(window.TP_CONFIG.sessionKey);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return { user: null };
};

window.TP_writeSession = function (user) {
  try { window.localStorage.setItem(window.TP_CONFIG.sessionKey, JSON.stringify({ user: user || null })); } catch (e) { /* ignore */ }
};

window.TP_ensureAccount = function (user) {
  const id = window.TP_uid(user);
  if (!id) return window.TP_blankAccount();
  const store = window.TP_readStore();
  if (!store.accounts[id]) {
    store.accounts[id] = window.TP_blankAccount();
    window.TP_writeStore(store);
  }
  return store.accounts[id];
};

window.TP_saveAccount = function (user, acc) {
  const id = window.TP_uid(user);
  if (!id) return;
  const store = window.TP_readStore();
  store.accounts[id] = acc;
  window.TP_writeStore(store);
};
