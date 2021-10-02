import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';

type FlexBoxType = {
  align: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  justify:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  direction: 'row' | 'column';
  className: string;
};

const useStyles = makeStyles<Theme, Omit<FlexBoxType, 'className'>>(() => ({
  root: {
    display: 'flex',
    width: '100%',
    alignItems: ({ align }) => align,
    justifyContent: ({ justify }) => justify,
    flexDirection: ({ direction }) => direction,
  },
}));

const FlexBox: React.FC<Partial<FlexBoxType>> = ({
  align = 'baseline',
  children,
  className,
  direction = 'row',
  justify = 'flex-start',
}) => {
  const classes = useStyles({ align, justify, direction });
  return <div className={cx(classes.root, className)}>{children}</div>;
};

export default FlexBox;
