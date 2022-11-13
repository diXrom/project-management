import { motion } from 'framer-motion';

import timur from '../../../assets/main/authors/timur.jpg';
import inna from '../../../assets/main/authors/inna.jpg';
import vyach from '../../../assets/main/authors/vyach.jpg';

const AUTHORS_INFO = [
  {
    name: 'Timur Tolegen',
    role: 'Teamlead',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue quis lectus quis varius. Integer mollis eget libero in cursus. Ut mattis tellus ut sapien faucibus.',
    photo: timur,
  },
  {
    name: 'Inna Malinovskaya',
    role: 'Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue quis lectus quis varius. Integer mollis eget libero in cursus. Ut mattis tellus ut sapien faucibus.',
    photo: inna,
  },
  {
    name: 'Vyacheslav Grabovskiy',
    role: 'Developer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue quis lectus quis varius. Integer mollis eget libero in cursus. Ut mattis tellus ut sapien faucibus.',
    photo: vyach,
  },
];

const listVariants = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.25,
    },
  }),
  hidden: {
    opacity: 0,
    y: -100,
  },
};

const OurTeam = () => {
  return (
    <section className="container max-w-screen-xl">
      <h2 className="text-4xl font-bold text-slate-700 text-center mb-10">Our Team</h2>
      <div className="cards flex flex-col lg:flex-row">
        {AUTHORS_INFO.map((author, idx) => (
          <motion.div
            key={author.name}
            className="card flex flex-col sm:w-full lg:w-1/3 mb-8 lg:mb-0 p-5 shadow-lg shadow-slate-200 rounded-xl mr-3 ml-3 bg-slate-50"
            variants={listVariants}
            initial="hidden"
            // animate="visible"
            custom={idx}
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-row mb-2">
              <img className="w-[64px] h-[64px] rounded" src={author.photo}></img>
              <div className="info ml-5">
                <div className="text-xl font-bold">{author.name}</div>
                <div className="text-md font-bold text-slate-500">{author.role}</div>
              </div>
            </div>

            <div className="text-md  text-slate-700">{author.description}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
