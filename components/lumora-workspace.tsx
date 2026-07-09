"use client";

import type { ElementType, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Broadcast,
  ChartLineUp,
  ChatCircleText,
  CheckCircle,
  EnvelopeSimple,
  Kanban,
  Moon,
  PaperPlaneTilt,
  ShieldWarning,
  SidebarSimple,
  Sparkle,
  Sun,
  UsersThree,
  VideoCamera,
  X,
} from "@phosphor-icons/react";
import { BarChart, LineChart, Waveform } from "@/components/charts";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Modal,
  Skeleton,
  cn,
  type BadgeTone,
} from "@/components/ui";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type ViewKey  = "inbox" | "chat" | "meeting" | "dashboard";
type RoleKey  = "CFO" | "CMO" | "CHRO";

/* ─── Static data ───────────────────────────────────────────────────────── */
const navItems: Array<{
  key: ViewKey;
  label: string;
  detail: string;
  icon: ElementType;
  badge?: string;
}> = [
  { key: "inbox",     label: "Hộp thư",    detail: "Yêu cầu từ agent",     icon: EnvelopeSimple, badge: "2" },
  { key: "chat",      label: "Kênh chat",   detail: "Luồng agent nội bộ",   icon: ChatCircleText },
  { key: "meeting",   label: "Phòng họp",   detail: "Phòng khủng hoảng",    icon: VideoCamera },
  { key: "dashboard", label: "Dashboard",   detail: "Chỉ số vận hành",      icon: ChartLineUp },
];

const roles: Array<{ key: RoleKey; label: string; scope: string }> = [
  { key: "CFO",  label: "CFO",  scope: "Dòng tiền · runway · rủi ro NCC" },
  { key: "CMO",  label: "CMO",  scope: "Nhu cầu · thương hiệu · launch" },
  { key: "CHRO", label: "CHRO", scope: "Nhân sự · tuyển dụng · morale" },
];

const inbox = [
  {
    from: "Mara Voss",
    role: "CEO Agent",
    subject: "Board cần báo cáo dòng tiền trước 15:00",
    preview: "Chạy hai kịch bản: trễ hàng NCC và giảm nhu cầu. Tôi cần con đường quyết định, không phải một đoạn văn.",
    time: "12:42",
    priority: "Khẩn cấp",
    tone: "red" as const,
    unread: true,
  },
  {
    from: "Nolan Dinh",
    role: "Khách hàng doanh nghiệp",
    subject: "Hợp đồng gia hạn đang có rủi ro",
    preview: "Trưởng phòng mua hàng hỏi tại sao tỷ lệ giao hàng chính xác giảm dưới ngưỡng dịch vụ.",
    time: "12:18",
    priority: "Cần xử lý",
    tone: "yellow" as const,
    unread: true,
  },
  {
    from: "Priya Batra",
    role: "Quản lý vận hành",
    subject: "Nhân sự kho cần phê duyệt ca thêm giờ",
    preview: "Tổng thêm giờ đang vượt kế hoạch và chênh lệch kiểm kê chưa được giải quyết.",
    time: "11:55",
    priority: "Xem xét",
    tone: "blue" as const,
    unread: false,
  },
  {
    from: "Elliot Park",
    role: "HR Agent",
    subject: "Hai chuyên viên cấp cao có nguy cơ burnout",
    preview: "Dữ liệu pulse cho thấy nhóm launch hoạt động quá tải trong sprint thứ ba liên tiếp.",
    time: "10:31",
    priority: "Theo dõi",
    tone: "green" as const,
    unread: false,
  },
];

const chatMessages = [
  {
    name: "Mara Voss",
    role: "CEO Agent",
    tone: "red" as const,
    text: "Tôi đang chuyển checkpoint board lên sớm hơn. Cho tôi thấy tradeoff giữa bảo toàn biên lợi nhuận và bảo vệ hợp đồng gia hạn.",
    time: "12:43",
  },
  {
    name: "Nolan Dinh",
    role: "Khách hàng Agent",
    tone: "yellow" as const,
    text: "Bên mua hàng yêu cầu kế hoạch phục hồi bằng văn bản. Nếu gửi ngôn ngữ mơ hồ, họ sẽ mở lại đánh giá nhà cung cấp.",
    time: "12:45",
  },
  {
    name: "Priya Batra",
    role: "Ops Agent",
    tone: "blue" as const,
    text: "Kiểm kê đang ổn định, nhưng chi phí nhân sự đang tăng. Tôi có thể giữ SLA nếu Finance phê duyệt ca cuối tuần.",
    time: "12:47",
  },
];

