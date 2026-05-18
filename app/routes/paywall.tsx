import { ArrowLeft, Check, Crown, Sparkles } from "lucide-react";
import React from "react";
import { Link } from "react-router";



const plans = [
  {
    id: "pro",
    name: "Pro",
    price: "$9",
    period: "/mo",
    tagline: "Everything you need",
    features: ["All modules unlocked", "Unlimited quizzes", "Progress tracking", "Streak protection"],
    highlight: false,
  },
  {
    id: "mastery",
    name: "Mastery",
    price: "$19",
    period: "/mo",
    tagline: "For serious learners",
    features: [
      "Everything in Pro",
      "Advanced techniques module",
      "Live coaching sessions",
      "Priority support",
      "Certification on completion",
    ],
    highlight: true,
  },
];

const PaywallPage = () => {
  return (
       <div className="min-h-screen flex flex-col">
        <div className="px-5 pt-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>

        <div className="px-5 pt-6 pb-10 space-y-6 flex-1">
          <div className="text-center">
            <div className="inline-flex h-14 w-14 rounded-2xl gradient-warm items-center justify-center shadow-pop mb-4">
              <Crown className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Unlock your full potential</h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
              Get access to every module, advanced practice, and exclusive content.
            </p>
          </div>

          <div className="space-y-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-5 relative ${
                  plan.highlight
                    ? "bg-secondary text-secondary-foreground shadow-pop"
                    : "bg-card border border-border/60"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-2.5 left-5 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="font-display text-2xl font-bold">{plan.name}</p>
                    <p className={`text-xs ${plan.highlight ? "opacity-90" : "text-muted-foreground"}`}>{plan.tagline}</p>
                  </div>
                  <div>
                    <span className="font-display text-3xl font-bold">{plan.price}</span>
                    <span className={`text-sm ${plan.highlight ? "opacity-80" : "text-muted-foreground"}`}>{plan.period}</span>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.highlight ? "bg-secondary-foreground/20" : "bg-success/20"
                      }`}>
                        <Check className={`h-3 w-3 ${plan.highlight ? "" : "text-success"}`} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-5 w-full rounded-2xl py-3.5 font-semibold inline-flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? "bg-secondary-foreground text-secondary"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <Sparkles className="h-4 w-4" /> Choose {plan.name}
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-muted-foreground">Cancel anytime. 7-day money-back guarantee.</p>
        </div>
      </div>
  );
};

export default PaywallPage;
