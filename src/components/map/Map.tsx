"use client";

import { useEffect, useRef } from 'react';
import React from 'react';

const Map = () => {
  const mapRef = useRef<any>(null); // Используем useRef для хранения инстанса карты
  const scriptLoaded = useRef(false); // Флаг для отслеживания загрузки скрипта

  useEffect(() => {
    const loadYandexMaps = () => {
      if (!scriptLoaded.current) {
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=ВАШ_API_КЛЮЧ';
        script.type = 'text/javascript';
        script.onload = () => {
          if (window.ymaps && !mapRef.current) {
            window.ymaps.ready(init);
          }
        };
        document.head.appendChild(script);
        scriptLoaded.current = true; // Устанавливаем флаг, что скрипт загружен
      } else if (window.ymaps && !mapRef.current) {
        // Если скрипт уже загружен, просто инициализируем карту
        window.ymaps.ready(init);
      }
    };

    const init = () => {
      if (!mapRef.current) {
        mapRef.current = new window.ymaps.Map('map', {
          center: [44.580161, 33.459621], // Центр карты
          zoom: 16,
          controls: []

        });

        const placemark = new window.ymaps.Placemark([44.580161, 33.459621], {
          balloonContent: 'ProStudioNails',
        });
        mapRef.current.geoObjects.add(placemark);
      }
    };

    loadYandexMaps();

    return () => {
      if (mapRef.current) {
        mapRef.current.destroy(); // Удаление карты при размонтировании компонента
      }
    };
  }, []);

  return  <div id="map" style={{ width: '60%', height: '400px' }} />
     
};

// Добавляем displayName для компонента, чтобы избежать ошибки ESLint
Map.displayName = 'YandexMap';

export default React.memo(Map);