import { useState } from "react";
import {
  LayoutDashboard, FileText, ReceiptText, WalletCards, ShoppingCart,
  Users, Building2, FolderKanban, Package, Settings, Bot, Menu,
  Bell, Search, TrendingUp, Activity, CircleDollarSign, X, Send,
} from "lucide-react";

const menuItems = [
  ["dashboard", "Dashboard", LayoutDashboard],
  ["quotation", "ใบเสนอราคา", FileText],
  ["invoice", "ใบวางบิล / ใบแจ้งหนี้", ReceiptText],
  ["receipt", "ใบเสร็จรับเงิน", WalletCards],
  ["po", "ใบสั่งซื้อ (PO)", ShoppingCart],
  ["customers", "ลูกค้า", Users],
  ["projects", "โครงการ", FolderKanban],
  ["companies", "บริษัท", Building2],
  ["products", "สินค้า / บริการ", Package],
  ["settings", "ตั้งค่า", Settings],
];

const pageTitles = Object.fromEntries(menuItems.map(([key, label]) => [key, label]));

function StatCard({ label, value, note, icon: Icon }) {
  return (
    <article className="stat-card glass">
      <div className="stat-top"><span>{label}</span><Icon size={18} /></div>
      <strong>{value}</strong><small>{note}</small>
    </article>
  );
}

function Dashboard() {
  return (
    <>
      <section className="hero glass">
        <div>
          <span className="eyebrow">WPT CORE · BUSINESS OPERATING SYSTEM</span>
          <h2>ศูนย์ควบคุมธุรกิจแบบ AI-First</h2>
          <p>จัดการลูกค้า โครงการ เอกสารการเงิน และข้อมูลบริษัทจากระบบเดียว รองรับ iPhone, iPad และ Desktop</p>
        </div>
        <div className="core-orb"><div>AI</div></div>
      </section>
      <section className="stats">
        <StatCard label="ยอดเสนอราคาเดือนนี้" value="฿1.28M" note="+18.4% จากเดือนก่อน" icon={TrendingUp} />
        <StatCard label="รอรับชำระ" value="฿420K" note="5 เอกสาร" icon={CircleDollarSign} />
        <StatCard label="โครงการที่ดำเนินการ" value="8" note="3 โครงการสำคัญ" icon={FolderKanban} />
        <StatCard label="กิจกรรมวันนี้" value="24" note="ระบบทำงานปกติ" icon={Activity} />
      </section>
      <section className="content-grid">
        <article className="glass activity-panel">
          <div className="section-head"><div><span className="eyebrow">RECENT ACTIVITY</span><h3>กิจกรรมล่าสุด</h3></div><button className="ghost-button">ดูทั้งหมด</button></div>
          {[
            ["QT-202607-001", "สร้างใบเสนอราคา บริษัท ABC จำกัด", "เมื่อ 12 นาทีที่แล้ว"],
            ["INV-202607-003", "ออกใบแจ้งหนี้ โครงการรั้วโรงงาน", "เมื่อ 1 ชั่วโมงที่แล้ว"],
            ["CRM", "เพิ่มลูกค้า บริษัท ไทยดีเวลลอปเมนต์", "วันนี้ 14:20"],
          ].map(([code, text, time]) => (
            <div className="activity-row" key={code + time}>
              <span className="activity-code">{code}</span>
              <div><strong>{text}</strong><small>{time}</small></div><span className="status-dot" />
            </div>
          ))}
        </article>
        <article className="glass quick-panel">
          <span className="eyebrow">QUICK ACTIONS</span><h3>สร้างรายการใหม่</h3>
          <button>+ ใบเสนอราคา</button><button>+ ลูกค้า</button><button>+ โครงการ</button><button>+ ใบสั่งซื้อ</button>
        </article>
      </section>
    </>
  );
}

function PlaceholderPage({ title }) {
  return <section className="glass placeholder"><h2>{title}</h2><p>โมดูลนี้เตรียมโครงสร้างไว้แล้ว และจะพัฒนาต่อในเฟสถัดไป</p></section>;
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [messages, setMessages] = useState(["CORE AI พร้อมทำงาน ลองสั่งว่า “เปิดใบเสนอราคา”"]);

  const navigate = (key) => { setPage(key); setSidebarOpen(false); };
  const runCommand = () => {
    const text = command.trim(); if (!text) return;
    const matched = menuItems.find(([, label]) => text.toLowerCase().includes(label.toLowerCase().split(" ")[0]));
    if (matched) { navigate(matched[0]); setMessages((old) => [...old, text, `เปิดหน้า ${matched[1]} ให้แล้วครับ`]); }
    else setMessages((old) => [...old, text, "รับคำสั่งแล้ว ระบบ AI จะพัฒนาเพิ่มในเฟสถัดไป"]);
    setCommand("");
  };

  return (
    <div className="app-shell">
      {(sidebarOpen || aiOpen) && <button className="overlay" aria-label="ปิดเมนู" onClick={() => { setSidebarOpen(false); setAiOpen(false); }} />}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand"><div className="brand-mark">WPT</div><div><strong>WPT Core</strong><small>AI Business OS</small></div></div>
        <div className="system-status"><span /> CORE SYSTEM ONLINE</div>
        <nav>{menuItems.map(([key, label, Icon], index) => <div key={key}>{index === 5 && <div className="nav-divider" />}<button className={page === key ? "active" : ""} onClick={() => navigate(key)}><Icon size={18} /><span>{label}</span></button></div>)}</nav>
      </aside>
      <main className="main">
        <header className="topbar glass">
          <div className="topbar-title"><button className="icon-button mobile-only" onClick={() => setSidebarOpen(true)}><Menu /></button><div><h1>{pageTitles[page]}</h1><small>WPT Core Version 1.0 Foundation</small></div></div>
          <div className="topbar-actions"><label className="search"><Search size={16} /><input placeholder="ค้นหา..." /></label><button className="icon-button"><Bell size={19} /></button><button className="ai-button" onClick={() => setAiOpen(true)}><Bot size={18} /> CORE AI</button></div>
        </header>
        <div className="page-content">{page === "dashboard" ? <Dashboard /> : <PlaceholderPage title={pageTitles[page]} />}</div>
      </main>
      <aside className={`ai-panel ${aiOpen ? "open" : ""}`}>
        <div className="ai-header"><div><span className="eyebrow">CORE AI</span><h3>Command Center</h3></div><button className="icon-button" onClick={() => setAiOpen(false)}><X size={18} /></button></div>
        <div className="ai-visual"><div className="ai-ring"><Bot /></div><small>LISTENING MODE READY</small></div>
        <div className="messages">{messages.map((message, index) => <div className={`message ${index % 3 === 1 ? "user" : ""}`} key={`${message}-${index}`}>{message}</div>)}</div>
        <div className="command-box"><input value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runCommand()} placeholder="พิมพ์คำสั่ง..." /><button onClick={runCommand}><Send size={17} /></button></div>
      </aside>
      <button className="floating-ai" onClick={() => setAiOpen(true)}><Bot /></button>
    </div>
  );
}
