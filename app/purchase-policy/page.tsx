import type { Metadata } from "next"; import LegalPage from "@/components/LegalPage"; import { LEGAL } from "@/content/legal";
const l = LEGAL["purchase-policy"];
export const metadata: Metadata = { title: l.title, description: l.desc, alternates: { canonical: "/purchase-policy" } };
export default function Page() { return <LegalPage slug="purchase-policy" />; }
