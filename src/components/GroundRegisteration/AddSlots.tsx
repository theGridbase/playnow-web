import React, { useState } from "react";
import { Button, Flex, Form, Switch, TimePicker, message } from "antd";
import styles from "@/styles/components/ground.registration.module.scss";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface Props {
  handleNext: (slots: Record<string, any>) => void;
}

type SlotType = {
  [key: string]: {
    active: boolean;
    times: { start: string; end: string }[];
  };
};

export default function AddSlots({ handleNext }: Props) {
  const [slots, setSlots] = useState<SlotType>(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          active: true,
          times: [{ start: "", end: "" }], // Default to one empty time slot
        },
      }),
      {}
    )
  );

  const onToggleDay = (day: string) => {
    setSlots((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        active: !prev[day].active,
      },
    }));
  };

  const onChangeSlotTime = (
    day: string,
    index: number,
    key: "start" | "end",
    value: any
  ) => {
    const formattedTime = value ? value.format("h:mm A") : ""; // Format time as hh:mm A (AM/PM)
    setSlots((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        times: prev[day].times.map((slot, idx) =>
          idx === index ? { ...slot, [key]: formattedTime } : slot
        ),
      },
    }));
  };

  const addSlot = (day: string) => {
    setSlots((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        times: [...prev[day].times, { start: "", end: "" }],
      },
    }));
  };

  const removeSlot = (day: string, index: number) => {
    setSlots((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        times: prev[day].times.filter((_, idx) => idx !== index),
      },
    }));
  };

  const validateSlots = () => {
    let hasValidSlots = false;

    for (const day of daysOfWeek) {
      const { active, times } = slots[day];

      // Skip inactive days
      if (!active) continue;

      hasValidSlots = true; // At least one day is active

      for (const slot of times) {
        // Ensure all active slots have both start and end times
        if (!slot.start || !slot.end) {
          message.error(
            `Please ensure all slots for ${day} have both start and end times.`
          );
          return false;
        }
      }
    }

    if (!hasValidSlots) {
      message.error("Please configure slots for at least one day.");
      return false;
    }

    return true;
  };

  const onFinish = () => {
    if (validateSlots()) {
      handleNext({ slots: slots });
    }
  };

  return (
    <div className={styles.addSlots}>
      <Form
        layout="vertical"
        name="place-slots"
        onFinish={onFinish}
        autoComplete="off"
        className={styles.addSlotsForm}
      >
        <Flex align="center" justify="flex-end">
          <Button
            type="default"
            shape="round"
            size="large"
            className={styles.button}
            htmlType="submit"
          >
            Next
          </Button>
        </Flex>
        <h1 className={styles.screenName}>Now, set your slots</h1>
        <p className={styles.screenDescription}>You can change it any time</p>
        <div className={styles.formBody}>
          {daysOfWeek.map((day) => (
            <div key={day} className={styles.daySlot}>
              <Flex
                align="center"
                justify="space-between"
                className={styles.dayHeader}
              >
                <h3>{day}</h3>
                <Switch
                  checked={slots[day].active}
                  onChange={() => onToggleDay(day)}
                />
              </Flex>
              {slots[day].active && (
                <div className={styles.slots}>
                  {slots[day].times.map((slot, index) => (
                    <Flex
                      align="center"
                      justify="space-between"
                      key={`${day}-slot-${index}`}
                      className={styles.slotRow}
                    >
                      <TimePicker
                        placeholder="Start Time"
                        use12Hours
                        format="h:mm A"
                        onChange={(value) =>
                          onChangeSlotTime(day, index, "start", value)
                        }
                        className={styles.timePicker}
                      />
                      <TimePicker
                        placeholder="End Time"
                        use12Hours
                        format="h:mm A"
                        onChange={(value) =>
                          onChangeSlotTime(day, index, "end", value)
                        }
                        className={styles.timePicker}
                      />
                      <Button
                        type="link"
                        danger
                        onClick={() => removeSlot(day, index)}
                      >
                        Remove
                      </Button>
                    </Flex>
                  ))}
                  {slots[day].times.length < 7 && (
                    <Button
                      type="link"
                      onClick={() => addSlot(day)}
                      className={styles.addSlotButton}
                    >
                      Add Slot
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Form>
    </div>
  );
}
