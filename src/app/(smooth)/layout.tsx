
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function SmoothLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  


  return (
    <SmoothScrollProvider>
      {children}
    </SmoothScrollProvider>
  );
}
