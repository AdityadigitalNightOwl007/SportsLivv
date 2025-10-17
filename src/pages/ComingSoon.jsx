import {
  Trophy,
  TrendingUp,
  Users,
  Zap,
  Bell,
  Mail,
  Clock,
  BellDot,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import Logo1 from "../assets/logo1.png";

export default function ComingSoonPage() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentSport, setCurrentSport] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [apiResponse, setApiResponse] = useState({ message: "", success: false });
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const sports = [
    "Cricket",
    "Football",
    "Badminton",
    "Tennis",
    "Hockey",
    "Basketball",
    "Volleyball",
  ];
  const sportIcons = ["🏏", "⚽", "🏸", "🎾", "🏑", "🏀", "🏐"];

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Simplifies Scorekeeping & Match Tracking",
      description:
        "Automates recording of match details, stats, and scores, making it easier for players, teams, and organizers to keep accurate records.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Helps in Talent Recognition",
      description:
        "Tracks player performance over time, helping coaches, scouts, and teams identify promising players early.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Centralizes Sports Management",
      description:
        "Brings teams, tournaments, match history, and performance insights into a single platform for smooth management and analysis.",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Supports Player Development",
      description:
        "With stats, badges, and gamified achievements, players can monitor progress, set goals, and become better in their game.",
    },
  ];

  // Countdown timer
  useEffect(() => {
    const launchDate = new Date("2025-12-31T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Sport rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSport((prev) => (prev + 1) % sports.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sports.length]);

  // Fetch subscriber count
  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/pre-launch/count`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setSubscriberCount(data.preLaunchUserCount);
          }
        }
      } catch (error) {
        console.error("Error fetching subscriber count:", error);
      }
    };

    fetchSubscriberCount();
  }, []);

  const handleNotifyMe = async (e) => {
    e.preventDefault();

    if (!email) {
      setApiResponse({
        message: "Please enter your email address",
        success: false
      });
      setTimeout(() => {
        setApiResponse({ message: "", success: false });
      }, 3000);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pre-launch/capture/user-info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setApiResponse({
          message: "Successfully registered! We'll notify you when we launch.",
          success: true
        });
        setIsSubscribed(true);
        setEmail("");
        
        // Update subscriber count by fetching the latest count
        const countResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/pre-launch/count`
        );
        if (countResponse.ok) {
          const countData = await countResponse.json();
          if (countData.success) {
            setSubscriberCount(countData.preLaunchUserCount);
          }
        }
        
        setTimeout(() => {
          setIsSubscribed(false);
          setApiResponse({ message: "", success: false });
        }, 5000);
      } else {
        setApiResponse({
          message: data.message || "Failed to subscribe. Please try again.",
          success: false
        });
        setTimeout(() => {
          setApiResponse({ message: "", success: false });
        }, 5000);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setApiResponse({
        message: "An error occurred. Please try again.",
        success: false
      });
      setTimeout(() => {
        setApiResponse({ message: "", success: false });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-700/10 via-blue-900/10 to-black"></div>

        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
              <img src={Logo1} alt="Logo1" className="w-40 h-28 rounded-md"/>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Clock className="w-4 h-4" />
            <span>Launching Soon</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto flex-1 flex flex-col justify-center">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              Revolutionizing
              <br />
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sports Ecosystem
              </span>
            </h2>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              A comprehensive platform that connects players, coaches, and
              organizations through advanced tracking, talent recognition, and
              player development tools
            </p>

            {/* Sport Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {sports.map((sport, index) => (
                <div
                  key={sport}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    index === currentSport
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105 border-transparent"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border-white/10 hover:border-white/20"
                  }`}
                >
                  <span className="mr-2">{sportIcons[index]}</span>
                  {sport}
                </div>
              ))}
            </div>
          </div>

          {/* Email Notification Section */}
          <div className="text-center mb-20">
            <h3 className="text-3xl font-bold mb-6 text-white">
              Get Early Access
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Be the first to know when we launch. Enter your email to get
              notified about updates, early access opportunities, and exclusive
              content.
            </p>

            {/* Subscriber Count */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-slate-300">
                <Users className="w-4 h-4" />
                <span className="text-sm">
                  <span className="font-semibold text-white">{subscriberCount}+</span> people already registered
                </span>
              </div>
            </div>

            <form onSubmit={handleNotifyMe} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || isSubscribed}
                  className="flex gap-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:from-green-600 hover:to-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                > 
                  {!isLoading && !isSubscribed && <BellDot className="w-5 h-5" />}
                  {isLoading ? (
                    "Subscribing..."
                  ) : isSubscribed ? (
                    "Subscribed!"
                  ) : (
                    "Notify Me"
                  )}
                </button>
              </div>
              
              {/* API Response Message */}
              {apiResponse.message && (
                <div className={`mt-4 p-4 rounded-xl backdrop-blur-sm border ${
                  apiResponse.success 
                    ? "bg-green-500/10 border-green-500/30 text-green-400" 
                    : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    {apiResponse.success ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    <span className="text-sm font-medium">
                      {apiResponse.message}
                    </span>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Features Grid */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12 text-white">
              Empowering the Sports Community
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/10">
                    <div className="text-blue-400">{feature.icon}</div>
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-white">
                    {feature.title}
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  7+
                </div>
                <div className="text-slate-400">Sports Supported</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Real-Time
                </div>
                <div className="text-slate-400">Performance Tracking</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <div className="text-slate-400">Talent Discovery</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
                  {subscriberCount}+
                </div>
                <div className="text-slate-400">Early Subscribers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-8 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <div>© 2025 SportsLivv. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}