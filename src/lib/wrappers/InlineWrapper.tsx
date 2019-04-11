import { Omit, Button, Fab } from "@material-ui/core";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Popover, {
  PopoverProps as PopoverPropsType
} from "@material-ui/core/Popover";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import * as PropTypes from "prop-types";
import * as React from "react";
import EventListener from "react-event-listener";
import DateTextField, { DateTextFieldProps } from "../_shared/DateTextField";
import { DIALOG_WIDTH, DIALOG_WIDTH_WIDER } from "../constants/dimensions";
import moment from "moment";
import CalendarToday from "@material-ui/icons/CalendarToday";

export interface OuterInlineWrapperProps
  extends Omit<DateTextFieldProps, "utils" | "onClick"> {
  wider?: boolean;
  /** On open callback */
  onOpen?: () => void;
  /** On close callback */
  onClose?: () => void;
  /** Dialog props passed to material-ui Dialog */
  PopoverProps?: Partial<PopoverPropsType>;
}

export interface InlineWrapperProps extends OuterInlineWrapperProps {
  handleAccept: () => void;
  isAccepted: boolean;
  /** Show only calendar for datepicker in popover mode */
  onlyCalendar: boolean;
}

export class InlineWrapper extends React.PureComponent<
  InlineWrapperProps & WithStyles<typeof styles>
> {
  public static propTypes: any = {
    onlyCalendar: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    PopoverProps: PropTypes.object
  };

  public static defaultProps = {
    value: moment(),
    onlyCalendar: false,
    isAccepted: false
  };

  public static getDerivedStateFromProps(nextProps: InlineWrapperProps) {
    // only if accept = true close the popover
    if (nextProps.isAccepted) {
      if (nextProps.onClose) {
        nextProps.onClose();
      }

      return {
        anchorEl: null
      };
    }

    return null;
  }

  public state = {
    anchorEl: null
  };

  public open = (e: React.SyntheticEvent) => {
    this.setState({ anchorEl: e.currentTarget });
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  };

  public close = () => {
    this.setState({ anchorEl: null });

    this.props.handleAccept();

    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  public handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Enter": {
        this.props.handleAccept();
        this.close();
        break;
      }
      default:
        // if key is not handled, stop execution
        return;
    }

    // if event was handled prevent other side effects
    event.preventDefault();
  };

  public render() {
    const {
      value,
      format,
      children,
      onOpen,
      onClose,
      PopoverProps,
      isAccepted,
      keyboard,
      onlyCalendar,
      classes,
      handleAccept,
      wider,
      ...other
    } = this.props;

    const isOpen = Boolean(this.state.anchorEl);

    return (
      <React.Fragment>
        {console.log(isOpen)}
        {isOpen && (
          <EventListener target="window" onKeyDown={this.handleKeyDown} />
        )}

        <ButtonGroup onClick={this.open}>
          <Button
            disableRipple
            variant="contained"
            color="primary"
            aria-label="Add"
            className={classes.margin}
          >
            {value ? moment(value).format("DD/MM/YYYY") : "Select date"}
            {/* <span className={classes.vline} /> */}
          </Button>
          <Button
            className={classes.iconWrapper}
            variant="contained"
            disableRipple
          >
            <CalendarToday className={classes.extendedIcon} />
          </Button>
        </ButtonGroup>

        <Popover
          id="picker-popover"
          open={isOpen}
          anchorEl={this.state.anchorEl}
          onClose={this.close}
          classes={{
            paper: clsx(classes.popoverPaper, {
              [classes.popoverPaperWider]: wider
            })
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: keyboard ? "right" : "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: keyboard ? "right" : "center"
          }}
          children={children}
          {...PopoverProps}
        />
      </React.Fragment>
    );
  }
}

export const styles = {
  popoverPaper: {
    width: DIALOG_WIDTH,
    height: 240,
    marginLeft: 51,
    marginTop: 5
  },
  popoverPaperWider: {
    width: DIALOG_WIDTH_WIDER
  },
  margin: {
    borderTopLeftRadius: "6px !important",
    borderBottomLeftRadius: "6px !important",
    borderTopRightRadius: "0 !important",
    borderBottomRightRadius: "0 !important",
    height: "28px !important",
    padding: "0 9px !important",
    backgroundColor: "#eeeeee",
    color: "black",
    fontSize: "14px !important",
    border: "1px solid #D5D5D6",
    "&:hover": {
      border: "1px solid #B6B6B6",
      backgroundColor: "#eeeeee",
      "&:active": {
        backgroundColor: "#C0DEEC",
        border: "1px solid #8FC6DE",
      }
    }
  },
  iconWrapper: {
    minWidth: 0,
    width: 28,
    height: 28,
    backgroundColor: "#eeeeee",
    borderTopLeftRadius: "0 !important",
    borderBottomLeftRadius: "0 !important",
    borderTopRightRadius: "6px !important",
    borderBottomRightRadius: "6px !important",
    border: "1px solid #D5D5D6",
    padding: 0,
    "&:hover": {
      border: "1px solid #B6B6B6",
      backgroundColor: "#eeeeee",
      "&:active": {
        backgroundColor: "#C0DEEC",
        border: "1px solid #8FC6DE",
      }
    }
  },
  extendedIcon: {
    fontSize: 16,
    color: "#0074a6",
    padding: "4px 6px"
  },
};

export default withStyles(styles)(InlineWrapper);
