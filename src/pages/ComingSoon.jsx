import { Trophy, TrendingUp, Users, Zap, Bell, Mail, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "../assets/logo.png";

export default function ComingSoonPage() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentSport, setCurrentSport] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const sports = ['Cricket', 'Football', 'Badminton', 'Tennis', 'Hockey', 'Basketball', 'Volleyball'];
  const sportIcons = ['🏏', '⚽', '🏸', '🎾', '🏑', '🏀', '🏐'];

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Simplifies Scorekeeping & Match Tracking",
      description: "Automates recording of match details, stats, and scores, making it easier for players, teams, and organizers to keep accurate records."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Helps in Talent Recognition",
      description: "Tracks player performance over time, helping coaches, scouts, and teams identify promising players early."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Connects Players with Stakeholders",
      description: "Provides a platform for players to showcase their profile and achievements, allowing coaches, clubs, and sports organizations to discover and engage with talent."
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Supports Player Development",
      description: "With stats, badges, and gamified achievements, players can monitor progress, set goals, and become better in their game."
    }
  ];

  // Countdown timer
  useEffect(() => {
    const launchDate = new Date('2025-12-31T00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate - now;
      
      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
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
        <header className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-3">
              {/* <Trophy className="w-7 h-7 text-white" /> */}
              <img src={Logo} alt="logo" className="w-12 h-10 rounded-md"/>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">SportsLivv</h1>
              <p className="text-sm text-slate-300">Your Sports Command Center</p>
            </div>
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
            {/* <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-400">Coming Soon</span>
            </div> */}

            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              Revolutionizing
              <br />
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sports Ecosystem
              </span>
            </h2>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              A comprehensive platform that connects players, coaches, and organizations through advanced tracking, talent recognition, and player development tools
            </p>

            {/* Sport Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {sports.map((sport, index) => (
                <div
                  key={sport}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    index === currentSport
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105 border-transparent'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border-white/10 hover:border-white/20'
                  }`}
                >
                  <span className="mr-2">{sportIcons[index]}</span>
                  {sport}
                </div>
              ))}
            </div>
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
                    <div className="text-blue-400">
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-white">{feature.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-8 mt-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <div>
              © 2025 SportsLivv. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}