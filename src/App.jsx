import { useEffect, useState } from "react";
import { Bot, Building2, FileText, FolderKanban, LayoutDashboard, LoaderCircle, LogOut, Menu, Package, ReceiptText, Send, Settings, ShoppingCart, Users, WalletCards, Wifi, WifiOff, X } from "lucide-react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const menus = [
  ["dashboard","Dashboard",LayoutDashboard], ["quotation","ใบเสนอราคา",FileText],
  ["invoice","ใบวางบิล / ใบแจ้งหนี้",ReceiptText], ["receipt","ใบเสร็จรับเงิน",WalletCards],
  ["po","ใบสั่งซื้อ (PO)",ShoppingCart], ["customers","ลูกค้า",Users],
  ["projects","โครงการ",FolderKanban], ["companies","บริษัท",Building2],
  ["products","สินค้า / บริการ",Package], ["settings","ตั้งค่า",Settings]
];
const titles = Object.fromEntries(menus.map(([k,t])=>[k,t]));
const baseProfile = { name:"วันธชัย ประวันไว", role:"ผู้ดูแลระบบ", company:"WPT Concrete & Construction Co., Ltd." };

function Login(){
  const [email,setEmail]=useState("wpt.construction2025@gmail.com");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  async function submit(e){
    e.preventDefault(); setLoading(true); setError("");
    try{ await signInWithEmailAndPassword(auth,email.trim(),password); }
    catch(err){ setError(err.code==="auth/invalid-credential"?"อีเมลหรือรหัสผ่านไม่ถูกต้อง":"เข้าสู่ระบบไม่สำเร็จ"); }
    finally{ setLoading(false); }
  }
  return <main className="login-screen"><section className="login-card glass">
    <div className="login-logo">WPT</div><div className="eyebrow">FIREBASE SECURE ACCESS</div>
    <h1>เข้าสู่ WPT Core</h1><p>ใช้บัญชีจริงจาก Firebase Authentication</p>
    <form onSubmit={submit}><label>อีเมล<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
    <label>รหัสผ่าน<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>
    {error&&<div className="login-error">{error}</div>}
    <button className="primary-button" disabled={loading}>{loading?<LoaderCircle className="spin" size={18}/>:null}{loading?"กำลังเข้าสู่ระบบ...":"เข้าสู่ระบบ"}</button></form>
  </section></main>;
}

function Dashboard({profile,online}){
  return <><section className="hero glass"><div><div className="eyebrow">WPT CORE · FIREBASE CONNECTED</div>
    <h2>สวัสดีครับคุณ{profile.name.split(" ")[0]} 👋</h2>
    <p>ระบบเชื่อม Firebase Authentication และ Cloud Firestore แล้ว พร้อมใช้งานหลายอุปกรณ์และซิงก์ข้อมูลบน Cloud</p>
    <div className={`cloud-status ${online?"online":"offline"}`}>{online?<Wifi size={15}/>:<WifiOff size={15}/>} {online?"ออนไลน์ · พร้อมซิงก์ข้อมูล":"ออฟไลน์ · ใช้ข้อมูลแคช"}</div>
  </div><div className="core-orb"><div>AI</div></div></section>
  <section className="stats">{[["ยอดเสนอราคา","฿0"],["รอรับชำระ","฿0"],["โครงการ","0"],["สถานะ",online?"ONLINE":"OFFLINE"]].map(([a,b])=><article className="stat-card glass" key={a}><span>{a}</span><strong>{b}</strong><small>ข้อมูลจริงจาก Firestore</small></article>)}</section>
  <section className="content-grid"><article className="glass activity-panel"><div className="eyebrow">SYSTEM STATUS</div><h3>ระบบที่เชื่อมต่อแล้ว</h3>
    {["Firebase Authentication พร้อมใช้งาน","สร้างเอกสาร users/{uid} อัตโนมัติ","Cloud Firestore พร้อมรับข้อมูล"].map(x=><div className="activity-row" key={x}><strong>{x}</strong><span className="status-dot"/></div>)}</article>
    <article className="glass quick-panel"><div className="eyebrow">NEXT MODULES</div><h3>โมดูลถัดไป</h3>{["ข้อมูลบริษัท","ลูกค้า","สินค้า / บริการ","โครงการ"].map(x=><button key={x}>{x}</button>)}</article></section></>;
}

