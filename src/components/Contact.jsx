function Contact() {
  return (
    <section id="contact" className="contact">
      <p className="section-number">// CONTACT</p>

      <div className="contact-content">
        <h2>
          I'M OPEN
          <br />
          TO COOL THINGS.
        </h2>

        <p className="contact-text">
          Jobs.
          <br />
          Projects.
          <br />
          Ideas that probably
          <br />
          shouldn't work but somehow do.
        </p>

        <div className="contact-links">
          <a href="mailto:hellyhpatel04@email.com">
            // EMAIL 
          </a>

          <a
            href="YOUR_LINKEDIN_URL"
            target="_blank"
            rel="noreferrer"
          >
            // LINKEDIN 
          </a>

          <a
            href="https://github.com/hellkeyes/"
            target="_blank"
            rel="noreferrer"
          >
            // GITHUB 
          </a>
        </div>
      </div>

      <footer className="contact-footer">
        <div>
          <strong>HELLY</strong>

          <p>
            still figuring it out.
            <br />
          </p>
        </div>

        <span>
          Build and designed by Helly © 2026
        </span>
      </footer>
    </section>
  )
}

export default Contact
