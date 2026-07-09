import './Footer.css'

function Footer() {
  return (
    <footer className="site-footer">
      <span>Games Hub © {new Date().getFullYear()}</span>
      <span className="site-footer-dot">·</span>
      <span>נבנה על ידי שרהל'ה גמליאל</span>
    </footer>
  )
}

export default Footer
