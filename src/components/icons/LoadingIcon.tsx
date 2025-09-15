interface LoadingIconProps {
  color: string;
}
export default function LoadingIcon({ color }: LoadingIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle fill={color} strokeWidth="20" r="20" cx="40" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2"
          values="65;110;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        ></animate>
        <animate attributeName="opacity" dur="2" values="0.3;1;0.3;" repeatCount="indefinite" begin="-.4"></animate>
      </circle>
      <circle fill={color} stroke={color} strokeWidth="20" r="20" cx="100" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2"
          values="65;110;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        ></animate>
        <animate attributeName="opacity" dur="2" values="0.3;1;0.3;" repeatCount="indefinite" begin="-.2"></animate>
      </circle>
      <circle fill={color} stroke={color} strokeWidth="20" r="20" cx="160" cy="65">
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2"
          values="65;110;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        ></animate>
        <animate attributeName="opacity" dur="2" values="0.3;1;0.3;" repeatCount="indefinite" begin="0"></animate>
      </circle>
    </svg>
  );
}
