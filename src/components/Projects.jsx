function Projects() {
  const projects = [
    {
      number: '01',
      title: 'TrapFall',
      type: 'FULL-STACK · REAL-TIME',
      description:
        'A two-player browser strategy game with hidden traps, private rooms, real-time gameplay, authentication, and synchronized game state.',
      tools: 'React · FastAPI · WebSockets · PostgreSQL · JWT',
      live: 'https://trapfall.vercel.app/',
      github: 'https://github.com/hellkeyes/Trapfall',
    },
    {
      number: '02',
      title: 'DSA Pattern Tracker',
      type: 'FULL-STACK · PERSONAL PROJECT',
      description:
        'A Flask application for tracking LeetCode practice through spaced repetition, pattern mastery, review scheduling, and practice history.',
      tools: 'Python · Flask · SQLAlchemy · SQLite',
      live: 'YOUR_DEPLOYED_LINK',
      github: 'https://github.com/hellkeyes/flask-dsa-tracker',
    },
    {
      number: '03',
      title: 'Driver Compliance Rule Engine',
      type: 'BACKEND · DEPLOYED · INTERNSHIP',
      description:
        'Contributed to the frontend of a deployed driver compliance platform for visualizing driver work diary breach calculations.',
      tools: 'Python · HTML · CSS · JS ',
    },
    {
      number: '04',
      title: 'Intelligent Freight Booking Parser',
      type: 'AUTOMATION · INTERNSHIP',
      description:
        'Built a Python-based feasibility MVP for automating the freight booking process, using standalone scripts for booking extraction, validation, and routing logic.',
      tools: 'Python · Claude · YAML · Google Sheets API',
    },
    {
      number: '05',
      title: 'Heart Disease Prediction',
      type: 'MACHINE LEARNING · DEPLOYED',
      description:
        'A deployed machine learning application supporting individual predictions and bulk CSV uploads for heart disease prediction.',
      tools: 'Python · Streamlit · Scikit-learn',
      live: 'https://heart-disease-prediction-hpay.onrender.com',
      github: 'https://github.com/Kinda-Hell/heart-disease-prediction',
    },
  ]

  return (
    <section id="projects" className="experiments">
      <div className="section-header">
        <p className="section-number">// PROJECTS</p>
        <h2>SELECTED WORK</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <div className="project-top">
              <span className="project-number">
                {project.number}
              </span>
            </div>

            <h3>{project.title}</h3>

            <span className="project-type">
              {project.type}
            </span>

            <p className="project-description">
              {project.description}
            </p>

            <div className="project-bottom">
              <span className="project-tools">
                {project.tools}
              </span>

              <div className="project-links">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LIVE
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GITHUB
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects