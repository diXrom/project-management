import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const Column = () => {
  const [title, setTitle] = useState('Title');
  const [isEditTitle, setIsEditTitle] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditTitle) inputRef.current?.select();
  }, [isEditTitle]);

  useEffect(() => {
    const endEditTitle = (e: MouseEvent) => {
      if (e.target !== inputRef.current && e.target !== titleRef.current) {
        //sendFetch
        setIsEditTitle(false);
      }
    };

    document.addEventListener('click', endEditTitle);

    return () => {
      document.removeEventListener('click', endEditTitle);
    };
  }, []);

  return (
    <div className="w-80 bg-slate-50 rounded-lg shadow-lg shadow-slate-300 p-3 shrink-0">
      <div
        className={clsx(
          'text-slate-800 font-bold p-1 px-3 rounded-lg cursor-pointer',
          isEditTitle && 'hidden'
        )}
        ref={titleRef}
        onClick={() => {
          setIsEditTitle(true);
        }}
      >
        {title}
      </div>

      <input
        className={clsx(
          'bg-slate-200 font-bold p-1 px-3 rounded-lg w-full',
          !isEditTitle && 'hidden'
        )}
        value={title}
        ref={inputRef}
        autoComplete="off"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default Column;
