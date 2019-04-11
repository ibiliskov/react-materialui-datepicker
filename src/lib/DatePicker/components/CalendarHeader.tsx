import * as PropTypes from "prop-types";
import * as React from "react";

import { Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { ArrowLeftIcon } from "../../_shared/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../_shared/icons/ArrowRightIcon";
import { withUtils, WithUtilsProps } from "../../_shared/WithUtils";
import { MaterialUiPickersDate } from "../../typings/date";
import SlideTransition, { SlideDirection } from "./SlideTransition";

export interface CalendarHeaderProps
  extends WithUtilsProps,
    WithStyles<typeof styles, true> {
  currentMonth: object;
  onMonthChange: (
    date: MaterialUiPickersDate,
    direction: SlideDirection
  ) => void;
  onViewChange: (view: string) => void;
  leftArrowIcon?: React.ReactNode;
  rightArrowIcon?: React.ReactNode;
  disablePrevMonth?: boolean;
  disableNextMonth?: boolean;
  slideDirection: SlideDirection;
}

export const CalendarHeader: React.SFC<CalendarHeaderProps> = ({
  classes,
  theme,
  currentMonth,
  onMonthChange,
  onViewChange,
  leftArrowIcon,
  rightArrowIcon,
  disablePrevMonth,
  disableNextMonth,
  utils,
  slideDirection
}) => {
  const rtl = theme.direction === "rtl";

  const selectNextMonth = () =>
    onMonthChange(utils.getNextMonth(currentMonth), "left");
  const selectPreviousMonth = () =>
    onMonthChange(utils.getPreviousMonth(currentMonth), "right");

  const openMonthView = () => {
    onViewChange("month");
  };

  const getWeekDays = () => {
    const week = utils.getWeekdays();
    const [sunday] = week.splice(0, 1);
    week.push(sunday);
    return week;
  };

  return (
    <div className={classes.headerContainer}>
      <div className={classes.switchHeader}>
        <SlideTransition
          slideDirection={slideDirection}
          transKey={currentMonth.toString()}
          className={classes.transitionContainer}
        >
          <Typography
            align="left"
            variant="body1"
            className={classes.monthHeader}
            onClick={openMonthView}
          >
            {utils.getCalendarHeaderText(currentMonth)}
          </Typography>
        </SlideTransition>
        <div className={classes.buttonContainer}>
          <IconButton
            disableRipple
            disabled={disablePrevMonth}
            onClick={selectPreviousMonth}
            className={classes.iconButton}
          >
            {rtl ? rightArrowIcon : leftArrowIcon}
          </IconButton>

          <IconButton
            disableRipple
            disabled={disableNextMonth}
            onClick={selectNextMonth}
            className={classes.iconButton}
          >
            {rtl ? leftArrowIcon : rightArrowIcon}
          </IconButton>
        </div>
      </div>

      <hr className={classes.hrLine} />

      <div className={classes.daysHeader}>
        {getWeekDays().map((day, index) => (
          <Typography
            key={index} // eslint-disable-line react/no-array-index-key
            variant="caption"
            className={classes.dayLabel}
          >
            {day.split("").slice(0, 1)}
          </Typography>
        ))}
      </div>
    </div>
  );
};

(CalendarHeader as any).propTypes = {
  currentMonth: PropTypes.object.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  disablePrevMonth: PropTypes.bool,
  disableNextMonth: PropTypes.bool,
  slideDirection: PropTypes.oneOf(["right", "left"]).isRequired,
  innerRef: PropTypes.any
};

CalendarHeader.displayName = "CalendarHeader";
CalendarHeader.defaultProps = {
  leftArrowIcon: <ArrowLeftIcon />,
  rightArrowIcon: <ArrowRightIcon />,
  disablePrevMonth: false,
  disableNextMonth: false
};

export const styles = (theme: Theme) =>
  createStyles({
    switchHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 6,
      marginBottom: 6,
      marginLeft: 12,
      marginRight: 12
    },
    headerContainer: {
      marginBottom: 1
    },
    hrLine: {
      marginLeft: 12,
      marginRight: 12,
      marginTop: 0,
      marginBottom: 5
    },
    buttonContainer: {
      display: "flex"
    },
    monthHeader: {
      color: "#0074a6",
      fontSize: 16
    },
    transitionContainer: {
      width: "100%",
      height: 20
    },
    iconButton: {
      width: 20,
      height: 20,
      marginRight: -8,
      zIndex: 2,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      "&:hover": {
        //  backgroundColor: theme.palette.primary.main,
        backgroundColor: "white",
        borderRadius: 0
      },
      "& > *": {
        // label
        backgroundColor: theme.palette.background.paper,
        "& > *": {
          // icon
          zIndex: 1,
          width: 20,
          height: 20,
          position: "absolute",
          overflow: "visible",
          color: "#4097bc",
          borderRadius: 0,
          "&:hover": {
            //  backgroundColor: theme.palette.primary.main,
            backgroundColor: "white",
            borderRadius: 0
          }
        }
      }
    },
    daysHeader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxHeight: 16
    },
    dayLabel: {
      display: "flex",
      alignItems: "inherit",
      justifyContent: "inherit",
      width: 28,
      height: 28,
      margin: 0,
      textAlign: "center",
      // color: theme.palette.text.hint,
      color: "#4097bc",
      fontSize: 14
    }
  });

export default withUtils()(
  withStyles(styles, {
    withTheme: true,
    name: "MuiPickersCalendarHeader"
  })(CalendarHeader)
);
