function Experiments() {
  const experiments = [
    {
      number: '01',
      title: 'Loan Approval Prediction',
      type: 'MACHINE LEARNING',
      description:
        'A machine learning experiment exploring loan approval prediction using applicant and property features.',
      tools: 'Python · Pandas · Scikit-learn · XGBoost',
    },
    {
      number: '02',
      title: 'IT Support Ticket Analytics',
      type: 'DATA ANALYTICS',
      description:
        'A Power BI dashboard analyzing 12,000+ IT support tickets across teams, priorities, agents, and locations.',
      tools: 'Power BI · DAX · Power Query',
      github: 'YOUR_GITHUB_LINK',
    },
     {
      number: '03',
      title: 'Protein Price Monitoring Bot',
      type: 'AUTOMATION · PERSONAL PROJECT',
      description:
        'An automated monitoring bot that tracks protein products for availability and price changes using browser automation.',
      tools: 'Python · Playwright · Automation',
      github: 'https://github.com/hellkeyes/protein-monitor-bot',
    },
    {
      number: '04',
      title: 'Netflix + IMDb Explorer',
      type: 'FRONTEND · PERSONAL PROJECT',
      description:
        'A movie discovery platform inspired by Netflix and IMDb with search, browsing, ratings, and an entertainment-focused interface.',
      tools: 'React · JavaScript · APIs',
      github: 'https://github.com/hellkeyes/netflix-imdb-extension',
    }
  ]

  return (
    <section id="experiments" className="experiments">
      <div className="section-header">
        <p className="section-number">// EXPERIMENTS</p>
        <h2>THINGS I'VE BEEN BUILDING</h2>
      </div>

      <div className="projects-grid">
        {experiments.map((experiment) => (
          <article
            className="project-card"
            key={experiment.number}
          >
            <div className="project-top">
              <span className="project-number">
                {experiment.number}
              </span>
            </div>

            <h3>{experiment.title}</h3>

            <span className="project-type">
              {experiment.type}
            </span>

            <p className="project-description">
              {experiment.description}
            </p>

            <div className="project-bottom">
              <span className="project-tools">
                {experiment.tools}
              </span>

              <div className="project-links">
                {experiment.live && (
                  <a
                    href={experiment.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LIVE
                  </a>
                )}

                {experiment.github && (
                  <a
                    href={experiment.github}
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