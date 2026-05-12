import { useState } from 'react';
import {
  PREVIEW_DEFAULT_IMAGE_SRC,
  PRODUCTION_INFO,
  SECTION_MAC_MINI,
  SECTION_OBS,
} from '@/lib/index';
import type { Section, CheckItem, SettingField, ImageGuideStep, NoteLine } from '@/lib/index';

// ──────────────── Icon Components ────────────────

function CameraIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  );
}

function LightIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  );
}

function AudioIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="8" y1="22" x2="16" y2="22"/>
    </svg>
  );
}

function SpareIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}

// ──────────────── Color Config ────────────────

function renderNoteLine(note: NoteLine) {
  if (typeof note === 'string') {
    return <>{note}</>;
  }
  return (
    <>
      {note.map((seg, j) => (
        <span key={j} style={seg.color ? { color: seg.color } : undefined}>
          {seg.text}
        </span>
      ))}
    </>
  );
}

const colorConfig = {
  cyan: {
    header: 'bg-[oklch(0.60_0.20_190)]',
    headerText: 'text-[oklch(0.12_0.015_190)]',
    accent: 'text-[oklch(0.60_0.20_190)]',
    border: 'border-[oklch(0.60_0.20_190)]',
    check: 'border-[oklch(0.60_0.20_190)] checked:bg-[oklch(0.60_0.20_190)]',
    tag: 'bg-[oklch(0.60_0.20_190/0.15)] text-[oklch(0.60_0.20_190)] border border-[oklch(0.60_0.20_190/0.4)]',
    dot: 'bg-[oklch(0.60_0.20_190)]',
  },
  amber: {
    header: 'bg-[oklch(0.72_0.18_50)]',
    headerText: 'text-[oklch(0.20_0.05_50)]',
    accent: 'text-[oklch(0.72_0.18_50)]',
    border: 'border-[oklch(0.72_0.18_50)]',
    check: 'border-[oklch(0.72_0.18_50)] checked:bg-[oklch(0.72_0.18_50)]',
    tag: 'bg-[oklch(0.72_0.18_50/0.15)] text-[oklch(0.72_0.18_50)] border border-[oklch(0.72_0.18_50/0.4)]',
    dot: 'bg-[oklch(0.72_0.18_50)]',
  },
  green: {
    header: 'bg-[oklch(0.65_0.18_150)]',
    headerText: 'text-[oklch(0.12_0.05_150)]',
    accent: 'text-[oklch(0.65_0.18_150)]',
    border: 'border-[oklch(0.65_0.18_150)]',
    check: 'border-[oklch(0.65_0.18_150)] checked:bg-[oklch(0.65_0.18_150)]',
    tag: 'bg-[oklch(0.65_0.18_150/0.15)] text-[oklch(0.65_0.18_150)] border border-[oklch(0.65_0.18_150/0.4)]',
    dot: 'bg-[oklch(0.65_0.18_150)]',
  },
};

// ──────────────── Preview Column (가운데 예비 영역: 확대 보기) ────────────────

function PreviewColumn({
  index,
  imageSrc,
  caption,
}: {
  index: number;
  imageSrc: string;
  caption: string;
}) {
  const c = colorConfig.green;
  return (
    <div
      className="flex flex-col h-full min-h-0"
      style={{
        borderRight: index < 2 ? '1px solid oklch(0.28 0.02 220)' : undefined,
      }}
    >
      <div className={`${c.header} px-4 py-3 flex items-center gap-2.5 shrink-0`}>
        <span className={`${c.headerText} opacity-90`}>
          <SpareIcon />
        </span>
        <div>
          <div className={`${c.headerText} font-bold text-[15.4px] leading-tight tracking-wide uppercase`}>
            맥 미니 세팅
          </div>
          <div className={`${c.headerText} font-semibold text-[17.6px] leading-tight`}>
            확대 미리보기
          </div>
        </div>
        <div className={`ml-auto ${c.headerText} opacity-60 font-mono text-[13.2px]`}>
          {String(index + 1).padStart(2, '0')} / 03
        </div>
      </div>
      <div className="flex-1 min-h-0 flex flex-col p-2.5 m-3 mt-2 mb-3 rounded-md border border-border/50 bg-muted/10">
        <div className="flex-1 min-h-0 flex items-center justify-center p-2 bg-background/80 rounded-sm border border-border/40">
          <img
            src={imageSrc}
            alt={caption || '연결 가이드 확대'}
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        </div>
        {caption ? (
          <p className="text-center text-[15.4px] font-bold text-muted-foreground mt-2 px-1 leading-snug shrink-0">
            {caption}
          </p>
        ) : null}
      </div>
    </div>
  );
}

