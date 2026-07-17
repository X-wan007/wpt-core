import { useEffect, useState } from "react";
import {
  Bot, Building2, FileText, FolderKanban, LayoutDashboard, LoaderCircle,
  LogOut, Menu, Package, ReceiptText, Send, Settings, ShoppingCart,
  Users, WalletCards, Wifi, WifiOff, X, Search, Bell, Mail, ShieldCheck,
  Database, TrendingUp, CalendarDays, CircleDollarSign, ChevronRight,
  CheckCircle2, Clock3, AlertTriangle, Sparkles
} from "lucide-react";
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

const titles = Object.fromEntries(menus.map(([key,title]) => [key,title]));
const baseProfile = {
  name:"วันธชัย ประวันไว",
  role:"ผู้ดูแลระบบ",
  company:"WPT Concrete & Construction Co., Ltd."
};

const money = new Intl.NumberFormat("th-TH", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function Login(){
  const [email,setEmail] = useState("wpt.construction2025@gmail.com");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  async function submit(event){
    event.preventDefault();
    setLoading(true);
    setError("");
    try{
      await signInWithEmailAndPassword(auth,email.trim(),password);
    }catch(err){
      setError(err.code === "auth/invalid-credential"
        ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
        : "เข้าสู่ระบบไม่สำเร็จ");
    }finally{
      setLoading(false);
    }
  }

  return (
    <main className="login-screen">
      <section className="login-card glass">
        <div className="login-logo">WPT</div>
        <div className="eyebrow">FIREBASE SECURE ACCESS</div>
        <h1>เข้าสู่ WPT Core</h1>
        <p>ระบบบริหารธุรกิจอัจฉริยะของบริษัท WPT</p>
        <form onSubmit={submit}>
          <label>อีเมล<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
          <label>รหัสผ่าน<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required /></label>
          {error && <div className="login-error">{error}</div>}
          <button className="primary-button" disabled={loading}>
            {loading && <LoaderCircle className="spin" size={18}/>}
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
      </section>
    </main>
  );
}

function SparkLine({type="blue"}){
  const paths = {
    blue:"M0 70 L18 58 L36 61 L54 39 L72 47 L90 27 L108 34 L126 13 L145 20 L164 2",
    purple:"M0 62 L20 55 L40 48 L60 53 L80 39 L100 29 L120 34 L140 19 L164 10",
    orange:"M0 65 L20 60 L40 50 L60 42 L80 46 L100 30 L120 35 L140 16 L164 7",
    green:"M0 66 L20 58 L40 52 L60 45 L80 50 L100 31 L120 27 L140 16 L164 4"
  };
  return (
    <svg className={`spark ${type}`} viewBox="0 0 164 76" preserveAspectRatio="none">
      <path className="spark-area" d={`${paths[type]} L164 76 L0 76 Z`} />
      <path className="spark-line" d={paths[type]} />
      <circle cx="164" cy={type==="blue"?"2":type==="purple"?"10":type==="orange"?"7":"4"} r="3.5"/>
    </svg>
  );
}

function KpiCard({tone,icon:Icon,title,value,unit,sub,trend}){
  return (
    <article className={`kpi-card glass ${tone}`}>
      <div className="kpi-head">
        <div className="kpi-icon"><Icon size={19}/></div>
        <span>{title}</span>
      </div>
      <strong>{value}</strong>
      <small>{unit}</small>
      <div className="kpi-bottom">
        <span className="trend">▲ {trend}</span>
        <span>{sub}</span>
      </div>
      <SparkLine type={tone}/>
    </article>
  );
}

function RevenueChart(){
  return (
    <svg className="revenue-chart" viewBox="0 0 720 260" preserveAspectRatio="none">
      <defs>
        <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#16b9ff" stopOpacity=".42"/>
          <stop offset="100%" stopColor="#16b9ff" stopOpacity="0"/>
        </linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[30,80,130,180,230].map(y=><line key={y} x1="45" y1={y} x2="705" y2={y} className="chart-grid"/>)}
      {[90,190,290,390,490,590,690].map(x=><line key={x} x1={x} y1="20" x2={x} y2="235" className="chart-grid vertical"/>)}
      <path className="chart-area" d="M45 225 C85 210,100 185,135 180 S195 120,235 145 S300 195,340 155 S400 120,440 150 S505 190,545 155 S610 130,650 80 S685 38,705 25 L705 235 L45 235 Z"/>
      <path className="chart-line" filter="url(#glow)" d="M45 225 C85 210,100 185,135 180 S195 120,235 145 S300 195,340 155 S400 120,440 150 S505 190,545 155 S610 130,650 80 S685 38,705 25"/>
      <circle cx="705" cy="25" r="6" className="chart-point"/>
      <text x="12" y="35">3M</text><text x="12" y="85">2M</text><text x="12" y="135">1M</text><text x="22" y="235">0</text>
      {["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."].map((m,i)=><text key={m} x={50+i*58} y="255">{m}</text>)}
    </svg>
  );
}

