import React from 'react';

function Projects() {
  return (
    <section className="my-8">
      <h2 className="text-4xl font-semibold font-mono mb-4 text-center">Projects</h2>
      <ul className="flex justify-around">
        <li className='shadow-lg m-4 p-4'>
          <h3 className="text-2xl font-semibold">NetflixGPT</h3>
          <p className="text-lg">Description of project 1.</p>
        </li>
        <li className='shadow-lg m-4 p-4'>
          <h3 className="text-2xl font-semibold">SwiggyApp</h3>
          <img src="" alt="" />
          <p className="text-lg">Description of project 1.</p>
        </li>
      </ul>
    </section>
  );
}

export default Projects;
