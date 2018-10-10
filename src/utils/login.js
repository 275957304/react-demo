// 登录初始化
var url = location.href;
var t = url.split('#');
var agent_id = getParamUrl("agent_id", window.location.href);
var placeid = getParamUrl("placeid", window.location.href);
pop_lr.init({ login_attr: ['phone', 'login', 'wechat'], game_id: 156, agent_id: agent_id, placeid: placeid, auto: '', goto_url: t[0] });