import { useEffect, useState } from "react";
import {
  Bot, Building2, FileText, FolderKanban, LayoutDashboard, LoaderCircle,
  LogOut, Menu, Package, ReceiptText, Send, Settings, ShoppingCart,
  Users, WalletCards, Wifi, WifiOff, X, Search, Bell, Mail, ShieldCheck,
  Database, CircleDollarSign, ChevronRight, CheckCircle2, AlertTriangle,
  Sparkles, Save, Plus, Trash2, Landmark, MapPin, Phone, AtSign, Globe2,
  BadgeCheck, CreditCard, UserRound, Stamp, Image as ImageIcon, Clock3, CalendarDays, TrendingUp
} from "lucide-react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const menus = [
  ["dashboard","Dashboard",LayoutDashboard],
  ["quotation","ใบเสนอราคา",FileText],
  ["invoice","ใบวางบิล / ใบแจ้งหนี้",ReceiptText],
  ["receipt","ใบเสร็จรับเงิน",WalletCards],
  ["po","ใบสั่งซื้อ (PO)",ShoppingCart],
  ["customers","ลูกค้า",Users],
  ["projects","โครงการ",FolderKanban],
  ["companies","บริษัท",Building2],
  ["products","สินค้า / บริการ",Package],
  ["settings","ตั้งค่า",Settings]
];

const titles = Object.fromEntries(menus.map(([key,title]) => [key,title]));

const baseProfile = {
  name:"วันธชัย ประวันไว",
  role:"ผู้ดูแลระบบ",
  company:"WPT Concrete & Construction Co., Ltd."
};

const emptyCompany = {
  companyName:"บริษัท ดับเบิ้ลยูพีที คอนกรีต แอนด์ คอนสตรัคชั่น จำกัด",
  companyNameEn:"WPT Concrete & Construction Co., Ltd.",
  taxId:"",
  registrationNo:"",
  businessType:"รับเหมาก่อสร้างและผลิตภัณฑ์คอนกรีตสำเร็จรูป",
  addressNo:"",
  road:"",
  subdistrict:"",
  district:"",
  province:"อุดรธานี",
  postalCode:"",
  phone:"",
  mobile:"",
  email:"",
  website:"",
  lineOA:"",
  authorizedName:"วันธชัย ประวันไว",
  authorizedPosition:"กรรมการผู้มีอำนาจลงนาม",
  banks:[]
};

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

function NeonLineChart(){
  return (
    <svg className="neon-line-chart" viewBox="0 0 760 300" preserveAspectRatio="none" role="img" aria-label="กราฟยอดขายรายเดือน">
      <defs>
        <linearGradient id="neonArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23c7ff" stopOpacity=".42"/>
          <stop offset="68%" stopColor="#168cff" stopOpacity=".10"/>
          <stop offset="100%" stopColor="#168cff" stopOpacity="0"/>
        </linearGradient>
        <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {[40,90,140,190,240].map(y=><line key={y} x1="48" y1={y} x2="744" y2={y} className="chart-grid-line"/>)}
      {[106,164,222,280,338,396,454,512,570,628,686,744].map(x=><line key={x} x1={x} y1="22" x2={x} y2="248" className="chart-grid-line vertical"/>)}
      <path className="neon-area" d="M48 238 C84 222 100 198 128 184 S174 134 207 154 S260 204 300 164 S350 116 392 146 S444 194 486 160 S538 138 574 150 S622 129 654 88 S704 54 744 27 L744 248 L48 248 Z"/>
      <path className="neon-path glow" filter="url(#neonGlow)" d="M48 238 C84 222 100 198 128 184 S174 134 207 154 S260 204 300 164 S350 116 392 146 S444 194 486 160 S538 138 574 150 S622 129 654 88 S704 54 744 27"/>
      <path className="neon-path" d="M48 238 C84 222 100 198 128 184 S174 134 207 154 S260 204 300 164 S350 116 392 146 S444 194 486 160 S538 138 574 150 S622 129 654 88 S704 54 744 27"/>
      <circle cx="744" cy="27" r="6" className="neon-point" filter="url(#neonGlow)"/>
      <text x="14" y="45">3M</text><text x="14" y="95">2M</text><text x="14" y="145">1M</text><text x="25" y="247">0</text>
      {["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."].map((m,i)=><text key={m} x={50+i*61} y="278">{m}</text>)}
    </svg>
  );
}

