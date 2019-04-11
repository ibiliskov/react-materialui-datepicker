import { Theme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import * as PropTypes from "prop-types";
import * as React from "react";

export interface DayProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  current?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  selected?: boolean;
}

class Day extends React.PureComponent<DayProps> {
  public static propTypes: any = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    current: PropTypes.bool,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    selected: PropTypes.bool,
    innerRef: PropTypes.any
  };

  public static defaultProps = {
    disabled: false,
    hidden: false,
    current: false,
    selected: false
  };

  public render() {
    const {
      children,
      classes,
      disabled,
      hidden,
      current,
      selected,
      ...other
    } = this.props;

    const className = clsx(classes.day, {
      [classes.hidden]: hidden,
      [classes.current]: current,
      [classes.isSelected]: selected,
      [classes.isDisabled]: disabled
    });

    return (
      <IconButton
        disableRipple
        className={className}
        tabIndex={hidden || disabled ? -1 : 0}
        {...other}
      >
        {children}
      </IconButton>
    );
  }
}

export const styles = (theme: Theme) =>
  createStyles({
    day: {
      width: 28,
      height: 28,
      //  fontSize: theme.typography.caption.fontSize,
      fontSize: 14,
      margin: 0,
      //  color: theme.palette.text.primary,
      color: "#666666",
      fontWeight: theme.typography.fontWeightMedium,
      padding: 0,
      transitionProperty: "none",
      "&:hover": {
        borderRadius: 0,
        backgroundColor: "#E5F2F8"
      }
    },
    hidden: {
      opacity: 0.5,
      pointerEvents: "none"
    },
    current: {
      //  color: theme.palette.primary.main,
      color: "#00395d",
      fontWeight: 600,
      borderBottomWidth: 3,
      borderBottomColor: "#00395d",
      borderBottomStyle: "solid",
      borderRadius: 0
    },
    isSelected: {
      color: "white",
      //  backgroundColor: theme.palette.primary.main,
      backgroundColor: "#007EB6",
      fontWeight: theme.typography.fontWeightMedium,
      "&:hover": {
        //  backgroundColor: theme.palette.primary.main,
        backgroundColor: "#007EB6",
        borderRadius: 0
      },
      borderRadius: 0
    },
    isDisabled: {
      pointerEvents: "none",
      color: theme.palette.text.hint
    }
  });

export default withStyles(styles, { name: "MuiPickersDay" })(
  Day as React.ComponentType<DayProps>
);
