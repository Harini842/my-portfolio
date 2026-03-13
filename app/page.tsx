"use client";
import React, { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Cpu, Award, X, Eye, FileCheck, Home } from "lucide-react";

// --- Star Background ---
function StarField() {
  const ref: any = useRef();
  const sphere = useMemo(() => {
    const data = random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 });
    for (let i = 0; i < data.length; i++) {
      if (isNaN(data[i])) data[i] = 0;
    }
    return data as Float32Array;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent color="#fff" size={0.003} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

// --- 3-Layer Wireframe Cube ---
function CenterCube() {
  const groupRef: any = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x -= delta / 5;
      groupRef.current.rotation.y += delta / 3;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={0.5}>
      <group ref={groupRef}>
        <mesh scale={0.8}><boxGeometry args={[0.5, 0.5, 0.5]} /><meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.8} /></mesh>
        <mesh scale={1.0}><boxGeometry args={[0.5, 0.5, 0.5]} /><meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.4} /></mesh>
        <mesh scale={1.3}><boxGeometry args={[0.5, 0.5, 0.5]} /><meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.15} /></mesh>
      </group>
    </Float>
  );
}

export default function Portfolio() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // Core Internships Section
  const internships = [
    { title: "Java Full Stack Developer", org: "EduSkills Academy (AICTE)", grade: "O (Outstanding)", img: "/java-cert.jpg" },
    { title: "Data Engineering", org: "AWS Academy via EduSkills", grade: "O (Outstanding)", img: "/data-cert.jpg" },
    { title: "AI-ML Virtual Internship", org: "Google Developers via EduSkills", grade: "E (Excellent)", img: "/aiml-cert.jpg" }
  ];

  const workshops = [
    { title: "From Chatbots to Strand Agents", date: "Dec 28, 2025", type: "AWS Cloud Club", img: "/workshop-aws.png" },
    { title: "Build Smarter, Scalable AI Agents", date: "2025", type: "GeeksforGeeks x UiPath", img: "/workshop-uipath.png" },
    { title: "EduSkills TECH CAMP: Google AI-ML", date: "Feb 28, 2026", type: "EduSkills TechCamp", img: "/workshop-eduskills.jpg" },
    { title: "Build AI App with Gemini & Firebase", date: "Nov 23, 2025", type: "Google Developer Groups", img: "/workshop-gdg.png" }
  ];

  // Professional Certifications (Categorized Data)
  const certifications = [

    // AWS Category
    { title: "AWS Academy Graduate - Data Engineering", date: "Dec 28, 2025", type: "AWS", img: "/aws-data-engineering.jpg" },
    { title: "AWS Academy Graduate - Machine Learning Foundations", date: "Feb 2, 2026", type: "AWS", img: "/aws-ml-foundations.jpg" },

    // LearnTube.ai
    { title: "DevOps", date: "Oct 8, 2025", type: "LearnTube.ai", img: "/learntube-devops.jpg" },
    { title: "SQL Database", date: "Nov 1, 2025", type: "LearnTube.ai", img: "/learntube-sql.jpg" },
    { title: "Data Definition Language Operations", date: "Jan 12, 2026", type: "LearnTube.ai", img: "/learntube-ddl-ops.jpg" },
    { title: "Introduction To Java", date: "Feb 25, 2026", type: "LearnTube.ai", img: "/learntube-java.jpg" },

    // Mind Luster Category
    { title: "Create your own chatGPT with PDF", date: "June 17, 2025", type: "Mind Luster", img: "/mindluster-chatgpt.jpg" },
    { title: "AI image generators", date: "June 20, 2025", type: "Mind Luster", img: "/mindluster-images.jpg" },
    { title: "Create ai videos with moonvalley", date: "July 1, 2025", type: "Mind Luster", img: "/mindluster-videos.jpg" },

    // Forage Job Simulations
    { title: "Data Analytics Job Simulation", date: "Aug 24, 2025", type: "Deloitte (Forage)", img: "/deloitte-simulation.jpg" },
    { title: "GenAI Powered Data Analytics Job Simulation", date: "Aug 24, 2025", type: "TATA (Forage)", img: "/tata-simulation.jpg" },

    // HP LIFE Category
    { title: "AI for Beginners", date: "June 11, 2025", type: "HP LIFE", img: "/hplife-ai.jpg" },
    { title: "Effective Business Websites", date: "June 11, 2025", type: "HP LIFE", img: "/hplife-websites.jpg" },

    // MongoDB Category
    { title: "Advanced Schema Patterns and Antipatterns", date: "June 23, 2025", type: "MongoDB", img: "/mongodb-advanced-schema.jpg" },
    { title: "RAG with MongoDB", date: "June 23, 2025", type: "MongoDB", img: "/mongodb-rag.jpg" },
    { title: "MongoDB Basics for Students", date: "June 23, 2025", type: "MongoDB", img: "/mongodb-basics.jpg" },
    { title: "Schema Patterns and Antipatterns", date: "June 23, 2025", type: "MongoDB", img: "/mongodb-schema.jpg" },
    { title: "CRUD Operations", date: "June 24, 2025", type: "MongoDB", img: "/mongodb-crud.jpg" },
    { title: "Fundamentals of Data Transformation", date: "June 24, 2025", type: "MongoDB", img: "/mongodb-data-transform.jpg" },
    { title: "MongoDB Atlas Security", date: "June 24, 2025", type: "MongoDB", img: "/mongodb-atlas-security.jpg" },
    { title: "Secure MongoDB Atlas: AuthN and AuthZ", date: "June 24, 2025", type: "MongoDB", img: "/mongodb-auth.jpg" },
    
    // Infosys Springboard Category
    { title: "TechA Python Programming Foundation", date: "Mar 7, 2026", type: "Infosys Achievement", img: "/infosys-python.jpg" },
    { title: "Python Clean Coding", date: "Mar 6, 2026", type: "Infosys (90%)", img: "/infosys-clean.jpg" },
    { title: "Power of Networking", date: "Mar 6, 2026", type: "Infosys Completion", img: "/infosys-network.jpg" },
    { title: "Basics of Business Communication", date: "May 16, 2025", type: "Infosys Completion", img: "/infosys-comm.jpg" },
    { title: "Java for Beginners", date: "Jul 14, 2025", type: "Infosys Completion", img: "/infosys-java-beg.jpg" },
    { title: "Introduction to Cyber Security", date: "Sep 22, 2024", type: "Infosys Completion", img: "/infosys-cyber.jpg" },
    { title: "Essentials of Cloud Computing", date: "Sep 22, 2024", type: "Infosys Completion", img: "/infosys-cloud.jpg" },
    { title: "Computer Vision 101", date: "Sep 22, 2024", type: "Infosys Completion", img: "/infosys-vision.jpg" },
    { title: "Programming Fundamentals: Python", date: "Sep 22, 2024", type: "Infosys Completion", img: "/infosys-py-fund.jpg" },
    { title: "JavaScript Fundamentals", date: "Sep 22, 2024", type: "Infosys Completion", img: "/infosys-js.jpg" },
    { title: "HTML5 - The Language", date: "Sep 22, 2024", type: "Infosys Completion", img: "/infosys-html.jpg" },
    { title: "Twitter Bootstrap", date: "Sep 22, 2024", type: "Infosys Completion", img: "/infosys-bootstrap.jpg" },
    { title: "Introduction to Unix", date: "Sep 22, 2024", type: "Infosys Completion", img: "/infosys-unix.jpg" },
    { title: "Building an Agile Mindset", date: "Sep 22, 2024", type: "Infosys Completion", img: "/infosys-agile.jpg" }
  ];

  return (
    <main onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })} className="relative min-h-screen bg-[#020010] text-white overflow-x-hidden selection:bg-indigo-500/30 font-sans">
      <div className="fixed inset-0 z-0"><Canvas camera={{ position: [0, 0, 1] }}><Suspense fallback={null}><StarField /><CenterCube /><ambientLight intensity={1} /></Suspense></Canvas></div>
      <div className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300" style={{ background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(79, 70, 229, 0.12), transparent 80%)` }} />

      {/* --- Added Home Icon --- */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed top-8 right-8 z-[100] p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-indigo-400 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 group shadow-2xl"
        title="Back to Home"
      >
        <Home size={24} className="group-hover:scale-110 transition-transform" />
      </button>

      <div className="relative z-20">
        {/* --- Hero Section --- */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-mono mb-8 uppercase tracking-[0.3em]"><Cpu size={14} className="animate-pulse" /> Computer Science Engineer</span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-[0.85]">HARINI <br /> KRISHNAMOORTHY</h1>
            <h2 className="text-xl md:text-3xl font-semibold tracking-tight text-white mb-4">Building <span className="text-indigo-400 italic font-serif">intelligent</span> digital experiences through code.</h2>
            <p className="max-w-2xl mx-auto text-zinc-500 text-xs md:text-sm font-mono uppercase tracking-[0.2em] leading-relaxed mb-12">Passionate about innovation <span className="text-zinc-700">•</span> AI <span className="text-zinc-700">•</span> Problem Solving</p>
            
            {/* --- Corrected Navigation Tabs --- */}
            <div className="flex flex-wrap gap-4 justify-center mt-12">
              {[
                { name: "Internships", id: "internships" },
                { name: "Workshops", id: "workshops" },
                { name: "Projects", id: "projects" },
                { name: "Certifications", id: "certifications" },
              ].map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth" })}
                  className="px-6 py-2 border border-zinc-800 rounded-full hover:border-indigo-500/50 hover:bg-indigo-500/5 backdrop-blur-sm transition-all duration-300 text-zinc-400 text-xs font-mono uppercase tracking-widest hover:text-white"
                >
                  {tab.name}
                </button>
              ))}
              <button 
                onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-2 bg-indigo-500/20 border border-indigo-500/40 rounded-full hover:bg-indigo-500 transition-all duration-300 text-white text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(79,70,229,0.2)]"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        </section>
         

        {/* --- Virtual Internships Section --- */}
        <section id="internships"className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-3"><Award className="text-indigo-500" /> Virtual Internships</h2>
          
          <p className="text-zinc-500 font-mono text-[10px] mb-8 uppercase tracking-widest border-b border-white/5 pb-2">EduSkills</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {internships.map((intern, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl flex flex-col group relative">
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded w-fit mb-4">GRADE: {intern.grade}</span>
                <h3 className="text-xl font-bold text-white mb-1">{intern.title}</h3>
                <p className="text-zinc-500 text-[10px] font-mono mb-6 uppercase tracking-widest">{intern.org}</p>
                <button onClick={() => setSelectedCert(intern.img)} className="mt-auto flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold hover:bg-indigo-500 hover:text-white transition-all"><Eye size={14} /> View Certificate</button>
              </motion.div>
            ))}
          </div>

          {/* Kodbud Category - Added mt-24 for vertical spacing */}
          <p className="text-zinc-500 font-mono text-[10px] mt-10 mb-8 uppercase tracking-widest border-b border-white/5 pb-2">Kodbud</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -10 }} className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl flex flex-col group relative">
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded w-fit mb-4">COMPLETED</span>
              <h3 className="text-xl font-bold text-white mb-1">Java Programming Internship</h3>
              <p className="text-zinc-500 text-[10px] font-mono mb-6 uppercase tracking-widest">Kodbud Solution (AICTE Approved)</p>
              <button onClick={() => setSelectedCert("/kodbud-java-cert.jpg")} className="mt-auto flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold hover:bg-indigo-500 hover:text-white transition-all"><Eye size={14} /> View Certificate</button>
            </motion.div>
          </div>
        </section>

        {/* --- Workshops & Events Section --- */}
        <section id="workshops"className="py-1 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mt-0 mb-12 flex items-center gap-3"><Award className="text-indigo-500" /> Workshops & Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* GHCI 25 Participation */}
            <motion.div whileHover={{ scale: 1.02 }} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-tighter">AnitaB.org India</span>
                <span className="text-[8px] text-zinc-600">2025</span>
              </div>
              <h3 className="text-sm font-bold text-zinc-200 leading-tight mb-4 group-hover:text-indigo-400 transition-colors">Grace Hopper Celebration India (GHCI 25) - Bangalore</h3>
              <button onClick={() => setSelectedCert("/ghci-25.jpg")} className="mt-auto text-[10px] font-bold text-indigo-300 flex items-center gap-1 hover:text-white transition-colors"><Eye size={12} /> View Certificate</button>
            </motion.div>

            {/* Other Workshops Mapping */}
            {workshops.map((workshop, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-tighter">{workshop.type}</span>
                  <span className="text-[8px] text-zinc-600">{workshop.date}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-200 leading-tight mb-4 group-hover:text-indigo-400 transition-colors">{workshop.title}</h3>
                <button onClick={() => setSelectedCert(workshop.img)} className="mt-auto text-[10px] font-bold text-indigo-300 flex items-center gap-1 hover:text-white transition-colors"><Eye size={12} /> View Certificate</button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Placeholder for Projects Section --- */}
        <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
           <h2 className="text-3xl font-bold mb-12 flex items-center gap-3"><Cpu className="text-indigo-500" /> Projects</h2>
           <p className="text-zinc-500 font-mono text-sm uppercase">Coming Soon...</p>
        </section>

        {/* --- Certifications Section --- */}
        <section id="certifications"className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mt-0 mb-12 flex items-center gap-3"><FileCheck className="text-indigo-500" /> Professional Certifications</h2>
          
          {/* Infosys Category */}
          <p className="text-zinc-500 font-mono text-[10px] mb-8 uppercase tracking-widest border-b border-white/5 pb-2">Verified via Infosys Springboard</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {certifications.filter(cert => cert.type.includes("Infosys")).map((cert, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-tighter">{cert.type}</span>
                  <span className="text-[8px] text-zinc-600">{cert.date}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-200 leading-tight mb-4 group-hover:text-indigo-400 transition-colors">{cert.title}</h3>
                <button onClick={() => setSelectedCert(cert.img)} className="mt-auto text-[10px] font-bold text-indigo-300 flex items-center gap-1 hover:text-white transition-colors"><Eye size={12} /> View</button>
              </motion.div>
            ))}
          </div>

          {/* MongoDB Category */}
          <p className="text-zinc-500 font-mono text-[10px] mt-15 mb-8 uppercase tracking-widest border-b border-white/5 pb-2">Verified via MongoDB</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            {certifications.filter(cert => cert.type === "MongoDB").map((cert, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-tighter">{cert.type}</span>
                  <span className="text-[8px] text-zinc-600">{cert.date}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-200 leading-tight mb-4 group-hover:text-indigo-400 transition-colors">{cert.title}</h3>
                <button onClick={() => setSelectedCert(cert.img)} className="mt-auto text-[10px] font-bold text-indigo-300 flex items-center gap-1 hover:text-white transition-colors"><Eye size={12} /> View</button>
              </motion.div>
            ))}
          </div>

          {/* Learntube.AI Category */}
          <p className="text-zinc-500 font-mono text-[10px] mb-8 uppercase tracking-widest border-b border-white/5 pb-2">Verified via LearnTube.ai</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {certifications.filter(cert => cert.type.includes("LearnTube.ai")).map((cert, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-tighter">{cert.type}</span>
                  <span className="text-[8px] text-zinc-600">{cert.date}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-200 leading-tight mb-4 group-hover:text-indigo-400 transition-colors">{cert.title}</h3>
                <button onClick={() => setSelectedCert(cert.img)} className="mt-auto text-[10px] font-bold text-indigo-300 flex items-center gap-1 hover:text-white transition-colors"><Eye size={12} /> View</button>
              </motion.div>
            ))}
          </div>

          {/* AWS Category */}
          <p className="text-zinc-500 font-mono text-[10px] mt-15 mb-8 uppercase tracking-widest border-b border-white/5 pb-2">Verified via AWS</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            {certifications.filter(cert => cert.type === "AWS").map((cert, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-tighter">{cert.type}</span>
                  <span className="text-[8px] text-zinc-600">{cert.date}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-200 leading-tight mb-4 group-hover:text-indigo-400 transition-colors">{cert.title}</h3>
                <button onClick={() => setSelectedCert(cert.img)} className="mt-auto text-[10px] font-bold text-indigo-300 flex items-center gap-1 hover:text-white transition-colors"><Eye size={12} /> View</button>
              </motion.div>
            ))}
          </div>

          {/* HP LIFE Category */}
          <p className="text-zinc-500 font-mono text-[10px] mb-8 uppercase tracking-widest border-b border-white/5 pb-2">Verified via HP LIFE</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            {certifications.filter(cert => cert.type === "HP LIFE").map((cert, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-tighter">{cert.type}</span>
                  <span className="text-[8px] text-zinc-600">{cert.date}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-200 leading-tight mb-4 group-hover:text-indigo-400 transition-colors">{cert.title}</h3>
                <button onClick={() => setSelectedCert(cert.img)} className="mt-auto text-[10px] font-bold text-indigo-300 flex items-center gap-1 hover:text-white transition-colors"><Eye size={12} /> View</button>
              </motion.div>
            ))}
          </div>

          {/* Forage Category */}
<p className="text-zinc-500 font-mono text-[10px] mt-12 mb-8 uppercase tracking-widest border-b border-white/5 pb-2">
  Verified via Forage
</p>
<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
  {/* Logic: Search for any certificate where the type includes the word "Forage" */}
  {certifications.filter(cert => cert.type.includes("(Forage)")).map((cert, i) => (
    <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-tighter">{cert.type}</span>
        <span className="text-[8px] text-zinc-600">{cert.date}</span>
      </div>
      <h3 className="text-sm font-bold text-zinc-200 leading-tight mb-4 group-hover:text-indigo-400 transition-colors">{cert.title}</h3>
      <button onClick={() => setSelectedCert(cert.img)} className="mt-auto text-[10px] font-bold text-indigo-300 flex items-center gap-1 hover:text-white transition-colors">
        <Eye size={12} /> View
      </button>
    </motion.div>
  ))}
</div>


          {/* Mind Luster Category */}
          <p className="text-zinc-500 font-mono text-[10px] mb-8 uppercase tracking-widest border-b border-white/5 pb-2">Verified via Mind Luster</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            {certifications.filter(cert => cert.type === "Mind Luster").map((cert, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-tighter">{cert.type}</span>
                  <span className="text-[8px] text-zinc-600">{cert.date}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-200 leading-tight mb-4 group-hover:text-indigo-400 transition-colors">{cert.title}</h3>
                <button onClick={() => setSelectedCert(cert.img)} className="mt-auto text-[10px] font-bold text-indigo-300 flex items-center gap-1 hover:text-white transition-colors"><Eye size={12} /> View</button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Certificate Modal --- */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCert(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10 cursor-zoom-out">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative max-w-5xl w-full flex flex-col items-center">
                <button className="absolute -top-12 right-0 text-white/50 hover:text-white flex items-center gap-2 font-mono text-xs uppercase tracking-widest"><X size={18}/> CLOSE</button>
                <img src={selectedCert} className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl border border-white/10" alt="Certificate" />
                <p className="mt-4 text-zinc-600 text-[10px] font-mono uppercase tracking-[0.4em]">Click Anywhere To Exit</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer id="footer"className="py-16 text-center border-t border-white/5 bg-black/20 backdrop-blur-md">
          <div className="flex justify-center gap-10 mb-8 opacity-60">
            <a href="https://github.com/Harini842" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors"><Github className="w-6 h-6 cursor-pointer" /></a>
            <a href="https://www.linkedin.com/in/harini-krishnamoorthy-2a4088356/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors"><Linkedin className="w-6 h-6 cursor-pointer" /></a>
            <a href="mailto:harinik842@gmail.com" className="hover:text-indigo-400 transition-colors"><Mail className="w-6 h-6 cursor-pointer" /></a>
          </div>
          <p className="text-zinc-600 text-[10px] tracking-[0.5em] uppercase font-mono italic">© 2026 Engineered for Excellence — Harini Krishnamoorthy</p>
        </footer>
      </div>
    </main>
  );
}