"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { ReactSVG } from "react-svg";

export interface IconProperties {
  className?: string;
  title?: string;
  description?: string;
  role?: string;
  size:
    | "12"
    | "16"
    | "20"
    | "24"
    | "32"
    | "40"
    | "48"
    | "56"
    | "64"
    | "80"
    | "84";
  name: string;
  stroke?: string;
  fill?: string;
  bordered?: boolean;
  bg?: string;
}

const Icon: React.FC<IconProperties> = ({
  className,
  title,
  description,
  size,
  name,
  fill,
  stroke,
  bordered,
  bg,
  ...props
}) => {
  const [iconType, setIconType] = useState<string>("");
  const iconFile: string | null = useMemo(() => {
    if (name) {
      const fileExt = name.split(".").pop();
      const base: string = `/assets/icons/`;
      setIconType(fileExt || "");
      if (fileExt === "svg" || fileExt === "png") {
        return `${base}${name}`;
      } else {
        return `${base}${name}.svg`;
      }
    } else {
      console.error("No icon name provided!");
      return null;
    }
  }, [name]);
  if (!iconFile || !iconType) return <span>No icon file found!</span>;
  return iconType === "png" ? (
    <Image
      src={iconFile!}
      width={`${size}`}
      height={`${size}`}
      aria-hidden={true}
      alt={name}
    />
  ) : (
    <ReactSVG
      style={{ width: `${size}px`, height: `${size}px` }}
      beforeInjection={(svg: any) => {
        svg.classList.add("stroke-inherit");
        if (fill) svg.classList.add(fill);
        svg.setAttribute("style", `width: ${size}px; height: ${size}px`);
        svg.querySelectorAll("path").forEach((element: any) => {
          stroke && element.setAttribute("stroke", stroke);
          element.setAttribute("stroke-width", "1.4");
        });
      }}
      desc={description}
      evalScripts="always"
      fallback={() => <strong>{name}</strong>}
      httpRequestWithCredentials={true}
      renumerateIRIElements={false}
      src={`${iconFile}`}
      title={title}
      useRequestCache={true}
      wrapper="span"
      aria-hidden={true}
      {...props}
    />
  );
};

Icon.displayName = "Icon";

export default Icon;
