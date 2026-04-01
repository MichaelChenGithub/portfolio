import { contactLinks } from '../data/portfolio';

function ContactIcon({ icon }) {
  const paths = {
    github:
      'M12 2C6.477 2 2 6.589 2 12.25c0 4.53 2.865 8.371 6.839 9.728.5.095.682-.221.682-.492 0-.243-.009-.888-.014-1.742-2.782.617-3.369-1.368-3.369-1.368-.455-1.179-1.11-1.494-1.11-1.494-.908-.636.069-.623.069-.623 1.004.072 1.532 1.053 1.532 1.053.892 1.567 2.341 1.114 2.91.852.091-.664.349-1.115.635-1.371-2.221-.259-4.555-1.139-4.555-5.07 0-1.12.39-2.037 1.03-2.755-.103-.259-.447-1.301.098-2.712 0 0 .84-.276 2.75 1.052A9.303 9.303 0 0 1 12 6.836c.85.004 1.706.118 2.505.347 1.909-1.328 2.748-1.052 2.748-1.052.546 1.411.202 2.453.1 2.712.64.718 1.028 1.635 1.028 2.755 0 3.941-2.338 4.808-4.566 5.062.359.318.678.944.678 1.903 0 1.374-.012 2.482-.012 2.82 0 .273.18.592.688.491C19.138 20.617 22 16.778 22 12.25 22 6.589 17.523 2 12 2Z',
    linkedin:
      'M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM8.5 9.69H5.38V19.5H8.5V9.69Zm4.94 0h-3.1V19.5h3.1v-5.15c0-2.87 3.75-3.11 3.75 0v5.15h3.12v-6.22c0-4.84-5.42-4.66-6.87-2.28V9.69Z',
    resume:
      'M7 3.75A1.75 1.75 0 0 0 5.25 5.5v13A1.75 1.75 0 0 0 7 20.25h10a1.75 1.75 0 0 0 1.75-1.75v-9.19a1.75 1.75 0 0 0-.513-1.237l-3.31-3.314A1.75 1.75 0 0 0 13.69 4.25H7Zm6.25 1.823 3.677 3.677H13.25V5.573Zm-4 6.177h5.5v1.5h-5.5v-1.5Zm0 3h5.5v1.5h-5.5v-1.5Zm0-6h2.5v1.5h-2.5v-1.5Z',
    medium:
      'M4.75 6A2.25 2.25 0 0 1 7 3.75h10A2.25 2.25 0 0 1 19.25 6v12A2.25 2.25 0 0 1 17 20.25H7A2.25 2.25 0 0 1 4.75 18V6Zm3.5 2.25a.75.75 0 0 0-.75.75v6a.75.75 0 0 0 1.5 0v-4.04l2.146 2.525a.75.75 0 0 0 1.143 0l2.21-2.6V15a.75.75 0 0 0 1.5 0V9a.75.75 0 0 0-1.321-.49l-2.96 3.485-2.96-3.485a.75.75 0 0 0-.568-.26Z',
  };

  return (
    <span className="contact-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img">
        <path d={paths[icon]} />
      </svg>
    </span>
  );
}

export function ContactLinks() {
  return (
    <section className="cta-panel reveal reveal-delay-2">
      <p className="eyebrow">Contact</p>
      <h2>Find me here</h2>
      <p>Connect with me or learn more through the links below.</p>
      <div className="contact-links">
        {contactLinks.map((item) => (
          <a
            key={item.label}
            className="contact-link-card"
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            <ContactIcon icon={item.icon} />
            <span className="contact-copy">
              <strong>{item.label}</strong>
              <span>{item.sublabel}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
