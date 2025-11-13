declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export = classes;
  export default classes;
}
declare module "*.css";
