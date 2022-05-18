import React, { ChangeEvent } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { isMobile, isTablet } from 'react-device-detect';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DESIGN from '../../constants/designConstants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export interface TabBarProps {
  value: string;
  onChange: (key: string) => void;
  tabs?: {
    tabId: string;
    panelId: string;
    label: string;
    className?: string;
  }[];
  className?: string;
  tabClassName?: string;
  onPreviousClick?: () => void;
  onNextClick?: () => void;
  isModalTabBar?: boolean;
}

const TabBar = (props: TabBarProps): JSX.Element => {
  const {
    value,
    onChange,
    tabs,
    className,
    tabClassName,
    onPreviousClick,
    onNextClick,
    isModalTabBar,
  } = props;
  const classes = useStyles();

  const currentTabIndex = tabs?.findIndex((tab) => tab.tabId === value)!!;

  const handleChange = (event: ChangeEvent<{}>, changedValue: string) => {
    const selected = tabs?.find((t) => t.tabId === changedValue);

    if (selected && onChange) {
      onChange(selected.tabId);
    }
  };

  return (
    <Grid container className={`${classes.root}`}>
      {(isMobile || isTablet) && (
        <Grid container item xs={1}>
          {currentTabIndex > 0 && (
            <IconButton size="small" onClick={onPreviousClick}>
              <ArrowBackIcon style={{ color: DESIGN.COLOR_BLUE_PRIMARY }} />
            </IconButton>
          )}
        </Grid>
      )}
      <Grid
        container
        item
        xs={(isMobile || isTablet) ? 10 : 12}
        justifyContent="center"
        className={`${(isMobile || isTablet) && isModalTabBar ? 'custom-modal-mobile-tabs' : ''}`}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          variant="scrollable"
          aria-label="Scrollable detail header"
          className={className}
        >
          {tabs?.map((tab) => (
            <Tab
              key={tab.tabId}
              label={tab.label}
              value={tab.tabId}
              aria-controls={tab.panelId}
              className={`${tabClassName ?? ''} ${tab.className ?? ''}`}
            />
          ))}
        </Tabs>
      </Grid>
      {(isMobile || isTablet) && (
        <Grid container item xs={1} justifyContent="flex-end">
          {tabs && currentTabIndex < tabs.length - 1 && (
            <IconButton size="small" onClick={onNextClick}>
              <ArrowForwardIcon style={{ color: DESIGN.COLOR_BLUE_PRIMARY }} />
            </IconButton>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default TabBar;
