import { Session } from './utils/session.js';
import { dataSource } from './utils/dataSource.js';
App({
  onLaunch: function () {
    // 校验层
    var session = new Session();
    session.verify();
    // 数据层
    var Data = new dataSource();
    Data.fetch();
  }
})

