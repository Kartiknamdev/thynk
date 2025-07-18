import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden relative bg-gradient-to-br from-white/60 to-primary/10 dark:from-black/60 dark:to-primary/10">
      {/* Frosted glass header */}
      <header
        className="w-full fixed top-0 left-0 z-30 flex items-center justify-between px-6 py-3 md:px-12 md:py-4 backdrop-blur-2xl bg-white/60 dark:bg-black/40 border-b border-white/20 dark:border-white/10 shadow-[0_2px_16px_rgba(0,0,0,0.08)] transition-all duration-500"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.3) 100%)',
          WebkitBackdropFilter: 'blur(18px)',
          backdropFilter: 'blur(18px)',
        }}
      >
        <span className="text-2xl font-bold tracking-tight text-primary drop-shadow-sm select-none">Thynk!</span>
        <nav className="flex gap-6 text-base font-medium">
          <Link to="/" className="text-neutral-700 dark:text-neutral-100 hover:text-primary transition-colors">Home</Link>
          <Link to="/features" className="text-neutral-700 dark:text-neutral-100 hover:text-primary transition-colors">Features</Link>
          <Link to="/about" className="text-neutral-700 dark:text-neutral-100 hover:text-primary transition-colors">About</Link>
        </nav>
      </header>
      <div className="h-20 md:h-24" />
      <div className="flex-1 w-full flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-white/70 dark:bg-black/40 rounded-2xl shadow-xl p-8 backdrop-blur-md border border-white/20 dark:border-white/10">
          <h1 className="text-4xl font-bold mb-6 text-primary text-center drop-shadow">About Thynk</h1>
          <p className="text-lg text-gray-800 dark:text-gray-100 mb-4">
            <b>Thynk</b> is designed to help you master verbal aptitude for corporate and competitive exams. Our mission is to make learning engaging, effective, and beautiful.
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-100 mb-4">
            Built with love for learners, Thynk combines interactive practice, smart analytics, and a modern UI to help you reach your goals.
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-100">
            Whether you're preparing for a job interview, campus placement, or competitive exam, Thynk is your companion for verbal success.
          </p>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full mt-16 py-6 flex flex-col items-center justify-center text-sm text-gray-500 dark:text-gray-400 bg-white/40 dark:bg-black/30 backdrop-blur-md border-t border-white/20 dark:border-white/10 transition-all duration-500">
        <p>© 2025 Thynk. All rights reserved.</p>
        <p className="mt-1">Made with <span className="text-pink-500">♥</span> for learners.</p>
      </footer>
    </div>
  );
}
