import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Flexbox } from 'components/FlexBox';
import { GithubIcon } from './githubIcon';

const useStyles = makeStyles<Theme>((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    padding: 12,
    width: '100%',
  },
  icon: {
    color: theme.palette.primary.dark,
    marginRight: 24,
    width: 36,
    height: 36,
    cursor: 'initial',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  links: {
    marginLeft: 12,

    '& a': {
      textDecoration: 'none',
      marginRight: 12,
      '&:link': {
        color: 'initial',
      },
      '&:visited': {
        color: 'initial',
      },
    },
  },
}));

const Footer = (): JSX.Element => {
  const { appBar, links } = useStyles();
  return (
    <footer className={appBar}>
      <Flexbox align="center" justify="center">
        Dev: Антон Мурашов
        <div className={links}>
          <a
            href="https://github.com/NeshtaNesht"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
          </a>
          <a href="https://vk.com/id35029650" target="_blank" rel="noreferrer">
            <img
              src="https://static.tildacdn.com/tild3731-3236-4364-b266-336436626566/photo.png"
              alt="VK"
              width={24}
              height={24}
            />
          </a>
        </div>
      </Flexbox>
    </footer>
  );
};

export default Footer;
