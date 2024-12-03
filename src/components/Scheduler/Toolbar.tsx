import React, { useState } from "react";
import { ToolbarProps } from "react-big-calendar";
import styles from "@/styles/components/toolbar.module.scss";
import Icon from "../ui/Icon/Icon";

type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  desc?: string;
};

const CustomToolbar: React.FC<ToolbarProps<Event, object>> = ({
  onNavigate,
  onView,
  view,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
    // Add search logic here
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarLeftSection}>
        <button
          onClick={() => onNavigate("PREV")}
          className={styles.actionprevBtn}
        >
          <Icon name="prev.svg" size="20" />
        </button>
        <button
          onClick={() => onNavigate("NEXT")}
          className={styles.actionnextBtn}
        >
          <Icon name="next.svg" size="20" />
        </button>
      </div>

      {/* Center Section: View Buttons */}
      <div className={styles.toolbarCenterSection}>
        <button
          className={view === "month" ? styles.active : ""}
          onClick={() => onView("month")}
        >
          Month
        </button>
        <button
          className={view === "week" ? styles.active : ""}
          onClick={() => onView("week")}
        >
          Week
        </button>
        <button
          className={view === "day" ? styles.active : ""}
          onClick={() => onView("day")}
        >
          Day
        </button>
      </div>

      {/* Right Section: Search */}
      <div className={styles.toolbarRightSection}>
        <div className={styles.searchContainer}>
          <Icon name="search.svg" size="20" className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomToolbar;
