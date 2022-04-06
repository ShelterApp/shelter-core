'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

/* tslint:disable */
var mappingDayPeriod = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7,
};
var mappingMonthPeriod = {
    FIRST: 1,
    SECOND: 2,
    THIRD: 3,
    FOURTH: 4,
    FIFTH: 5,
    LAST: 6,
};
var swap = function (json) {
    var ret = {};
    for (var key in json) {
        ret[json[key]] = key;
    }
    return ret;
};
// * Shared functions
var parseTimeStrToNormalTime = function (timeStr) {
    var _a = timeStr.split(' '), hourMin = _a[0], temp = _a[1];
    var bonus = temp === 'PM' ? 12 : 0;
    var _b = hourMin.split(':'), defaultHour = _b[0], min = _b[1];
    var hour = defaultHour === '12' ? '0' : defaultHour;
    return +hour + bonus + ":" + +min;
};
var getWeeksStartAndEndInMonth = function (year, month) {
    var weeks = [], firstDate = new Date(year, month, 1), lastDate = new Date(year, month + 1, 0), numDays = lastDate.getDate();
    var start = 1;
    var end = 7 - firstDate.getDay();
    {
        if (firstDate.getDay() === 0) {
            end = 1;
        }
        else {
            end = 7 - firstDate.getDay() + 1;
        }
    }
    while (start <= numDays) {
        weeks.push({ start: start, end: end });
        start = end + 1;
        end = end + 7;
        end = start === 1 && end === 8 ? 1 : end;
        if (end > numDays) {
            end = numDays;
        }
    }
    return weeks;
};
var getTotalWeeksInMonth = function (year, month) {
    return (getWeeksStartAndEndInMonth(year, month) || []).length;
};
var getCurrentWeekIndex = function (theDate) {
    var date = new Date(theDate);
    var currentDate = date.getDate();
    return (getWeeksStartAndEndInMonth(date.getFullYear(), date.getMonth())).findIndex(function (item) { return item.start >= currentDate && currentDate <= item.end; });
};
// * ------------- END SHARED FUNCTIONS
var getOpenService = function (openSchedules, targetDate) {
    if (openSchedules === void 0) { openSchedules = []; }
    var fullSchedules = openSchedules.filter(function (schedule) { return schedule.type === 'FULL_DAY'; });
    var weeklySchedules = openSchedules.filter(function (schedule) { return schedule.type === 'WEEKLY'; });
    var monthlySchedules = openSchedules.filter(function (schedule) { return schedule.type === 'MONTHLY'; });
    var dateRangeSchedules = openSchedules.filter(function (schedule) { return schedule.type === 'DATE_RANGE'; });
    var getOpenFullDay = function () {
        return fullSchedules[0];
    };
    var getOpenWeekly = function () {
        return weeklySchedules.find(function (date) {
            var startDate = new Date(date.startTime);
            var endDate = new Date(date.endTime);
            return (targetDate > startDate) && (targetDate < endDate);
        });
    };
    var getOpenMonthly = function () {
        var currentDateTime = new Date();
        var totalWeekInMonth = getTotalWeeksInMonth(currentDateTime.getFullYear(), currentDateTime.getMonth());
        var weekIndex = getCurrentWeekIndex(currentDateTime);
        var swapMappingMonthlyPeriod = swap(mappingMonthPeriod);
        // filter the 
        return monthlySchedules.filter(function (date) {
            if (weekIndex === totalWeekInMonth) {
                return (date.period === swapMappingMonthlyPeriod[weekIndex]) || (date.period === swapMappingMonthlyPeriod[6]); // * 6 is LAST
            }
            return date.period === swapMappingMonthlyPeriod[weekIndex];
        }).find(function (date) {
            var currentDayIndex = (new Date()).getDay() || 7;
            var startDate = new Date(date.startTime);
            var endDate = new Date(date.endTime);
            return currentDayIndex === mappingDayPeriod[date.day] && (targetDate > startDate) && (targetDate < endDate);
        });
    };
    var getOpenDateRange = function () {
        return dateRangeSchedules.find(function (date) {
            var startDate = new Date(date.startTime);
            var endDate = new Date(date.endTime);
            return (targetDate > startDate) && (targetDate < endDate);
        });
    };
    // * FOr weekly
    var isOpen = getOpenFullDay() || getOpenDateRange() || getOpenWeekly() || getOpenMonthly();
    return isOpen;
};
var getNextOpenSchedule = function (openSchedules, targetDate) {
    if (openSchedules === void 0) { openSchedules = []; }
    if (openSchedules.length === 1 && openSchedules[0].type === 'WEEKLY') {
        return openSchedules[0];
    }
    var weeklySchedules = openSchedules.filter(function (schedule) { return schedule.type === 'WEEKLY'; });
    var monthlySchedules = openSchedules.filter(function (schedule) { return schedule.type === 'MONTHLY'; });
    var sortByStartDate = function (schedules) {
        return schedules.sort(function (obj1, obj2) {
            var objDate1 = new Date(obj1.startTime);
            var objDate2 = new Date(obj2.startTime);
            return objDate1 - objDate2;
        });
    };
    var getNextOpenWeeklySchedule = function () {
        // * Sort by start Date
        var sortSchedules = sortByStartDate(weeklySchedules);
        return sortSchedules.find(function (date) {
            var startDate = new Date(date.startTime);
            return startDate > targetDate;
        });
    };
    var getNextOpenMonthlySchedule = function () {
        var sortSchedules = sortByStartDate(monthlySchedules);
        return sortSchedules.find(function (date) {
            var startDate = new Date(date.startTime);
            return startDate > targetDate;
        });
    };
    var bestNextSchedules = sortByStartDate([
        getNextOpenWeeklySchedule(),
        getNextOpenMonthlySchedule(),
    ]);
    return bestNextSchedules[0];
};
var groupBy = function (items, key) {
    return items.reduce(function (result, item) {
        var _a;
        return (__assign(__assign({}, result), (_a = {}, _a[item[key]] = __spreadArrays((result[item[key]] || []), [
            item,
        ]), _a)));
    }, {});
};
var transformOpenSchedule = function (schedules) {
    if (schedules === void 0) { schedules = []; }
    var fullDaySchedules = schedules.filter(function (schedule) { return schedule.type === 'FULL_DAY'; });
    var weeklySchedules = schedules.filter(function (schedule) { return schedule.type === 'WEEKLY'; });
    var monthlySchedules = schedules.filter(function (schedule) { return schedule.type === 'MONTHLY'; });
    var dateRangeSchedules = schedules.filter(function (schedule) { return schedule.type === 'DATE_RANGE'; });
    var weeklySchedulesGroupByDayObj = groupBy(weeklySchedules, 'day');
    // * Check & merge object if some start date have the end Time at 59 and next time at 00
    var newWeeklyObj = {};
    for (var day in weeklySchedulesGroupByDayObj) {
        if (!newWeeklyObj[day]) {
            newWeeklyObj[day] = [];
        }
        var isMerge = false;
        for (var index in weeklySchedulesGroupByDayObj[day]) {
            var scheduleInDay = weeklySchedulesGroupByDayObj[day][index];
            if (isMerge) { // * Skip the rest if we had 1 case for merge
                continue;
            }
            var scheduleDateTime = new Date(scheduleInDay.endTime);
            var endTimeAtHour = scheduleDateTime.getHours();
            var endTimeAtMin = scheduleDateTime.getMinutes();
            if (endTimeAtHour === 23 && endTimeAtMin === 59) {
                // * Do things here
                var nextOpenTimeInDay = weeklySchedulesGroupByDayObj[day][index + 1];
                if (nextOpenTimeInDay) {
                    var nextScheduleOpenDateTime = new Date(nextOpenTimeInDay.startTime);
                    var nextStartTimeAtHour = nextScheduleOpenDateTime.getHours();
                    var nextStartTimeAtMin = nextScheduleOpenDateTime.getMinutes();
                    if (nextStartTimeAtHour === 0 && nextStartTimeAtMin === 0) {
                        // * Merge here
                        isMerge = true;
                        var newEndTime = new Date(nextOpenTimeInDay.endTime);
                        newWeeklyObj[day].push(__assign(__assign({}, scheduleInDay), { endTime: new Date(newEndTime.setDate(newEndTime.getDate() + 1)) }));
                        continue;
                    }
                }
            }
            newWeeklyObj[day].push(scheduleInDay);
        }
    }
    var transformWeekly = Object.keys(newWeeklyObj).reduce(function (list, dateKey) {
        for (var _i = 0, _a = newWeeklyObj[dateKey]; _i < _a.length; _i++) {
            var date = _a[_i];
            list.push(date);
        }
        return list;
    }, []);
    return __spreadArrays(fullDaySchedules, transformWeekly, monthlySchedules, dateRangeSchedules);
};
var convertHourToDateTime = function (schedules) {
    if (schedules === void 0) { schedules = []; }
    var weeklySchedules = schedules.filter(function (schedule) { return schedule.type === 'WEEKLY'; });
    var monthlySchedules = schedules.filter(function (schedule) { return schedule.type === 'MONTHLY'; });
    var dateRangeSchedules = schedules.filter(function (schedule) { return schedule.type === 'DATE_RANGE'; });
    var currentDateTime = new Date();
    var currentDayIndex = currentDateTime.getDay() || 7; // * if SUNDAY -> 7
    var weekIndex = getCurrentWeekIndex(currentDateTime);
    var convertForWeekly = function (time, day) {
        var _a = time.split(':'), hour = _a[0], min = _a[1];
        var targetDate = new Date();
        targetDate.setHours(+hour);
        targetDate.setMinutes(+min);
        if (currentDayIndex > mappingDayPeriod[day]) {
            var diffDay = 7 - currentDayIndex;
            targetDate.setDate(targetDate.getDate() + diffDay + mappingDayPeriod[day]);
        }
        else if (mappingDayPeriod[day] > currentDayIndex) {
            var diffDay = mappingDayPeriod[day] - currentDayIndex;
            targetDate.setDate(targetDate.getDate() + diffDay);
        }
        return targetDate;
    };
    var convertForMonthly = function (period, time, day) {
        var _a = time.split(':'), hour = _a[0], min = _a[1];
        var targetDate = new Date();
        targetDate.setHours(+hour);
        targetDate.setMinutes(+min);
        if (mappingMonthPeriod[period] === weekIndex) {
            if (currentDayIndex > mappingDayPeriod[day]) {
                var diffDay = 7 - currentDayIndex;
                targetDate.setDate(targetDate.getDate() + diffDay + mappingDayPeriod[day]);
            }
            else if (mappingDayPeriod[day] > currentDayIndex) {
                var diffDay = mappingDayPeriod[day] - currentDayIndex;
                targetDate.setDate(targetDate.getDate() + diffDay);
            }
        }
        else if (mappingMonthPeriod[period] > weekIndex) {
            var diffDay = 7 - currentDayIndex;
            var diffWeek = mappingMonthPeriod[period] - weekIndex;
            var totalDiffDay = diffDay + (diffWeek * mappingDayPeriod[day]);
            targetDate.setDate(targetDate.getDate() + totalDiffDay);
        }
        else if (weekIndex > mappingMonthPeriod[period]) {
            targetDate.setMonth(targetDate.getMonth() + 1);
            targetDate.setDate(1);
            var diffWeeks = mappingMonthPeriod[period] - 1;
            targetDate.setDate(targetDate.getDate() + ((diffWeeks * 7) * mappingDayPeriod[day]));
        }
        return targetDate;
    };
    var transformWeekly = weeklySchedules.map(function (schedule) {
        return __assign(__assign({}, schedule), { startTime: convertForWeekly(schedule.startTime, schedule.day), endTime: convertForWeekly(schedule.endTime, schedule.day) });
    });
    var transformMonthly = monthlySchedules.map(function (schedule) {
        return __assign(__assign({}, schedule), { startTime: convertForMonthly(schedule.period, schedule.startTime, schedule.day), endTime: convertForMonthly(schedule.period, schedule.endTime, schedule.day) });
    });
    var transformDateRange = dateRangeSchedules.map(function (schedule) {
        var startTime = new Date(schedule.startDate);
        var endTime = new Date(schedule.endDate);
        var _a = schedule.startTime.split(':'), _b = _a[0], startHour = _b === void 0 ? 0 : _b, _c = _a[1], startMin = _c === void 0 ? 0 : _c;
        var _d = schedule.endTime.split(':'), _e = _d[0], endHour = _e === void 0 ? 0 : _e, _f = _d[1], endMin = _f === void 0 ? 0 : _f;
        startTime.setHours(+startHour);
        startTime.setMinutes(+startMin);
        endTime.setHours(+endHour);
        endTime.setMinutes(+endMin);
        return __assign(__assign({}, schedule), {
            startTime: startTime,
            endTime: endTime
        });
    });
    return __spreadArrays(transformWeekly, transformMonthly, transformDateRange);
};
var transformScheduleDateTime = function (schedules) {
    if (schedules === void 0) { schedules = []; }
    var normalSchedules = schedules.map(function (date) {
        return __assign(__assign({}, date), { startTime: date.startTime ? parseTimeStrToNormalTime(date.startTime) : undefined, endTime: date.endTime ? parseTimeStrToNormalTime(date.endTime) : undefined });
    });
    var convertSchedules = convertHourToDateTime(normalSchedules);
    var transformSchedules = transformOpenSchedule(convertSchedules);
    return transformSchedules;
};
var mergeOpenAndClosedSchedule = function (openSchedule, closedSchedule) {
    if (openSchedule === void 0) { openSchedule = {}; }
    if (closedSchedule === void 0) { closedSchedule = {}; }
    var currentDateTime = new Date();
    if (openSchedule.startTime >= closedSchedule.startTime && closedSchedule.endTime >= openSchedule.endTime) {
        return {
            openSchedule: {},
            closedSchedule: {},
        };
    }
    if (closedSchedule.startTime > openSchedule.startTime && openSchedule.endTime > closedSchedule.endTime) {
        return {
            openSchedule: __assign(__assign({}, openSchedule), { endTime: closedSchedule.startTime }),
            closedSchedule: closedSchedule,
        };
    }
    if (closedSchedule.startTime >= openSchedule.startTime && openSchedule.endTime > closedSchedule.endTime) {
        var newStartTime = closedSchedule.endTime;
        if (newStartTime > currentDateTime) {
            return {
                openSchedule: {},
                closedSchedule: closedSchedule,
                nextOpenSchedule: __assign(__assign({}, openSchedule), { startTime: newStartTime }),
            };
        }
        return {
            openSchedule: __assign(__assign({}, openSchedule), { startTime: newStartTime }),
            closedSchedule: closedSchedule,
        };
    }
    if (openSchedule.startTime >= closedSchedule.startTime && closedSchedule.endTime > openSchedule.endTime) {
        return {
            openSchedule: __assign(__assign({}, openSchedule), { endTime: closedSchedule.startTime }),
            closedSchedule: closedSchedule,
        };
    }
    if (closedSchedule.startTime >= openSchedule.startTime && closedSchedule.endTime >= openSchedule.endTime) {
        return {
            openSchedule: {},
            closedSchedule: {},
        };
    }
    return {
        openSchedule: openSchedule,
        closedSchedule: closedSchedule,
    };
};
var calculateTimeOpenCloseService = function (openSchedules, closedSchedules, targetDate) {
    if (openSchedules === void 0) { openSchedules = []; }
    if (closedSchedules === void 0) { closedSchedules = []; }
    if (targetDate === void 0) { targetDate = new Date(); }
    var transformOpenSchedules = transformScheduleDateTime(openSchedules);
    var transformClosedSchedules = transformScheduleDateTime(closedSchedules);
    var openSchedule = getOpenService(transformOpenSchedules, targetDate);
    var closedSchedule = getOpenService(transformClosedSchedules, targetDate);
    var nextOpenSchedule = getNextOpenSchedule(transformOpenSchedules, targetDate);
    if (openSchedule && closedSchedule) {
        return __assign({ nextOpenSchedule: nextOpenSchedule }, mergeOpenAndClosedSchedule(openSchedule, closedSchedule));
    }
    return {
        openSchedule: openSchedule,
        closedSchedule: closedSchedule,
        nextOpenSchedule: nextOpenSchedule,
    };
};

exports.calculateTimeOpenCloseService = calculateTimeOpenCloseService;
exports.getCurrentWeekIndex = getCurrentWeekIndex;
exports.getTotalWeeksInMonth = getTotalWeeksInMonth;
exports.parseTimeStrToNormalTime = parseTimeStrToNormalTime;
//# sourceMappingURL=services.js.map
