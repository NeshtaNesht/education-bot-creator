import React, { useMemo, CSSProperties } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { Save } from '@material-ui/icons';

import { Card } from 'components/Card';
import { Flexbox } from 'components/FlexBox';

const useStyles = makeStyles(() => ({
  container: {
    '& > div': {
      margin: 8,
    },
  },
  widthTextField: {
    width: 600,
  },
}));

const saveIcon = <Save />;
const styleButton: CSSProperties = {
  marginTop: 12,
};

const NewMessagePage: React.FC = () => {
  const classes = useStyles();
  const memoClasses = useMemo(
    () => ({
      root: classes.widthTextField,
    }),
    [classes.widthTextField]
  );
  return (
    <Flexbox direction="column">
      <Flexbox direction="column" className={classes.container}>
        <TextField
          variant="outlined"
          label="Название ключевого слова"
          classes={memoClasses}
        />
        <TextField
          variant="outlined"
          label="Ключевое слово"
          classes={memoClasses}
        />
      </Flexbox>
      <Card>
        <Flexbox direction="column">
          <h3>Ваше сообщение</h3>
          <TextField multiline rows={10} fullWidth variant="outlined" />
          <Button
            variant="contained"
            color="primary"
            startIcon={saveIcon}
            style={styleButton}
          >
            Сохранить
          </Button>
        </Flexbox>
      </Card>
    </Flexbox>
  );
};

export default NewMessagePage;
