const dateHelper = {
  /**
   * 字符串日期 转 标准时间
   * @method stringToDate
   * @param {string} dateStr "2020-07-01"
   * @returns {Date}   Wed Apr 01 2020 00:00:00 GMT+0800 (中国标准时间)
   */

  transStringToDate(dateStr) {
    let dateArr = dateStr.split("-");
    let year = parseInt(dateArr[0]);
    let month = parseInt(dateArr[1]) - 1;
    let day = parseInt(dateArr[2]);
    return new Date(year, month, day);
  },

  /**
   * 获取月份天数
   * @param {string} yearMonth "2017-01"
   * @params {number} (31, 30, 28)天
   */
  getDaysOfMonth(yearMonth) {
    let dateArr = yearMonth.split("-");
    let year = parseInt(dateArr[0]);
    let lastMonth = parseInt(dateArr[1]);
    return new Date(year, lastMonth, 0).getDate();
  },

  // getDaysInOneMonth(year, month){
  //   month = parseInt(month, 10);
  //   var day= new Date(year, month, 0);  
  //   return day.getDate();  
  // },

  getNextDay(dateStr) {
    let date;
    date = dateStr ? this.transStringToDate(dateStr) : new Date();
    date.setDate(date.getDate() + 1);
    return date;
  },
  getNextDayByDate(date) {
    date.setDate(date.getDate() + 1);
    return date;
  },

  /**
   * cusDate 当前时间
   * oriDate  比较时间
   * 返回 正数为cusDate>oriDate
   */
  computeIntervalOfDays(sDateStr, eDateStr) {
    let sDate = this.transStringToDate(sDateStr);
    let eDate = this.transStringToDate(eDateStr);
    let sTime = sDate.getTime();
    let eTime = eDate.getTime();
    return (eTime - sTime) / (1000 * 60 * 60 * 24);
  },

  /**
   *  时间戳转 “yyyy-mm-dd”
   * **/
  computedTimestamp(timestamp) {
    let date = new Date(timestamp);
    // let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    month = month < 10 ? "0"+month:month;
    day = day < 10 ? "0"+day:day;
    return month+'月'+day+'日';
  },
  
  /**
   *  工位订单 时间戳转 “yyyy-mm-dd”
   * **/
  orderComputedTimestamp(timestamp) {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    month = month < 10 ? "0"+month:month;
    day = day < 10 ? "0"+day:day;
    return year+'-'+month+'-'+day;
  },

  /**
   * @method formatDate
   * @param {Date} date
   * @param {string} format "YYYY-mm-dd"
   * @returns {string}
   * @desc 格式化日期
   */

  formatDate(date, format) {
    if (typeof date == "string" || typeof date != "object") {
      return;
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let weekDay = date.getDay();
    // let ms = date.getMilliseconds();
    let weekDayString = "";

    var dayOfWeekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

    weekDayString = dayOfWeekArr[weekDay];

    let dateString = format || "yyyy-MM-dd HH:mm:ss";

    //Year
    dateString = dateString.replace(/yyyy/g, year);
    dateString = dateString.replace(/YYYY/g, year);
    dateString = dateString.replace(/yy/g, (year + "").substring(2, 4));
    dateString = dateString.replace(/YY/g, (year + "").substring(2, 4));

    //Month
    let monthStr = "0" + month;
    dateString = dateString.replace(
      /MM/g,
      monthStr.substring(monthStr.length - 2)
    );

    //Day
    let dayStr = "0" + day;
    dateString = dateString.replace(/dd/g, dayStr.substring(dayStr.length - 2));

    //hour
    let hourStr = "0" + hour;
    dateString = dateString.replace(
      /HH/g,
      hourStr.substring(hourStr.length - 2)
    );
    dateString = dateString.replace(
      /hh/g,
      hourStr.substring(hourStr.length - 2)
    );

    //minute
    let minuteStr = "0" + minute;
    dateString = dateString.replace(
      /mm/g,
      minuteStr.substring(minuteStr.length - 2)
    );

    // //Millisecond
    // dateString = dateString.replace(/sss/g, ms);
    // dateString = dateString.replace(/SSS/g, ms);

    //second
    let secondStr = "0" + second;
    dateString = dateString.replace(
      /ss/g,
      secondStr.substring(secondStr.length - 2)
    );
    dateString = dateString.replace(
      /SS/g,
      secondStr.substring(secondStr.length - 2)
    );

    //weekDay
    dateString = dateString.replace(/E/g, weekDayString);
    return dateString;
  }
};

export default dateHelper;
