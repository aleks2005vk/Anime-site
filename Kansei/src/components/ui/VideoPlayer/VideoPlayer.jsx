// src/components/ui/VideoPlayer/VideoPlayer.jsx
import React, { useEffect } from 'react';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer() {
  useEffect(() => {
    const dataUrl = window.location.href; // текущий URL страницы
    const script = document.createElement('script');
    script.src = `//js.espanplay.site/get_player?w=610&h=370&type=widget&players=alloha,trailer&r_id=videoplayers&alni=ALLOHATV&ru=${dataUrl}`;
    script.async = true;
    document.head.appendChild(script);

    // чистка скрипта при размонтировании компонента
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      className={styles.video}
      id="videoplayers"
    ></div>
  );
}
