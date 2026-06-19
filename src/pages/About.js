import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';
import { ilog } from '../Logger';

const RouterLink = (props) => (
  // eslint-disable-next-line react/prop-types
  <Link to={props.href}>{props.children}</Link>
);

function printResume() {
  ilog('printResume');
  window.print();
}

const About = () => {
  const [markdown, setMarkdown] = useState('');
  const [markdownBadges, setMarkdownBadges] = useState('');
  const [lampStatus, setLampStatus] = useState(false); // Состояние лампочки
  const [wsMessage, setWsMessage] = useState(''); // Сообщения Websocket

  const ws = useRef(null); // Ref для вебсокета, чтобы он не пересоздавался при ререндеринге

  const WS_URL = 'wss://fazziclay.com/api/v1/unstable_pyflamp/public_ws';

  useEffect(() => {
    if (true) { // Убрал no-constant-condition (но убедитесь, что это правильно)
      import('../data/about.md').then((res) => {
        fetch(res.default)
          .then((r) => r.text())
          .then(setMarkdown);
      });

      import('../data/badges.md').then((res) => {
        fetch(res.default)
          .then((r) => r.text())
          .then(setMarkdownBadges);
      });
    }
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      ilog('ws opened');
      setWsMessage('Соединение установлено');
      // ws.current.send(JSON.stringify({ command: 'auth', token: WS_TOKEN }));
    };

    ws.current.onclose = () => {
      ilog('ws closed');
      setWsMessage('Соединение закрыто');
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        ilog('Received:', message);

        if (message.lamp === true) {
          setLampStatus(true);
        } else if (message.lamp === false) {
          setLampStatus(false);
        }
      } catch (error) {
        console.error('Ошибка при разборе JSON:', error);
        setWsMessage(`Ошибка разбора JSON: ${error}`);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWsMessage(`Ошибка WebSocket: ${error}`);
    };

    return () => {
      ilog('cleaning up');
      ws.current.close();
    };
  }, []);

  const toggleLamp = (turnOn) => {
    ilog(`toggleLamp ${turnOn}`);
    if (ws.current) {
      ws.current.send(JSON.stringify({ command: 'lamp', lamp: turnOn }));
    }
  };

  const count = markdown
    .split(/\s+/)
    .map((s) => s.replace(/\W/g, ''))
    .filter((s) => s.length).length;

  return (
    <Main title="Обо мне" description="О FazziCLAY'е">
      <article className="post markdown" id="about">
        <header>
          <div className="title">
            <h2>
              <Link to="/about">Обо мне</Link>
            </h2>
            <Markdown renderers={{ Link: RouterLink }}>{markdownBadges}</Markdown>
          </div>
        </header>
        <Markdown className="data-print" data-print renderers={{ Link: RouterLink }}>{markdown}</Markdown>
      </article>

      <div className="lamp-control">
        <h2>Вы можете управлять моим прикроватным светильником!</h2>
        <i>{wsMessage}</i>
        <p>Если есть реакция на кнопки значит в ИРЛ она также изменила своё состояние.</p>
        <p style={{ color: lampStatus ? 'green' : 'red' }}>Лампочка: {lampStatus ? 'Включена' : 'Выключена'}</p>
        <button type="button" onClick={() => toggleLamp(true)} disabled={lampStatus}>
          <p style={{ color: 'green' }}>Включить</p>
        </button>
        <button type="button" onClick={() => toggleLamp(false)} disabled={!lampStatus}>
          <p style={{ color: 'red' }}>Выключить</p>
        </button>
        <i>Вы же не будете долго баловаться? :3</i>
      </div>

      <style>{`
        .lamp-control {
          margin-top: 20px;
          padding: 10px;
          border: 1px solid #ccc;
          text-align: center;
        }
        .lamp-control button {
          margin: 5px;
          padding: 8px 12px;
          cursor: pointer;
        }
        .lamp-control button:disabled {
            opacity: 0.1;
            cursor: not-allowed;
        }
      `}
      </style>
    </Main>
  );
};

export default About;
