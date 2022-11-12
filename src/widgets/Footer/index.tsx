import { memo } from 'react';
import { FaGithub } from 'react-icons/fa';

const sociaItems = [
  { link: 'https://github.com/dixrom', icon: <FaGithub /> },
  { link: 'https://github.com/malinna13', icon: <FaGithub /> },
  { link: 'https://github.com/vyach-g', icon: <FaGithub /> },
];

const Footer = () => (
  <footer className="border-t">
    <div className="container px-2.5 md:px-5 flex items-center content-center justify-center font-light border-t select-none">
      <a
        href="https://rs.school/react/"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-auto"
      >
        <img
          src={`${process.env.PUBLIC_URL}/logo_RSS.svg`}
          alt="RSS"
          className="w-16 h-16 transition duration-300 hover:scale-105"
        />
      </a>
      <span className="mr-2 text-lg font-medium">2022</span>
      <div className="flex gap-2 text-2xl">
        {sociaItems.map(({ link, icon }) => (
          <a
            key={link}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative transition duration-300 cursor-pointer hover:scale-110 hover:text-gray-600 group"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default memo(Footer);
