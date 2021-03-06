import { Theme } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import * as PropTypes from "prop-types";
import * as React from "react";

export interface MonthProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  disabled?: boolean;
  onSelect: (value: any) => void;
  selected?: boolean;
  value: any;
}

export class Month extends React.PureComponent<MonthProps> {
  public static defaultProps = {
    selected: false,
    disabled: false
  };

  public handleClick = () => {
    this.props.onSelect(this.props.value);
  };

  public render() {
    const {
      classes,
      selected,
      disabled,
      value,
      children,
      ...other
    } = this.props;

    return (
      <Typography
        role="button"
        component="div"
        className={clsx(classes.root, {
          [classes.selected]: selected,
          [classes.disabled]: disabled
        })}
        tabIndex={disabled ? -1 : 0}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        color={selected ? "primary" : "default"}
        variant={selected ? "h5" : "subtitle1"}
        children={children}
        {...other}
      />
    );
  }
}

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      flex: "1 0 25%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      outline: "none",
      fontSize: 14,
      width: 56,
      height: 28,
      margin: '9px 5px',
      transition: theme.transitions.create("font-size", { duration: "100ms" }),
    },
    selected: {
      color: 'white',
      backgroundColor: '#007EB6',
      fontWeight: theme.typography.fontWeightMedium
    },
    disabled: {
      pointerEvents: "none",
      color: theme.palette.text.hint
    }
  });

export default withStyles(styles, { name: "MuiPickersMonth" })(Month);
