import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import ContactIcons from '../components/ContactIcons';

const Contact = () => (
  <Main
    title="Контакты"
    description="Связаться со Станиславом можно через почту или телеграм"
  >
    <article className="post" id="contact">
      <header>
        <div className="title">
          <h2>
            <Link to="/contact">Контакты</Link>
          </h2>
        </div>
      </header>
      <div className="email-at">
        <p>Обращаться по почте: <a target="_blank" rel="noopener noreferrer" href="mailto:fazziclay@gmail.com">fazziclay@gmail.com</a></p>
        <p>Или в Telegram: <a target="_blank" rel="noopener noreferrer" href="https://t.me/FazziCLAY">@FazziCLAY</a></p>
      </div>
      <ContactIcons />
    </article>
  </Main>
);

export default Contact;
