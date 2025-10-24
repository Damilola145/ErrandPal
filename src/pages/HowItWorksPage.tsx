import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HowItWorksPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white" data-id="0ad61znsy" data-path="src/pages/HowItWorksPage.tsx">
      <Header />
      
      <main className="flex-1" data-id="0kodk9mm6" data-path="src/pages/HowItWorksPage.tsx">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white" data-id="zr49et3nn" data-path="src/pages/HowItWorksPage.tsx">
          <div className="container mx-auto text-center" data-id="kwcpmemdo" data-path="src/pages/HowItWorksPage.tsx">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-id="721ketppn" data-path="src/pages/HowItWorksPage.tsx">How ErrandPal Works</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto" data-id="w5gmcgpks" data-path="src/pages/HowItWorksPage.tsx">
              ErrandPal connects people who need errands done with local helpers ready to assist.
              Here's how our platform works.
            </p>
          </div>
        </section>
        
        {/* For Requesters */}
        <section className="py-16 px-4" data-id="2uen8r14h" data-path="src/pages/HowItWorksPage.tsx">
          <div className="container mx-auto" data-id="3stad9d2t" data-path="src/pages/HowItWorksPage.tsx">
            <h2 className="text-3xl font-bold text-center mb-16" data-id="fnecesinp" data-path="src/pages/HowItWorksPage.tsx">For People Requesting Errands</h2>
            
            <div className="grid md:grid-cols-3 gap-12" data-id="dh39i6bjk" data-path="src/pages/HowItWorksPage.tsx">
              <div className="text-center" data-id="ko8qep813" data-path="src/pages/HowItWorksPage.tsx">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6" data-id="49yasv3ra" data-path="src/pages/HowItWorksPage.tsx">
                  <span className="text-3xl font-bold text-blue-600" data-id="0lfafa04t" data-path="src/pages/HowItWorksPage.tsx">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3" data-id="ipsatehun" data-path="src/pages/HowItWorksPage.tsx">Post Your Errand</h3>
                <p className="text-gray-600" data-id="fgxt2wf20" data-path="src/pages/HowItWorksPage.tsx">
                  Create a detailed description of what you need, set your budget, and specify when you need it done.
                </p>
              </div>
              
              <div className="text-center" data-id="d4m4krd9o" data-path="src/pages/HowItWorksPage.tsx">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6" data-id="8y9xhmusu" data-path="src/pages/HowItWorksPage.tsx">
                  <span className="text-3xl font-bold text-blue-600" data-id="ji5zrajax" data-path="src/pages/HowItWorksPage.tsx">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3" data-id="z9cz4enm7" data-path="src/pages/HowItWorksPage.tsx">Get Matched With a Runner</h3>
                <p className="text-gray-600" data-id="a1y3b7qbp" data-path="src/pages/HowItWorksPage.tsx">
                  Local errand runners will see your task and offer to complete it. Choose the one that's right for you.
                </p>
              </div>
              
              <div className="text-center" data-id="i3l3afb3q" data-path="src/pages/HowItWorksPage.tsx">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6" data-id="vjoswe3bh" data-path="src/pages/HowItWorksPage.tsx">
                  <span className="text-3xl font-bold text-blue-600" data-id="kalj4gpwz" data-path="src/pages/HowItWorksPage.tsx">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3" data-id="cvr03zj1x" data-path="src/pages/HowItWorksPage.tsx">Task Completed</h3>
                <p className="text-gray-600" data-id="m5gzr6e8a" data-path="src/pages/HowItWorksPage.tsx">
                  Your runner completes the task, and you pay securely through the app. Then leave a review of your experience.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12" data-id="5xh98eg1n" data-path="src/pages/HowItWorksPage.tsx">
              <Button
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                onClick={() => navigate("/signup")}>

                Start Requesting Errands
              </Button>
            </div>
          </div>
        </section>
        
        {/* For Runners */}
        <section className="py-16 px-4 bg-gray-50" data-id="oxq58jozk" data-path="src/pages/HowItWorksPage.tsx">
          <div className="container mx-auto" data-id="0idxso9qj" data-path="src/pages/HowItWorksPage.tsx">
            <h2 className="text-3xl font-bold text-center mb-16" data-id="e3geqak3w" data-path="src/pages/HowItWorksPage.tsx">For Errand Runners</h2>
            
            <div className="grid md:grid-cols-3 gap-12" data-id="dwse0rg6z" data-path="src/pages/HowItWorksPage.tsx">
              <div className="text-center" data-id="y7uwfmnpe" data-path="src/pages/HowItWorksPage.tsx">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6" data-id="nq3vinacu" data-path="src/pages/HowItWorksPage.tsx">
                  <span className="text-3xl font-bold text-teal-600" data-id="zupdsev04" data-path="src/pages/HowItWorksPage.tsx">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3" data-id="conuxcxmo" data-path="src/pages/HowItWorksPage.tsx">Browse Available Errands</h3>
                <p className="text-gray-600" data-id="in3qlhgm2" data-path="src/pages/HowItWorksPage.tsx">
                  Find errands near you that match your skills and availability.
                </p>
              </div>
              
              <div className="text-center" data-id="jk05bvd6k" data-path="src/pages/HowItWorksPage.tsx">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6" data-id="yqwd9olqt" data-path="src/pages/HowItWorksPage.tsx">
                  <span className="text-3xl font-bold text-teal-600" data-id="jnlyxe687" data-path="src/pages/HowItWorksPage.tsx">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3" data-id="5tqtnny52" data-path="src/pages/HowItWorksPage.tsx">Accept Errands</h3>
                <p className="text-gray-600" data-id="6jx55t865" data-path="src/pages/HowItWorksPage.tsx">
                  Choose errands that fit your schedule. Communicate with the requester to confirm details.
                </p>
              </div>
              
              <div className="text-center" data-id="qfalhba98" data-path="src/pages/HowItWorksPage.tsx">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6" data-id="co66k7bs2" data-path="src/pages/HowItWorksPage.tsx">
                  <span className="text-3xl font-bold text-teal-600" data-id="nzi09f3ws" data-path="src/pages/HowItWorksPage.tsx">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3" data-id="1swwomduq" data-path="src/pages/HowItWorksPage.tsx">Complete & Get Paid</h3>
                <p className="text-gray-600" data-id="1y4atv9ma" data-path="src/pages/HowItWorksPage.tsx">
                  Complete the errand and receive payment securely through the platform. Build your reputation with good reviews.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12" data-id="ab9yd13kx" data-path="src/pages/HowItWorksPage.tsx">
              <Button
                className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
                onClick={() => navigate("/signup")}>

                Become an Errand Runner
              </Button>
            </div>
          </div>
        </section>
        
        {/* Trust & Safety */}
        <section className="py-16 px-4" data-id="uqjmzqbj9" data-path="src/pages/HowItWorksPage.tsx">
          <div className="container mx-auto max-w-4xl" data-id="a4132ucp2" data-path="src/pages/HowItWorksPage.tsx">
            <h2 className="text-3xl font-bold text-center mb-12" data-id="wyrrmoyud" data-path="src/pages/HowItWorksPage.tsx">Trust & Safety</h2>
            
            <div className="grid md:grid-cols-2 gap-8" data-id="oaim3v5qg" data-path="src/pages/HowItWorksPage.tsx">
              <div className="bg-white p-6 rounded-lg shadow-sm" data-id="11toxvdyk" data-path="src/pages/HowItWorksPage.tsx">
                <div className="flex items-center mb-4" data-id="o7ut80mhy" data-path="src/pages/HowItWorksPage.tsx">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3" data-id="sq6dyt9jr" data-path="src/pages/HowItWorksPage.tsx">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor" data-id="3xt22jruj" data-path="src/pages/HowItWorksPage.tsx">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" data-id="xd3y879fl" data-path="src/pages/HowItWorksPage.tsx" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg" data-id="vuxq4irr4" data-path="src/pages/HowItWorksPage.tsx">Verified Profiles</h3>
                </div>
                <p className="text-gray-600" data-id="ejrrw6094" data-path="src/pages/HowItWorksPage.tsx">
                  All users are verified through our comprehensive verification process to ensure safety and security.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm" data-id="n97w0g5fc" data-path="src/pages/HowItWorksPage.tsx">
                <div className="flex items-center mb-4" data-id="ws36sw741" data-path="src/pages/HowItWorksPage.tsx">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3" data-id="88jj5o81j" data-path="src/pages/HowItWorksPage.tsx">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor" data-id="bog9oq8k7" data-path="src/pages/HowItWorksPage.tsx">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-.257-.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" data-id="nv9jynq9w" data-path="src/pages/HowItWorksPage.tsx" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg" data-id="m3l6tcouq" data-path="src/pages/HowItWorksPage.tsx">Secure Payments</h3>
                </div>
                <p className="text-gray-600" data-id="aj07whsae" data-path="src/pages/HowItWorksPage.tsx">
                  All transactions are secured and processed through our platform. Payment is only released when the errand is completed.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm" data-id="f67jk1t9l" data-path="src/pages/HowItWorksPage.tsx">
                <div className="flex items-center mb-4" data-id="y8bn33yab" data-path="src/pages/HowItWorksPage.tsx">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3" data-id="c3zf921gc" data-path="src/pages/HowItWorksPage.tsx">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor" data-id="6r9rpooao" data-path="src/pages/HowItWorksPage.tsx">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" data-id="4mg8rfe9w" data-path="src/pages/HowItWorksPage.tsx" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg" data-id="z94vpq51y" data-path="src/pages/HowItWorksPage.tsx">Rating System</h3>
                </div>
                <p className="text-gray-600" data-id="s5wno5mpr" data-path="src/pages/HowItWorksPage.tsx">
                  Our transparent rating system helps maintain quality and allows you to make informed decisions based on past performance.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm" data-id="w5exskq5k" data-path="src/pages/HowItWorksPage.tsx">
                <div className="flex items-center mb-4" data-id="k0ol648xd" data-path="src/pages/HowItWorksPage.tsx">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3" data-id="beneazvet" data-path="src/pages/HowItWorksPage.tsx">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor" data-id="sr0ycc1rx" data-path="src/pages/HowItWorksPage.tsx">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" data-id="43av0k0yb" data-path="src/pages/HowItWorksPage.tsx" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg" data-id="ydvcns7ck" data-path="src/pages/HowItWorksPage.tsx">24/7 Support</h3>
                </div>
                <p className="text-gray-600" data-id="p21clsovm" data-path="src/pages/HowItWorksPage.tsx">
                  Our dedicated support team is available around the clock to assist with any questions or issues.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="py-16 px-4 bg-gray-50" data-id="1ece1ur5y" data-path="src/pages/HowItWorksPage.tsx">
          <div className="container mx-auto max-w-3xl" data-id="2xnnktywz" data-path="src/pages/HowItWorksPage.tsx">
            <h2 className="text-3xl font-bold text-center mb-12" data-id="i4z16xq1v" data-path="src/pages/HowItWorksPage.tsx">Frequently Asked Questions</h2>
            
            <div className="space-y-6" data-id="lniu9fvp5" data-path="src/pages/HowItWorksPage.tsx">
              <div className="bg-white p-6 rounded-lg shadow-sm" data-id="vcd4bgs9w" data-path="src/pages/HowItWorksPage.tsx">
                <h3 className="text-lg font-semibold mb-2" data-id="sw4xb04k4" data-path="src/pages/HowItWorksPage.tsx">How much does it cost to use ErrandPal?</h3>
                <p className="text-gray-600" data-id="sgdgq5vbd" data-path="src/pages/HowItWorksPage.tsx">
                  ErrandPal is free to sign up and browse. We charge a small service fee on completed transactions to maintain the platform.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm" data-id="1yinabbmp" data-path="src/pages/HowItWorksPage.tsx">
                <h3 className="text-lg font-semibold mb-2" data-id="s941jxwxz" data-path="src/pages/HowItWorksPage.tsx">What kind of errands can I request?</h3>
                <p className="text-gray-600" data-id="j5hqb77rw" data-path="src/pages/HowItWorksPage.tsx">
                  Almost anything legal and reasonable! Common errands include grocery shopping, package pickup, furniture assembly, pet sitting, and more.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm" data-id="e7v91hyej" data-path="src/pages/HowItWorksPage.tsx">
                <h3 className="text-lg font-semibold mb-2" data-id="wl8pki7y7" data-path="src/pages/HowItWorksPage.tsx">How do I know my errand runner is reliable?</h3>
                <p className="text-gray-600" data-id="gktql9me4" data-path="src/pages/HowItWorksPage.tsx">
                  All runners go through verification, and you can see their ratings and reviews from previous errands. You can also message them before accepting.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm" data-id="zduwbf532" data-path="src/pages/HowItWorksPage.tsx">
                <h3 className="text-lg font-semibold mb-2" data-id="mzai401hi" data-path="src/pages/HowItWorksPage.tsx">What if something goes wrong with my errand?</h3>
                <p className="text-gray-600" data-id="099h0cp2x" data-path="src/pages/HowItWorksPage.tsx">
                  Our support team is ready to help resolve any issues. We also have a dispute resolution process to handle any disagreements fairly.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm" data-id="76wlka1wh" data-path="src/pages/HowItWorksPage.tsx">
                <h3 className="text-lg font-semibold mb-2" data-id="gy1eyx2na" data-path="src/pages/HowItWorksPage.tsx">How do I get paid as an errand runner?</h3>
                <p className="text-gray-600" data-id="y7es4r52s" data-path="src/pages/HowItWorksPage.tsx">
                  After completing an errand, the payment is released to your account. You can then transfer it to your bank account or keep it in your ErrandPal balance.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-center" data-id="da0e37hjm" data-path="src/pages/HowItWorksPage.tsx">
          <div className="container mx-auto" data-id="fprny9lu1" data-path="src/pages/HowItWorksPage.tsx">
            <h2 className="text-3xl font-bold mb-6" data-id="jetkflwei" data-path="src/pages/HowItWorksPage.tsx">Ready to get started?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8" data-id="jyl4gkb9b" data-path="src/pages/HowItWorksPage.tsx">
              Join thousands of people who are saving time and getting things done through ErrandPal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-id="azj57u80n" data-path="src/pages/HowItWorksPage.tsx">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => navigate("/signup")}>

                Sign Up Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/browse")}>

                Browse Errands
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>);

};

export default HowItWorksPage;