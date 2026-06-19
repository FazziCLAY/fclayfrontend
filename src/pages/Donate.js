import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import ContactIcons from '../components/ContactIcons';

const Contact = () => (
  <Main
    title="Поддержать"
    description="Здесь вы можете задонатить мне денюшку"
  >
    <article className="post" id="contact">
      <header>
        <div className="title">
          <h2>
            <Link to="/donate">Поддержать</Link>
          </h2>
        </div>
      </header>
      <p>Привет! Ты можешь поддержать меня 🧡</p>
      <div className="donation-at">
        <h3>Сервисы донатов</h3>
        <p><a className="donaterow" target="_blank" rel="noopener noreferrer" href="https://www.donationalerts.com/r/fazziclay">DonationAlerts</a></p>
        <p><a className="donaterow" target="_blank" rel="noopener noreferrer" href="https://new.donatepay.ru/@fazziclay">DonatePay</a></p>
      </div>
      <ContactIcons />
    </article>
  </Main>
);

export default Contact;
