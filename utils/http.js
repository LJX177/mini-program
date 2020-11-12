import dialog from "./dialog.js";
import userHelper from "./user";

import { appid, api as apiMap, domain } from "../global.js";

const http = {
  defaultOptions: {
    needLogin: false,
    errorHandle: true,
    dataHandle: true,
    responseHandle: true,
    showLoading: true,
  },

  get(api, options) {
    if (!options) {
      options = {};
    }
    options.api = api;
    options.method = "get";
    this.handle(options);
  },

  post(api, options) {
    if (!options) {
      options = {};
    }
    options.api = api;
    options.method = "post";
    this.handle(options);
  },

  /**
   * 处理请求参数
   * @param  {object} options
   * {
   *   api 请求的api名称或者url地址
   *   method  发起请求动作
   *   data  发起请求附带的参数data
   *   needLogin 是否需要登入即请求是否需要带上cookie或者相关标识
   *   success 请求成功后的回调方法
   *   fail  请求失败的回调方法
   *   metaSource 请求参数中的meta
   *   metaVersion 请求参数中的meta
   *   metaType 请求参数中的meta
   *   platform 请求参数中的平台
   *   errorHandle 默认错误处理是否开启
   *   dataHandle  默认数据处理是否开启
   *   responseHandle 默认相应处理开启
   *   extOptions  axios相关的其他参数，比如header之类的
   *   showLoading 是否显示加载
   * }
   * @return {}         [description]
   */
  handle(options) {
    options = Object.assign({}, this.defaultOptions, options);
    // 请求参数
    let httpOptions = {
      url: this.getUrlWithApi(options.api),
      method: options.method,
      data: options.dataHandle ? this.handleData(options) : options.data,
    };

    if (options.extOptions) {
      httpOptions = object.assign(httpOptions, options.extOptions);
    }

    if (options.needLogin) {
      let loginInfo = userHelper.getLoginInfo();
      if (!loginInfo) {
        this.handleError(1000);
        return false;
      }
      // 设置openid
      httpOptions.data.openId = loginInfo.openid;
      httpOptions.data.open_id = loginInfo.openid;
      httpOptions.data.OpenId = loginInfo.openid;

      // httpOptions.data.member_id = loginInfo.openid;
    }

    let handleOptions = {
      success: options.success ? options.success : false,
      fail: options.fail ? options.fail : false,
      errorHandle: options.errorHandle ? true : false,
      responseHandle: options.responseHandle ? true : false,
    };

    if (options.showLoading) {
      dialog.loading();
    }

    httpOptions.success = (res) => {
      if (options.showLoading) {
        dialog.hideLoading();
      }
      this.handleResponse(res, handleOptions);
    };

    httpOptions.fail = (res) => {
      if (options.showLoading) {
        dialog.hideLoading();
      }
      if (typeof options.fail == "function") {
        options.fail();
      }
      if (!options.errorHandle) {
        return false;
      }
      http.handleError();
    };

    wx.request(httpOptions);
  },
  getUrlWithApi(api) {
    return domain + (apiMap[api] ? apiMap[api] : api);
  },

  handleData(options) {
    if (!options.data) {
      options.data = {};
    }
    options.data.app_id = appid;
    return options.data;
  },
  // 响应处理
  handleResponse(response, options) {
    let data = response.data;
    if (!options.responseHandle) {
      if (typeof options.success == "function") {
        options.success(data);
      }
      return;
    }
    if (data.Code == 0 || data.code == 0) {
      if (typeof options.success == "function") {
        options.success(data.Data);
      }
    } else {
      // if (data.code == 5001) {
      //   if (platformHelper.isApp()) {
      //     platformHelper.callLogin({
      //       "action": 'APP'
      //     })
      //     return false
      //   }
      //   this.handleError("登录已过期，请重新登录")
      //   userHelper.logOut(true)
      //   return false
      // }
      // console.log(data);
      if (options.errorHandle) {
        this.handleError(data.msg || data.Msg);
      }
      if (typeof options.fail == "function") {
        options.fail(data);
      }
    }
  },
  handleError(msg) {
    if (msg) {
      dialog.tips(msg);
      return false;
    } else {
      dialog.tips(1004);
    }
  },
};

export default http;
