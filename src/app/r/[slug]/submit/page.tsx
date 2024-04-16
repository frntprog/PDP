import { Editor } from "@/components/Editor";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import BasicModal from "../modal/page";

interface pageProps {
  params: {
    slug: string;
  };
  searchParams: Record<string, string> | null | undefined;
}

const page = async ({ params, searchParams }: pageProps) => {
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
  });

  const showModal = searchParams?.modal;

  if (!subreddit) return notFound();

  return (
    <div className="flex flex-col items-start gap-6">
      {/* heading */}
      <div className="border-b border-gray-200 pb-5 w-full">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Create Post
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            in r/{params.slug}
          </p>
          <Link
            href={`r/${params.slug}/submit/?modal=true`}
            className="ml-auto mt-2 text-base leading-4 text-gray-700 cursor-pointer"
          >
            Text AI
          </Link>
        </div>
      </div>

      {/* form */}
      <Editor subredditId={subreddit.id} />

      <div className="w-full flex justify-end">
        <Button type="submit" className="w-full" form="subreddit-post-form">
          Post
        </Button>
      </div>
      {/* @ts-expect-error Server Component */}
      {showModal && <BasicModal params={params} />}
    </div>
  );
};

export default page;
