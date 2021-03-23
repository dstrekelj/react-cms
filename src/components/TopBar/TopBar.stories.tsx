import { TopBar as Component } from "./index";

const Story = (props) => <Component {...props} />;

export const TopBarStory = Story.bind({});

export default {
  title: "TopBar",
  component: Component,
};
