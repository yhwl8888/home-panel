import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((_theme: Theme) => ({
  buttonCardContainer: {
    height: '100%',
    width: '100%',
    flex: 1
  },
  card: {
    position: 'relative',
    height: '100%',
    width: '100%',
    flex: 1
  },
  icon: {
    fontSize: 48,
    lineHeight: '70px'
  }
}));

export interface AddGroupProps {
  handleAdd: () => void;
}

function AddGroup(props: AddGroupProps) {
  const classes = useStyles();
  const theme = useTheme();

  const cardSize = theme.breakpoints.down('sm') ? 120 : 100;
  return (
    <Grid
      item
      style={{
        height: cardSize,
        width: cardSize * 2
      }}>
      <ButtonBase
        className={classes.buttonCardContainer}
        focusRipple
        onClick={props.handleAdd}>
        <CardContent>
          <span className={classnames('mdi', 'mdi-plus', classes.icon)} />
        </CardContent>
      </ButtonBase>
    </Grid>
  );
}

AddGroup.propTypes = {
  handleAdd: PropTypes.func.isRequired
};

export default AddGroup;
