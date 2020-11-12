const route = {
  push(url, params) {
    if (!url) {
      return false;
    }
    if (typeof params == "object") {
      url += this.handleParams(params);
    }
    wx.navigateTo({
      url,
    });
  },
  // 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
  replace(url, params) {
    if (!url) {
      return false;
    }
    if (typeof params == "object") {
      url += this.handleParams(params);
    }
    wx.redirectTo({
      url,
    });
  },
  back(url, params) {
    if (!url) {
      return false;
    }
    if (typeof params == "object") {
      url += this.handleParams(params);
    }
    wx.navigateBack({
      url,
    });
  },
  // 关闭所有页面，打开其中的某个页面
  reLaunch(url, params) {
    if (!url) {
      return false;
    }
    if (typeof params == "object") {
      url += this.handleParams(params);
    }
    wx.reLaunch({
      url,
    });
  },
  // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
  switchTab(url, params) {
    if (!url) {
      return false;
    }
    if (typeof params == "object") {
      url += this.handleParams(params);
    }
    wx.switchTab({
      url,
    });
  },

  // 分享
  share(url, params) {
    if (!url) {
      return false;
    }
    if (typeof params == "object") {
      url += this.handleParams(params);
    }
    return url;
  },

  handleParams(params) {
    let paramsUrl = "?";
    let paramsArr = [];
    let needTrans = [];
    for (let key in params) {
      let param = params[key];
      if (typeof param == "object" || typeof param == "array") {
        param = encodeURIComponent(JSON.stringify(param)); // 转义
        needTrans.push(key);
      }
      paramsArr.push([key + "=" + param]); // 每一个参数对应value
    }
    if (needTrans.length > 0) {
      let needTransStr = encodeURIComponent(JSON.stringify(needTrans));
      paramsArr.push(["needTrans=" + needTransStr]);
    }
    paramsUrl += paramsArr.join("&"); // 拼接参数

    return paramsUrl;
  },

  parse(options) {
    let needTrans = [];
    if (options.needTrans) {
      needTrans = JSON.parse(decodeURIComponent(options.needTrans));
    }
    if (needTrans.length > 0) {
      for (let key of needTrans) {
        options[key] = JSON.parse(decodeURIComponent(options[key]));
      }
    }
    delete options.needTrans;
    return options;
  },
};

export default route;

export const bindTapLink = function (event) {
  const href = event.currentTarget.dataset.href;
  const type = event.currentTarget.dataset.type;
  if (!href) {
    return false;
  }
  switch (type) {
    case "switch":
      wx.switchTab({
        url: href,
      });
      break;
    case "link":
      wx.navigateTo({
        url: href,
      })
    default:
      route.push(href);
      break;
  }
};
