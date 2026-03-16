export default function PrivacyPolicy() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative pt-48 pb-20 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-6">
          <h1 className="mb-8 text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">Last Updated: 09/03/2026</p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-8">
            At Neurogati, we are committed to protecting the privacy of our users, clinicians, and researchers. This policy explains how we collect, use, and safeguard your data.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">1. Information We Collect</h2>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-6 space-y-3">
            <li><strong>Personal Information:</strong> Name, email address, phone number, and organization details provided during contact or registration.</li>
            <li><strong>Clinical/Usage Data:</strong> For users of Quamon-PD™ or cRGS™, we may collect behavioral biomarkers and engagement metrics necessary for diagnostic assistance and rehabilitation tracking.</li>
            <li><strong>Payment Information:</strong> Payment details are collected directly by Razorpay. Neurogati does not store credit card or bank account details.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">2. How We Use Information</h2>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-6 space-y-2">
            <li>To provide and improve our neurotechnology services.</li>
            <li>To process workshop registrations and educational certifications.</li>
            <li>To generate clinical reports for healthcare providers.</li>
            <li>To communicate updates regarding our research and products.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">3. Data Sharing</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We do not sell your data. We share information only with:
          </p>
          <ul className="list-disc list-inside text-muted-foreground leading-relaxed mb-6 space-y-2">
            <li><strong>Razorpay:</strong> To facilitate secure payments.</li>
            <li><strong>Clinical Partners:</strong> As part of multi-institutional research or clinical trials (e.g., SRMC, NIMHANS), subject to strict confidentiality agreements.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 mt-8">4. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We implement industry-standard security measures to protect data related to brain modeling and clinical diagnostics from unauthorized access.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">5. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            You may request access to, correction of, or deletion of your personal data by emailing to <a href="mailto:contactus@neurogati.com" className="text-blue-400 hover:text-blue-300 underline">contactus@neurogati.com</a>.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Contact Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            If you have any questions regarding this Privacy Policy, please contact us at:
          </p>
          <div className="text-muted-foreground leading-relaxed mb-6">
            <p><strong>Legal Name:</strong> Neurogati Private Limited</p>
            <p><strong>Legal Address:</strong> 1st Floor, 1FA, IITM Research Park, Kanagam Road, Taramani, Chennai – 600113, Tamil Nadu, India.</p>
            <p><strong>Contact:</strong> <a href="mailto:contactus@neurogati.com" className="text-blue-400 hover:text-blue-300 underline">contactus@neurogati.com</a></p>
          </div>
        </div>
      </section>
    </div>
  );
}
