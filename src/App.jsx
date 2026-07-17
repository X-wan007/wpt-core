import { useEffect, useState } from "react";
import {
  LayoutDashboard, FileText, ReceiptText, WalletCards, ShoppingCart,
  Users, Building2, FolderKanban, Package, Settings, Bot, Menu,
  Bell, Search, X, Send, LogOut, Moon, Sun, Save, Eye, EyeOff
} from "lucide-react";

const menu = [
  ["dashboard","Dashboard",LayoutDashboard],
  ["quotation","ใบเสนอราคา",FileText],
  ["invoice","ใบวางบิล / ใบแจ้งหนี้",ReceiptText],
  ["receipt","ใบเสร็จรับเงิน",WalletCards],
  ["po","ใบสั่งซื้อ (PO)",ShoppingCart],
  ["customers","ลูกค้า",Users],
  ["projects","โครงการ",FolderKanban],
  ["companies","บริษัท",Building2],
  ["products","สินค้า / บริการ",Package],
  ["settings","ตั้งค่า",Settings],
];
const titles = Object.fromEntries(menu.map(([k,l])=>[k,l]));

function Login({ onLogin }) {
  const [email,setEmail]=useState("admin@wptcore.local");
  const [password,setPassword]=useState("1234");
  const [show,setShow]=useState(false);
  const [error,setError]=useState("");
  const submit=(e)=>{
    e.preventDefault();
    if(email==="admin@wptcore.local"&&password==="1234"){
      localStorage.setItem("wpt-core-session","active"); onLogin();
    } else setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
  };
  return <main className="login-screen"><section className="login-card glass">
    <div className="login-logo">WPT</div><span className="eyebrow">WPT CORE · SECURE ACCESS</span>
    <h1>เข้าสู่ระบบ</h1><p>ระบบบริหารธุรกิจของ WPT Concrete & Construction</p>
    <form onSubmit={submit}>
      <label>อีเมล<input value={email} onChange={e=>setEmail(e.target.value)} /></label>
      <label>รหัสผ่าน<div className="password"><input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} /><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label>
      {error&&<div className="error">{error}</div>}
      <button className="primary" type="submit">เข้าสู่ WPT Core</button>
    </form>
    <small>บัญชีทดลอง: admin@wptcore.local / 1234</small>
  </section></main>;
}

function Dashboard(){
  const cards=[["ยอดเสนอราคาเดือนนี้","฿1.28M"],["รอรับชำระ","฿420K"],["โครงการที่ดำเนินการ","8"],["กิจกรรมวันนี้","24"]];
  return <>
    <section className="hero glass"><div><span className="eyebrow">WPT CORE · BUSINESS OPERATING SYSTEM</span><h2>ศูนย์ควบคุมธุรกิจแบบ AI-First</h2><p>จัดการลูกค้า โครงการ เอกสารการเงิน และข้อมูลบริษัทจากระบบเดียว</p></div><div className="orb">AI</div></section>
    <section className="stats">{cards.map(([a,b])=><article className="glass stat" key={a}><span>{a}</span><strong>{b}</strong><small>ข้อมูลตัวอย่าง</small></article>)}</section>
    <section className="grid"><article className="glass panel"><h3>กิจกรรมล่าสุด</h3>{["สร้างใบเสนอราคา บริษัท ABC","ออกใบแจ้งหนี้ โครงการรั้วโรงงาน","เพิ่มลูกค้าใหม่"].map(x=><div className="row" key={x}>{x}<span>●</span></div>)}</article><article className="glass panel"><h3>คำสั่งด่วน</h3>{["+ ใบเสนอราคา","+ ลูกค้า","+ โครงการ","+ ใบสั่งซื้อ"].map(x=><button key={x}>{x}</button>)}</article></section>
  </>;
}

