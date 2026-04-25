// This handles the specific react-toastify css error
declare module "react-toastify/dist/ReactToastify.css";

// This handles ALL other CSS/SCSS imports in your project
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
