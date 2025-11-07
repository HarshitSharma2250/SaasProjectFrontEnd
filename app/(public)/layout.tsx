// app/(public)/layout.js
// 'use client';

export default function PublicLayout({ children }:{children:React.ReactNode}) {
  return (
    <div className="">
      <div className="">
        {children}
      </div>
    </div>
  );
}
