interface EyeIconProps {
  color: string;
}

export default function EyeIcon({ color }: EyeIconProps) {
  return (
    <div className="w-5 h-5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none" />
        <path
          d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
        <circle
          cx="128"
          cy="128"
          r="40"
          fill={color}
          stroke="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="16"
        />
      </svg>
    </div>
  );
}
