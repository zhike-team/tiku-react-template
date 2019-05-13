/* eslint-disable */
(function(para) {
  var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
  w['sensorsDataAnalytic201505'] = n;
  w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
  var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
  for (var i = 0; i < ifs.length; i++) {
    w[n][ifs[i]] = w[n].call(null, ifs[i]);
  }
  if (!w[n]._t) {
    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
    x.async = 1;
    x.src = p;
    x.setAttribute('charset','UTF-8');
    y.parentNode.insertBefore(x, y);
    w[n].para = para;
  }
})({
  sdk_url: '//media8.smartstudy.com/data/sa/1.10.6/sensorsdata.min.js',
  heatmap_url: '//media8.smartstudy.com/data/sa/1.10.6/heatmap.min.js',
  name: 'sa',
  web_url: '//sa.smartstudy.com/',
  server_url: '//sea.smartstudy.com/sa?project=production',
  use_app_track: true,
  heatmap: {},
});
sa.clearAllRegister();

(function() {
  var getCookieEarlier = (key, prefix) => {
    const newKey = !prefix ? key : prefix + key;

    if (typeof document !== 'undefined') {
      const pairs = document.cookie.split(';').map(pair => (
        {
          key: pair.split('=')[0],
          value: pair.split('=')[1],
        }
      ));

      for (let i = 0; i < pairs.length; i += 1) {
        if (pairs[i].key.trim() === newKey) {
          return JSON.parse(decodeURIComponent(pairs[i].value));
        }
      }
    }
    return undefined;
  };

  sa.registerZhike = function(user_id) {
    var defaultPid = ((key, dup) => location.search.replace("?","").split('&').filter((item) => item.indexOf(`${key}=`) === 0).reduce((acc, cur) => { cur = cur.split(`${key}=`)[1]; if (dup) { acc = acc || []; acc.push(cur); return acc; } else { return cur; }}, dup ? [] : ''))('pid', false);
    var cpsInfoObject = getCookieEarlier('cpsInfo');
    sa.register({
      platform: 'PC',
      product: '智课网 - 题库',
      userType: '',
      pid: defaultPid ? defaultPid : (cpsInfoObject && cpsInfoObject.pid ? cpsInfoObject.pid : ''),
      is_login: user_id ? true : false,
    });
  }

  var ssUserObject = getCookieEarlier('ss_user');
  if (ssUserObject && ssUserObject.id) {
    sa.login(ssUserObject.id);
    sa.registerZhike(ssUserObject.id);
  }
  else {
    sa.registerZhike(0);
  }

  sa.loginZhike = function(user_id) {
    sa.login(user_id);
    sa.registerZhike(user_id);
  }

  sa.logoutZhike = function(refresh = false) {
    sa.logout(refresh);
    sa.registerZhike(0);
  }

})()

sa.quick('autoTrack');
/* eslint-enable */
