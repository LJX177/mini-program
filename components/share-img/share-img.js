// assets/components/share-img/share-img.js
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
    },
    shareImg: {
      type: String,
      observer: function (newVal, oldVal) {
        this.setData({
          "data.views[7].url": newVal,
        });
      },
    },
    itemTitle: {
      type: String,
      observer: function (newVal) {
        this.setData({
          "data.views[3].text": newVal,
        });
      },
    },
    title: {
      type: String,
      observer: function (newVal) {
        this.setData({
          "data.views[6].text": newVal,
        });
      },
    },
    price: {
      type: String,
      observer: function (newVal) {
        this.setData({
          "data.views[4].text": "￥" + newVal,
          "data.views[5].text": "惊喜价",
        });
      },
    },
    point: {
      type: String,
      observer: function (newVal) {
        this.setData({
          "data.views[4].text": newVal + "积分",
          "data.views[5].text": "惊喜价",
        });
      },
    },
    qrcode: {
      type: String,
      observer: function (newVal) {
        this.setData({
          "data.views[8].content": newVal,
        });
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    actions: [
      {
        name: "发送朋友",
        openType: "share",
      },
      {
        name: "生成海报",
        index: "poster",
      },
    ],
    data: {
      background: "#fff",
      width: "560px",
      height: "995px",
      views: [
        {
          type: "text",
          text: "你所有羡慕的生活，这里都有……",
          css: {
            width: "400px",
            fontSize: "25px",
            textAlign: "center",
            top: "40px",
            left: "80px",
          },
        },
        {
          type: "text",
          text: "@同派",
          css: {
            width: "400px",
            fontSize: "22px",
            textAlign: "right",
            top: "94px",
            left: "80px",
          },
        },
        {
          type: "text",
          text: " ",
          css: {
            width: "476px",
            lineHeight: "150px",
            top: "625px",
            left: "42px",
            borderWidth: "2px",
            borderColor: "#ddd",
          },
        },
        {
          type: "text",
          text: "",
          css: {
            textAlign: "center",
            width: "476px",
            top: "650px",
            left: "42px",
            fontSize: "28px",
          },
        },
        {
          type: "text",
          text: "",
          css: {
            width: "120px",
            textAlign: "right",
            left: "160px",
            fontSize: "28px",
            color: "#ab5c57",
            top: "714px",
          },
        },
        {
          type: "text",
          text: "",
          css: {
            padding: "6px 10px",
            lineHeight: "22px",
            top: "721px",
            left: "300px",
            fontSize: "16px",
            color: "#fff",
            background: "#ab5c57",
            borderRadius: "17px",
          },
        },
        {
          type: "text",
          text: "",
          css: {
            textAlign: "center",
            width: "476px",
            top: "685px",
            left: "42px",
            fontSize: "28px",
          },
        },
        {
          id: "share-img",
          type: "image",
          url: "",
          css: {
            width: "480px",
            height: "480px",
            top: "150px",
            left: "40px",
          },
        },
        {
          type: "qrcode",
          content: "",
          css: {
            width: "112px",
            height: "112px",
            top: "835px",
            left: "47px",
          },
        },
        {
          type: "text",
          text: "长按识别二维码\n打开惊喜！",
          css: {
            color: "#8b8b8b",
            width: "320px",
            top: "832px",
            left: "175px",
            fontSize: "22px",
            lineHeight: "30px",
          },
        },
        {
          type: "text",
          text: "此商品由上海浦东同派酒店提供",
          css: {
            color: "#8b8b8b",
            width: "320px",
            top: "925px",
            left: "172px",
            fontSize: "20px",
            lineHeight: "30px",
          },
        },
      ],
    },
    path: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImgOK(e) {
      this.setData({
        path: e.detail.path,
      });
    },
    onCloseImg(e) {
      this.setData({
        showShareImg: false,
      });
    },
    // 保存图片
    saveImg: function () {
      let self = this;
      // 保存图片到系统相册
      wx.saveImageToPhotosAlbum({
        filePath: this.data.path,
        success(res) {
          Dialog.alert({
            title: "提示",
            message: "保存成功，请在手机相册中查看海报",
            context: self,
            selector: "#van-dialog-share",
          }).then(() => {
            // on close
          });
        },
        fail(res) {
          let message = "";
          if (res.errMsg == "saveImageToPhotosAlbum:fail cancel") {
            message = "您取消了保存图片";
          } else {
            message = "保存失败";
            const state = true;
            self.triggerEvent(
              "savephotoguide",
              {
                state,
              },
              {}
            );
            self.setData({
              showShareImg: false,
            });
          }
          // if(res.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
          //   self.setData({
          //     isShow: true
          //   })
          // }
          Dialog.alert({
            title: "提示",
            message,
            context: self,
            selector: "#van-dialog-share",
          }).then(() => {
            // on close
            self.setData({
              isShow: true,
            });
          });
        },
      });
    },
    onClose() {
      this.setData({ 
        show: false 
      });
    },
    onSelect(event) {
      if (event.detail.index == "poster") {
        this.setData({
          showShareImg: true,
        });
      }
    },
  },
});
