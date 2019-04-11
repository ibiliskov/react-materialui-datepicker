import * as React from "react";
import * as df from "date-fns";

import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import { withUtils, WithUtilsProps } from "../../_shared/WithUtils";
import { DateType } from "../../constants/prop-types";
import { MaterialUiPickersDate } from "../../typings/date";
import Month from "./Month";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { ArrowLeftIcon } from "../../_shared/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../_shared/icons/ArrowRightIcon";

import SlideTransition, { SlideDirection } from "./SlideTransition";

export interface MonthSelectionProps
  extends WithUtilsProps,
    WithStyles<typeof styles> {
  date: MaterialUiPickersDate;
  minDate?: DateType;
  maxDate?: DateType;
  onChange: (date: MaterialUiPickersDate) => void;
  onYearChange: (date: MaterialUiPickersDate) => void;
  disablePast?: boolean | null | undefined;
  disableFuture?: boolean | null | undefined;
}

export class MonthSelection extends React.PureComponent<MonthSelectionProps> {
  public static defaultProps = {
    minDate: new Date("1900-01-01"),
    maxDate: new Date("2100-01-01")
  };

  public onMonthSelect = (month: number) => {
    const { date, onChange, utils } = this.props;

    const newDate = utils.setMonth(date, month);
    onChange(newDate);
  };

  public shouldDisableMonth = (month: Date) => {
    const { utils, disablePast, disableFuture, minDate, maxDate } = this.props;
    const now = utils.date();
    const utilMinDate = utils.date(minDate);
    const utilMaxDate = utils.date(maxDate);

    const firstEnabledMonth = utils.startOfMonth(
      disablePast && utils.isAfter(now, utilMinDate) ? now : utilMinDate
    );

    const lastEnabledMonth = utils.startOfMonth(
      disableFuture && utils.isBefore(now, utilMaxDate) ? now : utilMaxDate
    );

    const isBeforeFirstEnabled = utils.isBefore(month, firstEnabledMonth);
    const isAfterLastEnabled = utils.isAfter(month, lastEnabledMonth);

    return isBeforeFirstEnabled || isAfterLastEnabled;
  };

  public render() {
    const { date, classes, utils, onYearChange } = this.props;
    const currentMonth = utils.getMonth(date);
    let currentYear = utils.getYear(date);
    const leftArrowIcon = <ArrowLeftIcon />;
    const rightArrowIcon = <ArrowRightIcon />;
    const selectNextYear = () => onYearChange(df.addYears(date, 1));
    const selectPreviousYear = () => onYearChange(df.addYears(date, -1));

    return (
      <div className={classes.headerContainer}>
        <div className={classes.switchHeader}>
          <Typography
            align="left"
            variant="body1"
            className={classes.monthHeader}
          >
            {currentYear}
          </Typography>
          <div className={classes.buttonContainer}>
            <IconButton
              disableRipple
              onClick={selectPreviousYear}
              className={classes.iconButton}
            >
              {leftArrowIcon}
            </IconButton>
            <IconButton
              disableRipple
              onClick={selectNextYear}
              className={classes.iconButton}
            >
              {rightArrowIcon}
            </IconButton>
          </div>
        </div>

        <hr className={classes.hrLine} />

        <div className={classes.container}>
          {utils.getMonthArray(date).map(month => {
            const monthNumber = utils.getMonth(month);
            const monthText = utils.format(month, "MMM");

            return (
              <Month
                key={monthText}
                value={monthNumber}
                selected={monthNumber === currentMonth}
                onSelect={this.onMonthSelect}
                disabled={this.shouldDisableMonth(month)}
              >
                {monthText}
              </Month>
            );
          })}
        </div>
      </div>

      // <div>
      //   <div>
      //     <div>April 2019</div>
      //   </div>
      //   <div className={classes.container}>
      //     {utils.getMonthArray(date).map(month => {
      //       const monthNumber = utils.getMonth(month);
      //       const monthText = utils.format(month, "MMM");

      //       return (
      //         <Month
      //           key={monthText}
      //           value={monthNumber}
      //           selected={monthNumber === currentMonth}
      //           onSelect={this.onMonthSelect}
      //           disabled={this.shouldDisableMonth(month)}
      //         >
      //           {monthText}
      //         </Month>
      //       );
      //     })}
      //   </div>
      // </div>
    );
  }
}

export const styles = createStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignContent: "center",
    margin: '0 12px'
  },
  hline: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 0,
    marginBottom: 5
  },
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
    backgroundColor: "white",
    "&:hover": {
      //  backgroundColor: theme.palette.primary.main,
      backgroundColor: "white",
      borderRadius: 0
    },
    "& > *": {
      // label
      backgroundColor: "white",
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

export default withStyles(styles, { name: "MuiPickersMonthSelection" })(
  withUtils()(MonthSelection)
);
