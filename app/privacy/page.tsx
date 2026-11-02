import type { Metadata } from "next"; import LegalPage from "@/components/LegalPage"; import { LEGAL } from "@/content/legal";
const l = LEGAL["privacy"];
export const metadata: Metadata = { title: l.title, description: l.desc, alternates: { canonical: "/privacy" } };
export default function Page() { return <LegalPage slug="privacy" />; }
