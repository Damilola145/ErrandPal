import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { errandCategories } from "@/services/mockData";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent } from
"@/components/ui/card";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white" data-id="kr9q2zjg2" data-path="src/pages/HomePage.tsx">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary py-24 px-4 overflow-hidden " data-id="ibandzf6f" data-path="src/pages/HomePage.tsx">
        <div className="absolute inset-0 opacity-10 z-0" data-id="oti3l1xjo" data-path="src/pages/HomePage.tsx">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white" data-id="hf7inzsg2" data-path="src/pages/HomePage.tsx"></div>
          <div className="absolute top-40 right-10 w-40 h-40 rounded-full bg-white" data-id="tqc15o18r" data-path="src/pages/HomePage.tsx"></div>
          <div className="absolute bottom-10 left-1/4 w-56 h-56 rounded-full bg-white" data-id="hw8a22ynk" data-path="src/pages/HomePage.tsx"></div>
        </div>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10" data-id="l94s28wjn" data-path="src/pages/HomePage.tsx">
          <div className="lg:w-1/2 text-white" data-id="fo7c0nh4w" data-path="src/pages/HomePage.tsx">
            <div className="inline-block px-4 py-1 bg-white/20 rounded-full mb-4 backdrop-blur-sm" data-id="8kmtoxswl" data-path="src/pages/HomePage.tsx">
              <span className="text-white font-medium" data-id="4kb8vceer" data-path="src/pages/HomePage.tsx">Local Task Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-id="4nmzafnx9" data-path="src/pages/HomePage.tsx">Your Everyday Tasks, <span className="text-accent underline decoration-wavy decoration-accent/40 " data-id="jbsjdljj4" data-path="src/pages/HomePage.tsx">Solved</span> With a Tap</h1>
            <p className="text-xl opacity-90 mb-8 leading-relaxed" data-id="obbcqo8ov" data-path="src/pages/HomePage.tsx">
              ErrandPal connects busy people with reliable locals who can help with shopping, deliveries, home tasks, and more – all in your neighborhood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 " data-id="dwthbexkn" data-path="src/pages/HomePage.tsx">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary  font-semibold"
                onClick={() => navigate("/signup")}>
                Request an Errand
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary  font-semibold"
                onClick={() => navigate("/signup")}>
                Become a Runner
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2" data-id="66blydags" data-path="src/pages/HomePage.tsx">
            <div className="relative" data-id="plmjrlm6f" data-path="src/pages/HomePage.tsx">
              <div className="bg-white p-4 rounded-lg shadow-xl rotate-3 transition-all hover:rotate-0 duration-300" data-id="ptnc4jmsx" data-path="src/pages/HomePage.tsx">
                <img
                  src="/hero.avif"
                  alt="People collaborating on tasks"
                  className="rounded w-full h-auto" data-id="5yeh15blq" data-path="src/pages/HomePage.tsx" />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 bg-white p-3 rounded-lg shadow-md animate-bounce z-5" data-id="hhwepw8kt" data-path="src/pages/HomePage.tsx">
                <span className="text-primary font-semibold" data-id="l0ize1iyu" data-path="src/pages/HomePage.tsx">🛍️ Shopping</span>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-lg shadow-md animate-bounce delay-300 z-5" data-id="crcnl5jew" data-path="src/pages/HomePage.tsx">
                <span className="text-secondary font-semibold" data-id="sp6j8eval" data-path="src/pages/HomePage.tsx">🚚 Delivery</span>
              </div>
              <div className="absolute top-1/2 -right-12 bg-white p-3 rounded-lg shadow-md animate-pulse z-5" data-id="3rdp75y9z" data-path="src/pages/HomePage.tsx">
                <span className="text-accent font-semibold" data-id="rya44ehd0" data-path="src/pages/HomePage.tsx">🏠 Home Tasks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-16 px-4" data-id="32kse3r3l" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto" data-id="wz3o2csmu" data-path="src/pages/HomePage.tsx">
          <div className="text-center mb-16" data-id="938sw3urs" data-path="src/pages/HomePage.tsx">
            <h2 className="text-3xl font-bold mb-4" data-id="36pvu2hek" data-path="src/pages/HomePage.tsx">Why Choose <span className="text-primary" data-id="s3u1jhd9e" data-path="src/pages/HomePage.tsx">ErrandPal</span>?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto" data-id="ldrx9dez3" data-path="src/pages/HomePage.tsx">
              Our platform connects people who need tasks done with those who can help, creating opportunities and solving problems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8" data-id="j9u1yrw77" data-path="src/pages/HomePage.tsx">
            <Card className="group hover:shadow-lg transition-all border-t-4 border-t-primary">
              <CardContent className="pt-8">
                <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors" data-id="xppvxcyck" data-path="src/pages/HomePage.tsx">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-id="xuoc39bpy" data-path="src/pages/HomePage.tsx">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-id="djrfob2uu" data-path="src/pages/HomePage.tsx" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3" data-id="h5eegbfhi" data-path="src/pages/HomePage.tsx">Save Time</h3>
                <p className="text-gray-600" data-id="fo8vguicq" data-path="src/pages/HomePage.tsx">
                  Delegate your errands and free up your schedule for what matters most to you.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all border-t-4 border-t-secondary">
              <CardContent className="pt-8">
                <div className="mb-4 bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors" data-id="7samqpr5b" data-path="src/pages/HomePage.tsx">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-id="cq5w42chh" data-path="src/pages/HomePage.tsx">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-id="o3aoi9h7a" data-path="src/pages/HomePage.tsx" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3" data-id="62z6nmejb" data-path="src/pages/HomePage.tsx">Trusted Runners</h3>
                <p className="text-gray-600" data-id="qw3s5m6j1" data-path="src/pages/HomePage.tsx">
                  Verified profiles, ratings, and reviews ensure quality service every time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all border-t-4 border-t-accent">
              <CardContent className="pt-8">
                <div className="mb-4 bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors" data-id="p1iwm4zh0" data-path="src/pages/HomePage.tsx">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-id="c92p7a2fs" data-path="src/pages/HomePage.tsx">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" data-id="5m6vp82kt" data-path="src/pages/HomePage.tsx" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3" data-id="67mlk056w" data-path="src/pages/HomePage.tsx">Earn Money</h3>
                <p className="text-gray-600" data-id="fja3zuzbp" data-path="src/pages/HomePage.tsx">
                  Turn your spare time into income by completing tasks in your local area.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50 " data-id="wvtydhxyb" data-path="src/pages/HomePage.tsx">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" data-id="xk6lx24cw" data-path="src/pages/HomePage.tsx"></div>
        <div className="container mx-auto relative z-0" data-id="fovbroaot" data-path="src/pages/HomePage.tsx">
          <h2 className="text-3xl font-bold text-center mb-4" data-id="0pfdvd2p8" data-path="src/pages/HomePage.tsx">How ErrandPal Works</h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16" data-id="h9d8a6z2w" data-path="src/pages/HomePage.tsx">
            Getting things done has never been easier. Follow these simple steps:
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 relative" data-id="sqvygqy2e" data-path="src/pages/HomePage.tsx">
            <div className="hidden md:block absolute top-1/3 left-[calc(16.67%-1rem)] right-[calc(16.67%-1rem)] h-1 bg-gradient-to-r from-primary via-secondary to-accent" data-id="8mddsdm2w" data-path="src/pages/HomePage.tsx"></div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center relative z-10 hover:shadow-md transition-all" data-id="j07a0cvmh" data-path="src/pages/HomePage.tsx">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold" data-id="863fl5yhe" data-path="src/pages/HomePage.tsx">1</div>
              <h3 className="text-xl font-semibold mb-3" data-id="8dulxf33v" data-path="src/pages/HomePage.tsx">Post Your Errand</h3>
              <p className="text-gray-600 mb-4" data-id="pg7s0104a" data-path="src/pages/HomePage.tsx">
                Describe what you need, set your budget, and choose when you need it done.
              </p>
              <img
                src="https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Person typing on laptop"
                className="w-full h-48 object-cover rounded-lg" data-id="g8kpvycik" data-path="src/pages/HomePage.tsx" />

            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center relative z-10 hover:shadow-md transition-all" data-id="blrirvxkr" data-path="src/pages/HomePage.tsx">
              <div className="w-20 h-20 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold" data-id="l2t746tgu" data-path="src/pages/HomePage.tsx">2</div>
              <h3 className="text-xl font-semibold mb-3" data-id="jz5euydbl" data-path="src/pages/HomePage.tsx">Get Matched</h3>
              <p className="text-gray-600 mb-4" data-id="1fbdmgs2y" data-path="src/pages/HomePage.tsx">
                Local errand runners will see your task and can offer to complete it.
              </p>
              <img
                src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="People shaking hands"
                className="w-full h-48 object-cover rounded-lg" data-id="v0l0t7zi7" data-path="src/pages/HomePage.tsx" />

            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center relative z-10 hover:shadow-md transition-all" data-id="nyjjatlge" data-path="src/pages/HomePage.tsx">
              <div className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold" data-id="atqp53qcl" data-path="src/pages/HomePage.tsx">3</div>
              <h3 className="text-xl font-semibold mb-3" data-id="icmyjv58x" data-path="src/pages/HomePage.tsx">Task Completed</h3>
              <p className="text-gray-600 mb-4" data-id="jz4b0acgn" data-path="src/pages/HomePage.tsx">
                Your runner completes the task, and you pay securely through the app.
              </p>
              <img
                src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Checkmark on smartphone"
                className="w-full h-48 object-cover rounded-lg" data-id="ouprku7mt" data-path="src/pages/HomePage.tsx" />

            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 px-4" data-id="zedxrfcoh" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto" data-id="0in4wnvgw" data-path="src/pages/HomePage.tsx">
          <h2 className="text-3xl font-bold text-center mb-4" data-id="qpilbwf8c" data-path="src/pages/HomePage.tsx">Popular Categories</h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12" data-id="gpfwi1i6s" data-path="src/pages/HomePage.tsx">
            Browse our most requested errand types or post your own custom request
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" data-id="qh7emd165" data-path="src/pages/HomePage.tsx">
            {errandCategories.slice(0, 10).map((category, index) =>
            <Card
              key={index}
              className="hover:shadow-md transition-all cursor-pointer border-none bg-gradient-to-br hover:scale-105"
              style={{
                background: `linear-gradient(45deg, 
                  hsl(${260 + index * 12} 70% 90%), 
                  hsl(${172 + index * 8} 60% 90%))`
              }}
              onClick={() => navigate("/")}>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">{category}</CardTitle>
                </CardHeader>
              </Card>
            )}
          </div>
          <div className="text-center mt-8" data-id="6crkkoobh" data-path="src/pages/HomePage.tsx">
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-primary hover:bg-primary/90">
              View All Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50" data-id="2v78k0fkb" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto" data-id="42zmn0925" data-path="src/pages/HomePage.tsx">
          <h2 className="text-3xl font-bold text-center mb-4" data-id="5pjorcm3u" data-path="src/pages/HomePage.tsx">What Our Users Say</h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12" data-id="v1feyihc1" data-path="src/pages/HomePage.tsx">
            Join thousands of satisfied users who are saving time and earning money
          </p>
          
          <div className="grid md:grid-cols-3 gap-8" data-id="qlvw856z9" data-path="src/pages/HomePage.tsx">
            <Card className="hover:shadow-lg transition-all border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4" data-id="zzdk0g5qv" data-path="src/pages/HomePage.tsx">
                  <div className="flex-shrink-0" data-id="klewpiz8f" data-path="src/pages/HomePage.tsx">
                    <img
                      src="https://randomuser.me/api/portraits/women/42.jpg"
                      alt="Testimonial"
                      className="w-12 h-12 rounded-full" data-id="ozaub0nuk" data-path="src/pages/HomePage.tsx" />
                  </div>
                  <div className="ml-4" data-id="gm5meq3wx" data-path="src/pages/HomePage.tsx">
                    <h4 className="font-semibold" data-id="goao7iij2" data-path="src/pages/HomePage.tsx">Sarah J.</h4>
                    <div className="flex" data-id="tmzm0gngj" data-path="src/pages/HomePage.tsx">
                      {[...Array(5)].map((_, i) =>
                      <span key={i} className="text-yellow-400" data-id="7te28cskv" data-path="src/pages/HomePage.tsx">★</span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic" data-id="z7kwhdx65" data-path="src/pages/HomePage.tsx">
                  "ErrandPal has been a lifesaver! As a busy professional, having someone to run my errands has given me back so much time. The platform is incredibly easy to use."
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all border-t-4 border-t-secondary">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4" data-id="06s0o1l2w" data-path="src/pages/HomePage.tsx">
                  <div className="flex-shrink-0" data-id="cl1eqw3dc" data-path="src/pages/HomePage.tsx">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Testimonial"
                      className="w-12 h-12 rounded-full" data-id="oylihkom2" data-path="src/pages/HomePage.tsx" />
                  </div>
                  <div className="ml-4" data-id="1z73ngb0s" data-path="src/pages/HomePage.tsx">
                    <h4 className="font-semibold" data-id="a64ekc8ft" data-path="src/pages/HomePage.tsx">Michael T.</h4>
                    <div className="flex" data-id="wel1jz4cl" data-path="src/pages/HomePage.tsx">
                      {[...Array(5)].map((_, i) =>
                      <span key={i} className="text-yellow-400" data-id="zmstdcqua" data-path="src/pages/HomePage.tsx">★</span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic" data-id="ebxcfye4y" data-path="src/pages/HomePage.tsx">
                  "I've been making great side income as an errand runner. The app makes it easy to find tasks in my neighborhood and the payment process is seamless and secure."
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-all border-t-4 border-t-accent">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4" data-id="6203ln0me" data-path="src/pages/HomePage.tsx">
                  <div className="flex-shrink-0" data-id="mr7a1d8il" data-path="src/pages/HomePage.tsx">
                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="Testimonial"
                      className="w-12 h-12 rounded-full" data-id="sh6wlokcu" data-path="src/pages/HomePage.tsx" />
                  </div>
                  <div className="ml-4" data-id="e3pvcwoqk" data-path="src/pages/HomePage.tsx">
                    <h4 className="font-semibold" data-id="idldpe1qp" data-path="src/pages/HomePage.tsx">Jessica M.</h4>
                    <div className="flex" data-id="wevo27vky" data-path="src/pages/HomePage.tsx">
                      {[...Array(5)].map((_, i) =>
                      <span key={i} className="text-yellow-400" data-id="n2mmwjxtd" data-path="src/pages/HomePage.tsx">★</span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic" data-id="ubd5lhpx4" data-path="src/pages/HomePage.tsx">
                  "The interface is so intuitive! I needed help with a move, and within an hour I had someone ready to help. The community feel of the platform is what keeps me coming back."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4" data-id="p46mmeqba" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto" data-id="jr2wl7oj4" data-path="src/pages/HomePage.tsx">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8" data-id="1no6gqzvv" data-path="src/pages/HomePage.tsx">
            <div className="text-center" data-id="x3nfye9np" data-path="src/pages/HomePage.tsx">
              <div className="text-4xl font-bold text-primary mb-2" data-id="660ah2w4c" data-path="src/pages/HomePage.tsx">10K+</div>
              <p className="text-gray-600" data-id="6k6ymx243" data-path="src/pages/HomePage.tsx">Active Users</p>
            </div>
            <div className="text-center" data-id="l03qqbp13" data-path="src/pages/HomePage.tsx">
              <div className="text-4xl font-bold text-secondary mb-2" data-id="4zzl7oqc8" data-path="src/pages/HomePage.tsx">25K+</div>
              <p className="text-gray-600" data-id="s1kztpket" data-path="src/pages/HomePage.tsx">Completed Tasks</p>
            </div>
            <div className="text-center" data-id="qikqllo2b" data-path="src/pages/HomePage.tsx">
              <div className="text-4xl font-bold text-accent mb-2" data-id="uuk0nnck3" data-path="src/pages/HomePage.tsx">4.8</div>
              <p className="text-gray-600" data-id="ps2gch20l" data-path="src/pages/HomePage.tsx">Average Rating</p>
            </div>
            <div className="text-center" data-id="imnhajr3f" data-path="src/pages/HomePage.tsx">
              <div className="text-4xl font-bold text-primary mb-2" data-id="ntamniyb6" data-path="src/pages/HomePage.tsx">500+</div>
              <p className="text-gray-600" data-id="4jt11u0ay" data-path="src/pages/HomePage.tsx">Cities Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary via-secondary to-accent text-white text-center relative overflow-hidden" data-id="j9mhagmhu" data-path="src/pages/HomePage.tsx">
        <div className="absolute inset-0 opacity-10" data-id="ng4ihstg8" data-path="src/pages/HomePage.tsx">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white" data-id="1a45frytn" data-path="src/pages/HomePage.tsx"></div>
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white" data-id="rskbu4a48" data-path="src/pages/HomePage.tsx"></div>
        </div>
        <div className="container mx-auto relative z-10" data-id="h1tzzzqn0" data-path="src/pages/HomePage.tsx">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-id="gj27kpvcp" data-path="src/pages/HomePage.tsx">Ready to get started?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8" data-id="j1ywer5y7" data-path="src/pages/HomePage.tsx">
            Join thousands of people who are saving time and getting things done through ErrandPal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-id="cpkm6fdn2" data-path="src/pages/HomePage.tsx">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/30 font-semibold"
              onClick={() => navigate("/signup")}>
              Sign Up Now
            </Button>
            <Button
              size="lg"
              className="border-white text-white hover:bg-white/10 font-semibold flex items-center justify-center"
              onClick={() => navigate("/signup")}>
              Browse Errands
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default HomePage;