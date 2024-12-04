import { useMemo } from "react";
import { DateLocalizer, Navigate, ViewProps, Views } from "react-big-calendar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Row, Col } from "antd"; // Import from Ant Design
// import "antd/dist/antd.css"; // Import Ant Design styles

export default function YearView({
  date,
  localizer,
  onView,
  onNavigate,
  events,
}: ViewProps) {
  const currRange = YearView.range(date, { localizer });

  return (
    <Row gutter={[16, 16]}>
      {currRange.map((month, index) => {
        return (
          <Col span={6} key={index}> {/* Use span for grid layout */}
            <Calendar
              activeStartDate={month}
              tileClassName={({ date, view }) => {
                if (
                  view === "month" &&
                  events?.find((event) =>
                    moment(event.start).isSame(moment(date), "day")
                  )
                )
                  return "event-day";
                return null;
              }}
              onClickDay={(day) => {
                onView && onView(Views.DAY);
                onNavigate(day);
              }}
            />
          </Col>
        );
      })}
    </Row>
  );
}

YearView.range = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  const start = localizer.startOf(date, "year");
  const end = localizer.endOf(date, "year");

  const range = [];
  let current = start;

  while (localizer.lte(current, end, "year")) {
    range.push(current);
    current = localizer.add(current, 1, "month");
  }

  return range;
};

YearView.navigate = (
  date: Date,
  action: any,
  { localizer }: { localizer: DateLocalizer }
) => {
  if (action instanceof Date) return action;

  switch (action) {
    case Navigate.NEXT:
      return localizer.add(date, 1, "year");
    case Navigate.PREVIOUS:
      return localizer.add(date, -1, "year");
    default:
      return date;
  }
};

YearView.title = (date: Date, { localizer }: { localizer: DateLocalizer }) => {
  return localizer.format(date, "YYYY");
};
