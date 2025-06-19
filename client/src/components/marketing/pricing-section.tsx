import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

export function PricingSection() {
  return (
    <section className="py-12 mb-10">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">
            Choose the Perfect Plan for Your Resume Needs
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select a plan that works for you, from creating your first resume to unlocking advanced AI features for multiple documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:translate-y-[-8px] transition-transform duration-300">
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
              <p className="text-gray-400 mb-6">Great for getting started</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <Button className="w-full mb-6 bg-blue-600 hover:bg-blue-700">Get Started</Button>
              <ul className="space-y-3">
                <PricingItem>1 Resume</PricingItem>
                <PricingItem>Basic Templates</PricingItem>
                <PricingItem>PDF Export</PricingItem>
                <PricingItem>Basic Resume Formatting</PricingItem>
              </ul>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-blue-900/70 to-purple-900/70 backdrop-blur-md border border-blue-400/20 rounded-xl overflow-hidden transform hover:translate-y-[-8px] transition-transform duration-300 shadow-lg shadow-blue-500/20">
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Premium</h3>
              <p className="text-blue-200 mb-6">Most popular choice</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">$9.99</span>
                <span className="text-blue-200 ml-2">/month</span>
              </div>
              <Button className="w-full mb-6 bg-white text-blue-900 hover:bg-blue-50">Get Started</Button>
              <ul className="space-y-3">
                <PricingItem>Up to 5 Resumes</PricingItem>
                <PricingItem>All Templates</PricingItem>
                <PricingItem>PDF & DOCX Export</PricingItem>
                <PricingItem>AI Content Enhancement</PricingItem>
                <PricingItem>Skills Recommendations</PricingItem>
                <PricingItem>Job Description Matcher</PricingItem>
              </ul>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:translate-y-[-8px] transition-transform duration-300">
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <p className="text-gray-400 mb-6">For career professionals</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-white">$19.99</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              <Button className="w-full mb-6 bg-blue-600 hover:bg-blue-700">Get Started</Button>
              <ul className="space-y-3">
                <PricingItem>Unlimited Resumes</PricingItem>
                <PricingItem>All Templates + Priority Access</PricingItem>
                <PricingItem>All Export Formats</PricingItem>
                <PricingItem>Advanced AI Features</PricingItem>
                <PricingItem>Career Coaching Integration</PricingItem>
                <PricingItem>Priority Support</PricingItem>
                <PricingItem>Version History</PricingItem>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6">All plans include a 7-day free trial. No credit card required to start.</p>
          <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
            Compare all plans
          </Button>
        </div>
      </div>
    </section>
  );
}

function PricingItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center">
      <CheckIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
      <span className="text-gray-300">{children}</span>
    </li>
  );
}