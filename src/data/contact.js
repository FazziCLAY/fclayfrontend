import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';
// See https://fontawesome.com/icons?d=gallery&s=brands,regular&m=free
// to add other icons.

const data = [
  {
    link: 'https://github.com/FazziCLAY',
    label: 'Github',
    icon: faGithub,
  },
  {
    link: 'https://www.youtube.com/@FazziCLAY',
    label: 'Youtube',
    icon: faYoutube,
  },
  {
    link: 'mailto:fazziclay@gmail.com',
    label: 'Email',
    icon: faEnvelope,
  },
  {
    link: 'https://t.me/FazziCLAY',
    label: 'Telegram',
    icon: faTelegram,
  },
];

export default data;