function SettingsPage({theme,setTheme}){
  const [name,setName]=useState(localStorage.getItem("wpt-core-name")||"วันธชัย ประวันไว");
  const save=()=>localStorage.setItem("wpt-core-name",name);
  return <section className="grid"><article className="glass panel settings"><h2>ข้อมูลผู้ใช้งาน</h2><label>ชื่อผู้ใช้งาน<input value={name} onChange={e=>setName(e.target.value)}/></label><label>ตำแหน่ง<input value="ผู้ดูแลระบบ" readOnly/></label><button className="primary" onClick={save}><Save size={16}/> บันทึกข้อมูล</button></article><article className="glass panel settings"><h2>ธีมระบบ</h2><div className="themes"><button className={theme==="dark"?"active":""} onClick={()=>setTheme("dark")}><Moon/> Dark Mode</button><button className={theme==="light"?"active":""} onClick={()=>setTheme("light")}><Sun/> Light Mode</button></div></article></section>;
}

export default function App(){
  const [logged,setLogged]=useState(()=>localStorage.getItem("wpt-core-session")==="active");
  const [page,setPage]=useState("dashboard");
  const [side,setSide]=useState(false);
  const [ai,setAi]=useState(false);
  const [theme,setTheme]=useState(()=>localStorage.getItem("wpt-core-theme")||"dark");
  const [cmd,setCmd]=useState("");
  const [messages,setMessages]=useState(["CORE AI พร้อมทำงาน"]);
  useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem("wpt-core-theme",theme)},[theme]);
  if(!logged)return <Login onLogin={()=>setLogged(true)}/>;
  const logout=()=>{localStorage.removeItem("wpt-core-session");setLogged(false)};
  const run=()=>{if(!cmd.trim())return;setMessages(m=>[...m,cmd,"รับคำสั่งแล้วครับ"]);setCmd("")};
  return <div className="app">
    {(side||ai)&&<button className="overlay" onClick={()=>{setSide(false);setAi(false)}}/>}
    <aside className={`sidebar ${side?"open":""}`}><div className="brand"><div>WPT</div><span><strong>WPT Core</strong><small>AI Business OS</small></span></div><div className="online">● CORE SYSTEM ONLINE</div><nav>{menu.map(([k,l,I],i)=><div key={k}>{i===5&&<hr/>}<button className={page===k?"active":""} onClick={()=>{setPage(k);setSide(false)}}><I size={18}/>{l}</button></div>)}</nav><button className="logout" onClick={logout}><LogOut size={17}/> ออกจากระบบ</button></aside>
    <main><header className="topbar glass"><div className="title"><button className="icon mobile" onClick={()=>setSide(true)}><Menu/></button><div><h1>{titles[page]}</h1><small>WPT Core Version 1.1</small></div></div><div className="actions"><label><Search size={16}/><input placeholder="ค้นหา..."/></label><button className="icon" onClick={()=>setTheme(theme==="dark"?"light":"dark")}>{theme==="dark"?<Sun/>:<Moon/>}</button><button className="icon"><Bell/></button><button className="ai-btn" onClick={()=>setAi(true)}><Bot size={18}/> CORE AI</button></div></header><div className="content">{page==="dashboard"?<Dashboard/>:page==="settings"?<SettingsPage theme={theme} setTheme={setTheme}/>:<section className="glass placeholder"><h2>{titles[page]}</h2><p>โมดูลนี้จะพัฒนาต่อในเฟสถัดไป</p></section>}</div></main>
    <aside className={`ai ${ai?"open":""}`}><div className="ai-head"><div><span className="eyebrow">CORE AI</span><h3>Command Center</h3></div><button className="icon" onClick={()=>setAi(false)}><X/></button></div><div className="ai-orb"><Bot/></div><div className="messages">{messages.map((m,i)=><div className={i%2?"msg user":"msg"} key={i}>{m}</div>)}</div><div className="cmd"><input value={cmd} onChange={e=>setCmd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()} placeholder="พิมพ์คำสั่ง..."/><button onClick={run}><Send/></button></div></aside>
    <button className="float" onClick={()=>setAi(true)}><Bot/></button>
  </div>;
}
