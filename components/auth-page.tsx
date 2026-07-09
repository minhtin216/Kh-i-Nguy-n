"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  EnvelopeSimple,
  LockSimple,
  User,
  UsersThree,
} from "@phosphor-icons/react";
import { Avatar, Badge, Button, Card, cn } from "@/components/ui";

/* ─── Types ─────────────────────────────────────────────────────────────── */
type AuthMode = "login" | "signup";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "CFO" | "CMO" | "CHRO";
};

const initialForm: FormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "CFO",
};

/* ─── Helpers ───────────────────────────────────────────────────────────── */
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ─── Sidebar preview (right panel on desktop) ──────────────────────────── */
function WorkspacePreview() {
  return (
    <div className="hidden animate-fade-up lg:block">
      <Card className="overflow-hidden">
        <div className="flex items-start justify-between gap-3 border-b border-ink-200/70 p-5">
          <Avatar name="Mara Voss" role="CEO Agent" tone="red" />
          <Badge tone="red">Khẩn cấp</Badge>
        </div>
        <div className="p-5">
          <p className="text-lg font-bold leading-snug tracking-tight text-ink-900">
            Board cần báo cáo dòng tiền trước 15:00
          </p>
          <p className="mt-3 text-sm leading-6 text-ink-700/70">
            Đây là kiểu áp lực mà Lumora đưa vào lớp học: ngắn, rõ, có
            deadline và buộc người học phải ra quyết định.
          </p>
          <div className="mt-5 grid gap-2">
            {[
              { label: "Quyết định cần đưa ra", time: "15:00" },
              { label: "Tín hiệu rủi ro", time: "12:45" },
              { label: "Đầu ra mong đợi", time: "–" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg border border-ink-200/70 px-3.5 py-3"
              >
                <span className="text-sm text-ink-800">{item.label}</span>
                <span className="font-mono text-xs text-ink-700/50">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Bottom info cards */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-ink-200/70 bg-white p-4 shadow-panel">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-700/50">
            Tình huống
          </p>
          <p className="mt-2 text-2xl font-bold text-ink-900">∞</p>
          <p className="mt-0.5 text-xs text-ink-700/60">
            Sinh mới mỗi phiên học
          </p>
        </div>
        <div className="rounded-xl border border-ink-200/70 bg-white p-4 shadow-panel">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-700/50">
            Vai trò
          </p>
          <p className="mt-2 text-2xl font-bold text-ink-900">3</p>
          <p className="mt-0.5 text-xs text-ink-700/60">CFO · CMO · CHRO</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Field component ───────────────────────────────────────────────────── */
function Field({
  label,
  value,
  onChange,
  error,
  icon,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon: ReactNode;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-ink-900">{label}</label>
      <div
        className={cn(
          "mt-2 flex h-11 items-center gap-2.5 rounded-xl border bg-white px-3.5",
          "transition-all duration-200 ease-mass",
          error
            ? "border-[#efcfd0] ring-2 ring-[#fdebec]"
            : "border-ink-200/80 focus-within:border-brass-500 focus-within:ring-2 focus-within:ring-brass-500/20",
        )}
      >
        <span className="shrink-0 text-ink-700/45">{icon}</span>
        <input
          className="min-w-0 flex-1 bg-transparent text-sm text-ink-900 outline-none placeholder:text-ink-700/35"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type={type}
          autoComplete={autoComplete}
        />
      </div>
      {error ? (
        <p className="mt-1.5 rounded-lg bg-[#fdebec] px-3 py-1.5 text-xs font-medium text-[#9f2f2d] ring-1 ring-[#efcfd0]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ─── AuthPage ──────────────────────────────────────────────────────────── */
export function AuthPage({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );

  const isSignup = mode === "signup";

  const copy = useMemo(
    () =>
      isSignup
        ? {
            title: "Tạo tài khoản Lumora",
            subtitle:
              "Bắt đầu workspace mô phỏng cho lớp học hoặc nhóm sinh viên.",
            submit: "Tạo tài khoản",
            switchText: "Đã có tài khoản?",
            switchAction: "Đăng nhập",
            switchHref: "/login",
          }
        : {
            title: "Đăng nhập Lumora",
            subtitle:
              "Quay lại workspace mô phỏng và tiếp tục xử lý các tình huống đang mở.",
            submit: "Đăng nhập",
            switchText: "Chưa có tài khoản?",
            switchAction: "Đăng ký",
            switchHref: "/signup",
          },
    [isSignup],
  );

  function updateField<Key extends keyof FormState>(
    key: Key,
    value: FormState[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (isSignup && form.name.trim().length < 2) {
      nextErrors.name = "Vui lòng nhập họ tên (ít nhất 2 ký tự).";
    }
    if (!validateEmail(form.email)) {
      nextErrors.email = "Email chưa hợp lệ.";
    }
    if (form.password.length < 8) {
      nextErrors.password = "Mật khẩu cần tối thiểu 8 ký tự.";
    }
    if (isSignup && form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Mật khẩu xác nhận chưa khớp.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    router.push("/inbox");
  }

  return (
    <main className="min-h-[100dvh] overflow-x-hidden bg-ink-50 text-ink-900">
      {/* Decorative layers */}
      <div className="noise-layer text-ink-950" />
      <div className="surface-grid fixed inset-0 opacity-60" />

      <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[440px_minmax(0,1fr)] lg:px-8">
        {/* ── Form card ──────────────────────────────────────────── */}
        <Card className="p-6 sm:p-8">
          {/* Logo */}
          <button
            className="mb-8 flex items-center gap-2.5 rounded-lg text-left transition-transform duration-200 ease-mass active:scale-[0.97]"
            onClick={() => router.push("/")}
            type="button"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-ink-900 text-sm font-bold text-white">
              L
            </span>
            <span>
              <span className="block text-sm font-bold tracking-tight">
                Lumora
              </span>
              <span className="block text-[11px] text-ink-700/55">
                Digital Workspace
              </span>
            </span>
          </button>

          {/* Heading */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink-900">
              {copy.title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-ink-700/65">
              {copy.subtitle}
            </p>
          </div>

          {/* Form */}
          <form className="mt-7 space-y-4" onSubmit={onSubmit} noValidate>
            {isSignup ? (
              <Field
                label="Họ tên"
                icon={<User size={15} weight="bold" />}
                value={form.name}
                error={errors.name}
                onChange={(value) => updateField("name", value)}
                autoComplete="name"
              />
            ) : null}

            <Field
              label="Email"
              type="email"
              icon={<EnvelopeSimple size={15} weight="bold" />}
              value={form.email}
              error={errors.email}
              onChange={(value) => updateField("email", value)}
              autoComplete="email"
            />

            <Field
              label="Mật khẩu"
              type="password"
              icon={<LockSimple size={15} weight="bold" />}
              value={form.password}
              error={errors.password}
              onChange={(value) => updateField("password", value)}
              autoComplete={isSignup ? "new-password" : "current-password"}
            />

            {isSignup ? (
              <>
                <Field
                  label="Xác nhận mật khẩu"
                  type="password"
                  icon={<LockSimple size={15} weight="bold" />}
                  value={form.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={(value) => updateField("confirmPassword", value)}
                  autoComplete="new-password"
                />

                {/* Role picker */}
                <div>
                  <label className="text-sm font-medium text-ink-900">
                    Vai trò khởi đầu
                  </label>
                  <p className="mt-0.5 text-xs text-ink-700/55">
                    Bạn có thể đổi vai trò trong workspace bất cứ lúc nào.
                  </p>
                  <div className="mt-2.5 grid grid-cols-3 gap-2">
                    {(["CFO", "CMO", "CHRO"] as const).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => updateField("role", role)}
                        className={cn(
                          "flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-sm font-semibold",
                          "transition-all duration-200 ease-mass active:scale-[0.97]",
                          form.role === role
                            ? "border-brass-100 bg-brass-50 text-brass-600 ring-2 ring-brass-100"
                            : "border-ink-200/80 bg-white text-ink-700 hover:bg-ink-100",
                        )}
                      >
                        <UsersThree size={14} weight="bold" />
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : null}

            <Button className="mt-2 h-11 w-full text-sm" type="submit">
              {copy.submit}
            </Button>
          </form>

          {/* Switch link */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1 text-sm text-ink-700/65">
            <span>{copy.switchText}</span>
            <button
              type="button"
              onClick={() => router.push(copy.switchHref)}
              className="font-semibold text-ink-900 transition-colors duration-200 hover:text-brass-600"
            >
              {copy.switchAction}
            </button>
          </div>
        </Card>

        {/* ── Right panel ─────────────────────────────────────────── */}
        <WorkspacePreview />
      </div>
    </main>
  );
}
