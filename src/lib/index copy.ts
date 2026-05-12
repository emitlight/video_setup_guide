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

export interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: 'cyan' | 'amber' | 'green';
  checkItems?: CheckItem[];
  settings?: SettingField[];
  notes?: string[];
  imageSteps?: ImageGuideStep[];
}

// ──────────────── Template Data ────────────────

export const GUIDE_SECTIONS: Section[] = [
  {
    id: 'camera',
    title: '맥 미니 세팅',
    subtitle: 'Mac Mini Setup',
    icon: 'camera',
    color: 'cyan',
    settings: [
      { label: '전원', value: '4K (3840×2160)', mono: true },
      { label: '프레임 레이트', value: '24fps / 30fps', mono: true },
      { label: '셔터 스피드', value: '1/50 (24fps)', unit: 's', mono: true },
      { label: 'ISO', value: '100 – 800', mono: true },
      { label: '조리개', value: 'f/2.8 – f/5.6', mono: true },
      { label: '화이트 밸런스', value: '5600K', mono: true },
      { label: '픽처 프로파일', value: 'S-Log3 / HLG', mono: true },
      { label: '포커스 모드', value: 'MF (수동 포커스)', mono: false },
    ],
    checkItems: [
      { id: 'c1', label: '0. 본체 하단의 전원 버튼 클릭', warning: false },
      { id: 'c2', label: '1. 본체 전원 케이블을 콘센트에 연결', warning: false },
      { id: 'c3', label: '2. 본체 HDMI 포트를 4K 송출장비 IN 포트에 연결', warning: true },
      { id: 'c4', label: '3. 4K 송출장비 HDMI/OUT 포트를 출력용 모니터 HDMI/IN 포트에 연결', warning: true },
      { id: 'c5', label: '4. 4K 송출장비를 본체와 연결', warning: false },
      { id: 'c6', label: '5. 허브로 키보드/마우스 등 추가 연결', warning: false },
    ],
    notes: [
      '촬영 전 항상 TEST 클립 촬영 후 모니터에서 노출 확인',
      'S-Log 사용 시 노출계 +1.5~2 stops 보정 필요',
    ],
  },
  {
    id: 'lighting',
    title: 'OBS Studio 세팅',
    subtitle: 'Lighting Setup',
    icon: 'light',
    color: 'amber',
    settings: [
      { label: '기본 해상도', value: '3840 * 2160', mono: false },
      { label: '송출 해상도', value: '3840 * 2160', mono: false },
      { label: '백 라이트', value: '3200K (분리)', mono: false },
      { label: '광량(키)', value: '2500 lux', unit: 'lx', mono: true },
      { label: '조명 각도', value: '45° / 135°', mono: true },
      { label: '소프트박스', value: '60×90cm', mono: true },
    ],
    checkItems: [
      { id: 'l1', label: '케이블 트립 해저드 제거', warning: true },
      { id: 'l2', label: '조명 열기구 설치 확인', warning: false },
      { id: 'l3', label: '발전기 연료 충분 여부', warning: true },
      { id: 'l4', label: '디퓨저/젤 상태 확인', warning: false },
      { id: 'l5', label: '반사판 위치 고정 확인', warning: false },
      { id: 'l6', label: '조명 밸런스 라이트 미터 측정', warning: false },
    ],
    notes: [
      '조명 배치 후 반드시 웨이브폼 모니터로 노출 확인',
      '실외 촬영 시 태양 방향 고려하여 키 라이트 배치',
    ],
  },
  {
    id: 'connection-guide',
    title: '연결 가이드 + 맥 미니 점검',
    subtitle: 'Connection & Mac Mini Checklist',
    icon: 'audio',
    color: 'green',
    imageSteps: [
      {
        id: 'img-1',
        title: '1) 맥 미니 HDMI OUT → 4K 송출장비 HDMI IN',
        imageSrc: '/src/images/connection-step-1.png',
        description: '첫 번째 연결 사진을 배치하세요.',
      },
      {
        id: 'img-2',
        title: '2) 4K 송출장비 HDMI OUT → 모니터 HDMI IN',
        imageSrc: '/src/images/connection-step-2.png',
        description: '두 번째 연결 사진을 배치하세요.',
      },
      {
        id: 'img-3',
        title: '3) 전원/허브/주변기기 최종 연결',
        imageSrc: '/src/images/connection-step-3.png',
        description: '세 번째 연결 사진을 배치하세요.',
      },
    ],
    checkItems: [
      { id: 'm1', label: '맥 미니 전원 연결 및 부팅 확인', warning: false },
      { id: 'm2', label: '해상도 3840x2160(4K) 설정 확인', warning: true },
      { id: 'm3', label: 'OBS 비디오 입력 장치가 4K 송출장비로 선택됨', warning: true },
      { id: 'm4', label: '송출 전 미리보기 화면 정상 출력 확인', warning: false },
      { id: 'm5', label: '오디오 입력/출력 장치가 의도한 장치로 선택됨', warning: false },
      { id: 'm6', label: '최종 테스트 녹화 10초 후 재생 확인', warning: false },
    ],
    notes: [
      'imageSrc 경로는 실제 저장한 파일명으로 변경하세요.',
      '권장 위치: src/images/ 또는 src/assets/ (예: /src/images/xxx.png)',
    ],
  },
];

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
