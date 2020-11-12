// componentes/select-date/select-date.js
import dateHelper from "../../utils/date";
import dialogHelper from "../../utils/dialog";
import system from "../../utils/system";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    startDate: {
      type: "String",
      value: dateHelper.formatDate(new Date(), "YYYY-MM-dd"),
    },
    endDate: {
      type: "String",
      value: dateHelper.formatDate(dateHelper.getNextDay(), "YYYY-MM-dd"),
    },
    hidden: {
      type: "Boolean",
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: 0,
    weeks: ["日", "一", "二", "三", "四", "五", "六"],
  },

  ready() {
    this.initMap();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initMap() {
      let curDate = new Date(
        new Date(new Date().toLocaleDateString()).getTime()
      ); // 当前标准时间
      this.setData({
        curDate,
      });

      let year = curDate.getFullYear(); // 年
      let month = curDate.getMonth() + 1; // 月
      let mapOfDate = [];

      for (let i = 0; i < 12; i++) {
        let yearMonth = year + "-" + month; // 年-月
        let yearMonthDate = dateHelper.transStringToDate(yearMonth + "-1");
        mapOfDate.push({
          yearMonth,
          yearMonthStr: dateHelper.formatDate(yearMonthDate, "YYYY 年 MM 月"), // 年月
          map: this.computeMapOfDateForMonth(yearMonth),
        });
        if (month == 12) {
          month = 1;
          year++;
        } else {
          month++;
        }
      }

      this.setData({
        mapOfDate,
      });
    },

    computeMapOfDateForMonth(yearMonth) {
      let daysOfMonth = dateHelper.getDaysOfMonth(yearMonth); // 获取该月份天数
      let daysMap = [];

      for (let day = 0; day < daysOfMonth; day++) {
        // 0-不可选择 1-可选择 2-被选中
        //比现在的时间比较是大于还是小于，小于则不可点击
        let dateStr = yearMonth + "-" + (day + 1);
        if (!this.canSelect(dateStr)) {
          daysMap[day] = 0;
        } else if (this.isSelected(dateStr)) {
          daysMap[day] = 2;
        } else {
          daysMap[day] = 1;
        }
      }
      let firstDayOfWeek = dateHelper
        .transStringToDate(yearMonth + `-01`)
        .getDay();

      return {
        firstDayOfWeek,
        daysMap,
      };
    },

    // 可选择
    canSelect(dateStr) {
      let date = dateHelper.transStringToDate(dateStr); // Sun Jun 13 2021 00:00:00 GMT+0800 (中国标准时间)
      if (date < this.data.curDate) {
        return false;
      }
      return true;
    },

    // 是否选择
    isSelected(dateStr) {
      if (this.data.status == 1) {
        return (
          dateHelper.computeIntervalOfDays(this.data.startDate, dateStr) == 0
        );
      }
      return (
        dateHelper.computeIntervalOfDays(this.data.startDate, dateStr) >= 0 &&
        dateHelper.computeIntervalOfDays(dateStr, this.data.endDate) >= 0
      );
    },

    // 选择天数
    selectDay(event) {
      const dataSet = event.target.dataset;
      let selectedDay = dataSet.date; // 2020-7-9
      if (!this.canSelect(selectedDay)) {
        dialogHelper.tips(2001); // 请选择当天之后的日期
        return false;
      }

      if (this.data.status != 1) {
        this.setData({
          status: 1,
          startDate: selectedDay,
        });
      } else {
        let startDate = this.data.startDate;
        let endDate = selectedDay;
        let intervalOfDays = dateHelper.computeIntervalOfDays(this.data.startDate, selectedDay); // 选择间隔时间 3天
        if (Math.abs(intervalOfDays) > 27) {
          dialogHelper.tips(2002); // 入住时间与离店时间不能超过28天
          return false;
        }
        if (Math.abs(intervalOfDays) == 0) {
          dialogHelper.tips(2003); // 入住时间不能与离店时间相同
          return false;
        }
        if (intervalOfDays < 0) {
          startDate = selectedDay;
          endDate = this.data.startDate;
        }
        this.setData({
          status: 2,
          startDate,
          endDate,
        });
        this.triggerEvent("setDate", {
          startDate,
          endDate,
        });
      }
      this.initMap();
    },
  },
});
