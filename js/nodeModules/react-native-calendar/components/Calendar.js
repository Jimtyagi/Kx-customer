import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated
} from "react-native";

import Day from "./Day";

import moment from "moment";
import styles from "./styles";

const DEVICE_WIDTH = Dimensions.get("window").width;
const VIEW_INDEX = 1;
const CURRENT_VIEW_INDEX = 1;

function getNumberOfWeeks(month, weekStart) {
  const firstDay = moment(month)
    .startOf("month")
    .day();
  // console.log(firstDay);
  const offset = (firstDay - weekStart + 7) % 7;
  const days = moment(month).daysInMonth();
  return Math.ceil((offset + days) / 7);
}

export default class Calendar extends Component {
  state = {
    currentMoment: moment(this.props.startDate),
    selectedMoment: moment(this.props.selectedDate),
    rowHeight: null,
    stack: []
  };

  static propTypes = {
    currentMonth: PropTypes.any,
    customStyle: PropTypes.object,
    dayHeadings: PropTypes.array,
    eventDates: PropTypes.array,
    monthNames: PropTypes.array,
    nextButtonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onDateSelect: PropTypes.func,
    onSwipeNext: PropTypes.func,
    onSwipePrev: PropTypes.func,
    onTouchNext: PropTypes.func,
    onTouchPrev: PropTypes.func,
    onTitlePress: PropTypes.func,
    prevButtonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    removeClippedSubviews: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    selectedDate: PropTypes.any,
    showControls: PropTypes.bool,
    showEventIndicators: PropTypes.bool,
    startDate: PropTypes.any,
    titleFormat: PropTypes.string,
    today: PropTypes.any,
    weekStart: PropTypes.number,
    calendarFormat: PropTypes.string
  };

  static defaultProps = {
    customStyle: {},
    width: DEVICE_WIDTH,
    dayHeadings: ["S", "M", "T", "W", "T", "F", "S"],
    eventDates: [],
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    nextButtonText: "Next",
    prevButtonText: "Prev",
    removeClippedSubviews: true,
    scrollEnabled: false,
    showControls: false,
    showEventIndicators: false,
    startDate: moment().format("YYYY-MM-DD"),
    titleFormat: "MMMM",
    weekStart: 1,
    calendarFormat: "monthly" // weekly or monthly
  };

  componentDidMount() {
    // fixes initial scrolling bug on Android
    setTimeout(() => this.scrollToItem(VIEW_INDEX), 0);
  }

