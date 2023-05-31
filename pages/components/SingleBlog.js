import Image from "next/image";
import Link from "next/link";

const SingleBlog = ({ blog }) => {
  if (!blog) {
    return null;
  }
  const { title, categoryName, image, career, slug, publisher, createdAt } =
    blog;
  return (
    <>
      <div
        className=" relative border overflow-hidden rounded-md bg-white shadow-one"
      >
        <Link
          href={`/blog/${slug}`}
          className="relative block h-[220px] w-full"
        >
          <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white">
            Active
          </span>
          <Image src={image} alt="image" fill />
        </Link>
        <div className="p-2 sm:p-2 md:py-2 md:px-2 lg:p-4 xl:py-4 xl:px-2 2xl:p-4">
          <h3>
            <Link
              href={`/blog/${slug}`}
              className="mb-2 block text-sm font-bold text-black hover:text-primary"
            >
              {title}
            </Link>
          </h3>
          <p className="mb-2 border-b border-body-color border-opacity-10 pb-2 text-base font-medium">
            {categoryName}
          </p>
          <div className="flex items-center">
            <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3">
              <div className="mr-4">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={`https://ui-avatars.com/api/name=${publisher}`}
                    alt="author"
                    fill
                  />
                </div>
              </div>
              <div className="w-full">
                <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                  {publisher}
                </h4>
                <p className="text-xs text-body-color">{career}</p>
              </div>
            </div>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                Date
              </h4>
              <p className="text-xs text-body-color">
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
