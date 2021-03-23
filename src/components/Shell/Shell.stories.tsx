import { Shell as Component } from "./index";

const Story = (props) => <Component {...props} />;

export const ShellStory = Story.bind({});

export default {
  title: "Shell",
  component: Component,
};