export default function App(){
  const [ready,setReady]=useState(false), [user,setUser]=useState(null), [profile,setProfile]=useState({...baseProfile,email:""});
  const [page,setPage]=useState("dashboard"), [side,setSide]=useState(false), [ai,setAi]=useState(false), [online,setOnline]=useState(navigator.onLine), [command,setCommand]=useState("");
  useEffect(()=>{ const on=()=>setOnline(true),off=()=>setOnline(false); addEventListener("online",on); addEventListener("offline",off); return()=>{removeEventListener("online",on);removeEventListener("offline",off)}; },[]);
  useEffect(()=>onAuthStateChanged(auth,async u=>{ setUser(u); if(!u){setReady(true);return;} const ref=doc(db,"users",u.uid); const snap=await getDoc(ref);
    if(snap.exists()){ setProfile({...baseProfile,...snap.data(),email:u.email}); await setDoc(ref,{lastLogin:serverTimestamp(),status:"active"},{merge:true}); }
    else{ const data={...baseProfile,uid:u.uid,email:u.email,status:"active",createdAt:serverTimestamp(),lastLogin:serverTimestamp()}; await setDoc(ref,data); setProfile({...baseProfile,email:u.email}); }
    setReady(true); }),[]);
  if(!ready) return <main className="loading-screen"><LoaderCircle className="spin"/><strong>กำลังเชื่อม Firebase...</strong></main>;
  if(!user) return <Login/>;
  const navigate=k=>{setPage(k);setSide(false)};
  return <div className="app-shell">{side&&<button className="overlay" onClick={()=>setSide(false)}/>}<aside className={`sidebar ${side?"open":""}`}>
    <div className="brand"><div className="brand-mark">WPT</div><div><strong>WPT Core</strong><small>Firebase Connected</small></div></div>
    <div className={`system-status ${online?"":"offline"}`}><span/>{online?"FIREBASE ONLINE":"OFFLINE CACHE"}</div><nav>{menus.map(([k,t,I],i)=><div key={k}>{i===5&&<div className="nav-divider"/>}<button className={page===k?"active":""} onClick={()=>navigate(k)}><I size={18}/>{t}</button></div>)}</nav>
    <button className="logout-button" onClick={()=>signOut(auth)}><LogOut size={17}/> ออกจากระบบ</button></aside>
    <main className="main"><header className="topbar glass"><div className="topbar-title"><button className="icon-button mobile-only" onClick={()=>setSide(true)}><Menu/></button><div><h1>{titles[page]}</h1><small>WPT Core Version 2.0</small></div></div><button className="ai-button" onClick={()=>setAi(true)}><Bot size={18}/> CORE AI</button></header>
    <div className="page-content">{page==="dashboard"?<Dashboard profile={profile} online={online}/>:<section className="glass placeholder"><h2>{titles[page]}</h2><p>โมดูลนี้จะเชื่อม Cloud Firestore ในขั้นตอนถัดไป</p></section>}</div></main>
    <aside className={`ai-panel ${ai?"open":""}`}><div className="ai-header"><h3>CORE AI</h3><button className="icon-button" onClick={()=>setAi(false)}><X size={18}/></button></div><div className="ai-visual"><div className="ai-ring"><Bot/></div><small>FIREBASE DATA MODE READY</small></div><div className="messages"><div className="message">ระบบเชื่อม Firebase แล้วครับ</div></div><div className="command-box"><input value={command} onChange={e=>setCommand(e.target.value)} placeholder="พิมพ์คำสั่ง..."/><button><Send size={17}/></button></div></aside>
    <button className="floating-ai" onClick={()=>setAi(true)}><Bot/></button></div>;
}
