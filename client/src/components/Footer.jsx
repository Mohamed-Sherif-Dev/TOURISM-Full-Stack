import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/80 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          {/* Logo + brand */}
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 64 32"
              className="h-6 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 26L20 6l12 8 12-8 18 20" />
              <path d="M2 26h60M20 6l4 20m8-12l4 12m8-20l-4 20" />
            </svg>
            <span className="font-semibold tracking-wide text-gray-800">
              N A T O U R S
            </span>
          </div>

          {/* Links */}
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
           <Link to="/about">
            <li><a className="hover:text-green-600" href="#">About us</a></li>
           </Link>
            <li><a className="hover:text-green-600" href="#">Download app</a></li>
            <li><a className="hover:text-green-600" href="#">Become a guide</a></li>
            <li><a className="hover:text-green-600" href="#">Careers</a></li>
            <Link to="/contact">
                        <li><a className="hover:text-green-600" href="#">Contact</a></li>
            </Link>
          </ul>
        </div>

        {/* Line */}
        <div className="my-6 h-px w-full bg-gray-200/70" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} modified by <span className="font-medium text-gray-700">Your Name</span>,
            created by Jonas Schmedtmann.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter" className="hover:text-green-600">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.18 4.18 0 0 0 1.84-2.31 8.3 8.3 0 0 1-2.64 1.02A4.15 4.15 0 0 0 12 8.13c0 .32.04.64.1.94A11.78 11.78 0 0 1 3.15 5.1a4.15 4.15 0 0 0 1.29 5.54c-.62-.02-1.2-.19-1.7-.47v.05c0 2.01 1.43 3.69 3.32 4.07-.35.1-.72.15-1.1.15-.27 0-.53-.03-.78-.07a4.16 4.16 0 0 0 3.88 2.89A8.33 8.33 0 0 1 2 19.54 11.76 11.76 0 0 0 8.36 21c7.54 0 11.67-6.25 11.67-11.67 0-.18 0-.35-.01-.53A8.3 8.3 0 0 0 22.46 6z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-green-600">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 16.8 2.8 2.8 0 0 0 12 9.2zm6.1-.9a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-green-600">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 .5A12 12 0 0 0 0 12.7c0 5.4 3.4 10 8.2 11.6.6.1.8-.3.8-.6v-2c-3.3.7-4-1.5-4-1.5-.6-1.4-1.5-1.8-1.5-1.8-1.2-.8.1-.8.1-.8 1.3.1 2 .  9 2 .9 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.7-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.6 1.2-3.6 0-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.3a11.6 11.6 0 0 1 6.2 0C17 3.5 18 3.8 18 3.8c.6 1.7.1 3 .1 3.3.8 1 1.2 2.2 1.2 3.6 0 4.8-2.9 5.9-5.6 6.2.4.3.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 24 12.7 12 12 0 0 0 12 .5z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}