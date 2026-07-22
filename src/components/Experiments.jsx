function Experiments() {
  const projects = [
    {
      title: 'Driver Compliance Rule Engine',
      type: 'FRONTEND CONTRIBUTION · DEPLOYED',
      description:
        'Contributed to the frontend of a deployed driver compliance platform for visualizing driver work diary breach calculations.',
      tools: 'Frontend · FastAPI · Python',
      // live: 'YOUR_DEPLOYED_LINK',
      // github: 'YOUR_GITHUB_LINK',
    },
    {
      title: 'Intelligent Freight Booking Parser',
      type: 'INTERNSHIP · MVP',
      description:
        'Built a 7-phase MVP exploring automated freight booking workflows, document extraction, routing logic, and client confirmation.',
      tools: 'Python · Claude · YAML',
      live: '',
      // github: 'YOUR_GITHUB_LINK',
    },
    {
      title: 'Heart Disease Prediction',
      type: 'MACHINE LEARNING · DEPLOYED',
      description:
        'Built and deployed an ML application for predicting heart disease with support for individual predictions and bulk CSV uploads.',
      tools: 'Python · Streamlit · Scikit-learn',
      live: 'https://heart-disease-prediction-hpay.onrender.com',
      github: 'https://github.com/Kinda-Hell/heart-disease-prediction',
    },
    {
      title: 'Loan Approval Prediction',
      type: 'MACHINE LEARNING',
      description:
        'Built a machine learning system to predict loan approval using applicant and property features.',
      tools: 'Python · Pandas · Scikit-learn · XGBoost',
      live: '',
      // github: 'YOUR_GITHUB_LINK',
    },
    {
      title: 'DSA Pattern Tracker',
      type: 'PERSONAL PROJECT · FULL-STACK',
      description:
        'A Flask application for tracking LeetCode practice through spaced repetition, pattern mastery, review scheduling, and practice history.',
      tools: 'Python · Flask · SQLAlchemy · SQLite',
      live: 'YOUR_DEPLOYED_LINK',
      github: 'https://github.com/hellkeyes/flask-dsa-tracker',
    },
    {
      title: 'IT Support Ticket Analytics',
      type: 'DATA ANALYTICS',
      description:
        'Built a Power BI dashboard analyzing 12,000+ IT support tickets across teams, priorities, agents, and locations.',
      tools: 'Power BI · DAX · Power Query',
      live: '',
      github: 'YOUR_GITHUB_LINK',
    },
    {

      title: 'LinkedIn Content Automation',
      type: 'AUTOMATION · INTERNSHIP PROJECT',
      description:
        'Built an n8n workflow that uses an LLM to generate personalized LinkedIn posts and draft content for observance days.',
      tools: 'n8n · Ollama API · LinkedIn API',
      // live: '',
      // github: 'YOUR_GITHUB_LINK',
    },
  ]

  return (
    <section id="experiments" className="experiments">
      <div className="section-header">
        <p className="section-number">// EXPERIMENTS</p>
        <h2>PROJECTS & RESEARCH</h2>
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

export default Experiments
