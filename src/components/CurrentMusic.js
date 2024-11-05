import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {
  // eslint-disable-next-line import/named
  BASE_API, emptymize, humanizeDuration, isSet, sumUnknown, truncateString,
} from '../FazziCLAY';
import { ilog } from '../Logger';
import { useMusicStatus } from './MusicStatusProvider';

const PERSON_STATUS_URL = `${BASE_API}/person/fazziclay/status`;
const ICONS = {
  spotify: '/img/spotify-icon.svg',
  firefox: '/img/firefox-icon.svg',
  aimp: '/img/aimp.ico',
  clementine: '/img/clementine-icon.svg',
};
const UNKNOWN_PLAYER_ICON = '/img/unknown-player.png';

// TODO: Rewrite using webockets...

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgba(1,8,28,0.84)',
    color: 'rgba(13,255,0,0.87)',
    maxWidth: 'none',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    wordWrap: 'break-word', // добавлено для переноса слов
  },
}));

// object
const CurrentMusic = React.memo(() => {
  const {
    musicStatus, setMusicStatus, updatedAt,
  } = useMusicStatus();
  const [count, setCount] = useState(0);

  const calculateComponent = () => {
    const song = musicStatus.headphones;
    ilog(`calculateComponent: musicStatus=${JSON.stringify(musicStatus)}`);
    if (!isSet(song)) {
      ilog('calculateComponent: returned null');
      return null;
    }

    const mobile = musicStatus.isMobile;
    const artImageUrl = song.artHttpUrl;
    const playerUrl = isSet(ICONS[song.player]) ? ICONS[song.player] : UNKNOWN_PLAYER_ICON;
    const jsonOverdue = Date.now() - updatedAt; // ms
    const durE = emptymize('[', humanizeDuration(sumUnknown(song.position, jsonOverdue), song.duration), '] ');
    const textarea = truncateString(`${song.title} - ${song.artist}`, (window.innerWidth / 20));

    return (
      <div>
        <img
          title="Player"
          id="fclay-header-music-icon-img"
          alt="[IMG]"
          hidden={playerUrl === null}
          src={playerUrl}
          width="19"
          height="19"
        />
        <img
          title="Mobile"
          hidden={!mobile}
          id="fclay-header-music-icon-mobileindicator"
          alt="[IMG]"
          src="/img/smartphone-light.png"
          width="19"
          height="19"
        />
        <img
          title="Art image"
          id="fclay-header-music-icon-artimg"
          alt="[IMG]"
          hidden={!isSet(artImageUrl)}
          src={artImageUrl}
          width="19"
          height="19"
        />
        {' '}
        <span hidden={durE.length !== 0} className="current-playing-text">Сейчас слушает: </span>
        <span
          style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          className="align-center"
          id="fclay-header-music-icon-text"
        ><b>{durE}</b>
          {textarea}
        </span>
      </div>
    );
  };

  const fetchMusicStatus = () => {
    ilog('fetchMusicStatus');
    fetch(PERSON_STATUS_URL)
      .then((response) => response.json())
      .then((json) => {
        ilog(`fetchMusicStatus :: then (${JSON.stringify(json)})`);
        setMusicStatus(json);
      });
  };

  // Effect for change toRet
  useEffect(() => {
    ilog('useEffect (tick)');
    const timer = setInterval(() => {
      setCount((prevState) => prevState + 1);
    }, 500);
    return () => {
      ilog('useEffect (tick) :: clear');
      clearInterval(timer);
    };
  }, ['null']);

  // Effect for actualize MusicStatusProvider.js from API
  useEffect(() => {
    ilog('useEffect (fetchMusicStatic)');
    fetchMusicStatus();
    const timer = setInterval(() => fetchMusicStatus(), 4000);
    return () => {
      ilog('useEffect (fetchMusicStatic) :: clear');
      clearInterval(timer);
    };
  }, ['null']);

  ilog(`CurrentMusic ${updatedAt}`);

  function calculateTooltip() {
    if (!isSet(musicStatus?.headphones)) {
      return null;
    }

    const volumeVal = musicStatus?.headphones?.volume;
    const volume = (
      <>
        <span>Volume:{'\t'}</span>
        <progress max={1} value={volumeVal} />
      </>
    );

    const durationVal = musicStatus?.headphones?.duration;
    const progressValApi = musicStatus?.headphones?.position;
    const overdue = (Date.now() - updatedAt);
    const progressVal = (
      progressValApi
        ? progressValApi + overdue : 0
    );
    const progress = (
      <>
        <span>Progress:{'\t'}</span>
        <progress
          max={durationVal}
          value={progressVal}
        />
      </>
    );

    return (
      <div style={{
        whiteSpace: 'pre',
        lineHeight: 1,
      }}
      >
        <h1>Data from api:</h1>
        {volume}
        {'\n'}
        {progress}
        {'\n'}
        {JSON.stringify(musicStatus, null, 4)}
      </div>
    );
  }

  return (
    <>
      <HtmlTooltip
        title={calculateTooltip()}
        followCursor
        enterDelay={1000}
        leaveDelay={100}
        style={{ zIndex: 10001 }}
      >
        <div>{calculateComponent()}</div>
      </HtmlTooltip>
    </>
  );
});

export default CurrentMusic;
