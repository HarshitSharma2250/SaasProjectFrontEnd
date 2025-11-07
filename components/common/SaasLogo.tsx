export default function SaasLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="130"
      height="40"
      viewBox="0 0 200 60"
      fill="none"
    >
      {/* Icon (S shape inside box) */}
      <rect
        x="2"
        y="5"
        width="48"
        height="48"
        rx="10"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="4"
      />
      <path
        d="M22 20C22 16 30 14 36 18C38 20 36 24 32 26C28 28 24 29 22 32C20 35 24 40 30 40C36 40 40 38 40 38"
        stroke="#7C3AED"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Text */}
      <text
        x="60"
        y="28"
        fontSize="20"
        fontFamily="Poppins, sans-serif"
        fontWeight="600"
        fill="#7C3AED"
      >
        SaaS
      </text>
      <text
        x="60"
        y="48"
        fontSize="18"
        fontFamily="Poppins, sans-serif"
        fontWeight="500"
        fill="#7C3AED"
      >
        Project
      </text>
    </svg>
  );
}
