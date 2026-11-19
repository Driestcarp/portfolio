import { useNavigate } from "react-router-dom"; // <- swap for your router (see note below)
import { Button } from "@/components/ui/button";

/**
 * Goes back to the home page ("/").
 *
 * Using Next.js instead of React Router? Replace the import and hook with:
 *   import { useRouter } from "next/navigation";
 *   const router = useRouter();
 *   ...onClick={() => router.push("/")}
 * (and add "use client" at the top of this file)
 */
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
      ← Home
    </Button>
  );
};

export default BackButton;
