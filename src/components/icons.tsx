import type { IconName } from "@/content/paper";

const common = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Paper() {
  return (
    <svg {...common}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

function Arxiv() {
  return (
    <svg {...common}>
      <path d="M4 4l16 16M20 4L4 20" opacity="0" />
      <path d="M6 4l7 16M18 4l-7 10" />
      <path d="M4 20h6" />
    </svg>
  );
}

function Code() {
  return (
    <svg {...common}>
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" />
    </svg>
  );
}

function Video() {
  return (
    <svg {...common}>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3z" />
    </svg>
  );
}

function Data() {
  return (
    <svg {...common}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

function Poster() {
  return (
    <svg {...common}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  );
}

function HuggingFace() {
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10h.01M15 10h.01" />
      <path d="M8.5 14a4 4 0 0 0 7 0" />
    </svg>
  );
}

const map: Record<IconName, () => React.ReactElement> = {
  paper: Paper,
  arxiv: Arxiv,
  code: Code,
  video: Video,
  data: Data,
  poster: Poster,
  huggingface: HuggingFace,
};

export function Icon({ name }: { name: IconName }) {
  const Cmp = map[name] ?? Paper;
  return <Cmp />;
}

export function CopyIcon() {
  return (
    <svg {...common} width={16} height={16}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg {...common} width={16} height={16}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
