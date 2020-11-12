/**
 * Wx 相关API 统一封装使用
 * @author mj
 * @date 2019-12-26
 */

import global from "../config/global";

class WxApi {
	/**
	 * 调用接口获取登录凭证
	 * @param {number} url 超时时间，单位ms
	 */
	login() {
		return new Promise((resolve, reject) => {
			if (global.channel === "ewechat") {
				wx.qy &&
					wx.qy.login({
						success(res) {
							resolve(res);
						},
						fail(err) {
							reject(err);
							wx.showToast({
								title: err.errMsg,
								icon: "none"
							});
						},
					});
			} else {
				wx.login({
					success(res) {
						resolve(res);
					},
					fail(err) {
						reject(err);
						wx.showToast({
							title: err.errMsg,
							icon: "none"
						});
					},
				});
			}
		});
	}

	/**
	 * 检查登录态是否过期
	 */
	checkSession() {
		return new Promise((resolve, reject) => {
			wx.checkSession({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 获取用户信息
	 * @param {boolean} withCredentials 是否带上登录态信息
	 * @param {string} lang 显示用户信息的语言
	 */
	getUserInfo() {
		return new Promise((resolve, reject) => {
			wx.getUserInfo({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 跳转到tabBar页面,并关闭其他所有非tabBar页面
	 * @param {string | required} url
	 */
	switchTab(data) {
		return new Promise((resolve, reject) => {
			wx.switchTab({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 关闭所有页面,打开到应用内的某个页面
	 * @param {string | required} url
	 */
	reLaunch(data) {
		return new Promise((resolve, reject) => {
			wx.reLaunch({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 关闭当前页面,跳转到应用内的某个页面.但是不允许跳转到tabbar页面
	 * @param {string | required} url
	 */
	redirectTo(data) {
		return new Promise((resolve, reject) => {
			wx.redirectTo({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 保留当前页面,跳转到应用内的某个页面.但是不能跳到tabbar页面
	 * @param {string | required} url
	 */
	navigateTo(data) {
		return new Promise((resolve, reject) => {
			wx.navigateTo({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 关闭当前页面,返回上一页面或多级页面
	 * @param {number | required} delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页
	 */
	navigateBack(data) {
		return new Promise((resolve, reject) => {
			wx.navigateBack({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 使手机发生较短时间的振动
	 */
	vibrateShort() {
		return new Promise((resolve, reject) => {
			wx.vibrateShort({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 开始下拉刷新
	 */
	startPullDownRefresh() {
		return new Promise((resolve, reject) => {
			wx.startPullDownRefresh({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 停止当前页面下拉刷新
	 */
	stopPullDownRefresh() {
		return new Promise((resolve, reject) => {
			wx.stopPullDownRefresh({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 获取用户收货地址
	 */
	chooseAddress() {
		return new Promise((resolve, reject) => {
			wx.chooseAddress({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 发起 HTTPS 网络请求
	 * @param {string | required} url 开发者服务器接口地址
	 * @param {string/object/ArrayBuffer} data 请求的参数
	 * @param {Object} header 设置请求的header
	 * @param {string} method HTTP 请求方法
	 * @param {string} dataType 返回的数据格式
	 * @param {string} responseType 响应的数据类型
	 */
	request(data) {
		return new Promise((resolve, reject) => {
			wx.request({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 发起微信支付
	 * @param {string | required} timeStamp 时间戳
	 * @param {string | required} nonceStr 随机字符串，长度为32个字符以下
	 * @param {string | required} package 统一下单接口返回的 prepay_id 参数值
	 * @param {string} signType 签名算法
	 * @param {string | required} paySign 签名
	 */
	requestPayment(data) {
		return new Promise((resolve, reject) => {
			if (global.channel === "ewechat") {
				wx.qy &&
					wx.qy.requestPayment({
						...data,
						success(res) {
							resolve(res);
						},
						fail(err) {
							reject(err);
						},
					});
			} else {
				wx.requestPayment({
					...data,
					success(res) {
						resolve(res);
					},
					fail(err) {
						reject(err);
					},
				});
			}
		});
	}

	/**
	 * 显示 tabBar
	 * @param {boolean} animation 是否需要动画效果
	 */
	showTabBar(data) {
		return new Promise((resolve, reject) => {
			wx.showTabBar({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 隐藏 tabBar
	 * @param {boolean} animation 是否需要动画效果
	 */
	hideTabBar(data) {
		return new Promise((resolve) => {
			wx.hideTabBar({
				...data,
				success(res) {
					resolve(res);
				},
			});
		});
	}

	/**
	 * 显示 tabBar
	 * @param {boolean} animation 是否需要动画效果
	 */
	showTabBar(data) {
		return new Promise((resolve) => {
			wx.showTabBar({
				...data,
				success(res) {
					resolve(res);
				},
			});
		});
	}

	/**
	 * 显示消息提示框
	 * @param {string | required} title 提示的内容
	 * @param {string} icon 图标
	 * @param {string} image 自定义图标的本地路径，image 的优先级高于 icon
	 * @param {number} duration 提示的延迟时间
	 * @param {boolean} mask 是否显示透明蒙层，防止触摸穿透
	 */
	showToast({
		title,
		icon = "none",
		image,
		duration = 2000,
		mask
	}) {
		return new Promise((resolve, reject) => {
			wx.showToast({
				title,
				icon,
				mask,
				image,
				duration,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 隐藏消息提示框
	 */
	hideToast() {
		return new Promise((resolve, reject) => {
			wx.showToast({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 显示 loading 提示框
	 * @param {string | required} title 提示的内容
	 * @param {boolean} mask 是否显示透明蒙层，防止触摸穿透
	 */
	showLoading(data) {
		return new Promise((resolve, reject) => {
			wx.showLoading({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 隐藏 loading 提示框
	 */
	hideLoading() {
		return new Promise((resolve, reject) => {
			wx.hideLoading({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 显示模态对话框
	 * @param {string | required} title 提示的标题
	 * @param {string | required} content 提示的内容
	 * @param {boolean} showCancel 是否显示取消按钮
	 * @param {string} cancelText 取消按钮的文字,最多 4 个字符
	 * @param {string} cancelColor 取消按钮的文字颜色,必须是 16 进制格式的颜色字符串
	 * @param {string} confirmText 确认按钮的文字,最多 4 个字符
	 * @param {string} confirmColor 确认按钮的文字颜色,必须是 16 进制格式的颜色字符串
	 */
	showModal(data) {
		return new Promise((resolve, reject) => {
			wx.showModal({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 同步设置本地存储
	 * @param {string} key 指定的key
	 * @param {string/Object} data 需要存储的内容
	 */
	setStorageSync(key, data) {
		wx.setStorageSync(key, data);
	}

	/**
	 * 异步设置本地存储
	 * @param {string} key 指定的key
	 * @param {string/Object} data 需要存储的内容
	 */
	setStorage(data) {
		return new Promise((resolve, reject) => {
			wx.setStorage({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 同步移除本地存储
	 * @param {string} key 指定的key
	 */
	removeStorageSync(key) {
		wx.removeStorageSync(key);
	}

	/**
	 * 异步移除本地存储
	 * @param {string} key 指定的key
	 */
	removeStorage(data) {
		return new Promise((resolve, reject) => {
			wx.removeStorage({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 同步获取本地存储
	 * @param {string} key 指定的key
	 */
	getStorageSync(key) {
		return wx.getStorageSync(key);
	}

	/**
	 * 异步获取本地存储
	 * @param {string} key 指定的key
	 */
	getStorage(data) {
		return new Promise((resolve, reject) => {
			wx.getStorage({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 异步清理本地数据缓存
	 */
	clearStorageSync() {
		wx.clearStorageSync();
	}

	/**
	 * 同步清理本地数据缓存
	 */
	clearStorage() {
		return new Promise((resolve, reject) => {
			wx.clearStorage({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 异步获取系统信息
	 */
	getSystemInfo() {
		return new Promise((resolve, reject) => {
			wx.getSystemInfo({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 同步获取系统信息
	 */
	getSystemInfoSync() {
		return wx.getSystemInfoSync();
	}

	/**
	 * 动态设置当前页面的标题
	 * @param {string | required} title 页面标题
	 */
	setNavigationBarTitle(data) {
		return new Promise((resolve, reject) => {
			wx.setNavigationBarTitle({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 获取用户的当前设置
	 */
	getSetting() {
		return new Promise((resolve, reject) => {
			wx.getSetting({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 返回一个 SelectorQuery 对象实例
	 */
	createSelectorQuery() {
		return wx.createSelectorQuery();
	}

	/**
	 * 调起客户端扫码界面进行扫码
	 * @param {boolean} onlyFromCamera 是否只能从相机扫码，不允许从相册选择图片
	 * @param {array} scanType 扫码类型 ['barCode', 'qrCode']
	 */
	scanCode() {
		return new Promise((resolve, reject) => {
			wx.scanCode({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 在新页面中全屏预览图片
	 * @param {array | required} 需要预览的图片链接列表
	 * @param {string} current 当前显示图片的链接
	 */
	previewImage(data) {
		return new Promise((resolve, reject) => {
			wx.previewImage({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 获取当前的地理位置、速度。
	 * @param {string} type wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
	 * @param {string} altitude 传入 true 会返回高度信息
	 */
	getLocation(data) {
		return new Promise((resolve, reject) => {
			wx.getLocation({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 获取图片信息,网络图片需先配置download域名才能生效
	 * @param {string | required} src 图片的路径，可以是相对路径、临时文件路径、存储文件路径、网络图片路径
	 */
	getImageInfo(data) {
		return new Promise((resolve, reject) => {
			wx.getImageInfo({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 将本地资源上传到服务器。客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data
	 * @param {string | required} url 开发者服务器地址
	 * @param {string | required} filePath 要上传文件资源的路径
	 * @param {string | required} name 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
	 * @param {string | required} header HTTP 请求 Header，Header 中不能设置 Referer
	 * @param {string | required} formData HTTP 请求中其他额外的 form data
	 */
	uploadFile(data) {
		return new Promise((resolve, reject) => {
			wx.uploadFile({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 创建一个动画实例 animation
	 * @param {number} duration 动画持续时间，单位 ms
	 * @param {string} timingFunction 动画的效果
	 * @param {number} delay 动画延迟时间，单位 ms
	 * @param {string} transformOrigin
	 */
	createAnimation(data) {
		return wx.createAnimation(data);
	}

	/**
	 * 创建 canvas 的绘图上下文 CanvasContext 对象
	 * @param {string | required} canvasId 要获取上下文的 canvas 组件 canvas-id 属性
	 * @param {object} this 在自定义组件下,当前组件实例的this,表示在这个自定义组件下查找拥有 canvas-id 的 canvas ,如果省略则不在任何自定义组件内查找
	 */
	createCanvasContext(canvasId, self) {
		return wx.createCanvasContext(canvasId, self);
	}

	/**
	 * 把当前画布指定区域的内容导出生成指定大小的图片。在 draw() 回调里调用该方法才能保证图片导出成功。
	 * @param {number} x 指定的画布区域的左上角横坐标
	 * @param {number} y 指定的画布区域的左上角纵坐标
	 * @param {number} width 指定的画布区域的宽度
	 * @param {number} height 指定的画布区域的高度
	 * @param {number} destWidth 输出的图片的宽度
	 * @param {number} destHeight 输出的图片的高度
	 * @param {number} canvasId 画布标识,传入 canvas 组件的 canvas-id
	 * @param {number} canvas 画布标识,传入 canvas 组件实例 (canvas type="2d" 时使用该属性)
	 * @param {number} fileType 目标文件的类型
	 * @param {number} quality 图片的质量,目前仅对 jpg 有效.取值范围为(0, 1],不在范围内时当作 1.0 处理
	 */
	canvasToTempFilePath(data) {
		return new Promise((resolve, reject) => {
			wx.canvasToTempFilePath({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 设置页面导航条颜色
	 * @param {string | required} frontColor 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
	 * @param {number | required} backgroundColor 背景颜色值，有效值为十六进制颜色
	 * @param {number} animation 动画效果
	 */
	setNavigationBarColor(data) {
		return new Promise((resolve, reject) => {
			wx.setNavigationBarColor({
				...data,
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}

	/**
	 * 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
	 */
	getMenuButtonBoundingClientRect() {
		return wx.getMenuButtonBoundingClientRect();
	}

	/**
	 * 在input、textarea等focus拉起键盘之后，手动调用此接口收起键盘
	 */
	hideKeyboard() {
		return new Promise((resolve, reject) => {
			wx.hideKeyboard({
				success(res) {
					resolve(res);
				},
				fail(err) {
					reject(err);
				},
			});
		});
	}
}

// 单列模式返回对象
let instance;
export default () => {
	if (instance) return instance;
	instance = new WxApi();
	return instance;
};