const transcript = [
  {
    speaker: "Mara Voss",
    role: "CEO Agent",
    text: "Bắt đầu với quyết định. Chúng ta đang bảo vệ hợp đồng gia hạn hay biên lợi nhuận quý này?",
    time: "00:42",
    tone: "red" as const,
  },
  {
    speaker: "Người học",
    role: "CFO Seat",
    text: "Bảo vệ gia hạn giữ chất lượng doanh thu. Mức giảm biên được kiểm soát nếu thêm giờ giới hạn ở 11%.",
    time: "01:18",
    tone: "neutral" as const,
  },
  {
    speaker: "Nolan Dinh",
    role: "Khách hàng Agent",
    text: "Khách hàng sẽ chấp nhận kế hoạch phục hồi nếu mốc đầu tiên hoàn thành trong 48 giờ.",
    time: "02:06",
    tone: "yellow" as const,
  },
];

const kpis = [
  { label: "Doanh thu",           value: "$482.6K", delta: "+8.4%", tone: "green"  as const },
  { label: "Dòng tiền",           value: "$91.3K",  delta: "-3.1%", tone: "yellow" as const },
  { label: "Uy tín thương hiệu",  value: "74.8",    delta: "-6.7",  tone: "red"    as const },
  { label: "Chỉ số nhân sự",      value: "82.1",    delta: "+2.2",  tone: "blue"   as const },
];

const kpiGlow: Record<string, string> = {
  green:  "hover:shadow-glow-green",
  yellow: "hover:shadow-glow-yellow",
  red:    "hover:shadow-glow-red",
  blue:   "hover:shadow-glow-blue",
};

const baseRevenue   = [52, 58, 54, 67, 72, 70, 81, 78, 88, 92, 86, 97];
const inventoryBase = [42, 57, 36, 61, 48, 72, 66, 59, 83, 76];

/* ══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════════════════════════════════════════════ */

/* ─── Section header ─────────────────────────────────────────────────────── */
function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-ink-200/70 px-5 py-4 transition-colors duration-300 dark:border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold tracking-tight text-ink-900 dark:text-ink-50">
          {title}
        </h1>
        <p className="mt-0.5 max-w-xl text-sm leading-5 text-ink-700/65 dark:text-ink-300/60">
          {description}
        </p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/* ─── Sidebar ─────────────────────────────────────────────────────────────── */
