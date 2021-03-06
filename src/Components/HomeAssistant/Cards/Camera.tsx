import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { HassEntity } from 'home-assistant-js-websocket';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { EntityProps } from './Entity';
import Image from '../../Cards/Image';

const useStyles = makeStyles(() => ({
  root: {
    flex: 1
  },
  text: {
    overflow: 'hidden',
    userSelect: 'none',
    textAlign: 'center',
    textOverflow: 'ellipsis'
  },
  frame: {
    display: 'block',
    width: '100%',
    height: '100%',
    border: 0
  }
}));

function Camera(props: EntityProps) {
  const [url, setUrl] = React.useState<string>();

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

  useEffect(() => {
    if (attributes)
      setUrl(
        `${props.hassAuth.data.hassUrl}${
          attributes.entity_picture
        }&${new Date().toISOString().slice(-13, -5)}`
      );
  }, [attributes, props.hassAuth]);

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

  return <Image {...props} card={{ ...props.card, url }} />;
}

Camera.propTypes = {
  card: PropTypes.any.isRequired,
  hassConfig: PropTypes.any,
  hassEntities: PropTypes.any
};

export default Camera;
