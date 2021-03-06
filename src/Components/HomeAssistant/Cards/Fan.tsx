import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { HassEntity } from 'home-assistant-js-websocket';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { EntityProps } from './Entity';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1
  },
  text: {
    overflow: 'hidden',
    userSelect: 'none',
    textAlign: 'center',
    textOverflow: 'ellipsis'
  },
  iconContainer: {
    height: 32,
    width: 32,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  },
  icon: {
    transform: 'translateY(-8px)',
    textAlign: 'center',
    color: theme.palette.text.primary,
    opacity: 0.6
  },
  iconActive: {
    opacity: 1.0,
    color: theme.palette.primary.main
  },
  iconDisabled: {
    opacity: 0.6
  }
}));

function Fan(props: EntityProps) {
  const classes = useStyles();
  let entity: HassEntity | undefined,
    state: string | undefined,
    attributes: any | undefined;

  if (!props.hassEntities) {
    state = 'Home Assistant not connected.';
    props.card.disabled = true;
  } else entity = props.hassEntities[props.card.entity!];

  if (!entity && !state) {
    props.card.disabled = true;
    state = `${props.card.entity} not found`;
  } else if (!state) {
    props.card.disabled = false;
    attributes = entity!.attributes;
  }

  if (!entity)
    return (
      <Grid
        className={classes.root}
        container
        direction="row"
        alignContent="center"
        justify="center">
        <Grid item xs>
          <Typography
            className={classes.text}
            color="textPrimary"
            variant="body2"
            component="h5">
            {state}
          </Typography>
        </Grid>
      </Grid>
    );

  function handleSpeedChange(speed: string) {
    props.handleHassChange!('fan', 'set_speed', {
      entity_id: entity!.entity_id,
      speed
    });
  }

  return (
    <Grid
      className={classes.root}
      container
      spacing={1}
      alignContent="center"
      justify="center"
      direction="column">
      <Grid
        item
        xs
        container
        alignContent="center"
        justify="center"
        direction="row">
        {attributes.speed_list.map((speed: string, key: number) => {
          const icon: string | undefined =
            speed === 'off'
              ? 'mdi-numeric-0'
              : speed === 'low'
              ? 'mdi-numeric-1'
              : speed === 'medium'
              ? 'mdi-numeric-2'
              : speed === 'high'
              ? 'mdi-numeric-3'
              : undefined;
          if (icon)
            return (
              <Grid key={key} item xs={6} container justify="center">
                <IconButton
                  className={classes.iconContainer}
                  onClick={() => handleSpeedChange(speed)}>
                  <span
                    className={classnames(
                      'mdi',
                      icon,
                      classes.icon,
                      attributes.speed === speed && classes.iconActive
                    )}
                  />
                </IconButton>
              </Grid>
            );
          return (
            <Grid key={key} item>
              <Button
                className={classnames(
                  attributes.hvac_action === speed && classes.iconActive
                )}
                onClick={() => handleSpeedChange(speed)}>
                {speed}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

Fan.propTypes = {
  card: PropTypes.any.isRequired,
  hassConfig: PropTypes.any,
  hassEntities: PropTypes.any
};

export default Fan;
