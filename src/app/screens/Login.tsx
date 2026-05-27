import { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to dashboard
    navigate("/");
  };

  const handleSocialLogin = (provider: string) => {
    // Mock social login - navigate to dashboard
    console.log(`Login with ${provider}`);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#efecff_0%,#f6f7fc_38%,#f6f7fc_100%)] py-0 md:py-7">
      <div className="flex min-h-screen w-full max-w-md flex-col items-center justify-center bg-background px-6 md:min-h-[860px] md:rounded-[34px] md:border md:border-white/80 md:shadow-[0_24px_70px_rgba(34,25,76,0.14)]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <div className="mb-10 flex flex-col items-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[26px] bg-[linear-gradient(135deg,#6657F5,#A18CFB)] shadow-[0_18px_36px_rgba(102,87,245,0.3)]">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="mb-2 text-center text-[30px] font-semibold tracking-[-0.045em]">{t("login.welcome")}</h1>
            <p className="text-sm text-muted-foreground">{t("login.subtitle")}</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialLogin("Google")}
              className="secondary-action w-full gap-3 hover:bg-muted/70"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium">{t("login.continueWithGoogle")}</span>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSocialLogin("Microsoft")}
              className="secondary-action w-full gap-3 hover:bg-muted/70"
            >
              <svg className="w-5 h-5" viewBox="0 0 23 23">
                <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              <span className="font-medium">{t("login.continueWithMicrosoft")}</span>
            </motion.button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                {t("login.orEmail")}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm mb-2">{t("login.email")}</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="field"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm mb-2">{t("login.password")}</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="field"
              />
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary">
                {t("login.forgotPassword")}
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="primary-action w-full"
            >
              {t("login.loginButton")}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t("login.noAccount")}{" "}
              <button className="text-primary">{t("login.signUp")}</button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
