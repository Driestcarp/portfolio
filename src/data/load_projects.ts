import type { Project } from "@/types/project";

export async function loadProjects(): Promise<Project[]> {
  const res = await fetch("/data/projects.json?ts=" + Date.now());
  return res.json();
}