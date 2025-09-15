import NotFoundActionComponent from "./NotFoundActionComponent";
import NotFoundHeadingComponent from "./NotFoundHeadingComponent";
import NotFoundMessageComponent from "./NotFoundMessageComponent";

export default function NotFoundContentComponent() {
  return (
    <>
      <NotFoundHeadingComponent />
      <NotFoundMessageComponent />
      <NotFoundActionComponent />
    </>
  );
}
