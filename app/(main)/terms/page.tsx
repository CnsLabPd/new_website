export default function TermsAndConditions() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative pt-48 pb-20 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6">
          <h1 className="mb-8 text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Terms and Conditions
          </h1>
          <p className="text-muted-foreground text-sm">Effective Date: 20/08/2026</p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-8">
            These Terms and Conditions ("Terms") govern your use of the website www.neurogati.com ("Website") and the services provided by Neurogati Private Limited ("Neurogati," "we," "us," or "our"). By accessing our Website or using our neurotechnology tools, monitoring platforms (Quamon-PD™), rehabilitation games, and workshops, you agree to these Terms.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">1. Services Provided</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Neurogati provides AI-powered neurotechnology innovations, clinical monitoring platforms, rehabilitation gaming solutions, and neuro-tech education workshops. These services are intended for clinical research, professional healthcare use, or educational purposes as specified for each product.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">2. User Obligations</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            You agree to use the Website and services only for lawful purposes. If you are a healthcare professional using our monitoring or rehabilitation tools, you are responsible for the clinical interpretation of the data provided by the platforms.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">3. Medical Disclaimer</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The products and services offered on this Website are assistive tools and games driven by AI and computational neuroscience. They are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified physician with any questions regarding a medical condition.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">4. Nira AI Assistant</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Nira is an automated AI website guide provided for general information and website navigation. Its responses may be incomplete, outdated, or inaccurate and do not constitute medical, legal, educational-admissions, research, or other professional advice. A Nira response does not guarantee product suitability, workshop admission, pricing, availability, certification, partnership, or any outcome. Verify important information on the relevant Website page or directly with Neurogati. Do not submit confidential, sensitive, or clinical information through Nira.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            If you are under 18, you may use Nira only with the involvement and authorization of a parent or legal guardian. Minors must not submit personal or sensitive information through Nira.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">5. Payments</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Payments for workshops, subscriptions, or products are processed through Razorpay, our secure payment partner. By making a payment, you agree to comply with Razorpay's terms of service.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">6. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            All content, including software, monitoring algorithms, and educational materials (such as those in the Workshops), are the intellectual property of Neurogati or its licensors.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">7. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Neurogati shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our neurotechnology platforms.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">8. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">9. Contact Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            For any questions, contact us at <a href="mailto:contactus@neurogati.com" className="text-blue-400 hover:text-blue-300 underline">contactus@neurogati.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
