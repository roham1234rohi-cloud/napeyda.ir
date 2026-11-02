import type { Metadata } from "next"; import Crumb from "@/components/Crumb"; import PostList from "@/components/PostList"; import { POSTS, POST_CATS, readMin } from "@/content/posts";
export const metadata: Metadata = { title: "وبلاگ", description: "مقالات فارسی آموزش هوش مصنوعی، مهندسی پرامپت و تولید محتوا.", alternates: { canonical: "/blog" } };
export default function Page() { return <div className="wrap page"><Crumb here="وبلاگ" /><h1>وبلاگ</h1><PostList posts={POSTS} cats={POST_CATS} mins={Object.fromEntries(POSTS.map(p => [p.slug, readMin(p)]))} /></div>; }
