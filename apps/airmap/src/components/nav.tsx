/* eslint-disable react/no-children-prop */
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import AirIcon from "./icon/svg/air";

const NavHomeIcon = () => (
  <Link {...{ legacyBehavior: true, href: "/" }}>
    <a className="">
      <div>
        <AirIcon style={{ width: 24 }} />
      </div>
    </a>
  </Link>
);

const NavLinkSmall = ({
  className,
  href,
  children,
}: {
  className: string;
  href: string;
  children: React.ReactNode;
}) => (
  <Link {...{ legacyBehavior: true, href }}>
    <a
      className={`block px-3 py-2 text-base font-medium text-gray-800 rounded-md dark:text-white ${className}`}
    >
      {children}
    </a>
  </Link>
);
const NavLinkMedium = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link {...{ legacyBehavior: true, href }}>
      <a className="px-3 py-2 text-sm font-medium text-gray-800 rounded-md dark:text-white hover:text-gray-800 dark:hover:text-white">
        {children}
      </a>
    </Link>
  );
};

const HamburgerMenu = ({ onClick }: { onClick: () => void }) => {
  return (
    <button aria-label="Toggle menu" className="p-2" onClick={onClick}>
      <div className="w-6 h-0.5 bg-gray-300 mb-1"></div>
      <div className="w-6 h-0.5 bg-gray-300 mb-1"></div>
      <div className="w-6 h-0.5 bg-gray-300"></div>
    </button>
  );
};

export function Nav({ className, ...rest }: React.HTMLProps<HTMLDivElement>) {
  const [isOpen, setIsOpen] = React.useState(true);
  const links = [
    { href: "/", children: "Home" },
    { href: "/map", children: "Map" },
    { href: "/charts", children: "Charts" },
    { href: "/gps", children: "GPS" },
    { href: "/convert", children: "Convert" },
  ];
  return (
    <nav
      className={clsx(className, "bg-white dark:bg-gray-800 shadow ")}
      {...rest}
    >
      <div className="px-8 mx-auto">
        <div className="flex items-center justify-between  h-16">
          <NavHomeIcon />
          <div className="flex items-center ">
            <div className="hidden md:block">
              <div className="flex items-baseline ml-2 space-x-4">
                {links.map((link) => (
                  <NavLinkMedium key={link.href} {...link} />
                ))}
              </div>
            </div>
          </div>
          <div className="md:hidden ">
            <HamburgerMenu onClick={() => setIsOpen((prev) => !prev)} />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <div
          className={clsx("px-2 pt-2 space-y-1", { "pb-3": isOpen }, "sm:px-3")}
        >
          {links.map((link) => (
            <NavLinkSmall
              key={link.href}
              className={clsx({ "absolute -top-4 -z-10": !isOpen })}
              {...link}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
