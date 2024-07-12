import React from 'react';

function Projects() {
  return (
    <section className="my-8">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      <ul className="space-y-4">
        <li>
          <h3 className="text-2xl font-semibold">Project 1</h3>
          <p className="text-lg">Description of project 1.</p>
        </li>
        <li>
          <h3 className="text-2xl font-semibold">Project 2</h3>
          <p className="text-lg">Description of project 2.</p>
        </li>
        {/* Add more projects as needed */}
      </ul>
    </section>
  );
}

export default Projects;
