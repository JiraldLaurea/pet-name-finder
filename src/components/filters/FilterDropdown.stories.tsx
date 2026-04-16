import type { Meta, StoryObj } from "@storybook/react";
import FilterDropdown from "./FilterDropdown";

const mockGroup = {
    id: "funny",
    label: "Funny",
    categoryIds: ["019c8a34-362d-7087-99c4-1a4eb48d3f6b"],
};

const meta: Meta<typeof FilterDropdown> = {
    title: "Filters/FilterDropdown",
    component: FilterDropdown,
};

export default meta;

type Story = StoryObj<typeof FilterDropdown>;

export const Default: Story = {
    args: {
        group: mockGroup,
        activeGroupId: null,
        onToggle: () => {},
    },
};

export const Active: Story = {
    args: {
        group: mockGroup,
        activeGroupId: "funny",
        onToggle: () => {},
    },
};
