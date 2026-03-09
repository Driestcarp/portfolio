// ============================================================
// PROJECT DATA — Edit this file to add/remove/update projects
// ============================================================

export interface Project {
  /** Used as a key for translations – keep unique */
  id: string;
  title: { sv: string; en: string };
  description: { sv: string; en: string };
  details: { sv: string; en: string };
  tags: string[];
  /** Gradient overlay on hover (Tailwind classes) */
  color: string;
  /** Path to image in src/assets/ or a URL */
  image: string;
  /** Set to "#" or "" to hide */
  liveUrl: string;
  githubUrl: string;
}
