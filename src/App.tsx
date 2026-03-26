/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Recycle, 
  Search, 
  ShoppingBag, 
  ArrowLeftRight, 
  LayoutDashboard, 
  Trophy, 
  Settings, 
  HelpCircle, 
  Heart, 
  LogOut, 
  Menu, 
  X, 
  Camera, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Leaf, 
  Coins, 
  Package, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Monitor, 
  User as UserIcon, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Plus, 
  Minus, 
  ArrowUpRight, 
  Clock, 
  Award, 
  Zap, 
  Trash2, 
  RefreshCw, 
  StopCircle,
  DollarSign, 
  Share2, 
  MessageSquare, 
  ThumbsUp, 
  Filter, 
  Grid, 
  List as ListIcon, 
  Eye, 
  EyeOff, 
  Lock, 
  Github 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { detectDeviceCondition } from "./services/geminiService";
import { FAQS, LEADERBOARD, MOCK_PRODUCTS, MOCK_USER } from "./constants";
import { Product, User } from "./types";

// Utility for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Button = ({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}) => {
  const variants = {
    primary: "bg-primary text-bg-dark hover:bg-primary-dark shadow-[0_0_15px_rgba(0,200,150,0.3)]",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
    outline: "border border-white/20 text-white hover:bg-white/5",
    ghost: "text-white hover:bg-white/5",
    danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5",
    lg: "px-8 py-4 text-lg font-bold",
  };

  return (
    <button 
      className={cn(
        "rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className, hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) => (
  <div className={cn(
    "glass-card p-6",
    hover && "hover:border-primary/30 transition-colors duration-500",
    className
  )}>
    {children}
  </div>
);

const Badge = ({ children, className, variant = "primary" }: { children: React.ReactNode; className?: string; variant?: "primary" | "secondary" | "warning" | "success" }) => {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-white/10 text-white/70 border-white/10",
    warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    success: "bg-green-500/10 text-green-500 border-green-500/20",
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border", variants[variant], className)}>
      {children}
    </span>
  );
};

// --- Pages ---

const LandingPage = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
    {/* Background Elements */}
    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
    
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-4xl z-10"
    >
      <Badge className="mb-6 px-4 py-1.5 text-sm">Pioneering Circular Economy</Badge>
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
        RECYCLE SMART <br />
        <span className="text-gradient">WITH AI.</span>
      </h1>
      <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
        Pioneering the future of sustainable electronics through artificial intelligence 
        and community-driven circular economy.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" onClick={onStart}>
          Get Started <ArrowUpRight className="w-5 h-5" />
        </Button>
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </div>
    </motion.div>

    {/* Floating Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 w-full max-w-5xl px-4">
      {[
        { label: "E-Waste Prevented", value: "125k+", unit: "kg" },
        { label: "Active Recyclers", value: "50k+", unit: "" },
        { label: "Metals Recovered", value: "450+", unit: "kg" },
        { label: "Carbon Offset", value: "890+", unit: "tons" },
      ].map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          className="text-center"
        >
          <div className="text-3xl font-bold text-white mb-1">{stat.value}{stat.unit}</div>
          <div className="text-sm text-white/40 uppercase tracking-widest">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

const AIDetector = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startScanning = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
        setImage(null);
        setResult(null);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please ensure permissions are granted.");
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const captureScan = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/jpeg");
        setImage(base64);
        stopScanning();
        analyzeImage(base64);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64: string) => {
    setIsAnalyzing(true);
    setResult(null);
    try {
      const data = await detectDeviceCondition(base64);
      setResult(data);
    } catch (error) {
      console.error(error);
      setError("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black mb-4 tracking-tight uppercase">AI Device Detector</h2>
        <p className="text-white/60">Use real-time scanning or upload a photo for instant valuation.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <Card className="flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden p-0">
            {isScanning ? (
              <div className="relative w-full h-full min-h-[400px]">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="scan-line" />
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-6">
                  <Button variant="danger" onClick={stopScanning}>
                    <StopCircle className="w-4 h-4" /> Stop
                  </Button>
                  <Button onClick={captureScan}>
                    <Camera className="w-4 h-4" /> Capture
                  </Button>
                </div>
              </div>
            ) : image ? (
              <div className="relative w-full h-full group min-h-[400px]">
                <img src={image} alt="Device" className="w-full h-full object-cover rounded-xl" />
                {isAnalyzing && <div className="scan-line" />}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                  <Button variant="secondary" onClick={startScanning}>
                    <Camera className="w-4 h-4" /> Real-time Scan
                  </Button>
                  <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                    <RefreshCw className="w-4 h-4" /> Upload New
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 p-12 text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Camera className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Ready to Scan?</h3>
                  <p className="text-white/40 text-sm mb-6">Position your device clearly in frame for the best results.</p>
                  <div className="flex flex-col gap-3">
                    <Button size="lg" onClick={startScanning}>
                      <Camera className="w-5 h-5" /> Start Live Scan
                    </Button>
                    <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
            <canvas ref={canvasRef} className="hidden" />
          </Card>
          
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 glass-card"
              >
                <div className="relative w-16 h-16 mb-6">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <h3 className="text-xl font-bold mb-2">Analyzing Device...</h3>
                <p className="text-white/40 text-sm">Our AI is scanning for scratches, dents, and identifying the model.</p>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-6"
              >
                <Card className="border-primary/30">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <Badge className="mb-2">Detection Successful</Badge>
                      <h3 className="text-2xl font-bold">{result.brand} {result.model || result.device}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Estimated Value</p>
                      <p className="text-3xl font-black text-primary">${result.condition === 'new' ? '540' : result.condition === 'good' ? '420' : '280'}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                      <span className="text-white/60">Condition Rating</span>
                      <Badge variant={result.condition === 'poor' ? 'warning' : 'success'} className="capitalize">
                        {result.condition}
                      </Badge>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5">
                      <p className="text-xs text-white/40 uppercase tracking-widest mb-2">AI Reasoning</p>
                      <p className="text-sm leading-relaxed">{result.reasoning}</p>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Button className="w-full" size="lg">
                    Sell Now <DollarSign className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Exchange <ArrowLeftRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <Card className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50 grayscale">
                <AlertCircle className="w-12 h-12 mb-4 text-white/20" />
                <p className="text-white/40">Upload an image or start a live scan to see the AI analysis results here.</p>
              </Card>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ user }: { user: User }) => {
  const impactData = [
    { name: "Mon", waste: 4, metals: 2 },
    { name: "Tue", waste: 3, metals: 1 },
    { name: "Wed", waste: 10, metals: 5 },
    { name: "Thu", waste: 6, metals: 3 },
    { name: "Fri", waste: 8, metals: 4 },
    { name: "Sat", waste: 15, metals: 8 },
    { name: "Sun", waste: 12, metals: 6 },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2 uppercase">User Dashboard</h2>
          <p className="text-white/60">Welcome back, {user.name.split(' ')[0]}! Here's your impact overview.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary"><Bell className="w-4 h-4" /></Button>
          <Button variant="secondary"><Settings className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Waste Prevented</p>
              <p className="text-2xl font-bold">{user.impact.wastePrevented} kg</p>
            </div>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              className="h-full bg-primary" 
            />
          </div>
          <p className="text-[10px] text-white/40 mt-2">75% of your monthly goal reached</p>
        </Card>

        <Card className="relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-colors" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Metals Recovered</p>
              <p className="text-2xl font-bold">{user.impact.metalsRecovered} g</p>
            </div>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              className="h-full bg-yellow-500" 
            />
          </div>
          <p className="text-[10px] text-white/40 mt-2">Gold, Silver, and Copper recovered</p>
        </Card>

        <Card className="relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest">Eco Points</p>
              <p className="text-2xl font-bold">{user.points}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Badge variant="success">Level {user.level}</Badge>
            <span className="text-[10px] text-white/40">550 pts to Level 5</span>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">Sustainability Impact</h3>
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={impactData}>
                  <defs>
                    <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00C896" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00C896" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#151619", border: "1px solid #ffffff10", borderRadius: "12px" }}
                    itemStyle={{ color: "#00C896" }}
                  />
                  <Area type="monotone" dataKey="waste" stroke="#00C896" fillOpacity={1} fill="url(#colorWaste)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { title: "Recycled iPhone 11", date: "2 hours ago", points: "+150", type: "recycle" },
                  { title: "Exchanged Pixel 6", date: "Yesterday", points: "+450", type: "exchange" },
                  { title: "Donated to Mission", date: "3 days ago", points: "-500", type: "donate" },
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        act.type === 'recycle' ? "bg-primary/10 text-primary" : 
                        act.type === 'exchange' ? "bg-blue-500/10 text-blue-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {act.type === 'recycle' ? <Recycle className="w-5 h-5" /> : 
                         act.type === 'exchange' ? <ArrowLeftRight className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{act.title}</p>
                        <p className="text-[10px] text-white/40">{act.date}</p>
                      </div>
                    </div>
                    <span className={cn("text-sm font-bold", act.points.startsWith('+') ? "text-primary" : "text-red-500")}>
                      {act.points}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-xs">View All Activity</Button>
            </Card>

            <Card>
              <h3 className="text-lg font-bold mb-6">Eco-Progress</h3>
              <div className="flex flex-col items-center text-center py-4">
                <div className="relative w-32 h-32 mb-6">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#ffffff05" strokeWidth="8" />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" stroke="#00C896" strokeWidth="8" 
                      strokeDasharray="282.7" strokeDashoffset={282.7 * (1 - 0.75)} 
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black">75%</span>
                    <span className="text-[10px] text-white/40 uppercase">Progress</span>
                  </div>
                </div>
                <p className="text-sm text-white/60 mb-4">You're only 550 points away from Level 5! Recycle one more device to unlock the "Green Pioneer" badge.</p>
                <Button variant="outline" size="sm">View Badges</Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="bg-primary/5 border-primary/20">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" className="flex-col h-24 gap-1">
                <Camera className="w-6 h-6" />
                <span className="text-xs">Scan</span>
              </Button>
              <Button variant="secondary" className="flex-col h-24 gap-1">
                <Recycle className="w-6 h-6" />
                <span className="text-xs">Recycle</span>
              </Button>
              <Button variant="secondary" className="flex-col h-24 gap-1">
                <ShoppingBag className="w-6 h-6" />
                <span className="text-xs">Shop</span>
              </Button>
              <Button variant="secondary" className="flex-col h-24 gap-1">
                <ArrowLeftRight className="w-6 h-6" />
                <span className="text-xs">Trade</span>
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold mb-6">Order Status</h3>
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
              {[
                { title: "Pickup Scheduled", desc: "Agent will arrive tomorrow", status: "completed" },
                { title: "Processing", desc: "Valuation in progress", status: "current" },
                { title: "Payment Sent", desc: "Expected in 2-3 days", status: "pending" },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 relative z-10">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-4 border-bg-dark transition-colors",
                    step.status === 'completed' ? "bg-primary text-bg-dark" : 
                    step.status === 'current' ? "bg-bg-dark border-primary text-primary" : "bg-white/5 text-white/20"
                  )}>
                    {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : (i + 1)}
                  </div>
                  <div>
                    <p className={cn("text-sm font-bold", step.status === 'pending' && "text-white/40")}>{step.title}</p>
                    <p className="text-xs text-white/40">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Marketplace = () => {
  const [filter, setFilter] = useState('all');

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2 uppercase">Eco Marketplace</h2>
          <p className="text-white/60">Premium refurbished devices with certified sustainability reports.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search devices..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <Button variant="secondary"><Filter className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {['all', 'phone', 'laptop', 'tablet', 'audio', 'watch'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap",
              filter === cat ? "bg-primary text-bg-dark border-primary" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
            )}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}s
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="p-0 overflow-hidden h-full flex flex-col">
              <div className="aspect-square relative overflow-hidden bg-white/5">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge variant="success" className="backdrop-blur-md bg-green-500/20">Certified</Badge>
                  <Badge variant="primary" className="backdrop-blur-md bg-primary/20 capitalize">{product.condition}</Badge>
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-4">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{product.brand}</p>
                  <h4 className="font-bold text-lg leading-tight">{product.name}</h4>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/40">Starting at</p>
                    <p className="text-xl font-black text-primary">${product.basePrice}</p>
                  </div>
                  <Button size="sm" variant="secondary">
                    <ShoppingBag className="w-4 h-4" /> Add
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Leaderboard = () => (
  <div className="max-w-4xl mx-auto py-12 px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-black tracking-tight mb-4 uppercase">Global Leaderboard</h2>
      <p className="text-white/60">See how you stack up against the world's top recyclers.</p>
    </div>

    <Card className="p-0 overflow-hidden">
      <div className="bg-primary/10 p-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-bg-dark font-black text-xl">4</div>
          <div>
            <p className="font-bold">Your Rank</p>
            <p className="text-xs text-white/60">Top 5% globally</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-primary">4,450</p>
          <p className="text-xs text-white/60 uppercase tracking-widest">Points</p>
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {LEADERBOARD.map((user) => (
          <div key={user.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-4">
              <span className={cn(
                "w-8 text-center font-black",
                user.rank === 1 ? "text-yellow-500" : user.rank === 2 ? "text-slate-400" : user.rank === 3 ? "text-amber-600" : "text-white/20"
              )}>
                {user.rank}
              </span>
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <p className="font-medium">{user.name}</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="hidden md:block text-right">
                <p className="text-xs text-white/40 uppercase tracking-widest">Impact</p>
                <p className="text-sm font-bold text-emerald-500">{(user.points / 100).toFixed(1)}kg</p>
              </div>
              <p className="font-black text-lg">{user.points.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const SupportMission = () => {
  const [amount, setAmount] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDonate = () => {
    if (!amount) return;
    setIsSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black tracking-tight mb-4 uppercase">Support Eco Mission</h2>
        <p className="text-white/60">Your contributions help us expand our recycling network and develop better AI models for e-waste management.</p>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 glass-card"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-6">
              <Heart className="w-10 h-10 fill-current" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Thank You!</h3>
            <p className="text-white/60 max-w-md mx-auto mb-8">
              Your contribution of ₹{amount} has been received. Together, we are building a greener future.
            </p>
            <Button variant="outline" onClick={() => { setIsSuccess(false); setAmount(""); }}>
              Make Another Donation
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <Card className="flex flex-col gap-6">
              <h3 className="text-xl font-bold">Select Amount</h3>
              <div className="grid grid-cols-3 gap-3">
                {["100", "500", "1000", "2000", "5000", "10000"].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={cn(
                      "py-3 rounded-xl border transition-all font-bold",
                      amount === val ? "bg-primary text-bg-dark border-primary" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                    )}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">₹</span>
                <input 
                  type="number" 
                  placeholder="Custom Amount" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-8 pr-4 outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <h3 className="text-xl font-bold mt-4">Payment Method</h3>
              <div className="space-y-3">
                {["UPI / Google Pay", "Credit / Debit Card", "Net Banking"].map((method) => (
                  <label key={method} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                    <input type="radio" name="payment" className="accent-primary" />
                    <span className="text-sm">{method}</span>
                  </label>
                ))}
              </div>

              <Button size="lg" className="w-full mt-4" onClick={handleDonate}>
                Donate Now <Heart className="w-4 h-4" />
              </Button>
            </Card>

            <div className="flex flex-col gap-6">
              <Card className="bg-primary/5 border-primary/20">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" /> Impact of ₹{amount || '0'}
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>Prevents {Math.floor(Number(amount) * 0.5)}kg of toxic e-waste from reaching landfills.</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>Funds the recovery of {Math.floor(Number(amount) * 0.01)}g of precious metals.</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>Supports local collection agents in your community.</span>
                  </li>
                </ul>
              </Card>

              <Card>
                <h3 className="text-lg font-bold mb-4">Why Donate?</h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  E-waste is the fastest-growing waste stream globally. Only 17.4% is officially documented as properly collected and recycled. 
                  Your support helps us build the infrastructure needed to close the loop.
                </p>
                <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">100% Transparent</p>
                    <p className="text-[10px] text-white/40">Track your impact in real-time on your dashboard.</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HelpSupport = () => (
  <div className="max-w-4xl mx-auto py-12 px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-black tracking-tight mb-4 uppercase">Help & Support</h2>
      <p className="text-white/60">Everything you need to know about ReLoop AI and sustainable recycling.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {[
        { icon: <Mail />, title: "Email Support", desc: "support@reloop.ai" },
        { icon: <Phone />, title: "Call Us", desc: "+1 (800) RELOOP-AI" },
        { icon: <MessageSquare />, title: "Live Chat", desc: "Available 24/7" },
      ].map((item, i) => (
        <Card key={i} className="text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
            {item.icon}
          </div>
          <h4 className="font-bold mb-1">{item.title}</h4>
          <p className="text-sm text-white/40">{item.desc}</p>
        </Card>
      ))}
    </div>

    <div className="space-y-4">
      <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
      {FAQS.map((faq, i) => (
        <details key={i} className="group glass-card overflow-hidden">
          <summary className="p-6 cursor-pointer flex items-center justify-between list-none">
            <span className="font-bold">{faq.q}</span>
            <Plus className="w-5 h-5 text-primary group-open:rotate-45 transition-transform" />
          </summary>
          <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="max-w-4xl mx-auto py-12 px-4">
    <h2 className="text-4xl font-black tracking-tight mb-12 uppercase">Settings</h2>
    
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-primary" /> Account Settings
        </h3>
        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Profile Information</p>
              <p className="text-xs text-white/40">Update your name, email, and avatar</p>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-6">
            <div>
              <p className="font-medium">Connected Accounts</p>
              <p className="text-xs text-white/40">Manage Google, GitHub, and Apple logins</p>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Globe className="w-4 h-4" /></div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Github className="w-4 h-4" /></div>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" /> App Preferences
        </h3>
        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-xs text-white/40">Toggle between light and dark themes</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-bg-dark rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-6">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-xs text-white/40">Alerts for pickups, payments, and rewards</p>
            </div>
            <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full" />
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" /> Security
        </h3>
        <Card className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-white/40">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-6">
            <div>
              <p className="font-medium text-red-500">Delete Account</p>
              <p className="text-xs text-white/40">Permanently remove your account and data</p>
            </div>
            <Button variant="danger" size="sm">Delete</Button>
          </div>
        </Card>
      </section>
    </div>
  </div>
);

const AuthPage = ({ onLogin }: { onLogin: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
            <Recycle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black tracking-tight mb-2 uppercase">
            {isLogin ? 'Welcome Back' : 'Join ReLoop'}
          </h2>
          <p className="text-white/40">
            {isLogin ? 'Enter your credentials to continue' : 'Start your sustainable journey today'}
          </p>
        </div>

        <Card className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-primary/50" />
              </div>
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input type="email" placeholder="name@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-primary/50" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-white/40 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-primary/50" />
            </div>
          </div>
          
          <Button className="w-full mt-4" size="lg" onClick={onLogin}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-card-dark px-2 text-white/20">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full"><Globe className="w-4 h-4" /> Google</Button>
            <Button variant="outline" className="w-full"><Github className="w-4 h-4" /> GitHub</Button>
          </div>
        </Card>

        <p className="text-center mt-8 text-sm text-white/40">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-bold ml-2 hover:underline">
            {isLogin ? 'Sign Up Free' : 'Sign In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState("landing");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auto-scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { id: "detector", label: "AI Detector", icon: <Camera /> },
    { id: "marketplace", label: "Marketplace", icon: <ShoppingBag /> },
    { id: "leaderboard", label: "Leaderboard", icon: <Trophy /> },
    { id: "support", label: "Support Mission", icon: <Heart /> },
    { id: "help", label: "Help Center", icon: <HelpCircle /> },
    { id: "settings", label: "Settings", icon: <Settings /> },
  ];

  if (activeTab === "landing") {
    return <LandingPage onStart={() => setActiveTab("auth")} />;
  }

  if (!isLoggedIn && activeTab === "auth") {
    return <AuthPage onLogin={() => { setIsLoggedIn(true); setActiveTab("dashboard"); }} />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-bg-dark text-white">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 glass border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-2 text-primary font-black text-xl">
          <Recycle className="w-6 h-6" /> RELOOP
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:sticky top-0 left-0 h-screen w-72 glass border-r border-white/10 z-40 transition-transform duration-300 md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="hidden md:flex items-center gap-3 text-primary font-black text-2xl mb-12">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Recycle className="w-6 h-6" />
            </div>
            RELOOP
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                  activeTab === item.id 
                    ? "bg-primary text-bg-dark font-bold shadow-[0_0_15px_rgba(0,200,150,0.2)]" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <span className={cn("w-5 h-5", activeTab === item.id ? "text-bg-dark" : "text-primary group-hover:scale-110 transition-transform")}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/30">
                <img src="https://picsum.photos/seed/user/100/100" alt="User" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">Eco Hero</p>
                <p className="text-[10px] text-white/40 truncate">mnalini521@gmail.com</p>
              </div>
            </div>
            <button 
              onClick={() => { setIsLoggedIn(false); setActiveTab("landing"); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "dashboard" && <Dashboard user={MOCK_USER} />}
            {activeTab === "detector" && <AIDetector />}
            {activeTab === "marketplace" && <Marketplace />}
            {activeTab === "leaderboard" && <Leaderboard />}
            {activeTab === "support" && <SupportMission />}
            {activeTab === "help" && <HelpSupport />}
            {activeTab === "settings" && <SettingsPage />}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/5 py-12 px-6 bg-black/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 text-primary font-black text-xl mb-6">
                <Recycle className="w-6 h-6" /> RELOOP AI
              </div>
              <p className="text-sm text-white/40 leading-relaxed mb-6">
                Pioneering the future of sustainable electronics through artificial intelligence and community-driven circular economy.
              </p>
              <div className="flex gap-4">
                <Facebook className="w-5 h-5 text-white/20 hover:text-primary cursor-pointer" />
                <Twitter className="w-5 h-5 text-white/20 hover:text-primary cursor-pointer" />
                <Instagram className="w-5 h-5 text-white/20 hover:text-primary cursor-pointer" />
                <Linkedin className="w-5 h-5 text-white/20 hover:text-primary cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
              <ul className="space-y-3 text-sm text-white/40">
                <li className="hover:text-primary cursor-pointer">AI Detector</li>
                <li className="hover:text-primary cursor-pointer">Marketplace</li>
                <li className="hover:text-primary cursor-pointer">Exchange</li>
                <li className="hover:text-primary cursor-pointer">Recycle</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
              <ul className="space-y-3 text-sm text-white/40">
                <li className="hover:text-primary cursor-pointer">About Us</li>
                <li className="hover:text-primary cursor-pointer">Sustainability</li>
                <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
                <li className="hover:text-primary cursor-pointer">Terms of Service</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
              <ul className="space-y-3 text-sm text-white/40">
                <li className="hover:text-primary cursor-pointer">Help Center</li>
                <li className="hover:text-primary cursor-pointer">Contact Us</li>
                <li className="hover:text-primary cursor-pointer">+1 (800) RELOOP-AI</li>
                <li className="hover:text-primary cursor-pointer">FAQ</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-[10px] text-white/20 uppercase tracking-[0.2em]">
            © 2026 ReLoop AI. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