function StatusDonut(){
  return (
    <div className="donut-layout">
      <div className="status-donut">
        <div><span>รวมทั้งสิ้น</span><strong>12.75M</strong><small>บาท</small></div>
      </div>
      <div className="donut-legend">
        <p><i className="dot paid"/>ชำระเงินแล้ว <b>45%</b></p>
        <p><i className="dot waiting"/>รอชำระ <b>30%</b></p>
        <p><i className="dot billing"/>รอวางบิล <b>15%</b></p>
        <p><i className="dot cancelled"/>ยกเลิก <b>10%</b></p>
      </div>
    </div>
  );
}

function Dashboard({profile,online}){
  const latestActivities = [
    [FileText,"สร้างใบแจ้งหนี้","INV-2026-00018","5 นาทีที่แล้ว","blue"],
    [CircleDollarSign,"รับชำระเงิน","INV-2026-00017","32 นาทีที่แล้ว","green"],
    [ReceiptText,"สร้างใบเสนอราคา","QT-2026-00025","1 ชั่วโมงที่แล้ว","purple"],
    [ShoppingCart,"สร้างใบสั่งซื้อ (PO)","PO-2026-00015","3 ชั่วโมงที่แล้ว","orange"],
    [Users,"อัปเดตข้อมูลลูกค้า","บจก. เอสซี คอนสตรัคชั่น","5 ชั่วโมงที่แล้ว","cyan"]
  ];

  return (
    <>
      <section className="dashboard-head">
        <div><h2>Dashboard</h2><p>ภาพรวมธุรกิจของคุณ · สวัสดีคุณ{profile.name.split(" ")[0]}</p></div>
        <label className="global-search"><Search size={17}/><input placeholder="ค้นหาเอกสาร, ลูกค้า, โครงการ..."/></label>
        <div className="header-icons"><button><Bell size={18}/></button><button><Mail size={18}/></button><button><Settings size={18}/></button></div>
      </section>

      <section className="kpi-grid">
        {[
          ["blue",CircleDollarSign,"ยอดขายรวม (ปีนี้)","12,750,000.00","บาท","15.8%"],
          ["purple",FileText,"ใบเสนอราคา","28","รายการ","12.4%"],
          ["orange",AlertTriangle,"ใบแจ้งหนี้ค้างชำระ","18","รายการ","4.6%"],
          ["green",WalletCards,"รับชำระแล้ว (เดือนนี้)","2,450,000.00","บาท","23.5%"]
        ].map(([tone,Icon,title,value,unit,trend])=>(
          <article className={`kpi-card glass ${tone}`} key={title}>
            <div className="kpi-head"><div className="kpi-icon"><Icon size={19}/></div><span>{title}</span></div>
            <strong>{value}</strong><small>{unit}</small>
            <div className="kpi-trend">▲ {trend} <span>เทียบช่วงก่อน</span></div>
            <svg className="kpi-spark" viewBox="0 0 170 70" preserveAspectRatio="none">
              <path d="M0 62 L18 55 L36 58 L54 39 L72 45 L90 28 L108 34 L126 16 L145 22 L170 4"/>
            </svg>
          </article>
        ))}
      </section>

      <section className="analytics-pro-grid">
        <article className="sales-chart-card glass">
          <div className="section-heading">
            <div><span>ANALYTICS</span><h3>กราฟยอดขาย</h3></div>
            <div><button>ปี 2569</button><button>รายเดือน</button></div>
          </div>
          <NeonLineChart/>
        </article>

        <article className="donut-card glass">
          <div className="section-heading"><div><span>SALES STATUS</span><h3>สัดส่วนยอดขายตามสถานะ</h3></div></div>
          <StatusDonut/>
        </article>

        <article className="activity-card glass">
          <div className="section-heading"><div><span>ACTIVITY</span><h3>กิจกรรมล่าสุด</h3></div><a>ดูทั้งหมด</a></div>
          {latestActivities.map(([Icon,title,code,time,tone])=>(
            <div className="activity-list-item" key={code}>
              <div className={`activity-badge ${tone}`}><Icon size={16}/></div>
              <div><strong>{title}</strong><span>{code}</span><small>{time}</small></div>
            </div>
          ))}
        </article>
      </section>

      <section className="lower-dashboard-grid">
        <article className="ai-assistant-card glass">
          <div className="ai-mini-orb"><Bot/></div>
          <h3>AI Assistant</h3>
          <p>พร้อมช่วยวิเคราะห์ข้อมูลธุรกิจและสร้างเอกสารให้คุณ</p>
          <button><Sparkles size={16}/> เริ่มสนทนา</button>
        </article>

        <article className="data-table-card glass">
          <div className="section-heading"><div><span>QUOTATIONS</span><h3>ใบเสนอราคาล่าสุด</h3></div><a>ดูทั้งหมด</a></div>
          <div className="data-table header"><span>เลขที่เอกสาร</span><span>ลูกค้า</span><span>มูลค่า</span><span>สถานะ</span></div>
          {[
            ["QT-2026-00025","บจก. เอสซี คอนสตรัคชั่น","250,000","อนุมัติแล้ว","success"],
            ["QT-2026-00024","บจก. สยามก่อสร้าง","320,000","ร่าง","draft"],
            ["QT-2026-00023","บจก. อินทนนท์บิลดิ้ง","125,000","รออนุมัติ","pending"],
            ["QT-2026-00022","บจก. ยูนิเวอร์แซล","480,000","อนุมัติแล้ว","success"]
          ].map(row=><div className="data-table" key={row[0]}><span>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span><span><b className={row[4]}>{row[3]}</b></span></div>)}
        </article>

        <article className="schedule-card glass">
          <div className="section-heading"><div><span>TODAY</span><h3>การนัดหมายวันนี้</h3></div><a>ดูทั้งหมด</a></div>
          {[
            ["09:00","นัดประชุมกับลูกค้า","บจก. เอสซี คอนสตรัคชั่น"],
            ["11:00","ติดตามงานใบเสนอราคา","QT-2026-00024"],
            ["14:00","นำเสนอโปรเจกต์","โครงการก่อสร้างสำนักงาน"],
            ["16:00","ติดตามการชำระเงิน","INV-2026-00015"]
          ].map(([time,title,sub])=><div className="schedule-row" key={time}><time>{time}</time><i/><div><strong>{title}</strong><span>{sub}</span></div></div>)}
        </article>
      </section>

      <footer className="dashboard-footer">
        <div><CheckCircle2/><span>SYSTEM STATUS</span><strong>All Systems Operational</strong></div>
        <div><ShieldCheck/><span>SECURITY</span><strong>Active</strong></div>
        <div><Database/><span>DATABASE</span><strong>Connected</strong></div>
        <div><Sparkles/><span>VERSION</span><strong>2.3.0</strong></div>
      </footer>
    </>
  );
}