function Donut(){
  return (
    <div className="donut-wrap">
      <div className="donut"><div><span>รวมทั้งสิ้น</span><strong>12.75M</strong><small>บาท</small></div></div>
      <div className="legend">
        <div><i className="green-dot"/>ชำระเงินแล้ว <strong>45%</strong></div>
        <div><i className="orange-dot"/>รอชำระ <strong>30%</strong></div>
        <div><i className="blue-dot"/>รอวางบิล <strong>15%</strong></div>
        <div><i className="pink-dot"/>ยกเลิก <strong>10%</strong></div>
      </div>
    </div>
  );
}

function Dashboard({profile,online}){
  const firstName = profile.name.split(" ")[0];
  const activities = [
    [FileText,"สร้างใบแจ้งหนี้","INV-2026-00018","5 นาทีที่แล้ว","blue"],
    [CircleDollarSign,"รับชำระเงิน","INV-2026-00017","32 นาทีที่แล้ว","green"],
    [ReceiptText,"สร้างใบเสนอราคา","QT-2026-00025","1 ชั่วโมงที่แล้ว","purple"],
    [ShoppingCart,"สร้างใบสั่งซื้อ (PO)","PO-2026-00015","3 ชั่วโมงที่แล้ว","orange"],
    [Users,"อัปเดตข้อมูลลูกค้า","บจก. WPT Partner","5 ชั่วโมงที่แล้ว","cyan"]
  ];

  return (
    <>
      <section className="welcome-strip">
        <div><h2>Dashboard</h2><p>ภาพรวมธุรกิจของคุณ · สวัสดีคุณ{firstName}</p></div>
        <label className="global-search"><Search size={17}/><input placeholder="ค้นหาเอกสาร, ลูกค้า, โครงการ..."/><kbd>⌘ K</kbd></label>
        <div className="header-icons"><button><Bell size={18}/><b/></button><button><Mail size={18}/></button><button><Settings size={18}/></button></div>
      </section>

      <section className="kpi-grid">
        <KpiCard tone="blue" icon={CircleDollarSign} title="ยอดขายรวม (ปีนี้)" value={money.format(12750000)} unit="บาท" trend="15.8%" sub="เทียบกับปีก่อน"/>
        <KpiCard tone="purple" icon={FileText} title="ใบเสนอราคา" value="28" unit="รายการ" trend="12.4%" sub="มูลค่ารวม 3.24M"/>
        <KpiCard tone="orange" icon={AlertTriangle} title="ใบแจ้งหนี้ค้างชำระ" value="18" unit="รายการ" trend="4.6%" sub="มูลค่ารวม 2.86M"/>
        <KpiCard tone="green" icon={WalletCards} title="รับชำระแล้ว (เดือนนี้)" value={money.format(2450000)} unit="บาท" trend="23.5%" sub="เทียบเดือนที่แล้ว"/>
      </section>

      <section className="analytics-grid">
        <article className="chart-card glass">
          <div className="section-title"><div><span>ANALYTICS</span><h3>กราฟยอดขาย</h3></div><div><button>ปี 2569</button><button>รายเดือน</button></div></div>
          <RevenueChart/>
        </article>
        <article className="donut-card glass">
          <div className="section-title"><div><span>SALES STATUS</span><h3>สัดส่วนยอดขายตามสถานะ</h3></div></div>
          <Donut/>
        </article>
        <article className="activity-card glass">
          <div className="section-title"><div><span>ACTIVITY</span><h3>กิจกรรมล่าสุด</h3></div><a>ดูทั้งหมด</a></div>
          {activities.map(([Icon,title,code,time,tone])=>(
            <div className="activity-item" key={code}>
              <div className={`activity-icon ${tone}`}><Icon size={16}/></div>
              <div><strong>{title}</strong><span>{code}</span><small>{time}</small></div>
            </div>
          ))}
        </article>
      </section>

      <section className="bottom-grid">
        <article className="assistant-card glass">
          <div className="assistant-orb"><Bot/></div>
          <h3>AI Assistant</h3>
          <p>สวัสดีครับ ผมพร้อมช่วยวิเคราะห์ข้อมูลธุรกิจของคุณ</p>
          <button><Sparkles size={16}/> เริ่มสนทนา</button>
        </article>
        <article className="table-card glass">
          <div className="section-title"><div><span>QUOTATIONS</span><h3>ใบเสนอราคาล่าสุด</h3></div><a>ดูทั้งหมด</a></div>
          <div className="table-head"><span>เลขที่เอกสาร</span><span>ลูกค้า</span><span>มูลค่า</span><span>สถานะ</span></div>
          {[
            ["QT-2026-00025","บจก. เอสซี คอนสตรัคชั่น","250,000","อนุมัติแล้ว","success"],
            ["QT-2026-00024","บจก. สยามก่อสร้าง","320,000","ร่าง","draft"],
            ["QT-2026-00023","บจก. อินทนนท์บิลดิ้ง","125,000","รออนุมัติ","pending"],
            ["QT-2026-00022","บจก. ยูนิเวอร์แซล","480,000","อนุมัติแล้ว","success"]
          ].map(r=><div className="table-row" key={r[0]}>{r.slice(0,3).map(x=><span key={x}>{x}</span>)}<span><b className={r[4]}>{r[3]}</b></span></div>)}
        </article>
        <article className="schedule-card glass">
          <div className="section-title"><div><span>TODAY</span><h3>การนัดหมายวันนี้</h3></div><a>ดูทั้งหมด</a></div>
          {[
            ["09:00","นัดประชุมกับลูกค้า","บจก. เอสซี คอนสตรัคชั่น"],
            ["11:00","ติดตามงานใบเสนอราคา","QT-2026-00024"],
            ["14:00","นำเสนอโปรเจกต์","โครงการก่อสร้างสำนักงาน"],
            ["16:00","ติดตามการชำระเงิน","INV-2026-00015"]
          ].map(([time,title,sub])=><div className="schedule-item" key={time}><time>{time}</time><i/><div><strong>{title}</strong><span>{sub}</span></div></div>)}
        </article>
      </section>

      <footer className="system-footer">
        <div><CheckCircle2/><span>SYSTEM STATUS</span><strong>All Systems Operational</strong></div>
        <div><ShieldCheck/><span>SECURITY</span><strong>Active</strong></div>
        <div><Database/><span>DATABASE</span><strong>Connected</strong></div>
        <div><Sparkles/><span>VERSION</span><strong>2.1.0</strong></div>
      </footer>
    </>
  );
}

