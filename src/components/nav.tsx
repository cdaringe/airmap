import Link from "next/link";
import Image from "next/image";
import AirIcon from "./icon/svg/air";
import clsx from "clsx";
export function Nav({ className, ...rest }: React.HTMLProps<HTMLDivElement>) {
  return (
    <nav
      className={clsx(className, "bg-white dark:bg-gray-800 shadow ")}
      {...rest}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div className=" flex items-center">
            <Link href="/">
              <a className="">
                <div>
                  <AirIcon style={{ width: 24 }} />
                </div>
              </a>
            </Link>
            <div className="hidden md:block">
              <div className="ml-2 flex items-baseline space-x-4">
                <Link href="/">
                  <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </a>
                </Link>
                <Link href="/map">
                  <a className="text-gray-800 dark:text-white hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Map
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/">
            <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Home
            </a>
          </Link>
          <Link href="/map">
            <a className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium">
              Map
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
