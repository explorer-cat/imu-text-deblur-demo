/**
 * Single source of truth for the project page.
 *
 * Edit THIS file to update the page — every section reads from here. Setting a
 * field to "" / [] hides the corresponding UI.
 *
 * 내용은 석사학위논문(2026, 진행 중) 4장 실험 결과와 정확히 일치시킨다.
 * 모든 수치는 실제 수행된 실험(시드 고정, 클러스터 부트스트랩 CI)에서 가져온 것.
 */

export type IconName =
  | "paper"
  | "arxiv"
  | "code"
  | "video"
  | "data"
  | "poster"
  | "huggingface";

export interface Affiliation {
  id: number;
  name: string;
}

export interface Author {
  name: string;
  url?: string;
  affiliations: number[];
  notes?: string[];
}

export interface ActionLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface ComparisonItem {
  label: string;
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  /**
   * Optional multiple "after" variants (e.g. deblur without IMU vs. ours with
   * IMU). When present the slider shows toggle buttons and `after` is ignored.
   */
  afters?: { src: string; label: string }[];
  /** CSS aspect-ratio for the slider box, e.g. "4 / 1" for wide text strips. */
  aspect?: string;
}

export interface VideoItem {
  label: string;
  src: string;
  poster?: string;
}

export interface ResultsTable {
  caption?: string;
  headers: string[];
  rows: string[][];
  /** 0-based index of the row to emphasize (e.g. the "ours" row). */
  highlightRow?: number;
}

export interface Paper {
  title: string;
  venue: string;
  authors: Author[];
  affiliations: Affiliation[];
  authorNotes: string[];
  links: ActionLink[];

  teaserVideo?: string;
  teaserImage?: string;
  teaserCaption?: string;

  abstract: string;

  method: {
    heading: string;
    image?: string;
    caption?: string;
    paragraphs: string[];
  };

  results: {
    heading: string;
    intro?: string;
    table?: ResultsTable;
    ocrTable?: ResultsTable;
    figures?: { src: string; caption: string }[];
    comparisons: ComparisonItem[];
    videos: VideoItem[];
  };

  bibtex: string;
  acknowledgements?: string;
}

