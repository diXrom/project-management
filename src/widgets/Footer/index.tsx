import { memo } from 'react';
import { FaGithub, FaLinkedinIn, FaTelegram } from 'react-icons/fa';

const SocialIcons = [
  { link: 'https://github.com/', icon: <FaGithub /> },
  { link: 'https://www.linkedin.com/in/dixrom/', icon: <FaLinkedinIn /> },
  { link: 'https://t.me/dixromat', icon: <FaTelegram /> },
];

const Footer = () => (
  <footer className="flex flex-col items-center justify-center font-light">
    <div className="flex gap-2 text-2xl">
      {SocialIcons.map(({ link, icon }) => (
        <a
          key={link}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="transition duration-300 cursor-pointer hover:scale-110 hover:text-gray-600"
        >
          {icon}
        </a>
      ))}
    </div>
    <span className="mt-2 text-sm font-light">&copy; 2022 Tolegen Timur</span>
  </footer>
);

export default memo(Footer);
