import connectionStep1 from '@/images/connection-step-1.png';
import connectionStep2 from '@/images/connection-step-2.png';
import connectionStep3 from '@/images/connection-step-3.png';
import connectionStep4 from '@/images/connection-step-4.png';

export const ROUTE_PATHS = {
  HOME: '/',
} as const;

// ──────────────── Types ────────────────

export interface CheckItem {
  id: string;
  label: string;
  detail?: string;
  warning?: boolean;
}

export interface SettingField {
  label: string;
  value: string;
  unit?: string;
  mono?: boolean;
}

export interface ImageGuideStep {
  id: string;
  title: string;
  imageSrc: string;
  description?: string;
}

/** 메모 한 줄 안에서 일부만 색 지정 (예: Cursor/VS Code 파일 링크 파란색) */
export interface NoteSegment {
  text: string;
  /** CSS 색상 (예: #2563eb) */
  color?: string;
}

export type NoteLine = string | NoteSegment[];

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: 'camera' | 'light' | 'audio' | 'spare';
  color: 'cyan' | 'amber' | 'green';
  /** true면 헤더만 두고 본문은 비움 (A4 3등분 중 빈 칸) */
  empty?: boolean;
  checkItems?: CheckItem[];
  settings?: SettingField[];
  notes?: NoteLine[];
  imageSteps?: ImageGuideStep[];
}

/** 가운데 예비(확대) 영역 기본 이미지 */
export const PREVIEW_DEFAULT_IMAGE_SRC = connectionStep1;

// ──────────────── Column 1: Mac Mini ────────────────

export const SECTION_MAC_MINI: Section = {
  id: 'mac-mini',
  title: '맥 미니 세팅',
  subtitle: 'Mac Mini',
  icon: 'camera',
  color: 'cyan',
  imageSteps: [
    {
      id: 'step-1',
      title: '① 맥 미니 HDMI → 4K 송출장비 IN',
      imageSrc: connectionStep1,
    },
    {
      id: 'step-2',
      title: '② 4K 송출장비 OUT → 모니터 IN',
      imageSrc: connectionStep2,
    },
    {
      id: 'step-3',
      title: '③ 송출장비 → 출력용 모니터',
      imageSrc: connectionStep3,
    },
    {
      id: 'step-4',
      title: '④ 최종 배선 확인',
      imageSrc: connectionStep4,
    },
  ],
  settings: [
    { label: '디스플레이 해상도', value: '3840 × 2160 (4K)', mono: true },
    { label: '맥 OS 계정', value: 'id: partnerplatform / pw: 파트너플랫폼부 별도 문의', mono: false },
    { label: 'HDMI 출력', value: '4K 송출장비로 입력', mono: false },
    { label: '사운드 출력', value: '내장 / 외장(선택)', mono: false },
  ],
  checkItems: [
    { id: 'm1', label: '본체 전원 버튼으로 전원 ON', warning: false },
    { id: 'm2', label: '전원 케이블을 콘센트에 연결', warning: false },
    { id: 'm3', label: '맥 미니 HDMI → 4K 송출장비 HDMI IN', warning: true },
    { id: 'm4', label: '4K 송출 HDMI OUT → 모니터 HDMI IN', warning: true },
    { id: 'm5', label: '송출장비 전원 및 맥 미니 본체와의 연결 확인', warning: false },
    { id: 'm6', label: '허브에 키보드·마우스 등 필요 시 연결', warning: false },
  ],
  notes: [
    [
      { text: '연결 후 4K 송출장비가 ' },
      { text: '파란 불빛', color: '#2563eb' },
      { text: '으로 반짝이는지 확인하세요.' },
    ],
  ],
};

// ──────────────── Column 3: OBS (기존 예비 열 위치) ────────────────

export const SECTION_OBS: Section = {
  id: 'obs',
  title: 'OBS Studio 세팅',
  subtitle: 'OBS Studio',
  icon: 'light',
  color: 'amber',
  settings: [
    { label: '기본(캔버스) 해상도', value: '3840 × 2160', mono: true },
    { label: '출력(인코딩) 해상도', value: '3840 × 2160', mono: true },
    { label: 'FPS', value: '30 또는 60', mono: false },
    { label: '비트레이트', value: '12–20 Mbps (4K)', mono: true },
    { label: '인코더', value: 'Apple VT / x264 등', mono: false },
    { label: '오디오 샘플레이트', value: '48 kHz', mono: true },
  ],
  checkItems: [
    { id: 'o1', label: '장면(Scene)에 비디오 캡처 소스 추가', warning: false },
    { id: 'o2', label: '비디오 입력이 4K 송출장비(캡처)로 선택됨', warning: true },
    { id: 'o3', label: '미리보기·프로그램 화면이 정상', warning: true },
    { id: 'o4', label: '오디오 입력·모니터링 장치 확인', warning: false },
    { id: 'o5', label: '녹화 테스트 후 재생 확인', warning: false },
    { id: 'o6', label: '녹화본 저장 경로 확인', warning: false },
  ],
  notes: ['Default 녹화본 저장 경로는 partnerplatform\동영상\에 위치합니다.'],
};

/** 하위 호환: 맥 미니 → OBS 순 (가운데 예비 열은 템플릿에서 별도 렌더) */
export const GUIDE_SECTIONS: Section[] = [SECTION_MAC_MINI, SECTION_OBS];

export const PRODUCTION_INFO = {
  title: '파트너플랫폼부 교육 영상 제작 세팅 가이드',
  version: 'v1.0',
  date: new Date().toLocaleDateString('ko-KR'),
  crew: '',
  project: '',
  location: '',
  director: '',
  dop: '',
};