export const paper: Paper = {
  title:
    "모바일 IMU 센서 데이터를 활용한 텍스트 이미지 모션 블러 제거 및 OCR 성능 향상 연구",
  venue: "경북대학교 대학원 석사학위논문 (진행 중) · 2026",

  authors: [
    { name: "최성우 (Sungwoo Choi)", affiliations: [1], notes: ["*"] },
    { name: "이재협 (Jaehyup Lee)", affiliations: [1], notes: ["†"] },
  ],

  affiliations: [{ id: 1, name: "경북대학교 컴퓨터학부 ICT융합전공" }],

  authorNotes: ["* 저자", "† 지도교수"],

  links: [],

  teaserImage: "assets/fig_exp2_ocr_reading.png",
  teaserCaption:
    "OCR이 실제로 읽어 낸 결과 (중간 블러 샘플). 영상 전용 복원은 화질 지표를 " +
    "올리면서도 인식기가 읽을 수 없는 '선명해 보이는 틀린 획'을 만들 수 있다 — " +
    "화소 충실도와 기계 가독성은 별개의 목표라는 것이 본 연구의 출발점이다.",

  abstract: `핸드헬드 스마트폰 촬영의 모션 블러는 텍스트 인식(OCR)을 심각하게 훼손한다 \
— 합성 평가에서 가장 약한 블러조차 문자 오류율(CER)을 6.7%에서 37.6%로 끌어올렸다. \
본 연구는 촬영 순간 스마트폰 IMU(자이로·가속도계)가 측정한 카메라 운동을 복원 네트워크의 \
조건 정보로 결합하고, 고정된 CTC 인식기의 인식 손실로 복원 목표를 가독성에 정렬하는 \
멀티모달 방법을 제안한다. 블러와 자이로 신호가 동일한 회전 궤적을 공유하는 합성 데이터와 \
직접 개발한 iPhone 수집 앱(사진 + 노출 전후 IMU 동기 기록)으로 검증했다. \
결과: (1) IMU 융합은 복원 충실도(PSNR +0.4~+0.7 dB)를 개선했고 이 이득은 용량·셔플 \
대조로 운동 정보에 귀속되나, 세 학습 시드 중 둘에서만 재현되어 안정성은 제한적이다. \
(2) 인식 손실×IMU의 2×2 상호작용(−5.9%p)은 매개변수를 맞춘 대조군에서 인식 손실이 \
영상 전용에도 유의하게 도움이 되어(−5.7%p) 용량 통제 후 사라졌다 — 효과는 센서가 아니라 \
모델 용량에 의존한다. (3) 실촬영 32장에서는 모든 복원이 입력보다 나빠(+27.7~+30.8%p) \
합성→실측 도메인 갭이 병목이다. 대조군 없는 절제 실험이 상호작용을 센서 특이 효과로 \
오독하게 만들 수 있다는 방법론적 교훈이 본 연구의 핵심 기여다.`,

  method: {
    heading: "방법",
    image: "assets/fig_overview.png",
    caption:
      "제안 네트워크 구조. 흐린 영상은 잔차 U-Net 백본이, IMU 시계열(자이로 3ch + " +
      "누적 회전각 3ch + 가속도 3ch, 9×32)은 1D-CNN 인코더가 처리하고, 병목에서 " +
      "게이트 교차 어텐션으로 융합한다. 학습 시 복원 영상을 고정 인식기에 통과시켜 얻은 " +
      "예측 로짓과 정답 텍스트로 CTC 손실을 계산하고, 그 기울기가 고정 인식기를 지나 " +
      "복원 네트워크로 역전파된다(점선). 평가는 별도 계열의 EasyOCR·PaddleOCR로 분리.",
    paragraphs: [
      "데이터 — 블러와 센서가 같은 물리에서 나오게. 손떨림 대역(2–12 Hz)의 회전 궤적을 생성해 노출(1/30초) 동안 텍스트 영상을 워프-평균하여 공간 가변 블러를 만들고, 같은 궤적에서 400 Hz 자이로 시계열을 합성한다. 각 샘플은 (흐린 영상, IMU, 선명 정답, 정답 텍스트)의 정렬 4중쌍이며 블러 세기 3레벨(0.5×/1.0×/1.5×), 시드 고정으로 재현 가능하다.",
      "모델 — 위치마다 다른 블러에 위치마다 다른 운동 참조. 회전 기인 블러는 화면 위치마다 방향·세기가 다르므로, 전역 벡터를 더하는 대신 영상 특징의 각 위치가 8개 운동 토큰을 교차 어텐션으로 참조한다. 게이트를 0으로 초기화해 학습 초기에 무작위 어텐션이 백본을 교란하지 않게 했다(이 게이트가 없으면 융합이 오히려 학습을 방해함을 절제로 확인). 총 63만 파라미터의 소형 모델.",
      "검증 설계 — 대조군이 본 연구의 핵심. IMU 유무 × 인식 손실 유무의 2×2 절제에 두 대조군을 추가했다: ① 셔플-IMU(다른 샘플의 IMU를 잘못 짝지음 — 정보만 차단), ② 동일 용량 영상 전용(채널 폭을 늘려 파라미터 수를 IMU 구성과 일치). 통계는 텍스트 ID 클러스터 부트스트랩(10,000회) 95% 신뢰구간으로 제시한다. 이 대조군들이 없었다면 아래 결과는 전혀 다르게 — 그리고 틀리게 — 해석되었을 것이다.",
      "실측 수집 — React Native(Expo) iPhone 앱을 직접 개발해 사진과 촬영 전후 ±0.7초의 IMU(~100 Hz)를 동기 기록했다. 6개 대상(야외 간판 3, 실내 인쇄물 3), 32장을 iPhone 13으로 수집해 학습된 모델을 그대로 적용했다.",
    ],
  },

  results: {
    heading: "결과",
    intro:
      "합성 테스트(레벨당 50장, EasyOCR 주 평가)의 전 구성 비교와, 그 차이가 어디서 오는지를 가른 " +
      "대조군 분해. 견고성은 세 학습 시드와 제2 인식기(PaddleOCR)로 교차 점검했다 — IMU 충실도 " +
      "이득은 3시드 중 2시드에서만 재현되어 안정성이 제한적이었고, 충실도→가독성 전이는 두 인식기 중 " +
      "PaddleOCR에서만 유의해 평가 인식기 선택에 의존할 가능성이 나타났다. 아래 슬라이더는 흐린 입력과 " +
      "복원 결과를 드래그로 비교하며 버튼으로 IMU 없는 복원 ↔ 제안(IMU)을 전환할 수 있고, 직접 수집한 " +
      "실촬영 6개 대상(iPhone 13)의 결과를 성공·실패 구분 없이 그대로 전시한다.",
    table: {
      caption:
        "합성 테스트 문자 오류율(CER %, 낮을수록 좋음) — 블러 약함/보통/강함. 흐린 입력을 그대로 읽는 것이 기준선. " +
        "IMU+인식 손실(제안)은 네 기본 구성 중 최저이지만, 파라미터를 맞춘 영상 전용 대조군(ch=37)도 대등하다 — 아래 분해 표 참조.",
      headers: ["구성", "약함 (0.5×)", "보통 (1.0×)", "강함 (1.5×)"],
      rows: [
        ["흐린 입력 (복원 없음)", "37.6", "57.7", "69.7"],
        ["영상 전용 · L1", "29.4", "71.0", "83.6"],
        ["IMU 융합 · L1 (PSNR +0.37~+0.68 dB)", "30.5", "67.0", "85.8"],
        ["영상 전용 · L1+인식", "33.7", "75.4", "86.8"],
        ["IMU 융합 · L1+인식 (제안)", "28.3", "68.7", "80.6"],
        ["셔플-IMU · L1+인식 (정보 차단 대조)", "33.6", "70.4", "84.4"],
        ["영상 전용 ch=37 · L1+인식 (동일 용량 대조)", "26.7", "65.6", "83.2"],
      ],
      highlightRow: 4,
    },
    ocrTable: {
      caption:
        "핵심 발견 — 상호작용의 대조군 분해 (ΔCER, 텍스트 클러스터 부트스트랩 95% CI). " +
        "2×2만 보면 '인식 손실은 IMU와 결합해야 작동한다'로 읽히지만(1행), 동일 용량 대조군에서는 " +
        "인식 손실이 영상 전용에도 유의하게 도움이 되고(2행) 용량을 통제하면 상호작용이 사라진다(3행). " +
        "즉 인식 손실의 효과는 센서가 아니라 모델 용량에 의존한다. 한편 셔플 대조(4행)는 IMU 구조 안에서 " +
        "올바른 운동 정보가 실제로 사용됨을 보여 준다.",
      headers: ["비교", "ΔCER (%p)", "95% CI", "판정"],
      rows: [
        ["2×2 상호작용 (ch=32)", "−5.89", "[−10.03, −1.70]", "유의"],
        ["인식 손실 효과 (동일 용량 ch=37에서)", "−5.70", "[−8.79, −2.69]", "유의 — 개선"],
        ["용량 통제 상호작용 (IMU vs ch=37)", "+3.78", "[−0.12, +8.03]", "비유의 (방향 역전)"],
        ["진짜 IMU vs 셔플-IMU (정보 기여)", "−3.59", "[−6.10, −1.30]", "유의"],
        ["IMU+인식 vs ch=37+인식 (최종 동급 비교)", "+0.69", "[−1.92, +3.26]", "차이 없음"],
      ],
      highlightRow: 2,
    },
    figures: [
      {
        src: "assets/fig_exp4_cer.png",
        caption:
          "2×2 절제(ch=32)의 블러 레벨별 CER. 인식 손실은 소형 영상 전용(붉은 계열)에서 해롭고 IMU 융합(푸른 계열)에서 도움이 되는 것처럼 보이지만, 이 대비는 모델 용량에 의존한다 — 위 분해 표가 그 증거.",
      },
      {
        src: "assets/fig_real_qual.png",
        caption:
          "실촬영 검증 (직접 수집한 32장 중 2례: 실내 책 표지 · 야외 교통 표지). 모든 복원 구성이 흐린 입력보다 CER가 +27.7~+30.8%p 나빴다. 단일 폰트 문서형 합성 분포와 실측 장면 텍스트 사이의 도메인 갭이 가장 유력한 원인 — 방법 설계보다 데이터 현실성이 앞서는 병목임을 보여 주는 정직한 결과.",
      },
      {
        src: "assets/fig_dataset_sample.png",
        caption:
          "합성 데이터 샘플. 선명 정답(좌상)에 손떨림 대역 회전 궤적을 적용해 흐린 입력(우상)을 만들고, 같은 궤적에서 자이로 시계열(하단)을 생성한다 — 블러와 센서 신호가 동일한 물리를 공유한다.",
      },
      {
        src: "assets/fig_exp1_cer.png",
        caption:
          "문제의 정량화: 블러 강도별 CER. 사람 눈에 가벼운 0.5× 블러조차 CER를 6.7%→37.6%로 다섯 배 이상 악화시킨다.",
      },
    ],
    comparisons: [
      {
        label:
          "합성 · 약한 블러 — “관성센서 2,205”. IMU 없는 복원(20%)보다 IMU 융합(10%)이 정확하다.",
        before: "assets/syn0_blur.png",
        after: "assets/syn0_ours.png",
        beforeLabel: "흐린 입력 · CER 90%",
        afters: [
          { src: "assets/syn0_base.png", label: "IMU 없음 · 20%" },
          { src: "assets/syn0_ours.png", label: "제안 (IMU) · 10%" },
        ],
        aspect: "1 / 1",
      },
      {
        label:
          "합성 · 약한 블러 — “출입증 EXIT 9,774”. 판독 불능(93%)이던 입력이 IMU 융합으로 43%까지 회복.",
        before: "assets/syn1_blur.png",
        after: "assets/syn1_ours.png",
        beforeLabel: "흐린 입력 · CER 93%",
        afters: [
          { src: "assets/syn1_base.png", label: "IMU 없음 · 57%" },
          { src: "assets/syn1_ours.png", label: "제안 (IMU) · 43%" },
        ],
        aspect: "1 / 1",
      },
      {
        label:
          "실촬영 · 야외 현수막 — “청년 부동산중개보수 및 이사비 지원사업”. 입력(5%)이 가장 잘 읽히고 모든 복원이 손상시킨다.",
        before: "assets/real0_input.png",
        after: "assets/real0_ours.png",
        beforeLabel: "흐린 입력 · CER 5%",
        afters: [
          { src: "assets/real0_base.png", label: "IMU 없음 · 43%" },
          { src: "assets/real0_ours.png", label: "제안 (IMU) · 43%" },
        ],
        aspect: "1 / 1",
      },
      {
        label:
          "실촬영 · 실내 카페 로고 — “London Bagel Museum”. 실측에서 제안(5%)이 IMU 없는 복원(21%)보다 우수했던 드문 사례.",
        before: "assets/real4_input.png",
        after: "assets/real4_ours.png",
        beforeLabel: "흐린 입력 · CER 5%",
        afters: [
          { src: "assets/real4_base.png", label: "IMU 없음 · 21%" },
          { src: "assets/real4_ours.png", label: "제안 (IMU) · 5%" },
        ],
        aspect: "1 / 1",
      },
      {
        label:
          "실촬영 · 실내 책 표지 — “대단한 사랑까지도…”. 두 복원 모두 입력보다 나쁘지만 IMU(47%)가 손상을 줄였다.",
        before: "assets/real5_input.png",
        after: "assets/real5_ours.png",
        beforeLabel: "흐린 입력 · CER 12%",
        afters: [
          { src: "assets/real5_base.png", label: "IMU 없음 · 71%" },
          { src: "assets/real5_ours.png", label: "제안 (IMU) · 47%" },
        ],
        aspect: "1 / 1",
      },
      {
        label:
          "실촬영 · 실내 책 표지 — “녹나무의 파수꾼”. 복원이 획을 뭉개 입력(25%)보다 나빠진 도메인 갭 사례.",
        before: "assets/real3_input.png",
        after: "assets/real3_ours.png",
        beforeLabel: "흐린 입력 · CER 25%",
        afters: [
          { src: "assets/real3_base.png", label: "IMU 없음 · 62%" },
          { src: "assets/real3_ours.png", label: "제안 (IMU) · 75%" },
        ],
        aspect: "1 / 1",
      },
      {
        label:
          "실촬영 · 야외 버스 노선판 — “시청 만촌네거리…”. 입력(20%)은 읽히지만 복원 후 전 조건 판독 실패.",
        before: "assets/real2_input.png",
        after: "assets/real2_ours.png",
        beforeLabel: "흐린 입력 · CER 20%",
        afters: [
          { src: "assets/real2_base.png", label: "IMU 없음 · 100%" },
          { src: "assets/real2_ours.png", label: "제안 (IMU) · 100%" },
        ],
        aspect: "1 / 1",
      },
      {
        label:
          "실촬영 · 야외 표지판 — “무단횡단금지”. 강한 블러로 입력부터 전 조건 판독 실패한 최고 난도 사례.",
        before: "assets/real1_input.png",
        after: "assets/real1_ours.png",
        beforeLabel: "흐린 입력 · CER 100%",
        afters: [
          { src: "assets/real1_base.png", label: "IMU 없음 · 100%" },
          { src: "assets/real1_ours.png", label: "제안 (IMU) · 100%" },
        ],
        aspect: "1 / 1",
      },
    ],
    videos: [],
  },

  bibtex: `@mastersthesis{choi2026imudeblur,
  title  = {모바일 IMU 센서 데이터를 활용한 텍스트 이미지 모션 블러 제거 및 OCR 성능 향상 연구},
  author = {최성우},
  school = {경북대학교 대학원 컴퓨터학부 ICT융합전공},
  year   = {2026},
  note   = {지도교수: 이재협. 진행 중}
}`,

  acknowledgements:
    "정직성 고지: 이 페이지의 모든 수치는 실제 수행된 실험(텍스트 클러스터 부트스트랩 95% CI)에서 " +
    "가져왔으며 합성 데이터 중심의 탐색적 결과다. 견고성은 세 학습 시드와 두 평가 인식기" +
    "(EasyOCR·PaddleOCR)로 점검했으나 IMU 충실도 이득은 2/3 시드에서만 재현되었고, 실촬영에서는 " +
    "도메인 갭으로 복원 이득이 전이되지 않았다. 성공 사례와 실패 사례를 함께 전시한다.",
};
