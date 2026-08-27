import { GITHUB_URL, LEETCODE_URL, LINKEDIN_URL } from './Nav';

export default function Footer() {
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer>
      <div className="footer-links">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={LEETCODE_URL} target="_blank" rel="noopener noreferrer">
          LeetCode
        </a>
        <button className="back-to-top" onClick={scrollTop}>
          Back to top ↑
        </button>
      </div>
      <p>
        © {new Date().getFullYear()} Umang Gupta · Built with React + Vite
      </p>
    </footer>
  );
}
