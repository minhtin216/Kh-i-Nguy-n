"use client";

import { useRouter } from "next/navigation";
import {
  ChartLineUp,
  ChatCircleText,
  EnvelopeSimple,
  GraduationCap,
  PaperPlaneTilt,
  UsersThree,
  VideoCamera,
} from "@phosphor-icons/react";
import { Avatar, Badge, Button, Card, Skeleton, cn } from "@/components/ui";

/* ─── Data ─────────────────────────────────────────────────────────────── */
const features = [
  {
    title: "Inbox Simulator",
    description:
      "Sinh viên nhận yêu cầu từ CEO, khách hàng và quản lý như trong một ngày làm việc thật.",
    icon: EnvelopeSimple,
    tone: "red" as const,
  },
  {
    title: "Kênh Chat AI",
    description:
      "Các Agent thảo luận, chất vấn và thúc đẩy người học ra quyết định rõ ràng.",
    icon: ChatCircleText,
    tone: "blue" as const,
  },
  {
    title: "Phòng Họp Ảo",
    description:
      "Cuộc họp khẩn cấp hiển thị voice-to-text, transcript và action items theo thời gian thực.",
    icon: VideoCamera,
    tone: "yellow" as const,
  },
  {
    title: "Dashboard Chỉ Số",
    description:
      "Theo dõi doanh thu, dòng tiền, uy tín thương hiệu, nhân sự và hàng tồn kho.",
    icon: ChartLineUp,
    tone: "green" as const,
  },
];

const roles = [
  {
    title: "CFO",
    description:
      "Quản trị dòng tiền, runway, biên lợi nhuận và rủi ro nhà cung cấp.",
    tone: "yellow" as const,
  },
  {
    title: "CMO",
    description:
      "Đọc tín hiệu nhu cầu, thương hiệu, kênh tăng trưởng và phản ứng khách hàng.",
    tone: "blue" as const,
  },
  {
    title: "CHRO",
    description:
      "Theo dõi năng lực đội ngũ, burnout risk, tuyển dụng và phân bổ nhân sự.",
    tone: "green" as const,
  },
];

