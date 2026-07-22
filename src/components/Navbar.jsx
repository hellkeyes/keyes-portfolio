function Navbar(){
    return (
        <nav className='navbar'>
            <a href='/' className='logo'>
            PATEL HELLY
            </a>

            <div className='nav-links'>
                <a href='#works'>WORK</a>
                <a href='#experiments'>EXPERIMENTS</a>
                <a href='#contact'>CONTACT</a>
            </div>

            <a href='/resume.pdf' className='resume-link'>
            RESUME
            </a>
        </nav>
    )
}

export default Navbar