import http from "./http";
import user from "./user";
import route from "./route";
import dialog from "./dialog";

const pay = {
  doPay(orderId, callback) {
    const openid = user.getLoginInfo().openid;
    if (!orderId || !openid) {
      console.error("缺少参数");
      return false;
    }
    http.post("pay_order", {
      data: {
        orderId: orderId,
        openId: openid
      },
      success(data) {
        const params = {
          timeStamp: data.timeStamp, // 时间戳
          nonceStr: data.nonceStr, // 随机字符串
          package: data.package,  // prepay_id 参数值
          signType: data.signType, // 签名算法
          paySign: data.paySign, // 签名
          success() {
            callback(true);
          },
          fail(res) {
            if (res.errMsg == "requestPayment:fail cancel") {
              dialog.alert("您取消了支付", () => {
                if (typeof callback == "function") {
                  callback(false);
                }
              });
              return false;
            }
            dialog.alert(res.errMsg, () => {
              if (typeof callback == "function") {
                callback(false);
              }
            });
          }
        };
        wx.requestPayment(params);
      }
    });
  }
};

export default pay;