function AppSidebar({
  activeView, setActiveView,
  activeRole, setActiveRole,
  darkMode,   setDarkMode,
  sidebarOpen, setSidebarOpen,
}: {
  activeView: ViewKey;    setActiveView:  (k: ViewKey) => void;
  activeRole: RoleKey;    setActiveRole:  (k: RoleKey) => void;
  darkMode:   boolean;    setDarkMode:    (v: boolean) => void;
  sidebarOpen: boolean;   setSidebarOpen: (v: boolean) => void;
}) {
  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          /* geometry */
          "fixed inset-y-0 left-0 z-20 w-[268px] p-2.5",
          /* light */
          "border-r border-ink-200/70 bg-ink-50/96",
          /* dark — warm dark sidebar */
          "dark:border-white/[0.06] dark:bg-[#141210]/95",
          /* blur */
          "backdrop-blur-xl",
          /* animation */
          "transition-transform duration-300 ease-mass",
          "lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Inner panel */}
        <div className={cn(
          "flex h-full flex-col rounded-2xl p-3",
          /* light */
          "border border-ink-200/60 bg-white shadow-panel",
          /* dark */
          "dark:border-white/[0.06] dark:bg-[#1a1815] dark:shadow-panel-dark",
          "transition-colors duration-300",
        )}>

          {/* ── Logo row ── */}
          <div className="flex items-center justify-between gap-2 px-1 py-1">
            <div className="flex items-center gap-2.5">
              {/* Animated logo mark */}
              <div className={cn(
                "grid size-8 place-items-center rounded-xl",
                "bg-ink-900 text-sm font-black text-white",
                "dark:bg-[#d4b87a] dark:text-ink-950",
                "shadow-sm transition-colors duration-300",
              )}>
                L
              </div>
              <div>
                <p className="text-sm font-bold tracking-tight text-ink-900 dark:text-ink-50 transition-colors duration-300">
                  Lumora
                </p>
                <p className="text-[10.5px] text-ink-700/50 dark:text-ink-300/45 transition-colors duration-300">
                  Workspace
                </p>
              </div>
            </div>
            <Button
              className="size-7 px-0 lg:hidden"
              variant="ghost"
              onClick={() => setSidebarOpen(false)}
              aria-label="Đóng sidebar"
              icon={<X size={13} weight="bold" />}
            />
          </div>

          {/* ── Nav items ── */}
          <nav className="mt-4 space-y-0.5" aria-label="Điều hướng chính">
            {navItems.map((item) => {
              const Icon   = item.icon;
              const active = activeView === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => { setActiveView(item.key); setSidebarOpen(false); }}
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left",
                    "transition-all duration-200 ease-mass active:scale-[0.98]",
                    active
                      /* active — light */
                      ? "bg-ink-900 text-white shadow-sm dark:bg-[#d4b87a] dark:text-ink-950"
                      /* idle */
                      : "text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/[0.06]",
                  )}
                >
                  {/* left accent line */}
                  {active && (
                    <span className="absolute left-0 top-1/2 h-[52%] w-[3px] -translate-y-1/2 rounded-r-full bg-white/40 dark:bg-ink-950/30" />
                  )}

                  <Icon size={17} weight={active ? "fill" : "regular"} className="shrink-0" />

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold">{item.label}</span>
                      {item.badge && !active ? (
                        <span className="shrink-0 rounded-full bg-[#fdecea] px-1.5 py-0.5 text-[9.5px] font-black text-[#8f2b28] ring-1 ring-[#f0ccc8] dark:bg-red-400/[0.14] dark:text-red-300 dark:ring-red-400/[0.18]">
                          {item.badge}
                        </span>
                      ) : null}
                    </span>
                    <span className={cn(
                      "mt-0.5 block truncate text-[10.5px]",
                      active ? "text-white/55 dark:text-ink-950/50" : "text-ink-700/48 dark:text-ink-300/40",
                    )}>
                      {item.detail}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* ── Role picker ── */}
          <div className="mt-5 border-t border-ink-200/60 pt-4 dark:border-white/[0.06] transition-colors duration-300">
            <p className="px-3 text-[9.5px] font-black uppercase tracking-[0.12em] text-ink-700/40 dark:text-ink-300/35">
              Vai trò của bạn
            </p>
            <div className="mt-2 space-y-0.5">
              {roles.map((role) => (
                <button
                  key={role.key}
                  onClick={() => setActiveRole(role.key)}
                  className={cn(
                    "w-full rounded-xl px-3 py-2 text-left",
                    "transition-all duration-200 ease-mass active:scale-[0.98]",
                    activeRole === role.key
                      ? "bg-brass-50 text-brass-600 ring-1 ring-brass-200/80 dark:bg-amber-400/[0.12] dark:text-amber-300 dark:ring-amber-400/[0.18]"
                      : "text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/[0.06]",
                  )}
                >
                  <span className="block text-sm font-semibold">{role.label}</span>
                  <span className="mt-0.5 block text-[10.5px] opacity-55">{role.scope}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Bottom ── */}
          <div className="mt-auto space-y-2 pt-4">
            {/* Live pressure indicator */}
            <div className={cn(
              "flex items-center justify-between gap-3 rounded-xl px-3 py-3",
              "border border-ink-200/60 dark:border-white/[0.06]",
              "bg-ink-50 dark:bg-white/[0.03]",
              "transition-colors duration-300",
            )}>
              <div>
                <p className="text-[13px] font-semibold text-ink-900 dark:text-ink-50">Áp lực mô phỏng</p>
                <p className="mt-0.5 text-[10.5px] text-ink-700/50 dark:text-ink-300/45">3 escalation đang hoạt động</p>
              </div>
              <Badge tone="red" pulse>Trực tiếp</Badge>
            </div>

            <Button
              variant="ghost"
              className="w-full justify-start gap-2.5 rounded-xl text-xs"
              onClick={() => setDarkMode(!darkMode)}
              icon={darkMode ? <Sun size={14} weight="bold" /> : <Moon size={14} weight="bold" />}
            >
              {darkMode ? "Chế độ sáng" : "Chế độ tối"}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ─── InboxView ─────────────────────────────────────────────────────────── */
function InboxView({ openModal }: { openModal: () => void }) {
  const [selected, setSelected]   = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const item = inbox[selected];

  function handleSelect(index: number) {
    setSelected(index);
    setDetailOpen(true);
  }

  return (
    <div className="animate-fade-up">
      <SectionHeader
        title="Hộp thư mô phỏng"
        description="Yêu cầu ưu tiên từ lãnh đạo, khách hàng và vận hành nội bộ. Hộp thư thưởng cho quyết định rõ ràng dưới áp lực thời gian."
        action={
          <Button onClick={openModal} icon={<PaperPlaneTilt size={14} weight="bold" />}>
            Soạn phản hồi
          </Button>
        }
      />

      <div className="grid min-h-[calc(100dvh-130px)] grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)]">
        {/* ── List panel ── */}
        <div className={cn(
          "border-b border-ink-200/70 dark:border-white/[0.06] lg:border-b-0 lg:border-r transition-colors duration-300",
          detailOpen ? "hidden lg:block" : "block",
        )}>
          {/* Filter bar */}
          <div className="flex items-center justify-between gap-3 border-b border-ink-200/70 px-4 py-3 dark:border-white/[0.06] transition-colors duration-300">
            <div className="flex gap-2">
              <Badge tone="red">2 chưa đọc</Badge>
              <Badge tone="yellow">Rủi ro SLA</Badge>
            </div>
            <Button variant="ghost" className="size-8 px-0" icon={<Kanban size={14} />} aria-label="Xem hàng đợi" />
          </div>

          {/* Messages */}
          <div className="divide-y divide-ink-200/70 dark:divide-white/[0.06] transition-colors duration-300">
            {inbox.map((msg, index) => (
              <button
                key={msg.subject}
                onClick={() => handleSelect(index)}
                className={cn(
                  "w-full p-4 text-left transition-all duration-200 ease-smooth",
                  "hover:bg-ink-100/60 dark:hover:bg-white/[0.04]",
                  selected === index && "bg-ink-100/80 dark:bg-white/[0.05]",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <Avatar name={msg.from} role={msg.role} tone={msg.tone} />
                  <span className="shrink-0 font-mono text-[11px] text-ink-700/45 dark:text-ink-300/40">
                    {msg.time}
                  </span>
                </div>
                <div className="mt-3 flex items-start gap-2.5">
                  <span className={cn(
                    "mt-1.5 size-2 shrink-0 rounded-full transition-colors duration-300",
                    msg.unread ? "bg-brass-500 dark:bg-[#d4b87a]" : "bg-transparent",
                  )} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <p className="truncate text-sm font-semibold text-ink-900 dark:text-ink-50">{msg.subject}</p>
                      <Badge tone={msg.tone}>{msg.priority}</Badge>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-ink-700/62 dark:text-ink-300/55">
                      {msg.preview}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Detail panel ── */}
        <article className={cn("p-4 sm:p-5", !detailOpen ? "hidden lg:block" : "block")}>
          {/* Mobile back */}
          <div className="mb-4 lg:hidden">
            <Button variant="ghost" className="h-8 px-2 text-xs" onClick={() => setDetailOpen(false)}
              icon={<SidebarSimple size={13} weight="bold" />}>
              Quay lại hộp thư
            </Button>
          </div>

          <Card className="overflow-hidden">
            {/* Mail header */}
            <div className="border-b border-ink-200/70 p-5 dark:border-white/[0.06] transition-colors duration-300">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <Avatar name={item.from} role={item.role} tone={item.tone} />
                <div className="flex flex-wrap gap-2">
                  <Badge tone={item.tone} pulse>AI đang xử lý</Badge>
                  <Badge tone="neutral">Hạn 15:00</Badge>
                </div>
              </div>
              <h2 className="mt-5 text-xl font-bold tracking-tight text-ink-900 dark:text-ink-50 sm:text-2xl">
                {item.subject}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-700/68 dark:text-ink-300/58">
                {item.preview} Xây dựng phản hồi dưới dạng memo quyết định với giả định, tác động vận hành và người chịu trách nhiệm tiếp theo.
              </p>
            </div>

            {/* Context cards */}
            <div className="grid gap-3 p-5 sm:grid-cols-3">
              {[
                { label: "Quyết định cần đưa ra", body: "Chọn bảo vệ gia hạn hay bảo toàn biên lợi nhuận trước checkpoint board." },
                { label: "Tín hiệu rủi ro",       body: "Niềm tin khách hàng giảm nếu kế hoạch phục hồi không có ngày và người chịu trách nhiệm." },
                { label: "Đầu ra mong đợi",        body: "Memo ngắn gọn, bảng kịch bản và một hành động được khuyến nghị." },
              ].map((card, i) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-ink-200/70 p-4 dark:border-white/[0.06] transition-colors duration-300"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] text-ink-700/42 dark:text-ink-300/38">
                    {card.label}
                  </p>
                  <p className="mt-2.5 text-sm leading-6 text-ink-800 dark:text-ink-100">{card.body}</p>
                </div>
              ))}
            </div>

            {/* Response workspace */}
            <div className="border-t border-ink-200/70 p-5 dark:border-white/[0.06] transition-colors duration-300">
              <div className="rounded-2xl bg-ink-50 p-4 dark:bg-white/[0.03] transition-colors duration-300">
                <p className="text-sm font-semibold text-ink-900 dark:text-ink-50">Không gian soạn thảo</p>
                <Skeleton className="mt-4 h-3 w-11/12" />
                <Skeleton className="mt-2 h-3 w-9/12" />
                <Skeleton className="mt-2 h-3 w-10/12" />
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="secondary" className="h-8 text-xs">Đính kèm KPI snapshot</Button>
                  <Button variant="ghost" className="h-8 text-xs">Yêu cầu làm rõ</Button>
                </div>
              </div>
            </div>
          </Card>
        </article>
      </div>
    </div>
  );
}

/* ─── ChatView ──────────────────────────────────────────────────────────── */
function ChatView() {
  const [activeChannel, setActiveChannel] = useState(0);
  const [message, setMessage] = useState("");
  const channels = [
    { name: "war-room",      badge: true },
    { name: "finance-desk",  badge: true },
    { name: "customer-risk", badge: false },
    { name: "people-ops",    badge: false },
  ];

  return (
    <div className="animate-fade-up">
      <SectionHeader
        title="Kênh Chat Nội Bộ"
        description="Phòng chat nơi các AI stakeholder thách thức giả định và thúc đẩy người vận hành đưa ra cam kết rõ ràng."
        action={<Badge tone="green" pulse>3 agent đang trực tuyến</Badge>}
      />

      <div className="grid min-h-[calc(100dvh-130px)] grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Channel list */}
        <div className="border-b border-ink-200/70 p-3 dark:border-white/[0.06] lg:border-b-0 lg:border-r transition-colors duration-300">
          <p className="mb-2 px-2 text-[9.5px] font-black uppercase tracking-[0.12em] text-ink-700/38 dark:text-ink-300/32">Kênh</p>
          <div className="space-y-0.5">
            {channels.map((ch, i) => (
              <button
                key={ch.name}
                onClick={() => setActiveChannel(i)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm",
                  "transition-all duration-200 ease-smooth",
                  activeChannel === i
                    ? "bg-ink-900 font-semibold text-white dark:bg-[#d4b87a] dark:text-ink-950"
                    : "text-ink-700 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/[0.06]",
                )}
              >
                <span className="truncate"># {ch.name}</span>
                {ch.badge ? <span className="size-1.5 shrink-0 rounded-full bg-brass-500 dark:bg-amber-400" /> : null}
              </button>
            ))}
          </div>

          <div className={cn(
            "mt-4 flex items-center gap-2.5 rounded-xl p-3",
            "border border-ink-200/60 dark:border-white/[0.06]",
            "bg-ink-50 dark:bg-white/[0.03]",
            "transition-colors duration-300",
          )}>
            <Broadcast size={15} className="shrink-0 text-ink-700/55 dark:text-ink-300/45" />
            <div>
              <p className="text-[13px] font-semibold text-ink-900 dark:text-ink-50">Áp lực agent</p>
              <p className="mt-0.5 text-[10.5px] text-ink-700/50 dark:text-ink-300/42">Mức leo thang: cao</p>
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between border-b border-ink-200/70 px-5 py-3.5 dark:border-white/[0.06] transition-colors duration-300">
            <div>
              <p className="text-sm font-bold text-ink-900 dark:text-ink-50"># {channels[activeChannel].name}</p>
              <p className="mt-0.5 text-[11px] text-ink-700/52 dark:text-ink-300/45">Rủi ro gia hạn · kế hoạch tiền mặt · phê duyệt nhân sự</p>
            </div>
            <Button variant="secondary" className="h-8 gap-1.5 text-xs" icon={<UsersThree size={13} />}>
              Mời vai trò
            </Button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            {chatMessages.map((msg, i) => (
              <div
                key={`${msg.name}-${msg.time}`}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="flex items-center gap-3">
                  <Avatar name={msg.name} role={msg.role} tone={msg.tone} />
                  <span className="ml-auto font-mono text-[11px] text-ink-700/42 dark:text-ink-300/35">{msg.time}</span>
                </div>
                <div className="ml-12 mt-2 rounded-2xl border border-ink-200/70 bg-white p-4 text-sm leading-7 text-ink-800 dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-ink-100 transition-colors duration-300">
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            <div className="ml-12 flex items-center gap-2">
              <Badge tone="blue" pulse>Priya đang nhập</Badge>
              <span className="text-[12px] text-ink-700/52 dark:text-ink-300/45">đang cập nhật ràng buộc thêm giờ…</span>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-ink-200/70 p-4 dark:border-white/[0.06] transition-colors duration-300">
            <div className="rounded-2xl border border-ink-200/70 bg-white px-3.5 py-3 dark:border-white/[0.07] dark:bg-white/[0.04] transition-colors duration-300">
              <textarea
                className="h-[72px] w-full resize-none bg-transparent text-sm leading-6 text-ink-900 outline-none placeholder:text-ink-700/38 dark:text-ink-50 dark:placeholder:text-ink-300/30"
                placeholder="Gửi phản hồi vận hành chính xác…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex gap-1.5">
                  <Badge tone="neutral">Memo quyết định</Badge>
                  <Badge tone="yellow">Board nhìn thấy</Badge>
                </div>
                <Button className="h-8 text-xs" icon={<PaperPlaneTilt size={13} weight="bold" />}>
                  Gửi cập nhật
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MeetingView ───────────────────────────────────────────────────────── */
function MeetingView() {
  return (
    <div className="animate-fade-up">
      <SectionHeader
        title="Phòng Họp Khủng Hoảng"
        description="Voice-to-text cho các sự kiện mô phỏng khẩn cấp. AI agent ngắt lời, thách thức và giao việc theo dõi."
        action={<Badge tone="red" pulse>Đang ghi âm</Badge>}
      />

      <div className="grid gap-4 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Transcript */}
        <Card className="overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-ink-200/70 p-5 dark:border-white/[0.06] sm:flex-row sm:items-center sm:justify-between transition-colors duration-300">
            <div>
              <p className="text-sm font-bold text-ink-900 dark:text-ink-50">Họp khẩn — Rà soát biên lợi nhuận</p>
              <p className="mt-0.5 text-[11px] text-ink-700/50 dark:text-ink-300/42">Bắt đầu 12:50 · quyết định cần trong 10 phút</p>
            </div>
            <Waveform />
          </div>
          <div className="divide-y divide-ink-200/70 dark:divide-white/[0.06] transition-colors duration-300">
            {transcript.map((line, i) => (
              <div
                key={`${line.speaker}-${line.time}`}
                className="grid gap-3 p-5 sm:grid-cols-[200px_minmax(0,1fr)_52px]"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <Avatar name={line.speaker} role={line.role} tone={line.tone} />
                <p className="text-sm leading-7 text-ink-800 dark:text-ink-100">{line.text}</p>
                <span className="font-mono text-[11px] text-ink-700/42 dark:text-ink-300/35 sm:text-right">{line.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Side panels */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <ShieldWarning size={19} weight="fill" className="shrink-0 text-[#8f2b28]" />
              <div>
                <p className="text-sm font-bold text-ink-900 dark:text-ink-50">Rủi ro cuộc họp</p>
                <p className="mt-0.5 text-[11px] text-ink-700/50 dark:text-ink-300/42">Mục tiêu mâu thuẫn được phát hiện</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { item: "Giữ chân khách hàng", tone: "red"    as BadgeTone, state: "Cao" },
                { item: "Biên vận hành",        tone: "yellow" as BadgeTone, state: "Căng thẳng" },
                { item: "Năng lực nhân sự",     tone: "blue"   as BadgeTone, state: "Hạn chế" },
              ].map(({ item, tone, state }) => (
                <div key={item} className="flex items-center justify-between gap-3">
                  <span className="text-sm text-ink-800 dark:text-ink-100">{item}</span>
                  <Badge tone={tone}>{state}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-bold text-ink-900 dark:text-ink-50">Hành động được giao</p>
            <div className="mt-4 space-y-2.5">
              {[
                "Gửi kế hoạch phục hồi cho khách hàng",
                "Phê duyệt giới hạn thêm giờ cuối tuần",
                "Cập nhật tóm tắt kịch bản cho board",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-ink-200/70 p-3.5 dark:border-white/[0.06] transition-colors duration-300">
                  <CheckCircle size={17} className="mt-0.5 shrink-0 text-[#2d5a30]" weight="fill" />
                  <span className="text-sm leading-6 text-ink-800 dark:text-ink-100">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ─── DashboardView ─────────────────────────────────────────────────────── */
function DashboardView({ tick }: { tick: number }) {
  const revenue = useMemo(() => baseRevenue.map((v, i) => v + ((tick + i) % 5) - 2), [tick]);
  const stock   = useMemo(() => inventoryBase.map((v, i) => v + ((tick * 2 + i) % 7) - 3), [tick]);

  return (
    <div className="animate-fade-up">
      <SectionHeader
        title="Dashboard Vận Hành"
        description="Bề mặt chỉ huy cho doanh thu, tiền mặt, uy tín, nhân sự và hàng tồn kho."
        action={<Badge tone="green" pulse>Dữ liệu mô phỏng</Badge>}
      />

      {/* KPI grid — 2 cols on mobile, 4 on md+ */}
      <div className="grid grid-cols-2 gap-3 p-4 sm:p-5 md:grid-cols-4">
        {kpis.map((kpi, i) => (
          <Card
            key={kpi.label}
            className={cn("card-hover cursor-default p-4", kpiGlow[kpi.tone])}
            style={{ animationDelay: `${i * 55}ms` }}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[12px] font-medium text-ink-700/60 dark:text-ink-300/50">{kpi.label}</p>
              <Badge tone={kpi.tone}>{kpi.delta}</Badge>
            </div>
            <p className="mt-4 font-mono text-2xl font-bold tracking-tight text-ink-900 dark:text-ink-50 sm:text-3xl">
              {kpi.value}
            </p>
            <div className="mt-4 h-1 rounded-full bg-ink-100 dark:bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-ink-800 transition-all duration-700 ease-mass dark:bg-[#d4b87a]"
                style={{ width: `${60 + i * 8 + (tick % 6)}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-3 px-4 pb-4 sm:px-5 sm:pb-5 xl:grid-cols-12">
        <Card className="p-5 xl:col-span-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-ink-900 dark:text-ink-50">Doanh thu và áp lực tiền mặt</p>
              <p className="mt-0.5 text-[11px] text-ink-700/50 dark:text-ink-300/42">Cập nhật mỗi 3 giây từ luồng mô phỏng</p>
            </div>
            <Badge tone="yellow">Phương sai dự báo 4.8%</Badge>
          </div>
          <div className="mt-5 text-ink-900 dark:text-ink-50">
            <LineChart values={revenue} />
          </div>
        </Card>

        <Card className="p-5 xl:col-span-4">
          <p className="text-sm font-bold text-ink-900 dark:text-ink-50">Uy tín thương hiệu</p>
          <p className="mt-2 text-[13px] leading-6 text-ink-700/62 dark:text-ink-300/52">
            Chất lượng kế hoạch phục hồi là đòn bẩy nhanh nhất. Tình cảm công chúng đang đi sau sự thật vận hành một chu kỳ.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {[
              { val: "-6.7", sub: "Biến động tin cậy" },
              { val: "48h",  sub: "Cửa sổ phục hồi" },
            ].map(({ val, sub }) => (
              <div key={sub} className="rounded-2xl border border-ink-200/70 p-3 dark:border-white/[0.06] transition-colors duration-300">
                <p className="font-mono text-2xl font-bold text-ink-900 dark:text-ink-50">{val}</p>
                <p className="mt-1 text-[11px] text-ink-700/50 dark:text-ink-300/42">{sub}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 xl:col-span-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-ink-900 dark:text-ink-50">Ổn định hàng tồn kho</p>
            <Badge tone="blue">Kho A</Badge>
          </div>
          <BarChart values={stock} className="mt-5" />
        </Card>

        <Card className="p-5 xl:col-span-6">
          <p className="text-sm font-bold text-ink-900 dark:text-ink-50">Chỉ số nhân sự &amp; biên chế</p>
          <div className="mt-5 divide-y divide-ink-200/70 dark:divide-white/[0.06] transition-colors duration-300">
            {[
              { label: "Nguy cơ burnout",   value: "2 nhóm đang tăng", tone: "red"    as BadgeTone, state: "Cao" },
              { label: "Giới hạn thêm giờ", value: "11% đề xuất",      tone: "yellow" as BadgeTone, state: "Kiểm soát" },
              { label: "Tốc độ tuyển dụng", value: "ổn định Q3",        tone: "green"  as BadgeTone, state: "Ổn định" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <span className="text-sm text-ink-800 dark:text-ink-100">{row.label}</span>
                <div className="flex items-center gap-2.5">
                  <span className="hidden font-mono text-[11px] text-ink-700/50 dark:text-ink-300/42 sm:block">{row.value}</span>
                  <Badge tone={row.tone}>{row.state}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN WORKSPACE
   ══════════════════════════════════════════════════════════════════════════ */
export function LumoraWorkspace() {
  const [activeView,  setActiveView]  = useState<ViewKey>("inbox");
  const [activeRole,  setActiveRole]  = useState<RoleKey>("CFO");
  const [darkMode,    setDarkMode]    = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [decisionText, setDecisionText] = useState("");
  const [tick,        setTick]        = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((v) => v + 1), 3000);
    return () => window.clearInterval(id);
  }, []);

  const role = roles.find((r) => r.key === activeRole) ?? roles[0];

  return (
    <main
      className={cn(
        "min-h-[100dvh] overflow-x-hidden text-ink-900",
        "transition-colors duration-300 ease-smooth",
        darkMode ? "dark bg-[#141210]" : "bg-ink-50",
      )}
    >
      {/* Decorative layers */}
      <div className="noise-layer" />
      <div className="surface-grid fixed inset-0 opacity-50" />

      <div className="relative z-10 flex min-h-[100dvh]">
        <AppSidebar
          activeView={activeView}   setActiveView={setActiveView}
          activeRole={activeRole}   setActiveRole={setActiveRole}
          darkMode={darkMode}       setDarkMode={setDarkMode}
          sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
        />

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className={cn(
            "sticky top-0 z-10 px-4 py-3",
            "border-b border-ink-200/70 dark:border-white/[0.06]",
            /* frosted glass */
            "bg-ink-50/90 backdrop-blur-xl dark:bg-[#141210]/90",
            "transition-colors duration-300",
          )}>
            <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Hamburger */}
                <Button
                  variant="secondary"
                  className="size-8 px-0 lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Mở sidebar"
                  icon={<SidebarSimple size={14} weight="bold" />}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink-900 dark:text-ink-50">
                    {role.label} — Ghế mô phỏng
                  </p>
                  <p className="hidden truncate text-[11px] text-ink-700/50 dark:text-ink-300/42 sm:block">
                    {role.scope}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge tone="green" pulse className="hidden sm:inline-flex">Mô phỏng đang chạy</Badge>
                {/* Bell with unread dot */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    className="size-8 px-0"
                    aria-label="Thông báo"
                    icon={<Bell size={16} />}
                  />
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#8f2b28] ring-1 ring-ink-50 dark:ring-[#141210]" />
                </div>
              </div>
            </div>
          </header>

          {/* View content */}
          <div className="mx-auto w-full max-w-[1440px]">
            {activeView === "inbox"     && <InboxView openModal={() => setModalOpen(true)} />}
            {activeView === "chat"      && <ChatView />}
            {activeView === "meeting"   && <MeetingView />}
            {activeView === "dashboard" && <DashboardView tick={tick} />}
          </div>
        </div>
      </div>

      {/* ── Decision modal ── */}
      <Modal
        open={modalOpen}
        title="Soạn phản hồi lãnh đạo"
        description="Một hành động · một tradeoff · một người chịu trách nhiệm."
        onClose={() => setModalOpen(false)}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-ink-900 dark:text-ink-50">
              Tóm tắt quyết định
            </label>
            <textarea
              className={cn(
                "mt-2 h-32 w-full resize-none rounded-2xl border bg-white px-3.5 py-3",
                "text-sm leading-7 text-ink-900 outline-none",
                "placeholder:text-ink-700/36",
                "border-ink-200/80 transition-all duration-200 ease-smooth",
                "focus:border-brass-500 focus:ring-2 focus:ring-brass-500/20",
                "dark:border-white/[0.07] dark:bg-white/[0.05] dark:text-ink-50 dark:placeholder:text-ink-300/28",
                "dark:focus:border-[#d4b87a] dark:focus:ring-[#d4b87a]/15",
              )}
              placeholder="Đề xuất một hành động, một tradeoff và một người chịu trách nhiệm rõ ràng…"
              value={decisionText}
              onChange={(e) => setDecisionText(e.target.value)}
            />
          </div>

          {decisionText.length > 0 && (
            <div className="animate-fade-in rounded-2xl border border-ink-200/70 bg-ink-50 px-4 py-3.5 dark:border-white/[0.06] dark:bg-white/[0.04]">
              <p className="text-[10px] font-black uppercase tracking-[0.1em] text-ink-700/40 dark:text-ink-300/35">
                Xem trước phân tích AI
              </p>
              <p className="mt-2 text-sm leading-6 text-ink-700/68 dark:text-ink-300/55">
                Đang phân tích tradeoff… Nhấn "Yêu cầu AI phê bình" để xem phản hồi chi tiết.
              </p>
            </div>
          )}

          <div className="grid gap-2.5 sm:grid-cols-2">
            <Button variant="secondary" icon={<Sparkle size={13} weight="bold" />} className="h-10">
              Yêu cầu AI phê bình
            </Button>
            <Button icon={<PaperPlaneTilt size={13} weight="bold" />} className="h-10" onClick={() => setModalOpen(false)}>
              Gửi lên CEO
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
