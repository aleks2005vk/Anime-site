import React from 'react'
import "./Footer.css"; // сюда вставь CSS

export default function Footer() {
  const contactItems = [
    { name: "Соц сети", href: "#" },
    { name: "Политика", href: "#" },
    { name: "Поддержка", href: "#" },
    { name: "Email: info@kansei.com", href: "mailto:info@kansei.com" },
  ];

  return (
    <footer className="contact">
      <ul>
        {contactItems.map((item) => (
          <li key={item.name}>
            <a href={item.href}>{item.name}</a>
          </li>
        ))}
      </ul>

      <p className="copyright">
        &copy; {new Date().getFullYear()} Kansei. Все права защищены.
      </p>
    </footer>
  );
}


