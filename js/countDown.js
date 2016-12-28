/**
 * Created by Administrator on 2016/12/28.
 */
(function ($) {
    "use strict";
    $.fn.countDown = function (options) {
        // 定义参数
        var settings = $.extend({
            date: null
        }, options);

        return this.each(function () {
            var self = $(this);
            var timer = null;

            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            if (!settings.date) {
                clearInterval(timer);
                console.error('Date is not set...');
            }

            /**
             * 补位
             * @param num
             * @returns {*}
             */
            function checkNum(num) {
                if (num < 10) {
                    num = '0' + num;
                }
                return num;
            }

            function count() {
                // 设置当前时间
                var current_date = new Date().getTime();
                // 设置目标时间
                var target_date = new Date(settings.date).getTime();
                // 时间差
                var diff_date = target_date - current_date;

                if (diff_date == 0) {
                    clearInterval(timer);
                    console.error('活动已结束...');
                }

                // 计算
                var days = Math.floor(diff_date / _day),
                    hours = Math.floor((diff_date % _day) / _hour),
                    minute = Math.floor((diff_date % _hour) / _minute),
                    second = Math.floor((diff_date % _minute) / _second);

                hours = checkNum(hours);
                minute = checkNum(minute);
                second = checkNum(second);

                self.html('剩余：' + '<span class="red">' + days + '</span>' + '天' + '<span class="red">' + hours + '</span>' + '时' + '<span class="red">' + minute + '</span>' + '分' + '<span class="red">' + second + '</span>' + '秒')
            }

            timer = setInterval(count, 1000);
        })
    }
})(jQuery);