/* ─── Product Preview (demo card inside hero) ─────────────────────────── */
function ProductPreview() {
  return (
    <Card className="overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-ink-200/70 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#fdebec] ring-1 ring-[#efcfd0]" />
          <span className="size-3 rounded-full bg-[#fbf3db] ring-1 ring-[#eadcae]" />
          <span className="size-3 rounded-full bg-[#edf3ec] ring-1 ring-[#d7e5d5]" />
        </div>
        <Badge tone="yellow" pulse>
          Mô phỏng trực tiếp
        </Badge>
      </div>

      {/* Body */}
      <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Left: message list */}
        <div className="border-b border-ink-200/70 lg:border-b-0 lg:border-r">
          {[
            {
              name: "Mara Voss",
              role: "CEO Agent",
              subject: "Board cần báo cáo dòng tiền trước 15:00",
              tone: "red" as const,
              badge: "Khẩn cấp",
            },
            {
              name: "Nolan Dinh",
              role: "Khách hàng",
              subject: "Hợp đồng gia hạn đang có rủi ro",
              tone: "yellow" as const,
              badge: "Cần xử lý",
            },
            {
              name: "Priya Batra",
              role: "Ops Agent",
              subject: "Nhân sự kho cần phê duyệt ca thêm giờ",
              tone: "blue" as const,
              badge: "Xem xét",
            },
          ].map((item, index) => (
            <div
              key={item.subject}
              className={cn(
                "border-b border-ink-200/70 p-4 last:border-b-0",
                index === 0 && "bg-ink-100/60",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <Avatar name={item.name} role={item.role} tone={item.tone} />
                <Badge tone={item.tone}>{item.badge}</Badge>
              </div>
              <p className="mt-3 text-sm font-semibold leading-snug text-ink-900">
                {item.subject}
              </p>
            </div>
          ))}
        </div>

        {/* Right: decision workspace */}
        <div className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink-900">
                Không gian quyết định
              </p>
              <p className="mt-1 text-xs leading-5 text-ink-700/60">
                Sinh viên phải chọn hướng xử lý, không chỉ trả lời lý thuyết.
              </p>
            </div>
            <Badge tone="red" pulse className="shrink-0">
              AI đang xử lý
            </Badge>
          </div>

          <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
            {["Quyết định", "Rủi ro", "Người chịu trách nhiệm"].map(
              (item, index) => (
                <div
                  key={item}
                  className="rounded-lg border border-ink-200/70 p-3"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-700/50">
                    {item}
                  </p>
                  <Skeleton className="mt-3 h-2.5 w-full" />
                  <Skeleton className="mt-2 h-2.5 w-8/12" />
                </div>
              ),
            )}
          </div>

          <div className="mt-4 rounded-lg bg-ink-50 p-4">
            <Skeleton className="h-3 w-11/12" />
            <Skeleton className="mt-2 h-3 w-9/12" />
            <Skeleton className="mt-2 h-3 w-10/12" />
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" className="h-8 text-xs">
                Đính kèm KPI
              </Button>
              <Button
                className="h-8 text-xs"
                icon={<PaperPlaneTilt size={13} weight="bold" />}
              >
                Gửi phản hồi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ─── Main Landing ─────────────────────────────────────────────────────── */
export function PublicLanding() {
  const router = useRouter();

  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-[#faf9f7] text-ink-900 transition-colors duration-300">
      {/* Decorative layers */}
      <div className="noise-layer" />
      <div className="surface-grid fixed inset-0 opacity-50" />

      <div className="relative z-10">
        {/* ── Nav ─────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-20 border-b border-ink-200/60 bg-[#faf9f7]/92 backdrop-blur-xl transition-colors duration-300">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
            {/* Logo */}
            <button
              className="flex items-center gap-2.5 rounded-lg text-left transition-transform duration-200 ease-mass active:scale-[0.97]"
              onClick={() => router.push("/")}
              aria-label="Lumora trang chủ"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-ink-900 text-sm font-bold text-white">
                L
              </span>
              <span className="hidden sm:block">
                <span className="block text-sm font-bold tracking-tight">
                  Lumora
                </span>
                <span className="block text-[11px] text-ink-700/55">
                  AI Business Simulation
                </span>
              </span>
            </button>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="h-8 px-3 text-xs"
                onClick={() => router.push("/login")}
              >
                Đăng nhập
              </Button>
              <Button
                className="h-8 px-3 text-xs"
                onClick={() => router.push("/signup")}
              >
                Bắt đầu miễn phí
              </Button>
            </div>
          </div>
        </header>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:px-8 lg:pb-28 lg:pt-24 xl:gap-16">
          {/* Copy */}
          <div className="flex flex-col justify-center">
            <Badge tone="yellow" className="w-max">
              Dành cho trường đại học &amp; L&amp;D doanh nghiệp
            </Badge>


            <h1 className="gradient-text mt-5 text-[2.35rem] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.2rem]">
              Mô phỏng doanh nghiệp bằng AI Agent cho lớp học hiện đại.
            </h1>


            <p className="mt-5 max-w-xl text-base leading-7 text-ink-700/72 sm:text-lg sm:leading-8">
              Lumora biến bài tập quản trị thành một workspace công sở thật —
              nơi sinh viên xử lý email, chat, họp khẩn và chỉ số vận hành
              dưới áp lực thời gian.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="h-11 px-5"
                onClick={() => router.push("/signup")}
                icon={<GraduationCap size={16} weight="bold" />}
              >
                Dùng thử miễn phí
              </Button>
              <Button
                className="h-11 px-5"
                variant="secondary"
                onClick={() => router.push("/inbox")}
              >
                Xem demo →
              </Button>
            </div>

            {/* Social proof row */}
            <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-ink-700/60">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#346538]" />
                Không cần cài đặt
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#956400]" />
                Tình huống sinh mới mỗi lần
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#1f6c9f]" />
                Nhiều vai trò đồng thời
              </span>
            </div>
          </div>

          {/* Preview card */}
          <div className="animate-fade-up">
            <div className="rounded-2xl border border-ink-200/60 bg-white/60 p-1.5 shadow-panel backdrop-blur-sm">
              <ProductPreview />
            </div>
          </div>
        </section>

        {/* ── Features ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Một workspace cho toàn bộ áp lực vận hành.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-700/70">
              Mỗi kênh mô phỏng một tình huống làm việc có thật, giúp nhà
              trường đánh giá tư duy quyết định thay vì chỉ kiểm tra ghi nhớ.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="p-5"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-ink-100 text-ink-800 ring-1 ring-ink-200/60">
                      <Icon size={20} weight="bold" />
                    </span>
                    <Badge tone={feature.tone}>Agent</Badge>
                  </div>
                  <h3 className="mt-5 text-[15px] font-bold tracking-tight text-ink-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-6 text-ink-700/68">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── Multiplayer section ──────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Dark card */}
            <div className="rounded-2xl bg-ink-900 p-7 text-white shadow-panel">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/10">
                  <UsersThree size={20} weight="bold" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Multiplayer role</p>
                  <p className="mt-0.5 text-xs text-white/55">
                    CFO, CMO, CHRO trong cùng một mô phỏng
                  </p>
                </div>
              </div>
              <p className="mt-8 text-2xl font-bold leading-snug tracking-tight">
                Mỗi sinh viên giữ một vai trò. Cả nhóm phải phối hợp như một
                team điều hành.
              </p>
              <p className="mt-4 text-sm leading-6 text-white/60">
                Quyết định của từng vai trò ảnh hưởng trực tiếp đến kết quả
                chung của nhóm.
              </p>
            </div>

            {/* Role cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {roles.map((role) => (
                <Card key={role.title} className="p-5">
                  <Badge tone={role.tone} className="mb-5">
                    {role.title}
                  </Badge>
                  <p className="text-sm leading-6 text-ink-700/70">
                    {role.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="rounded-2xl bg-ink-900 px-8 py-14 text-center text-white">
            <Badge tone="yellow" className="mb-6">
              Bắt đầu ngay hôm nay
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Sẵn sàng đưa lớp học lên một tầm mới?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/65">
              Miễn phí cho giảng viên. Không cần cài đặt. Tình huống mới mỗi
              lần thử nghiệm.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                className="h-11 bg-white px-6 text-ink-900 hover:bg-ink-100"
                onClick={() => router.push("/signup")}
                icon={<GraduationCap size={16} weight="bold" />}
              >
                Tạo tài khoản miễn phí
              </Button>
              <Button
                variant="ghost"
                className="h-11 px-6 text-white hover:bg-white/10"
                onClick={() => router.push("/inbox")}
              >
                Xem demo trực tiếp →
              </Button>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="border-t border-ink-200/60">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-ink-700/55 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div className="flex items-center gap-2.5">
              <span className="grid size-7 place-items-center rounded-md bg-ink-900 text-xs font-bold text-white">
                L
              </span>
              <span>Lumora — Mô phỏng doanh nghiệp bằng AI Agent.</span>
            </div>
            <div className="flex gap-5">
              <button
                onClick={() => router.push("/login")}
                className="transition-colors hover:text-ink-900"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="transition-colors hover:text-ink-900"
              >
                Đăng ký miễn phí
              </button>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
