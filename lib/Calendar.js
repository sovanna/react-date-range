'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _parseInput = require('./utils/parseInput.js');

var _parseInput2 = _interopRequireDefault(_parseInput);

var _DayCell = require('./DayCell.js');

var _DayCell2 = _interopRequireDefault(_DayCell);

var _styles = require('./styles.js');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function checkRange(dayMoment, range) {
  return dayMoment.isBetween(range['startDate'], range['endDate']) || dayMoment.isBetween(range['endDate'], range['startDate']);
}

function checkStartEdge(dayMoment, range) {
  var startDate = range.startDate;


  return dayMoment.isSame(startDate);
}

function checkEndEdge(dayMoment, range) {
  var endDate = range.endDate;


  return dayMoment.isSame(endDate);
}

function isOusideMinMax(dayMoment, minDate, maxDate, format) {
  return minDate && dayMoment.isBefore((0, _parseInput2.default)(minDate, format)) || maxDate && dayMoment.isAfter((0, _parseInput2.default)(maxDate, format));
}

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props, context) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Calendar).call(this, props, context));

    var format = props.format;
    var range = props.range;
    var theme = props.theme;
    var offset = props.offset;
    var firstDayOfWeek = props.firstDayOfWeek;


    var date = (0, _parseInput2.default)(props.date, format);
    var state = {
      date: date,
      shownDate: (range && range['endDate'] || date).clone().add(offset, 'months'),
      firstDayOfWeek: firstDayOfWeek || _moment2.default.localeData().firstDayOfWeek()
    };

    _this.state = state;
    _this.styles = (0, _styles2.default)(theme);

    _this.handleSelect = _this.handleSelect.bind(_this);
    _this.handleClickChangeMonthLeft = _this.handleClickChangeMonthLeft.bind(_this);
    _this.handleClickChangeMonthRight = _this.handleClickChangeMonthRight.bind(_this);
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onInit = this.props.onInit;

      onInit && onInit(this.state.date);
    }
  }, {
    key: 'getShownDate',
    value: function getShownDate() {
      var _props = this.props;
      var link = _props.link;
      var offset = _props.offset;


      var shownDate = link ? link.clone().add(offset, 'months') : this.state.shownDate;

      return shownDate;
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(newDate) {
      var _props2 = this.props;
      var link = _props2.link;
      var onChange = _props2.onChange;


      onChange && onChange(newDate, Calendar);

      if (!link) {
        this.setState({ date: newDate });
      }
    }
  }, {
    key: 'handleClickChangeMonthLeft',
    value: function handleClickChangeMonthLeft(event) {
      this.changeMonth(-1, event);
    }
  }, {
    key: 'handleClickChangeMonthRight',
    value: function handleClickChangeMonthRight(event) {
      this.changeMonth(+1, event);
    }
  }, {
    key: 'changeMonth',
    value: function changeMonth(direction, event) {
      event.preventDefault();
      var _props3 = this.props;
      var link = _props3.link;
      var linkCB = _props3.linkCB;


      if (link && linkCB) {
        return linkCB(direction);
      }

      var newMonth = this.state.shownDate.clone().add(direction, 'months');

      this.setState({
        shownDate: newMonth
      });
    }
  }, {
    key: 'renderMonthAndYear',
    value: function renderMonthAndYear(classes) {
      var shownDate = this.getShownDate();
      var month = _moment2.default.months(shownDate.month());
      var year = shownDate.year();

      var styles = this.styles;
      var onlyClasses = this.props.onlyClasses;


      return _react2.default.createElement(
        'div',
        { style: onlyClasses ? null : styles['MonthAndYear'], className: classes.monthAndYearWrapper },
        _react2.default.createElement(
          'button',
          {
            style: onlyClasses ? undefined : _extends({}, styles['MonthButton'], { float: 'left' }),
            className: classes.prevButton,
            onClick: this.handleClickChangeMonthLeft
          },
          _react2.default.createElement('i', { style: onlyClasses ? undefined : _extends({}, styles['MonthArrow'], styles['MonthArrowPrev']) })
        ),
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            'span',
            { className: classes.month },
            month
          ),
          _react2.default.createElement(
            'span',
            { className: classes.monthAndYearDivider },
            ' - '
          ),
          _react2.default.createElement(
            'span',
            { className: classes.year },
            year
          )
        ),
        _react2.default.createElement(
          'button',
          {
            style: onlyClasses ? undefined : _extends({}, styles['MonthButton'], { float: 'right' }),
            className: classes.nextButton,
            onClick: this.handleClickChangeMonthRight
          },
          _react2.default.createElement('i', { style: onlyClasses ? undefined : _extends({}, styles['MonthArrow'], styles['MonthArrowNext']) })
        )
      );
    }
  }, {
    key: 'renderWeekdays',
    value: function renderWeekdays(classes) {
      var dow = this.state.firstDayOfWeek;
      var weekdays = [];
      var styles = this.styles;
      var onlyClasses = this.props.onlyClasses;


      for (var i = dow; i < 7 + dow; i++) {
        var day = _moment2.default.weekdaysMin(i);

        weekdays.push(_react2.default.createElement(
          'span',
          { style: onlyClasses ? undefined : styles['Weekday'], className: classes.weekDay, key: day },
          day
        ));
      }

      return weekdays;
    }
  }, {
    key: 'renderDays',
    value: function renderDays(classes) {
      var _this2 = this;

      // TODO: Split this logic into smaller chunks
      var styles = this.styles;
      var _props4 = this.props;
      var range = _props4.range;
      var minDate = _props4.minDate;
      var maxDate = _props4.maxDate;
      var format = _props4.format;
      var onlyClasses = _props4.onlyClasses;


      var shownDate = this.getShownDate();
      var _state = this.state;
      var date = _state.date;
      var firstDayOfWeek = _state.firstDayOfWeek;

      var dateUnix = date.unix();

      var monthNumber = shownDate.month();
      var dayCount = shownDate.daysInMonth();
      var startOfMonth = shownDate.clone().startOf('month').isoWeekday();

      var lastMonth = shownDate.clone().month(monthNumber - 1);
      var lastMonthDayCount = lastMonth.daysInMonth();

      var nextMonth = shownDate.clone().month(monthNumber + 1);

      var days = [];

      // Previous month's days
      var diff = Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7;
      for (var i = diff - 1; i >= 0; i--) {
        var dayMoment = lastMonth.clone().date(lastMonthDayCount - i);
        days.push({ dayMoment: dayMoment, isPassive: true });
      }

      // Current month's days
      for (var _i = 1; _i <= dayCount; _i++) {
        var _dayMoment = shownDate.clone().date(_i);
        days.push({ dayMoment: _dayMoment });
      }

      // Next month's days
      var remainingCells = 42 - days.length; // 42cells = 7days * 6rows
      for (var _i2 = 1; _i2 <= remainingCells; _i2++) {
        var _dayMoment2 = nextMonth.clone().date(_i2);
        days.push({ dayMoment: _dayMoment2, isPassive: true });
      }

      var today = (0, _moment2.default)().startOf('day');
      return days.map(function (data, index) {
        var dayMoment = data.dayMoment;
        var isPassive = data.isPassive;

        var isSelected = !range && dayMoment.unix() === dateUnix;
        var isInRange = range && checkRange(dayMoment, range);
        var isStartEdge = range && checkStartEdge(dayMoment, range);
        var isEndEdge = range && checkEndEdge(dayMoment, range);
        var isEdge = isStartEdge || isEndEdge;
        var isToday = today.isSame(dayMoment);
        var isOutsideMinMax = isOusideMinMax(dayMoment, minDate, maxDate, format);

        return _react2.default.createElement(_DayCell2.default, _extends({
          onSelect: _this2.handleSelect
        }, data, {
          theme: styles,
          isStartEdge: isStartEdge,
          isEndEdge: isEndEdge,
          isSelected: isSelected || isEdge,
          isInRange: isInRange,
          isToday: isToday,
          key: index,
          isPassive: isPassive || isOutsideMinMax,
          onlyClasses: onlyClasses,
          classNames: classes
        }));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles;
      var _props5 = this.props;
      var onlyClasses = _props5.onlyClasses;
      var classNames = _props5.classNames;


      var classes = _extends({}, _styles.defaultClasses, classNames);

      return _react2.default.createElement(
        'div',
        { style: onlyClasses ? undefined : _extends({}, styles['Calendar'], this.props.style), className: classes.calendar },
        _react2.default.createElement(
          'div',
          { className: classes.monthAndYear },
          this.renderMonthAndYear(classes)
        ),
        _react2.default.createElement(
          'div',
          { className: classes.weekDays },
          this.renderWeekdays(classes)
        ),
        _react2.default.createElement(
          'div',
          { className: classes.days },
          this.renderDays(classes)
        )
      );
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.defaultProps = {
  format: 'DD/MM/YYYY',
  theme: {},
  onlyClasses: false,
  classNames: {}
};

Calendar.propTypes = {
  classNames: _react.PropTypes.object,
  date: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string, _react.PropTypes.func]),
  firstDayOfWeek: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  format: _react.PropTypes.string.isRequired,
  link: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    endDate: _react.PropTypes.object,
    startDate: _react.PropTypes.object
  }), _react.PropTypes.bool]),
  linkCB: _react.PropTypes.func,
  maxDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  minDate: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func, _react.PropTypes.string]),
  offset: _react.PropTypes.number,
  onChange: _react.PropTypes.func,
  onInit: _react.PropTypes.func,
  onlyClasses: _react.PropTypes.bool,
  range: _react.PropTypes.shape({
    startDate: _react.PropTypes.object,
    endDate: _react.PropTypes.object
  }),
  sets: _react.PropTypes.string,
  style: _react.PropTypes.object,
  theme: _react.PropTypes.object
};

exports.default = Calendar;