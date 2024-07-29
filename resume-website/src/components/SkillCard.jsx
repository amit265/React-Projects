import React from 'react';

const SkillCard = ({ skills }) => {
  return (
    <div className='flex flex-col sm:flex-row flex-wrap justify-around items-center border-2 py-8 w-full'>
      {skills.map((skill) => (
        <div key={skill.stack} className='w-full sm:w-1/3 p-4 m-4 bg-white rounded-lg shadow-lg'>
          <h1 className='text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
            {skill.stack}
          </h1>
          <div>
            {skill.type.map((type) => (
              <div key={type.lang} className='mb-4'>
                <h2 className='text-lg font-semibold'>{type.lang}</h2>
                <div className='w-full bg-gray-300 rounded-full h-4 relative overflow-hidden'>
                  <div
                    className={`h-4 rounded-full progress-bar`}
                    style={{
                      width: `${type.strength}%`,
                      background: 'linear-gradient(90deg, rgba(255, 0, 150, 1) 0%, rgba(255, 154, 0, 1) 100%)',
                    }}
                  ></div>
                </div>
                <span className='text-sm'>{type.strength}%</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillCard;