export default function App(){
  const [ready,setReady] = useState(false);
  const [user,setUser] = useState(null);
  const [profile,setProfile] = useState({...baseProfile,email:""});
  const [page,setPage] = useState("dashboard");
  const [side,setSide] = useState(false);
  const [ai,setAi] = useState(false);
  const [online,setOnline] = useState(navigator.onLine);
  const [command,setCommand] = useState("");

  useEffect(()=>{
    const on=()=>setOnline(true), off=()=>setOnline(false);
    addEventListener("online",on); addEventListener("offline",off);
    return()=>{ removeEventListener("online",on); removeEventListener("offline",off); };
  },[]);

  useEffect(()=>onAuthStateChanged(auth,async current=>{
    setUser(current);
    if(!current){ setReady(true); return; }
    try{
      const ref=doc(db,"users",current.uid);
      const snap=await getDoc(ref);
      if(snap.exists()){
        setProfile({...baseProfile,...snap.data(),email:current.email});
        await setDoc(ref,{lastLogin:serverTimestamp(),status:"active"},{merge:true});
      }else{
        const data={...baseProfile,uid:current.uid,email:current.email,status:"active",createdAt:serverTimestamp(),lastLogin:serverTimestamp()};
        await setDoc(ref,data);
        setProfile({...baseProfile,email:current.email});
      }
    }finally{
      setReady(true);
    }
  }),[]);

  if(!ready) return <main className="loading-screen"><LoaderCircle className="spin"/><strong>กำลังเชื่อม Firebase...</strong></main>;
  if(!user) return <Login/>;

  const navigate=key=>{ setPage(key); setSide(false); };

  return (
    <div className="app-shell">
      {side && <button className="overlay" onClick={()=>setSide(false)}/>}
      <aside className={`sidebar ${side?"open":""}`}>
        <div className="brand">
          <div className="brand-symbol">WPT</div>
          <div><strong>WPT <em>CORE</em></strong><small>Smart Business Platform</small></div>
        </div>
        <button className="collapse-btn"><Menu size={18}/></button>
        <nav>
          {menus.map(([key,title,Icon],index)=>(
            <div key={key}>
              {index===5 && <div className="nav-divider"/>}
              <button className={page===key?"active":""} onClick={()=>navigate(key)}>
                <Icon size={18}/><span>{title}</span><ChevronRight size={14}/>
              </button>
            </div>
          ))}
        </nav>
        <div className={`connection ${online?"":"offline"}`}><i/>{online?"Firebase Connected":"Offline Cache"}</div>
        <button className="logout-button" onClick={()=>signOut(auth)}><LogOut size={17}/> ออกจากระบบ</button>
      </aside>

      <main className="main">
        <header className="mobile-topbar glass">
          <button className="icon-button" onClick={()=>setSide(true)}><Menu/></button>
          <div><strong>WPT CORE</strong><small>{titles[page]}</small></div>
          <button className="icon-button"><Bell size={18}/></button>
        </header>
        <div className="page-content">
          {page==="dashboard"
            ? <Dashboard profile={profile} online={online}/>
            : <section className="placeholder glass"><div className="placeholder-icon">{(() => { const M=menus.find(x=>x[0]===page)?.[2]||Settings; return <M/>; })()}</div><h2>{titles[page]}</h2><p>โมดูลนี้กำลังพัฒนาเพื่อเชื่อม Cloud Firestore</p></section>}
        </div>
      </main>

      <aside className={`ai-panel ${ai?"open":""}`}>
        <div className="ai-header"><div><span>CORE AI</span><h3>Command Center</h3></div><button className="icon-button" onClick={()=>setAi(false)}><X size={18}/></button></div>
        <div className="ai-visual"><div className="ai-ring"><Bot/></div><small>FIREBASE DATA MODE READY</small></div>
        <div className="messages"><div className="message">ระบบเชื่อม Firebase และพร้อมอ่านข้อมูลธุรกิจแล้วครับ</div></div>
        <div className="command-box"><input value={command} onChange={e=>setCommand(e.target.value)} placeholder="พิมพ์คำสั่ง..."/><button><Send size={17}/></button></div>
      </aside>
      <button className="floating-ai" onClick={()=>setAi(true)}><Bot/></button>
    </div>
  );
}
