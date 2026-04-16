import Image from "next/image";
import { navItems } from "@/data/siteContent";

export function Header() {
  return (
    <header className="topbar sticky">
      <a href="#top" className="brand">
        <Image
          src="/logo.png"
          alt="Dare Beauty Logo"
          width={42}
          height={42}
          priority
          className="brand-logo"
        />
        <span className="brand-name">DARE BEAUTY</span>
      </a>

      <nav className="nav">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}