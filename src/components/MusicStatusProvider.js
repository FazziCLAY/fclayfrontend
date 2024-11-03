import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { ilog } from '../Logger'; // Импортируем PropTypes

// Создаем контекст
const MusicStatusContext = createContext();

// Провайдер контекста
export const MusicStatusProvider = ({ children }) => {
  const [musicStatus, setMusicStatus] = useState({});
  const [updatedAt, setUpdatedAt] = useState(0);

  useEffect(() => {
    setUpdatedAt(Date.now()); // Обновление времени
  }, [musicStatus]);

  const value = useMemo(() => ({
    musicStatus, setMusicStatus, updatedAt, setUpdatedAt,
  }), [musicStatus, updatedAt]);

  ilog('MusicStatusProvider return...');
  return (
    <MusicStatusContext.Provider value={value}>
      {children}
    </MusicStatusContext.Provider>
  );
};

// Определяем типы для пропсов
MusicStatusProvider.propTypes = {
  children: PropTypes.node.isRequired, // Валидируем children как необходимый узел React
};

// Хук для использования контекста
export const useMusicStatus = () => useContext(MusicStatusContext);
