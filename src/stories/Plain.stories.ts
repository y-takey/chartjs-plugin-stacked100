import type { Meta, StoryObj } from "@storybook/react";

import { StackedBarChart } from "./StackedBarChart";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta = {
  title: "Plain",
  component: StackedBarChart,
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
} satisfies Meta<typeof StackedBarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

const COLORS = {
  red: "rgba(244, 143, 177, 0.6)",
  yellow: "rgba(255, 235, 59, 0.6)",
  blue: "rgba(100, 181, 246, 0.6)",
  green: "rgba(51, 255, 74, 0.4)",
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Story1: Story = {
  name: "1. basic pattern",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar"],
      datasets: [
        { label: "bad", data: [5, 25], backgroundColor: COLORS.red },
        { label: "better", data: [15, 10], backgroundColor: COLORS.yellow },
        { label: "good", data: [10, 8], backgroundColor: COLORS.blue },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: { stacked100: { enable: true } },
    },
  },
};

export const Story2: Story = {
  name: "2. stack group pattern",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar"],
      datasets: [
        { label: "L1", stack: "Stack 0", data: [3, 2], backgroundColor: COLORS.red },
        { label: "L2", stack: "Stack 0", data: [1, 1], backgroundColor: COLORS.yellow },
        { label: "L1", stack: "Stack 1", data: [0, 3], backgroundColor: COLORS.blue },
        { label: "L2", stack: "Stack 1", data: [1, 4], backgroundColor: COLORS.green },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: { stacked100: { enable: true } },
    },
  },
};

export const Story3: Story = {
  name: "3. stacked vertical bar",
  args: {
    type: "bar",
    data: {
      labels: ["Hoge", "Fuga"],
      datasets: [
        { label: "L1", data: [10, 9], backgroundColor: COLORS.red },
        { label: "L2", data: [20, 6], backgroundColor: COLORS.yellow },
        { label: "L3", data: [30, 3], backgroundColor: COLORS.blue },
      ],
    },
    options: {
      plugins: { stacked100: { enable: true } },
    },
  },
};

export const Story4: Story = {
  name: "4. stacked area",
  args: {
    type: "line",
    data: {
      labels: ["2017-10-18", "2017-10-19", "2017-10-20"],
      datasets: [
        { label: "L1", fill: true, data: [1, 2, 0], backgroundColor: COLORS.red },
        { label: "L2", fill: true, data: [1, 1, 3], backgroundColor: COLORS.yellow },
        { label: "L3", fill: true, data: [1, 1, 2], backgroundColor: COLORS.blue },
        { label: "L4", fill: true, data: [1, 3, 1], backgroundColor: COLORS.green },
      ],
    },
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
      plugins: { stacked100: { enable: true } },
    },
  },
};

export const Story5: Story = {
  name: "5. stacked area with objects as data points",
  args: {
    type: "line",
    data: {
      labels: ["2017-10-18", "2017-10-19", "2017-10-20"],
      datasets: [
        {
          label: "L1",
          fill: true,
          data: [
            { x: "2017-10-18", y: 1 },
            { x: "2017-10-19", y: 2 },
            { x: "2017-10-20", y: 0 },
          ],
          backgroundColor: COLORS.red,
        },
        {
          label: "L2",
          fill: true,
          data: [
            { x: "2017-10-18", y: 1 },
            { x: "2017-10-19", y: 1 },
            { x: "2017-10-20", y: 3 },
          ],
          backgroundColor: COLORS.yellow,
        },
        {
          label: "L3",
          fill: true,
          data: [
            { x: "2017-10-18", y: 1 },
            { x: "2017-10-19", y: 1 },
            { x: "2017-10-20", y: 2 },
          ],
          backgroundColor: COLORS.blue,
        },
        {
          label: "L4",
          fill: true,
          data: [
            { x: "2017-10-18", y: 1 },
            { x: "2017-10-19", y: 3 },
            { x: "2017-10-20", y: 1 },
          ],
          backgroundColor: COLORS.green,
        },
      ],
    },
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
      plugins: { stacked100: { enable: true } },
    },
  },
};
export const Story6: Story = {
  name: "6. horizontal bar chart with objects as data points",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar"],
      datasets: [
        {
          label: "bad",
          data: [
            { x: 5, y: "Foo" },
            { x: 25, y: "Bar" },
          ],
          backgroundColor: COLORS.red,
        },
        {
          label: "better",
          data: [
            { x: 15, y: "Foo" },
            { x: 10, y: "Bar" },
          ],
          backgroundColor: COLORS.yellow,
        },
        {
          label: "good",
          data: [
            { x: 10, y: "Foo" },
            { x: 8, y: "Bar" },
          ],
          backgroundColor: COLORS.blue,
        },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: { stacked100: { enable: true } },
    },
  },
};

