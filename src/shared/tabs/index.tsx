"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FC,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { format } from "url";

interface ITabBar {
  tabs: {
    name: string;
    count?: number;
    reactIcon?: ReactNode;
    component?: ReactNode;
    body?: ReactNode;
  }[];
  className?: string;
  tabContainerClassName?: string;
  variant?: "button" | "link";
  fullWidth?: boolean;
  handleClick?: () => void;
}

const TabBar: FC<PropsWithChildren<ITabBar>> = ({
  children,
  tabs,
  className,
  tabContainerClassName,
  variant = "button",
  fullWidth = false,
  handleClick,
}) => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = params.size
    ? Object.fromEntries(params.entries())?.tab
    : tabs[0]?.name?.toLowerCase();

  const stripRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indicator, setIndicator] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const updateIndicator = useCallback(() => {
    if (variant !== "button") return;
    const idx = tabs.findIndex((t) => t.name.toLowerCase() === activeTab);
    if (idx < 0) return;
    const tabEl = tabRefs.current[idx];
    const strip = stripRef.current;
    if (!tabEl || !strip) return;
    const s = strip.getBoundingClientRect();
    const t = tabEl.getBoundingClientRect();
    setIndicator({
      left: t.left - s.left,
      top: t.top - s.top,
      width: t.width,
      height: t.height,
    });
  }, [activeTab, tabs, variant]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    const strip = stripRef.current;
    strip?.addEventListener("scroll", updateIndicator, { passive: true });
    return () => {
      window.removeEventListener("resize", updateIndicator);
      strip?.removeEventListener("scroll", updateIndicator);
    };
  }, [updateIndicator]);

  const renderComponent = tabs?.find(
    (e) => e?.name?.toLowerCase() === activeTab,
  )?.component;

  return (
    <div className={clsx("flex flex-col gap-6 min-h-0", className)}>
      <div className="relative shrink-0">
        <div
          ref={stripRef}
          className={clsx(
            "relative flex overflow-x-auto w-max [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            {
              "gap-x-1 rounded-[10px] bg-gray-50 p-1": variant === "button",
              "gap-x-4": variant === "link",
            },
            tabContainerClassName,
          )}
        >
          {variant === "button" && (
            <div
              className={clsx(
                "pointer-events-none absolute z-0 rounded-[6px] bg-white shadow-sm transition-[left,top,width,height,opacity] duration-300 ease-out",
                indicator.width === 0 && "opacity-0",
              )}
              style={{
                left: indicator.left,
                top: indicator.top,
                width: indicator.width,
                height: indicator.height,
              }}
              aria-hidden
            />
          )}
          {tabs?.map((item, i) => {
            const isActive = activeTab === item?.name.toLowerCase();
            return (
              <div
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                className={clsx(
                  "relative z-10 flex gap-x-2 text-nowrap font-semibold items-center justify-center cursor-pointer text-center text-sm transition-colors duration-200",
                  { "w-full": fullWidth },
                  {
                    "py-2 px-4": variant === "button",
                    "px-1 border-b-2 border-b-transparent": variant === "link",
                  },
                  variant === "link" &&
                    (Boolean(item?.count?.toString()) ? "pb-4" : "pb-3"),
                  variant === "button" &&
                    (isActive ? "text-secondary" : "text-quaternary"),
                  variant === "link" &&
                    (isActive
                      ? "z-10 !text-brand-secondary border-b-2 !border-b-brand-tertiary"
                      : "text-quaternary"),
                )}
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                key={item?.name}
                onClick={() => {
                  router.push(
                    format({
                      pathname: pathname,
                      query: { tab: item?.name?.toLowerCase() },
                    }),
                  );
                  handleClick?.();
                }}
              >
                {item?.reactIcon} {item?.name}
                {Boolean(item?.count) && (
                  <div
                    className={clsx(
                      "bg-white border flex text-gray-700 flex-col justify-center items-center border-gray-200 text-xs rounded-full",
                      item?.count && item.count.toString().length > 1
                        ? "px-2 h-6"
                        : "h-6 w-6",
                    )}
                  >
                    {item?.count}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {variant === "link" && (
          <div className="h-[1px] -mt-[2px] w-full border-b border-secondary absolute" />
        )}
      </div>
      {children}
      {renderComponent ? (
        <div
          key={String(activeTab)}
          className="min-h-0 flex flex-1 flex-col animate-tab-panel-slide"
        >
          {renderComponent}
        </div>
      ) : null}
    </div>
  );
};

export default TabBar;