function Field({label,icon:Icon,value,onChange,placeholder,type="text"}){
  return (
    <label className="form-field">
      <span>{Icon && <Icon size={15}/>} {label}</span>
      <input type={type} value={value ?? ""} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>
    </label>
  );
}

function CompanyMaster({user}){
  const [company,setCompany] = useState(emptyCompany);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [saved,setSaved] = useState(false);

  useEffect(()=>{
    (async()=>{
      try{
        const snap = await getDoc(doc(db,"companies","wpt"));
        if(snap.exists()) setCompany({...emptyCompany,...snap.data()});
      }finally{
        setLoading(false);
      }
    })();
  },[]);

  const update = (key,value)=>setCompany(prev=>({...prev,[key]:value}));

  const addBank = ()=>setCompany(prev=>({
    ...prev,
    banks:[...(prev.banks||[]),{bankName:"",accountName:"",accountNo:"",branch:""}]
  }));

  const updateBank = (index,key,value)=>setCompany(prev=>({
    ...prev,
    banks:prev.banks.map((bank,i)=>i===index?{...bank,[key]:value}:bank)
  }));

  const removeBank = index=>setCompany(prev=>({
    ...prev,
    banks:prev.banks.filter((_,i)=>i!==index)
  }));

  const saveCompany = async()=>{
    setSaving(true);
    setSaved(false);
    try{
      await setDoc(doc(db,"companies","wpt"),{
        ...company,
        companyId:"wpt",
        updatedBy:user.uid,
        updatedAt:serverTimestamp()
      },{merge:true});
      setSaved(true);
      setTimeout(()=>setSaved(false),2200);
    }finally{
      setSaving(false);
    }
  };

  if(loading) return <div className="module-loading"><LoaderCircle className="spin"/><span>กำลังโหลดข้อมูลบริษัท...</span></div>;

  return (
    <section className="company-page">
      <div className="module-header">
        <div><span className="eyebrow">COMPANY MASTER</span><h2>ข้อมูลบริษัท</h2><p>ข้อมูลส่วนกลางสำหรับเอกสารทุกประเภทใน WPT Core</p></div>
        <button className="save-main" onClick={saveCompany} disabled={saving}>
          {saving?<LoaderCircle className="spin" size={17}/>:saved?<CheckCircle2 size={17}/>:<Save size={17}/>}
          {saving?"กำลังบันทึก...":saved?"บันทึกสำเร็จ":"บันทึกข้อมูล"}
        </button>
      </div>

      <div className="company-grid">
        <article className="company-card glass wide">
          <div className="card-title"><Building2/><div><span>GENERAL INFORMATION</span><h3>ข้อมูลทั่วไป</h3></div></div>
          <div className="form-grid two">
            <Field label="ชื่อบริษัท (ภาษาไทย)" icon={Building2} value={company.companyName} onChange={v=>update("companyName",v)}/>
            <Field label="ชื่อบริษัท (English)" icon={Building2} value={company.companyNameEn} onChange={v=>update("companyNameEn",v)}/>
            <Field label="เลขประจำตัวผู้เสียภาษี" icon={BadgeCheck} value={company.taxId} onChange={v=>update("taxId",v)} placeholder="13 หลัก"/>
            <Field label="เลขทะเบียนนิติบุคคล" icon={BadgeCheck} value={company.registrationNo} onChange={v=>update("registrationNo",v)}/>
            <Field label="ประเภทธุรกิจ" icon={Landmark} value={company.businessType} onChange={v=>update("businessType",v)}/>
          </div>
        </article>

        <article className="company-card glass">
          <div className="card-title"><ImageIcon/><div><span>BRANDING</span><h3>โลโก้และตราประทับ</h3></div></div>
          <div className="upload-zone"><div className="upload-icon">WPT</div><strong>โลโก้บริษัท</strong><span>เตรียมเชื่อม Firebase Storage</span><button>เลือกรูปภาพ</button></div>
          <div className="upload-mini"><Stamp/><div><strong>ตราประทับบริษัท</strong><span>PNG พื้นหลังโปร่งใส</span></div><button>เลือกไฟล์</button></div>
        </article>

        <article className="company-card glass wide">
          <div className="card-title"><MapPin/><div><span>ADDRESS</span><h3>ที่อยู่บริษัท</h3></div></div>
          <div className="form-grid three">
            <Field label="บ้านเลขที่" value={company.addressNo} onChange={v=>update("addressNo",v)}/>
            <Field label="ถนน" value={company.road} onChange={v=>update("road",v)}/>
            <Field label="ตำบล / แขวง" value={company.subdistrict} onChange={v=>update("subdistrict",v)}/>
            <Field label="อำเภอ / เขต" value={company.district} onChange={v=>update("district",v)}/>
            <Field label="จังหวัด" value={company.province} onChange={v=>update("province",v)}/>
            <Field label="รหัสไปรษณีย์" value={company.postalCode} onChange={v=>update("postalCode",v)}/>
          </div>
        </article>

        <article className="company-card glass">
          <div className="card-title"><Phone/><div><span>CONTACT</span><h3>ข้อมูลติดต่อ</h3></div></div>
          <div className="form-grid">
            <Field label="โทรศัพท์" icon={Phone} value={company.phone} onChange={v=>update("phone",v)}/>
            <Field label="มือถือ" icon={Phone} value={company.mobile} onChange={v=>update("mobile",v)}/>
            <Field label="Email" icon={AtSign} type="email" value={company.email} onChange={v=>update("email",v)}/>
            <Field label="Website" icon={Globe2} value={company.website} onChange={v=>update("website",v)}/>
            <Field label="Line OA" icon={AtSign} value={company.lineOA} onChange={v=>update("lineOA",v)}/>
          </div>
        </article>

        <article className="company-card glass wide">
          <div className="card-title action-title">
            <div className="title-left"><CreditCard/><div><span>BANK ACCOUNTS</span><h3>บัญชีธนาคาร</h3></div></div>
            <button className="add-button" onClick={addBank}><Plus size={16}/> เพิ่มบัญชี</button>
          </div>
          {company.banks.length===0
            ? <div className="empty-state"><Landmark/><strong>ยังไม่มีบัญชีธนาคาร</strong><span>กด “เพิ่มบัญชี” เพื่อเริ่มต้น</span></div>
            : <div className="bank-list">{company.banks.map((bank,index)=>(
              <div className="bank-row" key={index}>
                <Field label="ธนาคาร" value={bank.bankName} onChange={v=>updateBank(index,"bankName",v)}/>
                <Field label="ชื่อบัญชี" value={bank.accountName} onChange={v=>updateBank(index,"accountName",v)}/>
                <Field label="เลขบัญชี" value={bank.accountNo} onChange={v=>updateBank(index,"accountNo",v)}/>
                <Field label="สาขา" value={bank.branch} onChange={v=>updateBank(index,"branch",v)}/>
                <button className="delete-bank" onClick={()=>removeBank(index)}><Trash2 size={17}/></button>
              </div>
            ))}</div>}
        </article>

        <article className="company-card glass">
          <div className="card-title"><UserRound/><div><span>AUTHORIZED SIGNATORY</span><h3>ผู้มีอำนาจลงนาม</h3></div></div>
          <div className="form-grid">
            <Field label="ชื่อ-นามสกุล" value={company.authorizedName} onChange={v=>update("authorizedName",v)}/>
            <Field label="ตำแหน่ง" value={company.authorizedPosition} onChange={v=>update("authorizedPosition",v)}/>
          </div>
          <div className="upload-mini signature"><UserRound/><div><strong>รูปลายเซ็น</strong><span>เตรียมเชื่อม Firebase Storage</span></div><button>เลือกไฟล์</button></div>
        </article>
      </div>
    </section>
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
    const on=()=>setOnline(true),off=()=>setOnline(false);
    addEventListener("online",on);addEventListener("offline",off);
    return()=>{removeEventListener("online",on);removeEventListener("offline",off)};
  },[]);

  useEffect(()=>onAuthStateChanged(auth,async current=>{
    setUser(current);
    if(!current){setReady(true);return;}
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

  const navigate=key=>{setPage(key);setSide(false)};

  return (
    <div className="app-shell">
      {side&&<button className="overlay" onClick={()=>setSide(false)}/>}
      <aside className={`sidebar ${side?"open":""}`}>
        <div className="brand"><div className="brand-symbol">WPT</div><div><strong>WPT <em>CORE</em></strong><small>Smart Business Platform</small></div></div>
        <button className="collapse-btn"><Menu size={18}/></button>
        <nav>{menus.map(([key,title,Icon],index)=><div key={key}>{index===5&&<div className="nav-divider"/>}<button className={page===key?"active":""} onClick={()=>navigate(key)}><Icon size={18}/><span>{title}</span><ChevronRight size={14}/></button></div>)}</nav>
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
          {page==="dashboard" && <Dashboard profile={profile} online={online}/>}
          {page==="companies" && <CompanyMaster user={user}/>}
          {!["dashboard","companies"].includes(page) && <section className="placeholder glass"><h2>{titles[page]}</h2><p>โมดูลนี้กำลังพัฒนาเพื่อเชื่อม Cloud Firestore</p></section>}
        </div>
      </main>

      <aside className={`ai-panel ${ai?"open":""}`}>
        <div className="ai-header"><div><span>CORE AI</span><h3>Command Center</h3></div><button className="icon-button" onClick={()=>setAi(false)}><X size={18}/></button></div>
        <div className="ai-visual"><div className="ai-ring"><Bot/></div><small>FIREBASE DATA MODE READY</small></div>
        <div className="messages"><div className="message">ระบบพร้อมอ่านข้อมูลบริษัทและเอกสารแล้วครับ</div></div>
        <div className="command-box"><input value={command} onChange={e=>setCommand(e.target.value)} placeholder="พิมพ์คำสั่ง..."/><button><Send size={17}/></button></div>
      </aside>
      <button className="floating-ai" onClick={()=>setAi(true)}><Bot/></button>
    </div>
  );
}