// ──────────────── Section Column ────────────────

function SectionColumn({
  section,
  index,
  onImageStepClick,
  selectedImageSrc,
}: {
  section: Section;
  index: number;
  onImageStepClick?: (src: string, title: string) => void;
  selectedImageSrc?: string;
}) {
  const c = colorConfig[section.color];
  const Icon =
    section.icon === 'camera'
      ? CameraIcon
      : section.icon === 'light'
        ? LightIcon
        : section.icon === 'spare'
          ? SpareIcon
          : AudioIcon;

  if (section.empty) {
    return (
      <div
        className="flex flex-col h-full min-h-0"
        style={{
          borderRight: index < 2 ? '1px solid oklch(0.28 0.02 220)' : undefined,
        }}
      >
        <div className={`${c.header} px-4 py-3 flex items-center gap-2.5 shrink-0`}>
          <span className={`${c.headerText} opacity-90`}>
            <Icon />
          </span>
          <div>
            <div className={`${c.headerText} font-bold text-[15.4px] leading-tight tracking-wide uppercase`}>
              {section.subtitle}
            </div>
            <div className={`${c.headerText} font-semibold text-[17.6px] leading-tight`}>
              {section.title}
            </div>
          </div>
          <div className={`ml-auto ${c.headerText} opacity-60 font-mono text-[13.2px]`}>
            {String(index + 1).padStart(2, '0')} / 03
          </div>
        </div>
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-4 py-6 mx-3.5 mb-3 mt-1 rounded-sm border border-dashed border-border/60 bg-muted/15">
          <span className="text-muted-foreground/50 text-[12.1px] text-center leading-relaxed">
            A4 가로 3등분 유지용 빈 칸입니다.
            <br />
            <span className="text-[11px] text-muted-foreground/40">필요 시 메모·도면·QR 등을 추가하세요.</span>
          </span>
        </div>
      </div>
    );
  }

  const imageGridClass =
    section.imageSteps && section.imageSteps.length >= 4
      ? 'grid grid-cols-2 gap-1.5'
      : 'flex flex-col gap-1.5';

  return (
    <div
      className="flex flex-col h-full min-h-0"
      style={{
        borderRight: index < 2 ? '1px solid oklch(0.28 0.02 220)' : undefined,
      }}
    >
      {/* Section Header */}
      <div className={`${c.header} px-4 py-3 flex items-center gap-2.5 shrink-0`}>
        <span className={`${c.headerText} opacity-90`}>
          <Icon />
        </span>
        <div>
          <div className={`${c.headerText} ${section.color === 'cyan' ? 'font-medium' : 'font-bold'} text-[15.4px] leading-tight tracking-wide uppercase`}>
            {section.subtitle}
          </div>
          <div className={`${c.headerText} font-semibold text-[17.6px] leading-tight`}>
            {section.title}
          </div>
        </div>
        <div className={`ml-auto ${c.headerText} opacity-60 font-mono text-[13.2px]`}>
          {String(index + 1).padStart(2, '0')} / 03
        </div>
      </div>

      {/* Body: 사진 가이드가 있으면 위쪽에 배치 (잘리지 않게 object-contain) */}
      <div className="flex flex-col gap-0 flex-1 min-h-0 overflow-hidden">
        {section.imageSteps?.length ? (
          <div className="px-4 pt-3 pb-3 mx-1 shrink-0 border-b border-border/30">
            <div className={`text-[11px] font-semibold ${c.accent} uppercase tracking-widest mb-2 flex items-center gap-1.5`}>
              <span className={`inline-block w-3 h-px ${c.dot}`} style={{ display: 'inline-block' }} />
              연결 가이드(사진)
              {onImageStepClick ? (
                <span className="normal-case font-normal text-muted-foreground/80 text-[9.9px] ml-1">
                  · 썸네일 클릭 시 가운데 확대
                </span>
              ) : null}
            </div>
            <div className={`${imageGridClass} max-h-[80mm] overflow-y-auto pr-0.5`}>
              {section.imageSteps.map((step: ImageGuideStep) => {
                const isSelected = selectedImageSrc === step.imageSrc;
                return (
                  <div key={step.id} className="rounded-sm border border-border/50 bg-background/80 p-1 min-w-0">
                    <div className="text-[9.9px] font-semibold text-foreground/90 mb-0.5 leading-tight">{step.title}</div>
                    <button
                      type="button"
                      onClick={() => onImageStepClick?.(step.imageSrc, step.title)}
                      className={`w-full flex items-center justify-center bg-muted/20 rounded-sm border min-h-[28mm] transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        isSelected
                          ? 'border-[oklch(0.55_0.18_190)] ring-2 ring-[oklch(0.55_0.18_190/0.5)]'
                          : 'border-border/30 hover:border-border hover:bg-muted/30'
                      }`}
                    >
                      <img
                        src={step.imageSrc}
                        alt={step.title}
                        className="w-full h-auto max-h-[42mm] object-contain pointer-events-none"
                      />
                    </button>
                    {step.description && (
                      <div className="text-[9.35px] text-muted-foreground mt-0.5 leading-tight">{step.description}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Settings Table */}
        {section.settings && (
          <div className="px-3.5 pt-2 pb-1 shrink-0">
            <div className={`text-[11px] font-semibold ${c.accent} uppercase tracking-widest mb-1.5 flex items-center gap-1.5`}>
              <span className={`inline-block w-3 h-px ${c.dot}`} style={{display:'inline-block'}}/>
              기본 설정값
            </div>
            <div className="border border-border/60 rounded-sm overflow-hidden">
              {section.settings.map((field: SettingField, i: number) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-2.5 py-[4px] ${i % 2 === 0 ? 'bg-muted/30' : 'bg-card/20'} border-b border-border/40 last:border-b-0`}
                >
                  <span className="text-muted-foreground text-[11px] font-medium leading-none">{field.label}</span>
                  <span className={`${c.accent} text-[11px] font-semibold leading-none text-right pl-1 ${field.mono ? 'font-mono' : ''}`}>
                    {field.value}
                    {field.unit && <span className="text-muted-foreground/60 text-[8.8px] ml-0.5">{field.unit}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Checklist */}
        {section.checkItems && (
          <div className="px-3.5 pt-1 pb-1 shrink-0">
            <div className={`text-[11px] font-semibold ${c.accent} uppercase tracking-widest mb-1.5 flex items-center gap-1.5`}>
              <span className={`inline-block w-3 h-px ${c.dot}`} style={{display:'inline-block'}}/>
              체크리스트
            </div>
            <div className="flex flex-col gap-[4px]">
              {section.checkItems.map((item: CheckItem) => (
                <label key={item.id} className="flex items-center gap-2 cursor-pointer group">
                  <div
                    className={`w-[12px] h-[12px] rounded-[2px] border-2 ${c.border} flex-shrink-0 flex items-center justify-center bg-transparent group-hover:bg-primary/10 transition-colors`}
                    style={{ minWidth: 12, minHeight: 12 }}
                  />
                  <span className="text-foreground/85 text-[11px] leading-tight flex-1">{item.label}</span>
                  {item.warning && (
                    <span className="text-[oklch(0.72_0.18_50)] flex-shrink-0">
                      <WarningIcon />
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="px-3.5 pt-1 pb-2 flex-1 min-h-0 flex flex-col justify-between gap-1.5">
          {section.notes && (
            <div className="shrink-0">
              <div className={`text-[11px] font-semibold ${c.accent} uppercase tracking-widest mb-1 flex items-center gap-1.5`}>
                <span className={`inline-block w-3 h-px ${c.dot}`} style={{display:'inline-block'}}/>
                주의 / 메모
              </div>
              <div className="flex flex-col gap-[3px]">
                {section.notes.map((note: NoteLine, i: number) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className={`${c.accent} text-[11px] leading-none mt-[1px] flex-shrink-0`}>›</span>
                    <span className="text-muted-foreground text-[10.45px] leading-tight">{renderNoteLine(note)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-1 shrink-0 text-[8.5px] text-muted-foreground/75 leading-relaxed truncate">
            ps@softcamp.co.kr, 담당자: 파트너플랫폼부 이하영 매니저
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────── Main Template ────────────────

export default function GuideTemplate() {
  const info = PRODUCTION_INFO;
  const firstStep = SECTION_MAC_MINI.imageSteps?.[0];
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [preview, setPreview] = useState({
    src: PREVIEW_DEFAULT_IMAGE_SRC,
    title: firstStep?.title ?? '① 맥 미니 HDMI → 4K 송출장비 IN',
  });

  const renderPrintSheet = (page: 1 | 2) => (
    <div
      className="print-sheet bg-card text-foreground"
      style={{
        width: '297mm',
        height: '210mm',
        minHeight: '210mm',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-[6px] border-b border-border/60"
        style={{ background: 'oklch(0.94 0.008 200)', flexShrink: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-[3px] items-center">
            <div className="w-[3px] h-5 bg-[oklch(0.60_0.20_190)] rounded-full" />
            <div className="w-[3px] h-5 bg-[oklch(0.72_0.18_50)] rounded-full" />
            <div className="w-[3px] h-5 bg-[oklch(0.65_0.18_150)] rounded-full" />
          </div>
          <span className="font-bold text-[14.3px] text-foreground tracking-wide">{info.title}</span>
          <span className="font-mono text-[11px] text-muted-foreground bg-muted/30 px-1.5 py-0.5 rounded">{info.version}</span>
        </div>

        <div className="flex items-center gap-4 text-[11.55px] text-muted-foreground">
          <span>
            <span className="text-muted-foreground/50 mr-1">날짜</span>
            <span className="font-mono text-foreground/70">{info.date}</span>
          </span>
        </div>
      </div>

      {page === 1 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <SectionColumn section={SECTION_MAC_MINI} index={0} selectedImageSrc={preview.src} />
          <PreviewColumn index={1} imageSrc={preview.src} caption={preview.title} />
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <SectionColumn section={SECTION_OBS} index={2} />
        </div>
      )}

      <div
        className="flex items-center justify-between px-4 py-[5px] border-t border-border/60"
        style={{ background: 'oklch(0.94 0.008 200)', flexShrink: 0 }}
      >
        <div className="flex items-center gap-3 text-[10.45px] text-muted-foreground/50">
          <span className="font-mono">© {new Date().getFullYear()} Production Crew</span>
          <span>·</span>
          <span>무단 복제 금지 · Internal Use Only</span>
        </div>
        <div className="flex items-center gap-2 text-[10.45px] text-muted-foreground/40">
          <span className="font-mono">{page} / 2</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="print-root min-h-screen bg-background flex flex-col items-center justify-start pt-3 pb-1 px-4 gap-3">

      {/* Print hint */}
      <div className="text-muted-foreground/50 text-[13.2px] flex items-center gap-2 print:hidden">
        <span className="font-mono">A4 가로 (297 × 210mm)</span>
        <span>·</span>
        <span>{currentPage === 1 ? '1페이지 (맥미니 세팅)' : '2페이지 (OBS 세팅)'}</span>
        <span>·</span>
        <button
          onClick={() => window.print()}
          className="text-primary hover:text-accent transition-colors underline underline-offset-2"
        >
          인쇄 / PDF 저장
        </button>
      </div>

      {/* ──── A4 Landscape Sheet ──── */}
      <div
        id="print-sheet"
        className="screen-only bg-card text-foreground"
        style={{
          width: '297mm',
          height: '210mm',
          minHeight: '210mm',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 40px oklch(0 0 0 / 0.5)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* ── Top Meta Bar ── */}
        <div
          className="flex items-center justify-between px-4 py-[6px] border-b border-border/60"
          style={{ background: 'oklch(0.94 0.008 200)', flexShrink: 0 }}
        >
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="flex gap-[3px] items-center">
              <div className="w-[3px] h-5 bg-[oklch(0.60_0.20_190)] rounded-full" />
              <div className="w-[3px] h-5 bg-[oklch(0.72_0.18_50)] rounded-full" />
              <div className="w-[3px] h-5 bg-[oklch(0.65_0.18_150)] rounded-full" />
            </div>
            <span className="font-bold text-[14.3px] text-foreground tracking-wide">{info.title}</span>
            <span className="font-mono text-[11px] text-muted-foreground bg-muted/30 px-1.5 py-0.5 rounded">{info.version}</span>
          </div>

          <div className="flex items-center gap-4 text-[11.55px] text-muted-foreground">
            <span>
              <span className="text-muted-foreground/50 mr-1">날짜</span>
              <span className="font-mono text-foreground/70">{info.date}</span>
            </span>
          </div>
        </div>

        {/* ── Page Content Grid ── */}
        {currentPage === 1 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <SectionColumn
              section={SECTION_MAC_MINI}
              index={0}
              selectedImageSrc={preview.src}
              onImageStepClick={(src, title) => setPreview({ src, title })}
            />
            <PreviewColumn index={1} imageSrc={preview.src} caption={preview.title} />
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <SectionColumn section={SECTION_OBS} index={2} />
          </div>
        )}

        {/* ── Bottom Bar ── */}
        <div
          className="flex items-center justify-between px-4 py-[5px] border-t border-border/60"
          style={{ background: 'oklch(0.94 0.008 200)', flexShrink: 0 }}
        >
          <div className="flex items-center gap-3 text-[10.45px] text-muted-foreground/50">
            <span className="font-mono">© {new Date().getFullYear()} Production Crew</span>
            <span>·</span>
            <span>무단 복제 금지 · Internal Use Only</span>
          </div>
          <div className="flex items-center gap-2 text-[10.45px] text-muted-foreground/40">
            {currentPage === 1 ? (
              <button
                onClick={() => setCurrentPage(2)}
                className="rounded-md bg-[oklch(0.65_0.18_150)] text-[oklch(0.12_0.05_150)] px-3 py-1.5 text-[12.1px] font-bold shadow-sm hover:opacity-90 transition-opacity print:hidden"
              >
                녹화 툴 세팅
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage(1)}
                className="rounded-md bg-[oklch(0.65_0.18_150)] text-[oklch(0.12_0.05_150)] px-3 py-1.5 text-[12.1px] font-semibold shadow-sm hover:opacity-90 transition-opacity print:hidden"
              >
                맥 미니 세팅으로
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="print-only">
        {renderPrintSheet(1)}
        {renderPrintSheet(2)}
      </div>

      {/* Print styles hint */}
      <div className="text-muted-foreground/40 text-[12.1px] max-w-[297mm] print:hidden leading-relaxed text-center mt-1">
        💡 인쇄 시 "배경 그래픽 포함" 옵션을 켜야 색상이 정확하게 출력됩니다. 여백은 "없음(최소)"으로 설정하세요.
      </div>

      {/* Print CSS */}
      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body { margin: 0; padding: 0; background: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print-root { display: block !important; min-height: auto !important; padding: 0 !important; gap: 0 !important; background: #fff !important; }
          .screen-only { display: none !important; }
          .print-only { display: block !important; }
          .print-sheet { box-shadow: none !important; width: 297mm !important; height: 210mm !important; page-break-after: always; break-after: page; }
          .print-sheet:last-child { page-break-after: auto; break-after: auto; }
        }
        .print-only { display: none; }
      `}</style>
    </div>
  );
}
