import { SideBar as Component } from "./index";

const Story = (props) => <Component {...props} />;

export const SideBarStory = Story.bind({});

export default {
  title: "SideBar",
  component: Component,
};