export const Story7: Story = {
  name: "7. Negative values",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar"],
      datasets: [
        { label: "bad", data: [-5, 25], backgroundColor: COLORS.red },
        { label: "better", data: [15, -10], backgroundColor: COLORS.yellow },
        { label: "good", data: [10, 8], backgroundColor: COLORS.blue },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: {
        stacked100: { enable: true, fixNegativeScale: true },
      },
    },
  },
};

export const Story8: Story = {
  name: "8. Different data length",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar", "Baz", "Quuz"],
      datasets: [
        { label: "bad", data: [-5, 25], backgroundColor: COLORS.red },
        { label: "better", data: [15, -10, 6, 4], backgroundColor: COLORS.yellow },
        { label: "good", data: [10, 8, 11], backgroundColor: COLORS.blue },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: {
        stacked100: { enable: true, fixNegativeScale: true },
      },
    },
  },
};

export const Story9: Story = {
  name: "9. Objects as data points with undefined value",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar", "Baz", "Quuz"],
      datasets: [
        {
          label: "bad",
          data: [
            { x: 0, y: -5 },
            { x: 1, y: 25 },
            { x: 2, y: undefined },
            { x: 3, y: undefined },
          ],
          backgroundColor: COLORS.red,
        },
        {
          label: "better",
          data: [
            { x: 0, y: 15 },
            { x: 1, y: -10 },
            { x: 2, y: 6 },
            { x: 3, y: 4 },
          ],
          backgroundColor: COLORS.yellow,
        },
        {
          label: "good",
          data: [
            { x: 0, y: 10 },
            { x: 1, y: 8 },
            { x: 2, y: 11 },
            { x: 3, y: undefined },
          ],
          backgroundColor: COLORS.blue,
        },
      ],
    },
    options: {
      indexAxis: "x",
      plugins: { stacked100: { enable: true } },
    },
  },
};

export const Story10: Story = {
  name: "10. Relative percentage to maxium value",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar"],
      datasets: [
        { label: "bad", data: [5, 25], backgroundColor: COLORS.red },
        { label: "better", data: [15, 10], backgroundColor: COLORS.yellow },
        { label: "good", data: [10, 8], backgroundColor: COLORS.blue },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: {
        stacked100: { enable: true, individual: true },
      },
    },
  },
};

export const Story11: Story = {
  name: "11. Relative percentage with stack",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar"],
      datasets: [
        { label: "L1", stack: "Stack 0", data: [3, 2], backgroundColor: COLORS.red },
        { label: "L2", stack: "Stack 0", data: [1, 1], backgroundColor: COLORS.yellow },
        { label: "L1", stack: "Stack 1", data: [0, 3], backgroundColor: COLORS.blue },
        { label: "L2", stack: "Stack 1", data: [1, 4], backgroundColor: COLORS.green },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: { stacked100: { enable: true, individual: true } },
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
  },
};

export const Story12: Story = {
  name: "12. Multiple axis(combo horizontal bar/line)",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar"],
      datasets: [
        {
          label: "bad",
          data: [5, 25],
          backgroundColor: COLORS.red,
          xAxisID: "axis1",
        },
        {
          label: "better",
          data: [15, 10],
          backgroundColor: COLORS.yellow,
          xAxisID: "axis1",
        },
        {
          type: "line",
          label: "good",
          data: [43, 24],
          backgroundColor: COLORS.blue,
          xAxisID: "axis2",
        },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: { stacked100: { enable: true, axisId: "axis1" } },
      scales: {
        y: {
          stacked: true,
        },
        axis1: {
          position: "top",
        },
        axis2: {
          position: "bottom",
        },
      },
    },
  },
};

export const Story13: Story = {
  name: "13. Multiple axis(combo vertical bar/line)",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar"],
      datasets: [
        {
          label: "bad",
          data: [5, 25],
          backgroundColor: COLORS.red,
          yAxisID: "axis1",
        },
        {
          label: "better",
          data: [15, 10],
          backgroundColor: COLORS.yellow,
          yAxisID: "axis1",
        },
        {
          type: "line",
          label: "good",
          data: [43, 24],
          backgroundColor: COLORS.blue,
          yAxisID: "axis2",
        },
      ],
    },
    options: {
      plugins: { stacked100: { enable: true, axisId: "axis1" } },
      scales: {
        x: {
          stacked: true,
        },
        axis1: {
          position: "left",
        },
        axis2: {
          position: "right",
        },
      },
    },
  },
};

