import { Shell as Component } from "./index";

const Story = (props: any) => <Component {...props} />;

export const ShellStory = Story.bind({});

export default {
  title: "Shell",
  component: Component,
};
