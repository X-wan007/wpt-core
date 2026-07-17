import { useEffect, useState } from "react";
import {
  Bot, Building2, FileText, FolderKanban, LayoutDashboard, LoaderCircle,
  LogOut, Menu, Package, ReceiptText, Send, Settings, ShoppingCart,
  Users, WalletCards, Wifi, WifiOff, X, Search, Bell, Mail, ShieldCheck,
  Database, CircleDollarSign, ChevronRight, CheckCircle2, AlertTriangle,
  Sparkles, Save, Plus, Trash2, Landmark, MapPin, Phone, AtSign, Globe2,
  BadgeCheck, CreditCard, UserRound, Stamp, Image as ImageIcon
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

function Dashboard({profile,online}){
  return (
    <>
      <section className="dashboard-head">
        <div><h2>Dashboard</h2><p>ภาพรวมธุรกิจของคุณ · สวัสดีคุณ{profile.name.split(" ")[0]}</p></div>
        <label className="global-search"><Search size={17}/><input placeholder="ค้นหาเอกสาร, ลูกค้า, โครงการ..."/></label>
        <div className="header-icons"><button><Bell size={18}/></button><button><Mail size={18}/></button><button><Settings size={18}/></button></div>
      </section>

      <section className="kpi-grid">
        {[
          ["blue",CircleDollarSign,"ยอดขายรวม (ปีนี้)","12,750,000.00","บาท"],
          ["purple",FileText,"ใบเสนอราคา","28","รายการ"],
          ["orange",AlertTriangle,"ใบแจ้งหนี้ค้างชำระ","18","รายการ"],
          ["green",WalletCards,"รับชำระแล้ว (เดือนนี้)","2,450,000.00","บาท"]
        ].map(([tone,Icon,title,value,unit])=>(
          <article className={`kpi-card glass ${tone}`} key={title}>
            <div className="kpi-head"><div className="kpi-icon"><Icon size={19}/></div><span>{title}</span></div>
            <strong>{value}</strong><small>{unit}</small>
            <div className="mini-line"><i/><i/><i/><i/><i/><i/></div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="chart-placeholder glass">
          <div className="section-title"><span>ANALYTICS</span><h3>กราฟยอดขาย</h3></div>
          <div className="fake-chart">
            {[28,45,39,62,51,76,64,58,70,83,78,96].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}
          </div>
        </article>
        <article className="system-card glass">
          <div className="section-title"><span>SYSTEM</span><h3>สถานะระบบ</h3></div>
          <div className="system-row"><ShieldCheck/><span>Authentication</span><b>Active</b></div>
          <div className="system-row"><Database/><span>Firestore</span><b>Connected</b></div>
          <div className="system-row">{online?<Wifi/>:<WifiOff/>}<span>Network</span><b>{online?"Online":"Offline"}</b></div>
          <button onClick={()=>{}}>เปิด CORE AI</button>
        </article>
      </section>
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