export const Story14: Story = {
  name: "14. Multiple axis with stack(combo horizontal bar/line)",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar"],
      datasets: [
        {
          label: "bad",
          data: [5, 25],
          backgroundColor: COLORS.red,
          stack: "stack 0",
          xAxisID: "axis1",
        },
        {
          label: "better",
          data: [15, 10],
          backgroundColor: COLORS.yellow,
          stack: "stack 0",
          xAxisID: "axis1",
        },
        {
          label: "good",
          data: [10, 20],
          backgroundColor: COLORS.blue,
          stack: "stack 1",
          xAxisID: "axis1",
        },
        {
          label: "very good",
          data: [5, 24],
          backgroundColor: COLORS.green,
          stack: "stack 1",
          xAxisID: "axis1",
        },
        {
          type: "line",
          label: "L1",
          data: [43, 24],
          xAxisID: "axis2",
        },
      ],
    },
    options: {
      indexAxis: "y",
      plugins: { stacked100: { enable: true, axisId: "axis1" } },
      scales: {
        axis1: {
          position: "top",
        },
        axis2: {
          position: "bottom",
        },
      },
    },
  },
};

export const Story15: Story = {
  name: "15. Multiple stacked axis with stack(combo vertical bar/line)",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar"],
      datasets: [
        {
          label: "bad",
          data: [5, 25],
          backgroundColor: COLORS.red,
          stack: "stack 0",
          yAxisID: "axis1",
        },
        {
          label: "better",
          data: [15, 10],
          backgroundColor: COLORS.yellow,
          stack: "stack 0",
          yAxisID: "axis1",
        },
        {
          label: "good",
          data: [10, 20],
          backgroundColor: COLORS.blue,
          stack: "stack 1",
          yAxisID: "axis1",
        },
        {
          label: "very good",
          data: [5, 24],
          backgroundColor: COLORS.green,
          stack: "stack 1",
          yAxisID: "axis1",
        },
        {
          type: "line",
          label: "L1",
          data: [43, 24],
          yAxisID: "axis2",
        },
      ],
    },
    options: {
      plugins: { stacked100: { enable: true, axisId: "axis1" } },
      scales: {
        axis1: {
          position: "left",
        },
        axis2: {
          position: "right",
        },
      },
    },
  },
};

export const Story16: Story = {
  name: "16. horizontal bar chart with parsing option",
  args: {
    type: "bar",
    data: {
      labels: ["Foo", "Bar"],
      datasets: [
        {
          label: "bad",
          data: [
            { foo: 5, bar: "Foo" },
            { foo: 25, bar: "Bar" },
          ],
          backgroundColor: COLORS.red,
        },
        {
          label: "better",
          data: [
            { foo: 15, bar: "Foo" },
            { foo: 10, bar: "Bar" },
          ],
          backgroundColor: COLORS.yellow,
        },
        {
          label: "good",
          data: [
            { foo2: 10, bar2: "Foo" },
            { foo2: 8, bar2: "Bar" },
          ],
          parsing: { xAxisKey: "foo2", yAxisKey: "bar2" },
          backgroundColor: COLORS.blue,
        },
      ],
    },
    options: {
      indexAxis: "y",
      parsing: { xAxisKey: "foo", yAxisKey: "bar" },
      plugins: { stacked100: { enable: true } },
    },
  },
};

export const Story17: Story = {
  name: "17. Complex parsing options",
  args: {
    type: "bar",
    data: {
      labels: ["Alice", "Bob"],
      datasets: [
        {
          label: "bad",
          data: [{ count: 1, user: "Alice" }],
          backgroundColor: COLORS.red,
          parsing: {
            xAxisKey: "user",
            yAxisKey: "count",
          },
        },
        {
          label: "better",
          data: [{ count: 2, user: "Bob" }],
          backgroundColor: COLORS.yellow,
          parsing: {
            xAxisKey: "user",
            yAxisKey: "count",
          },
        },
        {
          label: "good",
          data: [
            { count: 3, user: "Alice" },
            { count: 1, user: "Bob" },
          ],
          backgroundColor: COLORS.blue,
          parsing: {
            xAxisKey: "user",
            yAxisKey: "count",
          },
        },
      ],
    },
    options: {
      plugins: {
        stacked100: {
          enable: true,
        },
      },
    },
  },
};
