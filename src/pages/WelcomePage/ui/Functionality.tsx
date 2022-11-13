import { useState } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

import imgLists from '../../../assets/main/features/lists.webp';

const FEATURES = [
  {
    name: 'Boards',
    desc: 'Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”',
  },
  {
    name: 'Lists',
    desc: 'The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team`s needs. There`s no wrong way to Trello.',
  },
  {
    name: 'Cards',
    desc: 'Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.',
  },
];

const Functionality = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  return (
    <section className="container max-w-screen-xl mb-40">
      <h2 className="text-4xl font-bold text-slate-700 text-center mb-10">What is NoTrello</h2>
      <div className="flex flex-row items-center justify-center">
        <div className="w-full max-w-100 md:max-w-md px-2 py-2 sm:px-0 shadow-lg shadow-slate-800/[0.1] rounded-xl mr-3 ml-3 bg-slate-50">
          <Tab.Group selectedIndex={currentTab} onChange={setCurrentTab}>
            <Tab.List className="flex space-x-1 rounded-xl bg-slate-400 p-1 m-3">
              {FEATURES.map((item) => (
                <Tab
                  key={item.name}
                  className={({ selected }) =>
                    clsx(
                      'w-full rounded-lg py-2.5 text-md font-medium leading-5 text-blue-700',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {item.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="m-3">
              {FEATURES.map((item, idx) => (
                <Tab.Panel
                  key={idx}
                  className={clsx(
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                >
                  <ul>
                    <li key={item.name} className="relative rounded-md p-3 hover:bg-gray-100">
                      <h3 className="text-xl font-bold leading-5">{item.name}</h3>

                      <div className="mt-1 flex text-lg font-normal leading-12 text-gray-500 min-h-[120px]">
                        {item.desc}
                      </div>
                      <div className="w-full max-w-100 block md:hidden -ml-100">
                        <img src={imgLists} alt="imgLists" />
                      </div>
                    </li>
                  </ul>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
        <div className="w-full max-w-100 hidden md:block -ml-10 relative -z-10">
          <img src={imgLists} alt="imgLists" />
        </div>
      </div>
    </section>
  );
};

export default Functionality;
