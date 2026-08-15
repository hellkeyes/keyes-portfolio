import { useState } from 'react'

function Works() {
  const [activeWork, setActiveWork] = useState(0)

  const works = [
    {
      company: 'Sai Leela Infotech Consultancy',
      shortName: 'SLIC',
      role: 'Intern',
      duration: '5 MONTHS',
      location: 'SURAT',

  description: [
    'Contributed to the frontend development of a deployed driver compliance application, building a mobile-friendly interface for driver work diary calculations and compliance breach reporting in Australian transport operations.',
  
    'Built a Python-based MVP to evaluate the feasibility of automating the freight booking process, using scripts for booking data extraction, validation, and routing logic.',,
  
    'Used Google Sheets API to sync and maintain live client and operational route data for the operations team.',
  
    'Eliminated manual email triage by building a system that automatically tagged actionable booking emails, significantly reducing review workload.',
  
    'Monitored Azure Data Factory pipelines and reported errors to support cloud data operations.',
  
    'Researched linehaul department workflows and daily truck allocation and route planning processes, contributing to the early-stage research and scoping of an ML-based system to automate truck allocation and predict optimal routes for drivers.'
  ],

      technologies:
        'PYTHON · AI · AUTOMATION · GOOGLE SHEETS API · ELEVENLABS · VAPI · TWILIO · AZURE'
    },

    {
      company: 'Hacknox',
      shortName: 'HACKNOX',
      role: 'Cybersecurity Intern',
      duration: '30 DAYS',
      location: 'SURAT',

      description: [
        'Gained hands-on exposure to ethical hacking, vulnerability assessment, and basic network defense.',

        'Practiced security testing workflows using Nmap, Wireshark, and Burp Suite.'
      ],

      technologies:
        'CYBERSECURITY · ETHICAL HACKING · NMAP · WIRESHARK · BURP SUITE'
    },

    {
      company: 'Soil Coffeehouse',
      shortName: 'SOIL COFFEEHOUSE',
      role: 'PR & Floor Manager',
      duration: '3 MONTHS',
      location: 'SURAT',

      description: [
        'Managed customer experience and floor operations, including payment collection and basic accounting.',

        'Coordinated with the team to ensure smooth service delivery.'
      ],

      technologies:
        'PR · OPERATIONS · CUSTOMER EXPERIENCE · ACCOUNTING'
    }
  ]

  const selectedWork = works[activeWork]

  return (
    <section
      id="works"
      className="works"
    >

      <div className="section-header">

        <p className="section-number">
          // WORKS
        </p>

        <h2>
          WORK EXPERIENCE
        </h2>

      </div>


      <div className="works-container">

        {/* LEFT SIDE */}

        <div className="works-navigation">

          {works.map((work, index) => (

            <button
              key={work.company}
              className={
                activeWork === index
                  ? 'work-nav-item active'
                  : 'work-nav-item'
              }
              onClick={() =>
                setActiveWork(index)
              }
            >

              <span>
                {work.company}
              </span>

            </button>

          ))}

        </div>


        {/* RIGHT SIDE */}

        <div className="work-details">

          <div className="work-details-header">

            <div>

              <p className="work-role">
                {selectedWork.role}
              </p>

              <h3>
                {selectedWork.company}
              </h3>

            </div>


            <div className="work-meta">

              <span>
                {selectedWork.duration}
              </span>

              <span>
                {selectedWork.location}
              </span>

            </div>

          </div>


          <ul className="work-description">

            {selectedWork.description.map(
              (point, index) => (

                <li key={index}>
                  {point}
                </li>

              )
            )}

          </ul>


          <div className="work-technologies">

            {selectedWork.technologies}

          </div>

        </div>

      </div>

    </section>
  )
}

export default Works
