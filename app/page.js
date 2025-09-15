'use client'
import React, { useState, useEffect } from 'react';
import { Book, User, Star, ShoppingCart, Download, Eye, EyeOff, Quote, BookOpen, Heart, Calendar, Award, Mail, Twitter, Facebook, Instagram } from 'lucide-react';

export default function HomePage() {
  const [activeWorld, setActiveWorld] = useState('open');
  const [isVisible, setIsVisible] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting
            }));
          });
        },
        { threshold: 0.1 }
      );

      const elements = document.querySelectorAll('[id]');
      elements.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Two Worlds...</p>
        </div>
      </div>
    );
  }

  const worldThemes = {
    open: {
      gradient: 'from-blue-100 via-white to-purple-100',
      accent: 'from-blue-600 to-purple-600',
      textColor: 'text-gray-900',
      icon: Eye
    },
    closed: {
      gradient: 'from-gray-900 via-purple-900 to-indigo-900',
      accent: 'from-purple-400 to-pink-400',
      textColor: 'text-white',
      icon: EyeOff
    }
  };

  const currentTheme = worldThemes[activeWorld];
  const Icon = currentTheme.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient} transition-all duration-1000`}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className={`bg-gradient-to-r ${currentTheme.accent} p-2 rounded-lg`}>
                <Book className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
                  Two Worlds
                </h1>
                <p className="text-sm text-gray-600">Eyes Open and Eyes Closed</p>
              </div>
            </div>

            {/* World Toggle */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveWorld(activeWorld === 'open' ? 'closed' : 'open')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  activeWorld === 'open'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-800 text-white border-gray-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                {activeWorld === 'open' ? 'Eyes Open' : 'Eyes Closed'}
              </button>

              <nav className="hidden md:flex space-x-6">
                <a href="#book" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Book</a>
                <a href="#author" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Author</a>
                <a href="#reviews" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Reviews</a>
                <a href="#buy" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Buy Now</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="hero">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible.hero ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="space-y-4">
                <h1 className={`text-5xl md:text-6xl font-bold ${currentTheme.textColor} leading-tight`}>
                  Two Worlds:
                  <span className={`block bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
                    Eyes Open and Eyes Closed
                  </span>
                </h1>
                <p className={`text-xl ${currentTheme.textColor} opacity-80 leading-relaxed`}>
                  A profound exploration of perception, consciousness, and the hidden realities that exist between
                  our waking moments and our dreams. Discover the two worlds we all inhabit, yet rarely acknowledge.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className={`bg-gradient-to-r ${currentTheme.accent} text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2`}>
                  <ShoppingCart className="h-5 w-5" />
                  Order Now - $24.99
                </button>
                <button className={`border-2 ${activeWorld === 'open' ? 'border-gray-300 text-gray-700' : 'border-white text-white'} px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all flex items-center gap-2`}>
                  <Download className="h-5 w-5" />
                  Free Sample
                </button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className={`${currentTheme.textColor} opacity-70`}>4.8/5 from 247 reviews</span>
                </div>
              </div>
            </div>

            <div className={`relative ${isVisible.hero ? 'animate-slide-in' : 'opacity-0'}`}>
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${currentTheme.accent} rounded-3xl transform rotate-6 scale-105 opacity-20`}></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className={`bg-gradient-to-br ${currentTheme.gradient} h-96 rounded-2xl flex items-center justify-center`}>
                    <div className="text-center space-y-4">
                      <div className={`bg-gradient-to-r ${currentTheme.accent} p-6 rounded-full mx-auto w-24 h-24 flex items-center justify-center`}>
                        <Icon className="h-12 w-12 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold ${currentTheme.textColor}`}>Two Worlds</h3>
                      <p className={`${currentTheme.textColor} opacity-70`}>Eyes Open and Eyes Closed</p>
                      <p className="text-sm text-gray-500">by [Your Name]</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Details Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="book">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center space-y-6 mb-16 ${isVisible.book ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.textColor}`}>
              About the Book
            </h2>
            <p className={`text-xl ${currentTheme.textColor} opacity-80 max-w-3xl mx-auto leading-relaxed`}>
              Journey between consciousness and subconsciousness, between the seen and unseen,
              between what we know and what we feel but cannot explain.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "The World of Eyes Open",
                description: "Explore our conscious reality - the world of logic, reason, and tangible experiences that shape our daily lives.",
                color: "blue"
              },
              {
                icon: EyeOff,
                title: "The World of Eyes Closed",
                description: "Dive into the realm of dreams, intuition, and the subconscious mind where deeper truths often reside.",
                color: "purple"
              },
              {
                icon: BookOpen,
                title: "The Bridge Between",
                description: "Discover how these two worlds connect, influence each other, and create the complete human experience.",
                color: "pink"
              }
            ].map((feature, index) => (
              <div key={index} className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:scale-105 transition-all duration-300 ${isVisible.book ? 'animate-slide-up' : 'opacity-0'}`} style={{animationDelay: `${index * 0.2}s`}}>
                <feature.icon className={`h-12 w-12 text-${feature.color}-500 mb-4`} />
                <h3 className={`text-xl font-bold ${currentTheme.textColor} mb-3`}>{feature.title}</h3>
                <p className={`${currentTheme.textColor} opacity-70 leading-relaxed`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="reviews">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center space-y-6 mb-16 ${isVisible.reviews ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.textColor}`}>
              What Readers Say
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className={`text-xl ${currentTheme.textColor} opacity-80`}>4.8/5 average rating</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Neuroscientist",
                rating: 5,
                text: "A masterful exploration of consciousness that bridges the gap between science and philosophy. This book changed how I think about perception itself."
              },
              {
                name: "Dr. Michael Torres",
                role: "Sleep Researcher",
                rating: 5,
                text: "Profound insights into the nature of dreams and waking consciousness. Essential reading for anyone interested in the mysteries of the mind."
              },
              {
                name: "Emily Rodriguez",
                role: "Philosophy Student",
                rating: 5,
                text: "Beautiful prose that makes complex concepts accessible. I found myself highlighting passages on every page. Truly transformative."
              },
              {
                name: "James Wilson",
                role: "Meditation Teacher",
                rating: 5,
                text: "This book perfectly captures the liminal space between sleeping and waking awareness. A must-read for anyone on a spiritual journey."
              },
              {
                name: "Dr. Lisa Park",
                role: "Cognitive Psychologist",
                text: "Groundbreaking work that challenges our understanding of reality. The author weaves together research and personal insight brilliantly."
              },
              {
                name: "Robert Martinez",
                role: "Book Reviewer",
                text: "One of the most thought-provoking books I've read this year. It will stay with you long after you turn the last page."
              }
            ].map((review, index) => (
              <div key={index} className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300 ${isVisible.reviews ? 'animate-slide-up' : 'opacity-0'}`} style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <Quote className="h-6 w-6 text-gray-400 mb-3" />
                <p className={`${currentTheme.textColor} opacity-80 mb-4 italic`}>{review.text}</p>
                <div>
                  <p className={`font-semibold ${currentTheme.textColor}`}>{review.name}</p>
                  <p className={`text-sm ${currentTheme.textColor} opacity-60`}>{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="author">
        <div className="max-w-4xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-12 items-center ${isVisible.author ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="space-y-6">
              <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.textColor}`}>
                About the Author
              </h2>
              <div className="space-y-4">
                <p className={`text-lg ${currentTheme.textColor} opacity-80 leading-relaxed`}>
                  [Your Name] is a [your credentials/background]. With over [X] years of experience in [your field],
                  they have dedicated their career to understanding the mysteries of human consciousness and perception.
                </p>
                <p className={`text-lg ${currentTheme.textColor} opacity-80 leading-relaxed`}>
                  Their work has been featured in [publications] and they have spoken at [conferences/events].
                  &ldquo;Two Worlds&rdquo; represents the culmination of years of research and personal exploration into
                  the nature of awareness and reality.
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <Award className={`h-6 w-6 ${currentTheme.textColor} opacity-60`} />
                <span className={`${currentTheme.textColor} opacity-80`}>Award-winning researcher and author</span>
              </div>
            </div>

            <div className="relative">
              <div className={`bg-gradient-to-r ${currentTheme.accent} p-1 rounded-2xl`}>
                <div className="bg-white rounded-xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className={`bg-gradient-to-r ${currentTheme.accent} p-6 rounded-full mx-auto w-24 h-24 flex items-center justify-center`}>
                      <User className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">[Your Name]</h3>
                    <p className="text-gray-600">Author & Researcher</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" id="buy">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`space-y-8 ${isVisible.buy ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.textColor}`}>
              Get Your Copy Today
            </h2>
            <p className={`text-xl ${currentTheme.textColor} opacity-80 max-w-2xl mx-auto`}>
              Begin your journey between the two worlds. Available in multiple formats to suit your reading preference.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  format: "Hardcover",
                  price: "$24.99",
                  description: "Premium hardcover edition with dust jacket",
                  features: ["Free shipping", "Premium paper", "Collectible edition"]
                },
                {
                  format: "Digital",
                  price: "$14.99",
                  description: "Instant download in multiple formats",
                  features: ["PDF, EPUB, MOBI", "Instant access", "Searchable text"],
                  popular: true
                },
                {
                  format: "Audiobook",
                  price: "$19.99",
                  description: "Professional narration, 8 hours",
                  features: ["High quality audio", "Multiple devices", "Offline listening"]
                }
              ].map((option, index) => (
                <div key={index} className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300 ${option.popular ? 'ring-2 ring-yellow-400' : ''}`}>
                  {option.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  <div className="space-y-4">
                    <h3 className={`text-2xl font-bold ${currentTheme.textColor}`}>{option.format}</h3>
                    <div className={`text-3xl font-bold ${currentTheme.textColor}`}>{option.price}</div>
                    <p className={`${currentTheme.textColor} opacity-70`}>{option.description}</p>
                    <ul className="space-y-2">
                      {option.features.map((feature, i) => (
                        <li key={i} className={`${currentTheme.textColor} opacity-60 text-sm flex items-center gap-2`}>
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full bg-gradient-to-r ${currentTheme.accent} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200`}>
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className={`${currentTheme.textColor} opacity-60 mb-4`}>
                30-day money-back guarantee • Secure checkout • Instant delivery for digital formats
              </p>
              <button className={`bg-gradient-to-r ${currentTheme.accent} text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto`}>
                <Download className="h-5 w-5" />
                Download Free Sample Chapter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/20 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`bg-gradient-to-r ${currentTheme.accent} p-2 rounded-lg`}>
                  <Book className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-bold ${currentTheme.textColor}`}>Two Worlds</h3>
                  <p className={`text-sm ${currentTheme.textColor} opacity-60`}>Eyes Open and Eyes Closed</p>
                </div>
              </div>
              <p className={`${currentTheme.textColor} opacity-60 text-sm leading-relaxed`}>
                A profound exploration of perception, consciousness, and the hidden realities between our waking moments and dreams.
              </p>
            </div>

            <div>
              <h4 className={`font-semibold ${currentTheme.textColor} mb-4`}>Quick Links</h4>
              <ul className="space-y-2">
                {['About the Book', 'Author Bio', 'Reviews', 'Purchase', 'Contact'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(' ', '-')}`} className={`${currentTheme.textColor} opacity-60 hover:opacity-100 transition-opacity text-sm`}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold ${currentTheme.textColor} mb-4`}>Formats</h4>
              <ul className="space-y-2">
                {['Hardcover', 'Digital (PDF/EPUB)', 'Audiobook', 'Free Sample'].map(format => (
                  <li key={format}>
                    <span className={`${currentTheme.textColor} opacity-60 text-sm`}>{format}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold ${currentTheme.textColor} mb-4`}>Connect</h4>
              <div className="flex gap-4">
                {[
                  { icon: Mail, href: 'mailto:hello@example.com' },
                  { icon: Twitter, href: '#' },
                  { icon: Facebook, href: '#' },
                  { icon: Instagram, href: '#' }
                ].map((social, index) => (
                  <a key={index} href={social.href} className={`${currentTheme.textColor} opacity-60 hover:opacity-100 transition-opacity`}>
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
              <div className="mt-4">
                <h5 className={`font-medium ${currentTheme.textColor} mb-2 text-sm`}>Newsletter</h5>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm placeholder-gray-400"
                  />
                  <button className={`bg-gradient-to-r ${currentTheme.accent} text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all`}>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`border-t border-white/20 mt-8 pt-8 text-center ${currentTheme.textColor} opacity-60 text-sm`}>
            <p>&copy; 2024 Two Worlds: Eyes Open and Eyes Closed. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}