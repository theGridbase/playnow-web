import { IPlaceType } from "@/app/_lib/interfaces";
import React from "react";
import Icon from "../ui/Icon/Icon";
import colorVariables from "@/styles/variables.module.scss";
import styles from "@/styles/components/tile.module.scss";

interface Props extends IPlaceType {
  isSelected?: boolean;
  onClick: (id: string) => void;
}

export default function Tile({
  name,
  _id,
  icon: iconName,
  isSelected,
  onClick,
}: Props) {
  return (
    <div
      className={`${styles.tile} ${isSelected && styles.selectedTile}`}
      onClick={() => onClick(_id)}
    >
      <Icon name={iconName.toString()} size="56" />
      <p>{name}</p>
    </div>
  );
}
