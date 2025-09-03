
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Children, PropsWithChildren } from "react";

export function Stepper({ children }: PropsWithChildren) {
  const length = Children.count(children);

  return (
    <div className="flex flex-col">
      {Children.map(children, (child, index) => {
        return (
          <div
            className={cn(
              "border-l pl-9 ml-3 relative",
              clsx({
                "pb-5": index < length - 1,
              })
            )}
          >
            <div className="bg-muted w-8 h-8 text-xs font-medium rounded-full border flex items-center justify-center absolute -left-4 font-code">
              {index + 1}
            </div>
            {child}
          </div>
        );
      })}
    </div>
  );
}

export function StepperItem({
  children,
  title,
}: PropsWithChildren & { title?: string }) {
  return (
    <div className="pt-0.5">
      {title && <h4 className="mt-0 font-semibold">{title}</h4>}
      <div>{children}</div>
    </div>
  );
}

/**
 * 단일 Step (Stepper 없이도 독립 사용 가능)
 */
export function Step({
  index,
  title,
  children,
}: PropsWithChildren<{ index: number; title?: string }>) {
  return (
    <div className="flex items-start gap-3">
      {/* 번호 뱃지 */}
      <div className="bg-muted w-8 h-8 text-xs font-medium rounded-full border flex items-center justify-center font-code">
        {index}
      </div>
      {/* 내용 */}
      <div>
        {title && <h4 className="mt-0 font-semibold">{title}</h4>}
        <div>{children}</div>
      </div>
    </div>
  );
}
