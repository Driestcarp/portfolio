import { motion } from "framer-motion";
import { Mail, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { personalInfo } from "@/data/portfolio";

const socials = [
  { icon: Github, label: "GitHub", href: personalInfo.github },
  { icon: Mail, label: "Email", href: `mailto:${personalInfo.email}` },
];

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading text-sm tracking-[0.3em] uppercase mb-4">{t("contact", "label")}</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            {t("contact", "heading1")}
            <br />
            <span className="text-gradient">{t("contact", "heading2")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-12">
            {t("contact", "description")}
          </p>

          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-heading font-medium tracking-wide rounded-md hover:opacity-90 transition-opacity mb-16"
          >
            {t("contact", "cta")}
          </a>

          <div className="flex justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-3 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-32 border-t border-border pt-8 text-center">
        <p className="text-muted-foreground text-sm font-heading tracking-wide">
          © 2026 {personalInfo.name}.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;

// import { motion } from "framer-motion";
// import { Mail, Github, Linkedin, Twitter } from "lucide-react";
// import { useLanguage } from "@/contexts/LanguageContext";

// const socials = [
//   { icon: Github, label: "GitHub", href: "https://github.com/Driestcarp/" },
//   //{ icon: Linkedin, label: "LinkedIn", href: "#" },
//   //{ icon: Twitter, label: "Twitter", href: "#" },
//   { icon: Mail, label: "Email", href: "mailto:albin.lofgren.01@gmail.com.com" },
// ];

// const ContactSection = () => {
//   const { t } = useLanguage();

//   return (
//     <section id="contact" className="py-32 px-6">
//       <div className="max-w-5xl mx-auto text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.6 }}
//         >
//           <p className="text-primary font-heading text-sm tracking-[0.3em] uppercase mb-4">{t("contact", "label")}</p>
//           <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
//             {t("contact", "heading1")}
//             <br />
//             <span className="text-gradient">{t("contact", "heading2")}</span>
//           </h2>
//           <p className="text-muted-foreground text-lg max-w-md mx-auto mb-12">
//             {t("contact", "description")}
//           </p>

//           <a
//             href="mailto:albin.lofgren.01@gmail.com.com"
//             className="inline-block px-10 py-4 bg-primary text-primary-foreground font-heading font-medium tracking-wide rounded-md hover:opacity-90 transition-opacity mb-16"
//           >
//             {t("contact", "cta")}
//           </a>

//           <div className="flex justify-center gap-4">
//             {socials.map((social) => (
//               <a
//                 key={social.label}
//                 href={social.href}
//                 aria-label={social.label}
//                 className="p-3 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
//               >
//                 <social.icon className="w-5 h-5" />
//               </a>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       <div className="mt-32 border-t border-border pt-8 text-center">
//         <p className="text-muted-foreground text-sm font-heading tracking-wide">
//           © 2026 Albin Löfgren.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;
