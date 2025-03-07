import type { Meta, StoryObj } from "@storybook/react";

import { Chart, registerables } from "chart.js";
import ChartjsPluginStacked100 from "../index";

import { Bar } from "react-chartjs-2";

Chart.register(...registerables, ChartjsPluginStacked100);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "React Chartjs 2",
  component: Bar,
  parameters: {
    // Optional parameter to center the component in the Canvas.
    // More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry:
  // https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked:
  // https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Bar>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Story1: Story = {
  name: "Bar",
  args: {
    data: {
      labels: ["Foo", "Bar"],
      datasets: [
        { label: "bad", data: [5, 25], backgroundColor: "rgba(244, 143, 177, 0.6)" },
        { label: "better", data: [15, 10], backgroundColor: "rgba(255, 235, 59, 0.6)" },
        { label: "good", data: [10, 8], backgroundColor: "rgba(100, 181, 246, 0.6)" },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: {
        stacked100: { enable: true },
      },
    },
  },
};
