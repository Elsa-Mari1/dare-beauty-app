import { bookingLink, navItems } from "@/data/siteContent";

export function Header() {
  return (
    <header className="topbar">
      <a href="#top" className="brand">
        DARE BEAUTY
      </a>
      <nav className="nav">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="book-btn" href={bookingLink} target="_blank" rel="noreferrer">
        Book Online
      </a>
    </header>
  );
}
