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
      <div className="px-8 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center ">
            <Link href="/">
              <a className="">
                <div>
                  <AirIcon style={{ width: 24 }} />
                </div>
              </a>
            </Link>
            <div className="hidden md:block">
              <div className="flex items-baseline ml-2 space-x-4">
                <Link href="/">
                  <a className="px-3 py-2 text-sm font-medium text-gray-800 rounded-md dark:text-white hover:text-gray-800 dark:hover:text-white">
                    Home
                  </a>
                </Link>
                <Link href="/map">
                  <a className="px-3 py-2 text-sm font-medium text-gray-800 rounded-md dark:text-white hover:text-gray-800 dark:hover:text-white">
                    Map
                  </a>
                </Link>
                <Link href="/charts">
                  <a className="px-3 py-2 text-sm font-medium text-gray-800 rounded-md dark:text-white hover:text-gray-800 dark:hover:text-white">
                    Charts
                  </a>
                </Link>
                <Link href="/gps">
                  <a className="px-3 py-2 text-sm font-medium text-gray-800 rounded-md dark:text-white hover:text-gray-800 dark:hover:text-white">
                    GPS
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
            <a className="block px-3 py-2 text-base font-medium text-gray-800 rounded-md dark:text-white">
              Home
            </a>
          </Link>
          <Link href="/map">
            <a className="block px-3 py-2 text-base font-medium text-gray-800 rounded-md dark:text-white">
              Map
            </a>
          </Link>
          <Link href="/charts">
            <a className="block px-3 py-2 text-base font-medium text-gray-800 rounded-md dark:text-white">
              Charts
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