  componentDidUpdate(prevProps, prevState) {
    //setTimeout(() => this.scrollToItem(VIEW_INDEX), 0);
    this.scrollToItem(VIEW_INDEX);
    CURRENT_VIEW_INDEX = 1;
    //console.log("componentDidUpdate",CURRENT_VIEW_INDEX);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedDate &&
      this.props.selectedDate !== nextProps.selectedDate
    ) {
      this.setState({ selectedMoment: nextProps.selectedDate });
    }
  }

  getStack(currentMoment) {
    if (this.props.scrollEnabled) {
      let i = -VIEW_INDEX;
      const res = [];

      for (i; i <= VIEW_INDEX; i++) {
        if (this.props.calendarFormat === "monthly") {
          res.push(moment(currentMoment).add(i, "month"));
        } else {
          res.push(moment(currentMoment).add(i, "week"));
        }
      }
      return res;
    }

    return [moment(currentMoment)];
  }

  prepareEventDates(eventDates, events) {
    const parsedDates = {};

    if (events) {
      events.forEach(event => {
        if (event.date) {
          if (`${event.date}` in parsedDates) {
            let dayEvents = parsedDates[event.date];
            dayEvents.push(event);
            parsedDates[event.date] = dayEvents;
          } else {
            parsedDates[event.date] = [event];
          }
        }
      });
    } else {
      eventDates.forEach(event => {
        parsedDates[event] = {};
      });
    }
    // console.log(parsedDates);
    return parsedDates;
  }

  selectDate(thisMoment, currentMonthMoment) {
    if (this.props.selectedDate === undefined) {
      this.setState({
        selectedMoment: thisMoment,
        currentMoment: thisMoment
      });
    }

    if (currentMonthMoment.isBefore(thisMoment)) {
      //next
      if (currentMonthMoment.month() == thisMoment.month()) {
        this.props.onDateSelect &&
          this.props.onDateSelect(thisMoment ? thisMoment.format() : null);
      } else {
        if (CURRENT_VIEW_INDEX < VIEW_INDEX + 1) {
          CURRENT_VIEW_INDEX = CURRENT_VIEW_INDEX + 1;
        }
        this.scrollToItem(CURRENT_VIEW_INDEX, true);
        this.props.setScrollToDate(thisMoment);
      }
    } else if (currentMonthMoment.isAfter(thisMoment)) {
      //prev
      if (currentMonthMoment.month() == thisMoment.month()) {
        this.props.onDateSelect &&
          this.props.onDateSelect(thisMoment ? thisMoment.format() : null);
      } else {
        if (CURRENT_VIEW_INDEX > VIEW_INDEX - 1) {
          CURRENT_VIEW_INDEX = CURRENT_VIEW_INDEX - 1;
        }
        this.scrollToItem(CURRENT_VIEW_INDEX, true);
        this.props.setScrollToDate(thisMoment);
      }
    }
  }

  goToToday = () => {
    this.setState({ currentMoment: moment() });
  };

  scrollToItem(itemIndex, animated) {
    const scrollToX = itemIndex * this.props.width;
    // if (this.props.scrollEnabled && this._calendar) {
    //   // console.log(scrollToX);

    if (animated) {
      this._calendar.scrollTo({ y: 0, x: scrollToX, animated: true });
    } else {
      this._calendar.scrollTo({ y: 0, x: scrollToX, animated: false });
    }

    // }
  }

  scrollEnded(event) {
    // console.log("scrollEnded",event.nativeEvent.contentOffset.x);
    this.props.updateActivity();
    const position = event.nativeEvent.contentOffset.x;
    const currentPage = position / this.props.width;
    const newMoment =
      this.props.calendarFormat === "monthly"
        ? moment(this.state.currentMoment).add(
            currentPage - VIEW_INDEX,
            "month"
          )
        : moment(this.state.currentMoment).add(
            currentPage - VIEW_INDEX,
            "week"
          );
    //  console.log(newMoment);
    this.setState({ currentMoment: newMoment });

    if (currentPage < VIEW_INDEX) {
      this.props.onSwipePrev && this.props.onSwipePrev(newMoment);
    } else if (currentPage > VIEW_INDEX) {
      this.props.onSwipeNext && this.props.onSwipeNext(newMoment);
    }
  }

  onWeekRowLayout = event => {
    if (this.state.rowHeight !== event.nativeEvent.layout.height) {
      this.setState({ rowHeight: event.nativeEvent.layout.height });
    }
  };

  getStartMoment(calFormat, currMoment) {
    const weekStart = this.props.weekStart;

    let res;
    if (calFormat === "monthly") {
      res = moment(currMoment).startOf("month");
    } else {
      // weekly
      let sundayMoment = moment(currMoment).startOf("week");
      if (weekStart > 0) {
        res = moment(currMoment).isoWeekday(weekStart);
        if (res.diff(currMoment) > 0) {
          res = moment(currMoment)
            .subtract(7, "day")
            .isoWeekday(weekStart);
        }
      } else {
        res = sundayMoment;
      }
    }
    return res;
  }

  renderCalendarView(calFormat, argMoment, eventsMap) {
    let renderIndex = 0,
      weekRows = [],
      days = [];
    let argDaysCount = calFormat === "monthly" ? 42 : 7;

    const startOfArgMoment = this.getStartMoment(calFormat, argMoment).startOf(
        "week"
      ),
      selectedMoment = moment(this.state.selectedMoment),
      weekStart = this.props.weekStart,
      todayMoment = moment(this.props.today),
      todayIndex = todayMoment.date() - 1,
      offset =
        calFormat === "monthly"
          ? (startOfArgMoment.isoWeekday() - weekStart + 7) % 7
          : 0,
      selectedIndex = moment(selectedMoment).date() - 1;

    do {
      const dayIndex = renderIndex - offset;
      const isoWeekday = (renderIndex + weekStart) % 7;
      const thisMoment = moment(startOfArgMoment).add(dayIndex, "day");

      let currentMonthDate = true;
      if (argMoment.month() != thisMoment.month()) {
        currentMonthDate = false;
      }

      if (dayIndex >= 0 && dayIndex < argDaysCount) {
        days.push(
          this.renderDay({
            startOfMonth: startOfArgMoment,
            currentMonthDate: currentMonthDate,
            isWeekend: isoWeekday === 0 || isoWeekday === 6,
            key: renderIndex,
            onPress: () => {
              this.selectDate(thisMoment, argMoment);
            },
            caption: thisMoment.format("D"),
            isToday:
              todayMoment.format("YYYY-MM-DD") ===
              thisMoment.format("YYYY-MM-DD"),
            isSelected: selectedMoment.isSame(thisMoment),
            event:
              eventsMap[thisMoment.format("YYYY-MM-DD")] ||
              eventsMap[thisMoment.format("YYYYMMDD")],
            showEventIndicators: this.props.showEventIndicators,
            customStyle: this.props.customStyle
          })
        );
      } else {
        days.push(
          this.renderDay({
            key: renderIndex,
            filler: true,
            customStyle: this.props.customStyle
          })
        );
      }
      if (renderIndex % 7 === 6) {
        weekRows.push(
          <View
            key={weekRows.length}
            onLayout={weekRows.length ? undefined : this.onWeekRowLayout}
            style={[styles.weekRow, this.props.customStyle.weekRow]}
          >
            {days}
          </View>
        );
        days = [];
        if (dayIndex + 1 >= argDaysCount) {
          break;
        }
      }
      renderIndex += 1;
    } while (true);
    const containerStyle = [
      styles.monthContainer,
      this.props.customStyle.monthContainer
    ];

    let headings = this.renderHeading(this.props.titleFormat);
    // console.log(weekRows);
    weekRows.unshift(headings);
    let topBar = this.renderTopBar(argMoment);
    weekRows.unshift(topBar);

    return (
      <View
        key={`${startOfArgMoment.format("YYYY-MM-DD")}-${calFormat}`}
        style={containerStyle}
      >
        {weekRows}
      </View>
    );
  }

  renderDay(props) {
    if (this.props.renderDay) {
      return this.props.renderDay(props);
    }
    return <Day {...props} />;
  }

  renderHeading() {
    let headings = [];
    let i = 0;

    for (i; i < 7; ++i) {
      const j = (i + this.props.weekStart) % 7;
      headings.push(
        <Text
          key={i}
          style={
            j === 0 || j === 6
              ? [styles.weekendHeading, this.props.customStyle.weekendHeading]
              : [styles.dayHeading, this.props.customStyle.dayHeading]
          }
        >
          {this.props.dayHeadings[j]}
        </Text>
      );
    }

    return (
      <View
        key="heading"
        style={[styles.calendarHeading, this.props.customStyle.calendarHeading]}
      >
        {headings}
      </View>
    );
  }

  renderTopBar(startOfArgMoment) {
    let localizedMonth = this.props.monthNames[
      this.state.currentMoment.month()
    ];
    return this.props.showControls ? (
      <View
        style={[
          styles.calendarControls,
          this.props.customStyle.calendarControls
        ]}
      >
        <TouchableOpacity
          style={[styles.controlButton, this.props.customStyle.controlButton]}
          onPress={this.onPrev}
        >
          <Text
            style={[
              styles.controlButtonText,
              this.props.customStyle.controlButtonText
            ]}
          >
            {this.props.prevButtonText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.title}
          onPress={() => this.props.onTitlePress && this.props.onTitlePress()}
        >
          <Text style={[styles.titleText, this.props.customStyle.title]}>
            {localizedMonth} {this.state.currentMoment.year()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, this.props.customStyle.controlButton]}
          onPress={this.onNext}
        >
          <Text
            style={[
              styles.controlButtonText,
              this.props.customStyle.controlButtonText
            ]}
          >
            {this.props.nextButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View
        key="topbar"
        style={[
          styles.calendarControls,
          this.props.customStyle.calendarControls
        ]}
      >
        <Animated.Text style={[styles.title, this.props.customStyle.title]}>
          {startOfArgMoment.format(this.props.titleFormat)}
        </Animated.Text>
      </View>
    );
  }

  render() {
    const calendarDates = this.getStack(this.state.currentMoment);
    // console.log(calendarDates,this.state.currentMoment);
    const eventDatesMap = this.prepareEventDates(
      this.props.eventDates,
      this.props.events
    );
    // console.log(eventDatesMap);
    // const numOfWeeks = this.props.calendarFormat === 'weekly' ? 1 :
    //   getNumberOfWeeks(this.state.currentMonthMoment, this.props.weekStart);

    return (
      <View
        style={[
          styles.calendarContainer,
          this.props.customStyle.calendarContainer
        ]}
      >
        {this.props.scrollEnabled ? (
          <ScrollView
            ref={calendar => (this._calendar = calendar)}
            horizontal
            scrollEnabled
            pagingEnabled
            removeClippedSubviews={this.props.removeClippedSubviews}
            scrollEventThrottle={1000}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            onMomentumScrollEnd={event => this.scrollEnded(event)}
            style={{
              height: this.state.rowHeight ? this.state.rowHeight * 8.5 : null
            }}
          >
            {calendarDates.map(date =>
              this.renderCalendarView(
                this.props.calendarFormat,
                moment(date),
                eventDatesMap
              )
            )}
          </ScrollView>
        ) : (
          <View ref={calendar => (this._calendar = calendar)}>
            {calendarDates.map(date =>
              this.renderCalendarView(
                this.props.calendarFormat,
                moment(date),
                eventDatesMap
              )
            )}
          </View>
        )}
      </View>
    );
  }
}
