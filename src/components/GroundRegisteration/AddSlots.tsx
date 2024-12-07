import dayjs from "dayjs";
import React, { useState } from "react";
import { Button, Divider, Flex, Form, Input, Select, Switch, TimePicker } from "antd";
import styles from "@/styles/components/ground.registration.module.scss";
import { useNotification } from "../context/NotificationContext/NotificationContextProvider";
import Icon from "../ui/Icon/Icon";

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
  handlePrev: () => void;
}

type SlotType = {
  [key: string]: {
    active: boolean;
    times: { start: string; end: string; price?: number }[];
  };
};

const selectBefore = (
  <Select
    defaultValue="PKR"
    options={[{ value: "PKR", label: "Rs." }]}
    suffixIcon={<Icon name="downarrow.svg" size="12" />}
  />
);

export default function AddSlots({ handleNext,handlePrev }: Props) {
  const { openNotification } = useNotification();
  const [slots, setSlots] = useState<SlotType>(
    daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: {
          active: true,
          times: [{ start: "", end: "", price: undefined }],
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

  const onChangeSlot = (
    day: string,
    index: number,
    key: "start" | "end" | "price",
    value: any
  ) => {
    const formattedValue =
      key === "price" ? value : value ? value.format("HH:mm") : "";

    setSlots((prev) => {
      if (day === "Monday" && index === 0) {
        const updatedSlots = { ...prev };
        daysOfWeek.forEach((d) => {
          updatedSlots[d].times[0] = {
            ...updatedSlots[d].times[0],
            [key]: formattedValue,
          };
        });
        return updatedSlots;
      }
      return {
        ...prev,
        [day]: {
          ...prev[day],
          times: prev[day].times.map((slot, idx) =>
            idx === index ? { ...slot, [key]: formattedValue } : slot
          ),
        },
      };
    });
  };

  const addSlot = (day: string) => {
    setSlots((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        times: [...prev[day].times, { start: "", end: "", price: undefined }],
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
    for (const day of daysOfWeek) {
      const { active, times } = slots[day];
      if (!active) continue;

      for (const slot of times) {
        if (
          !slot.start ||
          !slot.end ||
          slot.price === undefined ||
          slot.price <= 0
        ) {
          openNotification(
            "error",
            "Error!",
            `Ensure all slots for ${day} have start, end times, and a valid price.`
          );
          return false;
        }
      }
    }
    return true;
  };

  const onFinish = () => {
    if (validateSlots()) {
      const updatedSlots = Object.fromEntries(
        Object.entries(slots).map(([day, { active, times }]) => [
          day,
          {
            active,
            times: times.map((slot) => ({
              ...slot,
              price: slot.price ?? 0,
            })),
          },
        ])
      );
      handleNext({ slots: updatedSlots });
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
         <Flex align="center" justify="space-between">
        <Button
          type="default"
          shape="round"
          size="large"
          className={styles.button}
          onClick={() => handlePrev()}
        >
          Back
        </Button>
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
        <div className={styles.formBody}>
          {daysOfWeek.map((day) => (
            <div key={day} className={styles.daySlot} >
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
                <div className={styles.slots} >
                  {slots[day].times.map((slot, index) => (
                    <React.Fragment key={`${day}-slot-${index}`}>
                      <Flex 
                        align="center"
                        justify="space-between"
                        className={`${styles.slotRow} mb-small`}
                      >
                        <TimePicker
                          placeholder="Start Time"
                          use12Hours
                          format="h:mm A"
                          value={slot.start ? dayjs(slot.start, "HH:mm") : null}
                          onChange={(value) =>
                            onChangeSlot(day, index, "start", value)
                          }
                          className={styles.timePicker}
                        />
                        <TimePicker
                          placeholder="End Time"
                          use12Hours
                          format="h:mm A"
                          value={slot.end ? dayjs(slot.end, "HH:mm") : null}
                          onChange={(value) =>
                            onChangeSlot(day, index, "end", value)
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
                      <Input
                        placeholder="Price"
                        type="number"
                        min={1}
                        value={slot.price ?? ""}
                        onChange={(e) =>
                          onChangeSlot(
                            day,
                            index,
                            "price",
                            Number(e.target.value)
                          )
                        }
                        addonBefore={selectBefore}
                        addonAfter={"/Hr"}
                        className={styles.priceInput}
                      />
                      <Divider />
                    </React.Fragment>
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
